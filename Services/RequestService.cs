using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OilBookingSystem.Data;
using OilBookingSystem.Models;
using OilBookingSystem.ViewModels;

namespace OilBookingSystem.Services
{
    public class RequestService
    {
        private readonly ApplicationDbContext _context;
        
        public RequestService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Request>> GetAllRequestsAsync()
        {
            return await _context.Requests
                .Include(r => r.User)
                .Include(r => r.Product)
                .ToListAsync();
        }
        
        public async Task<Request> GetRequestByIdAsync(int id)
        {
            return await _context.Requests
                .Include(r => r.User)
                .Include(r => r.Product)
                .FirstOrDefaultAsync(r => r.RequestId == id);
        }
        
        public async Task<Request> CreateRequestAsync(RequestViewModel model)
        {
            // Get current price for the product
            var currentPrice = await _context.PriceMasters
                .Where(p => p.ProductId == model.ProductId)
                .Where(p => p.EffectiveDate <= DateTime.Now && (p.ExpiryDate == null || p.ExpiryDate >= DateTime.Now))
                .OrderByDescending(p => p.EffectiveDate)
                .FirstOrDefaultAsync();
                
            if (currentPrice == null)
            {
                throw new Exception("No valid price found for the selected product");
            }
            
            var request = new Request
            {
                UserId = model.UserId,
                ProductId = model.ProductId,
                Quantity = model.Quantity,
                UOM = model.UOM,
                Price = currentPrice.Price,
                RequestDate = DateTime.Now,
                Notes = model.Notes,
                Status = "Pending"
            };
            
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            
            return request;
        }
        
        public async Task<Request> UpdateRequestAsync(int id, RequestViewModel model)
        {
            var request = await _context.Requests.FindAsync(id);
            
            if (request == null)
            {
                return null;
            }
            
            request.ProductId = model.ProductId;
            request.Quantity = model.Quantity;
            request.UOM = model.UOM;
            request.Notes = model.Notes;
            
            // Update price if needed
            var currentPrice = await _context.PriceMasters
                .Where(p => p.ProductId == model.ProductId)
                .Where(p => p.EffectiveDate <= DateTime.Now && (p.ExpiryDate == null || p.ExpiryDate >= DateTime.Now))
                .OrderByDescending(p => p.EffectiveDate)
                .FirstOrDefaultAsync();
                
            if (currentPrice != null)
            {
                request.Price = currentPrice.Price;
            }
            
            _context.Requests.Update(request);
            await _context.SaveChangesAsync();
            
            return request;
        }
        
        public async Task<bool> DeleteRequestAsync(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            
            if (request == null)
            {
                return false;
            }
            
            // Check if request is already part of an order
            var isOrdered = await _context.OrderRequests.AnyAsync(or => or.RequestId == id);
            
            if (isOrdered)
            {
                return false;
            }
            
            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<bool> UpdateRequestStatusAsync(int id, string status)
        {
            var request = await _context.Requests.FindAsync(id);
            
            if (request == null)
            {
                return false;
            }
            
            request.Status = status;
            _context.Requests.Update(request);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
