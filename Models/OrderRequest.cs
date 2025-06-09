using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class OrderRequest
    {
        [Key]
        public int OrderRequestId { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        
        [Required]
        public int RequestId { get; set; }
        
        // Navigation properties
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
        
        [ForeignKey("RequestId")]
        public virtual Request Request { get; set; }
    }
}
