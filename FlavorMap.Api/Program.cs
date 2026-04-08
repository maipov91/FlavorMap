using FlavorMap.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS 
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", p =>
       p.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5065")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

// Database (SQLite)
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();
app.UseStaticFiles();




app.UseCors("frontend");

app.UseAuthorization();

app.MapControllers();

// Create DB + Seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    Seed.EnsureSeed(db);
}

app.Run();


