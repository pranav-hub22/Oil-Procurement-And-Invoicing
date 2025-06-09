using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.ViewModels
{
    public class InvoiceViewModel
    {
        [Required]
        public List<int> OrderIds { get; set; }
        
        public decimal? TotalAmount { get; set; } // Optional, can be calculated from orders
    }
}
