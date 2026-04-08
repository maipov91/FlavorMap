using FlavorMap.Api.Data;
using FlavorMap.Api.Dtos;
using FlavorMap.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlavorMap.Api.Controllers;

[ApiController]
[Route("api/places/{placeId:int}/reviews")]
public class ReviewsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ReviewsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<ReviewDto>>> GetAll(int placeId)
    {
        var reviews = await _db.Reviews
            .Where(r => r.PlaceId == placeId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                Nickname = r.Nickname,
                Rating = r.Rating,
                Description = r.Description,
                Season = r.Season,
                CreatedAt = r.CreatedAt,
            })
            .ToListAsync();

        return Ok(reviews);
    }

    [HttpPost]
    public async Task<ActionResult<ReviewDto>> Create(int placeId, CreateReviewDto dto)
    {
        var place = await _db.Places.FindAsync(placeId);
        if (place == null) return NotFound();

        var review = new Review
        {
            PlaceId = placeId,
            Nickname = dto.Nickname,
            Rating = Math.Clamp(dto.Rating, 1, 10),
            Description = dto.Description,
            Season = dto.Season,
            CreatedAt = DateTime.UtcNow,
        };

        _db.Reviews.Add(review);
        await _db.SaveChangesAsync();

        return Ok(new ReviewDto
        {
            Id = review.Id,
            Nickname = review.Nickname,
            Rating = review.Rating,
            Description = review.Description,
            Season = review.Season,
            CreatedAt = review.CreatedAt,
        });
    }
}