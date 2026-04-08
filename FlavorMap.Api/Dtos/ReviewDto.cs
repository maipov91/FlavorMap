namespace FlavorMap.Api.Dtos;

public class CreateReviewDto
{
    public string Nickname { get; set; } = "";
    public int Rating { get; set; }
    public string Description { get; set; } = "";
    public string Season { get; set; } = "";
}

public class ReviewDto
{
    public int Id { get; set; }
    public string Nickname { get; set; } = "";
    public int Rating { get; set; }
    public string Description { get; set; } = "";
    public string Season { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}