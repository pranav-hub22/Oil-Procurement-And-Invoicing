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
    public class RequestsController : ControllerBase
    {
        private readonly RequestService _requestService;
        
        public RequestsController(RequestService requestService)
        {
            _requestService = requestService;
        }
        
        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            var requests = await _requestService.GetAllRequestsAsync();
            return Ok(requests);
        }
        
        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _requestService.GetRequestByIdAsync(id);
            
            if (request == null)
            {
                return NotFound();
            }
            
            return Ok(request);
        }
        
        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Request>> CreateRequest(RequestViewModel model)
        {
            try
            {
                var request = await _requestService.CreateRequestAsync(model);
                return CreatedAtAction(nameof(GetRequest), new { id = request.RequestId }, request);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        // PUT: api/Requests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(int id, RequestViewModel model)
        {
            var request = await _requestService.UpdateRequestAsync(id, model);
            
            if (request == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
        
        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var result = await _requestService.DeleteRequestAsync(id);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
        
        // PATCH: api/Requests/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] string status)
        {
            var result = await _requestService.UpdateRequestStatusAsync(id, status);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}
