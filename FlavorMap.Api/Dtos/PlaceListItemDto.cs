namespace FlavorMap.Api.Dtos;

public class PlaceListItemDto
{
    public int Id { get; set; }
    public string BrandName { get; set; } = "";
    public string CuisineType { get; set; } = "";
    public string Season { get; set; } = "";
    public int PersonalRating { get; set; }
    
    public string? ImageUrl { get; set; }
    public string? FoodWeight { get; set; }
    public string? Address { get; set; }
    public string? SocialMedia { get; set; }
    public string? SeasonSection { get; set; }
    public string? Vibe { get; set; }
}
