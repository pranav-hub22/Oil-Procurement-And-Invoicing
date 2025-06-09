using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class InvoiceOrder
    {
        [Key]
        public int InvoiceOrderId { get; set; }
        
        [Required]
        public int InvoiceId { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        
        // Navigation properties
        [ForeignKey("InvoiceId")]
        public virtual Invoice Invoice { get; set; }
        
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
    }
}
