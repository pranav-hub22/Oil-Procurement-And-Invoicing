using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }
        
        [Required]
        public DateTime InvoiceDate { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        
        [Required]
        public string Status { get; set; } // Draft, Issued, Paid, Cancelled
        
        // Navigation property
        public virtual ICollection<InvoiceOrder> InvoiceOrders { get; set; }
    }
}
