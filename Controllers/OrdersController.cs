using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OilBookingSystem.Models;
using OilBookingSystem.Services;
using OilBookingSystem.ViewModels;

namespace OilBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;
        
        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }
        
        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }
        
        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            
            if (order == null)
            {
                return NotFound();
            }
            
            return Ok(order);
        }
        
        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderViewModel model)
        {
            try
            {
                var order = await _orderService.CreateOrderAsync(model);
                return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        // PATCH: api/Orders/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var result = await _orderService.UpdateOrderStatusAsync(id, status);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}
