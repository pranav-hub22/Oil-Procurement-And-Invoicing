using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        
        [Required]
        public int CounterPartyId { get; set; }
        
        [Required]
        public string DeliveryAddress { get; set; }
        
        [Required]
        public DateTime PlacedDate { get; set; }
        
        [Required]
        public string Status { get; set; } // Placed, Delivered, Cancelled
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        
        // Navigation properties
        [ForeignKey("CounterPartyId")]
        public virtual CounterParty CounterParty { get; set; }
        
        public virtual ICollection<OrderRequest> OrderRequests { get; set; }
        public virtual ICollection<InvoiceOrder> InvoiceOrders { get; set; }
    }
}
