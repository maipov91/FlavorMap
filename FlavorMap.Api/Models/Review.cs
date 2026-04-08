namespace FlavorMap.Api.Models;

public class Review
{
    public int Id { get; set; }
    public int PlaceId { get; set; }
    public string Nickname { get; set; } = "";
    public int Rating { get; set; }
    public string Description { get; set; } = "";
    public string Season { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Place? Place { get; set; }
}