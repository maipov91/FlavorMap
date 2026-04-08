namespace FlavorMap.Api.Models;

public class Place
{
    public int Id { get; set; }

    // Basic Info
    public string BrandName { get; set; } = "";
    public string CuisineType { get; set; } = "";
    public string Address { get; set; } = "";
    public string Contact { get; set; } = "";
    public string SocialMedia { get; set; } = "";
    public string DiningFormat { get; set; } = "";
    public string ImageUrl { get; set; } = "";

    // Season classification
    public string Season { get; set; } = "";
    // spring | summer | autumn | winter

    // Structured Evaluation
    public string MenuSeasonality { get; set; } = "";
    public string DiningMoodExperience { get; set; } = "";
    public string FoodWeight { get; set; } = "";
    public string CulturalNarratives { get; set; } = "";

    public int PersonalRating { get; set; } = 0; // 1–10
    public string? MenuImage { get; set; }
    public string? MoodImage { get; set; }
    public string? WeightImage { get; set; }
    public string? CultureImage { get; set; }
    public string? StickerImage { get; set; }
    public string? SeasonSection { get; set; }
    public string? Vibe { get; set; }

}