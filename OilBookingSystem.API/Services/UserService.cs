using Microsoft.EntityFrameworkCore;
using OilBookingSystem.API.Data;
using OilBookingSystem.API.Models;
using OilBookingSystem.API.ViewModels;

namespace OilBookingSystem.API.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users
                .Where(u => u.IsActive)
                .OrderBy(u => u.Name)
                .ToListAsync();
        }
        
        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == id);
        }
        
        public async Task<User> CreateUserAsync(CreateUserViewModel model)
        {
            // Check if email already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == model.Email);
                
            if (existingUser != null)
            {
                throw new Exception("A user with this email already exists");
            }
            
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Role = model.Role,
                IsActive = true,
                CreatedDate = DateTime.Now
            };
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            return user;
        }
        
        public async Task<User?> UpdateUserAsync(int id, UpdateUserViewModel model)
        {
            var user = await _context.Users.FindAsync(id);
            
            if (user == null)
            {
                return null;
            }
            
            // Check if email is being changed and if it already exists
            if (user.Email != model.Email)
            {
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == model.Email && u.UserId != id);
                    
                if (existingUser != null)
                {
                    throw new Exception("A user with this email already exists");
                }
            }
            
            user.Name = model.Name;
            user.Email = model.Email;
            user.Role = model.Role;
            
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            
            return user;
        }
        
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            
            if (user == null)
            {
                return false;
            }
            
            // Soft delete - just mark as inactive
            user.IsActive = false;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<bool> ToggleUserActiveAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            
            if (user == null)
            {
                return false;
            }
            
            user.IsActive = !user.IsActive;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
