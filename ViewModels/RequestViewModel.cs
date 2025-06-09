using System;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.ViewModels
{
    public class RequestViewModel
    {
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public decimal Quantity { get; set; }
        
        [Required]
        public string UOM { get; set; } // MMBtu/Barrel
        
        public string Notes { get; set; }
    }
}
