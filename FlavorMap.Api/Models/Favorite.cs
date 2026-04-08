namespace FlavorMap.Api.Models;

public class Favorite
{
    public int UserId { get; set; }
    public User? User { get; set; }

    public int PlaceId { get; set; }
    public Place? Place { get; set; }
}

