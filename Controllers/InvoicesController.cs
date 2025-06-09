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
    public class InvoicesController : ControllerBase
    {
        private readonly InvoiceService _invoiceService;
        
        public InvoicesController(InvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }
        
        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            var invoices = await _invoiceService.GetAllInvoicesAsync();
            return Ok(invoices);
        }
        
        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _invoiceService.GetInvoiceByIdAsync(id);
            
            if (invoice == null)
            {
                return NotFound();
            }
            
            return Ok(invoice);
        }
        
        // POST: api/Invoices
        [HttpPost]
        public async Task<ActionResult<Invoice>> CreateInvoice(InvoiceViewModel model)
        {
            try
            {
                var invoice = await _invoiceService.CreateInvoiceAsync(model);
                return CreatedAtAction(nameof(GetInvoice), new { id = invoice.InvoiceId }, invoice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        // PUT: api/Invoices/5/amount
        [HttpPut("{id}/amount")]
        public async Task<IActionResult> UpdateInvoiceAmount(int id, [FromBody] decimal amount)
        {
            var invoice = await _invoiceService.UpdateInvoiceAmountAsync(id, amount);
            
            if (invoice == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
        
        // PATCH: api/Invoices/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateInvoiceStatus(int id, [FromBody] string status)
        {
            var result = await _invoiceService.UpdateInvoiceStatusAsync(id, status);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}
