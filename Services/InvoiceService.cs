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
    public class InvoiceService
    {
        private readonly ApplicationDbContext _context;
        
        public InvoiceService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Invoice>> GetAllInvoicesAsync()
        {
            return await _context.Invoices
                .Include(i => i.InvoiceOrders)
                    .ThenInclude(io => io.Order)
                .ToListAsync();
        }
        
        public async Task<Invoice> GetInvoiceByIdAsync(int id)
        {
            return await _context.Invoices
                .Include(i => i.InvoiceOrders)
                    .ThenInclude(io => io.Order)
                        .ThenInclude(o => o.OrderRequests)
                            .ThenInclude(or => or.Request)
                                .ThenInclude(r => r.Product)
                .FirstOrDefaultAsync(i => i.InvoiceId == id);
        }
        
        public async Task<Invoice> CreateInvoiceAsync(InvoiceViewModel model)
        {
            // Validate orders
            var orderIds = model.OrderIds;
            var orders = await _context.Orders
                .Where(o => orderIds.Contains(o.OrderId))
                .ToListAsync();
                
            if (orders.Count != orderIds.Count)
            {
                throw new Exception("One or more orders not found");
            }
            
            // Check if any order is already invoiced
            var alreadyInvoicedOrders = await _context.InvoiceOrders
                .Where(io => orderIds.Contains(io.OrderId))
                .Select(io => io.OrderId)
                .ToListAsync();
                
            if (alreadyInvoicedOrders.Any())
            {
                throw new Exception($"Order(s) {string.Join(", ", alreadyInvoicedOrders)} already invoiced");
            }
            
            // Calculate total amount (can be adjusted)
            decimal totalAmount = model.TotalAmount ?? orders.Sum(o => o.TotalAmount);
            
            // Create invoice
            var invoice = new Invoice
            {
                InvoiceDate = DateTime.Now,
                TotalAmount = totalAmount,
                Status = "Draft"
            };
            
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            
            // Create invoice-order relationships
            foreach (var orderId in orderIds)
            {
                var invoiceOrder = new InvoiceOrder
                {
                    InvoiceId = invoice.InvoiceId,
                    OrderId = orderId
                };
                
                _context.InvoiceOrders.Add(invoiceOrder);
            }
            
            await _context.SaveChangesAsync();
            
            return invoice;
        }
        
        public async Task<Invoice> UpdateInvoiceAmountAsync(int id, decimal amount)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            
            if (invoice == null)
            {
                return null;
            }
            
            invoice.TotalAmount = amount;
            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();
            
            return invoice;
        }
        
        public async Task<bool> UpdateInvoiceStatusAsync(int id, string status)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            
            if (invoice == null)
            {
                return false;
            }
            
            invoice.Status = status;
            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
