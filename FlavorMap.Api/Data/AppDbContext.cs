using FlavorMap.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FlavorMap.Api.Data;

public class AppDbContext : DbContext
{
    public 
    AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    
    public DbSet<Place> Places => Set<Place>();
    
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }
}
