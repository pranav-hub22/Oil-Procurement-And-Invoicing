using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Quantity { get; set; }
        
        [Required]
        public string UOM { get; set; } // MMBtu/Barrel
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        [Required]
        public DateTime RequestDate { get; set; }
        
        public string Notes { get; set; }
        
        [Required]
        public string Status { get; set; } // Pending, Approved, Rejected, Ordered
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        
        public virtual ICollection<OrderRequest> OrderRequests { get; set; }
    }
}
