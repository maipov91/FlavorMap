using FlavorMap.Api.Data;
using FlavorMap.Api.Dtos;
using FlavorMap.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace FlavorMap.Api.Controllers;

[ApiController]
[Route("api/places")]
public class PlacesController : ControllerBase
{
    private readonly AppDbContext _db;

    public PlacesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<PlaceListItemDto>>> GetAll([FromQuery] string? season)
    {
        var query = _db.Places.AsQueryable();

        if (!string.IsNullOrEmpty(season))
            query = query.Where(p => p.Season.ToLower() == season.ToLower());

        var items = await query
            .Select(p => new PlaceListItemDto
            {
                Id = p.Id,
                BrandName = p.BrandName,
                CuisineType = p.CuisineType,
                Season = p.Season,
                PersonalRating = p.PersonalRating,
                ImageUrl = p.ImageUrl,
                FoodWeight = p.FoodWeight,
                Address = p.Address,       
                SocialMedia = p.SocialMedia,
                SeasonSection = p.SeasonSection,
                Vibe = p.Vibe,
            })
            .ToListAsync();

        return Ok(items);
    }
    // DETAIL
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Place>> GetOne(int id)
    {
        var place = await _db.Places.FindAsync(id);

        if (place == null)
            return NotFound();

        return place;
    }
}