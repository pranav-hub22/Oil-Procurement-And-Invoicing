using Microsoft.AspNetCore.Mvc;
using OilBookingSystem.API.Models;
using OilBookingSystem.API.Services;
using OilBookingSystem.API.ViewModels;

namespace OilBookingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        
        public UsersController(UserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            
            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }
        
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(CreateUserViewModel model)
        {
            try
            {
                var user = await _userService.CreateUserAsync(model);
                return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserViewModel model)
        {
            var user = await _userService.UpdateUserAsync(id, model);
            
            if (user == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
        
        [HttpPatch("{id}/toggle-active")]
        public async Task<IActionResult> ToggleUserActive(int id)
        {
            var result = await _userService.ToggleUserActiveAsync(id);
            
            if (!result)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}
