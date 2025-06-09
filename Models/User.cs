using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Role { get; set; }
        
        // Navigation property
        public virtual ICollection<Request> Requests { get; set; }
    }
}
