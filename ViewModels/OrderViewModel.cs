using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OilBookingSystem.ViewModels
{
    public class OrderViewModel
    {
        [Required]
        public int CounterPartyId { get; set; }
        
        [Required]
        public string DeliveryAddress { get; set; }
        
        [Required]
        public List<int> RequestIds { get; set; }
    }
}
