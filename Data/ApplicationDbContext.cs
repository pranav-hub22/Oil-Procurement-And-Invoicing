using Microsoft.EntityFrameworkCore;
using OilBookingSystem.Models;

namespace OilBookingSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PriceMaster> PriceMasters { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<CounterParty> CounterParties { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderRequest> OrderRequests { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceOrder> InvoiceOrders { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure relationships
            modelBuilder.Entity<OrderRequest>()
                .HasKey(or => or.OrderRequestId);
                
            modelBuilder.Entity<OrderRequest>()
                .HasOne(or => or.Order)
                .WithMany(o => o.OrderRequests)
                .HasForeignKey(or => or.OrderId);
                
            modelBuilder.Entity<OrderRequest>()
                .HasOne(or => or.Request)
                .WithMany(r => r.OrderRequests)
                .HasForeignKey(or => or.RequestId);
                
            modelBuilder.Entity<InvoiceOrder>()
                .HasKey(io => io.InvoiceOrderId);
                
            modelBuilder.Entity<InvoiceOrder>()
                .HasOne(io => io.Invoice)
                .WithMany(i => i.InvoiceOrders)
                .HasForeignKey(io => io.InvoiceId);
                
            modelBuilder.Entity<InvoiceOrder>()
                .HasOne(io => io.Order)
                .WithMany(o => o.InvoiceOrders)
                .HasForeignKey(io => io.OrderId);
        }
    }
}
