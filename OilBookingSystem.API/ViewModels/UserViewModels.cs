using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.API.ViewModels
{
    public class CreateUserViewModel
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = string.Empty;
    }
    
    public class UpdateUserViewModel
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
