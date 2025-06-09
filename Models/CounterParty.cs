using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.Models
{
    public class CounterParty
    {
        [Key]
        public int CounterPartyId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        public string ContactInfo { get; set; }
        
        // Navigation property
        public virtual ICollection<Order> Orders { get; set; }
    }
}
