using FlavorMap.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FlavorMap.Api.Data;

public class AppDbContext : DbContext
{
    public 
    AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Place> Places => Set<Place>();
    public DbSet<Favorite> Favorites => Set<Favorite>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>()
            .HasKey(x => new { x.UserId, x.PlaceId });
    }
}
