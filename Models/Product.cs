using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        [Required]
        public string UOM { get; set; } // MMBtu/Barrel
        
        // Navigation properties
        public virtual ICollection<Request> Requests { get; set; }
        public virtual ICollection<PriceMaster> Prices { get; set; }
    }
}
