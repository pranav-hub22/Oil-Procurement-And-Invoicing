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
    public class OrderService
    {
        private readonly ApplicationDbContext _context;
        
        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.CounterParty)
                .Include(o => o.OrderRequests)
                    .ThenInclude(or => or.Request)
                        .ThenInclude(r => r.Product)
                .ToListAsync();
        }
        
        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.CounterParty)
                .Include(o => o.OrderRequests)
                    .ThenInclude(or => or.Request)
                        .ThenInclude(r => r.Product)
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }
        
        public async Task<Order> CreateOrderAsync(OrderViewModel model)
        {
            // Validate requests
            var requestIds = model.RequestIds;
            var requests = await _context.Requests
                .Where(r => requestIds.Contains(r.RequestId))
                .ToListAsync();
                
            if (requests.Count != requestIds.Count)
            {
                throw new Exception("One or more requests not found");
            }
            
            // Check if any request is already ordered
            var alreadyOrderedRequests = requests.Where(r => r.Status == "Ordered").ToList();
            if (alreadyOrderedRequests.Any())
            {
                throw new Exception($"Request(s) {string.Join(", ", alreadyOrderedRequests.Select(r => r.RequestId))} already ordered");
            }
            
            // Calculate total amount
            decimal totalAmount = requests.Sum(r => r.Price * r.Quantity);
            
            // Create order
            var order = new Order
            {
                CounterPartyId = model.CounterPartyId,
                DeliveryAddress = model.DeliveryAddress,
                PlacedDate = DateTime.Now,
                Status = "Placed",
                TotalAmount = totalAmount
            };
            
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            
            // Create order-request relationships
            foreach (var request in requests)
            {
                var orderRequest = new OrderRequest
                {
                    OrderId = order.OrderId,
                    RequestId = request.RequestId
                };
                
                _context.OrderRequests.Add(orderRequest);
                
                // Update request status
                request.Status = "Ordered";
                _context.Requests.Update(request);
            }
            
            await _context.SaveChangesAsync();
            
            return order;
        }
        
        public async Task<bool> UpdateOrderStatusAsync(int id, string status)
        {
            var order = await _context.Orders.FindAsync(id);
            
            if (order == null)
            {
                return false;
            }
            
            order.Status = status;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
