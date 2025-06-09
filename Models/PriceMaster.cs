using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OilBookingSystem.Models
{
    public class PriceMaster
    {
        [Key]
        public int PriceId { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        [Required]
        public DateTime EffectiveDate { get; set; }
        
        public DateTime? ExpiryDate { get; set; }
        
        // Navigation property
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}
