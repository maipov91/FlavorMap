using FlavorMap.Api.Models;

namespace FlavorMap.Api.Data;

public static class Seed
{
    public static void EnsureSeed(AppDbContext db)
    {
        if (db.Places.Any()) return;

        db.Places.AddRange(
            new Place
            {
                // Basic Info
                BrandName = "GIA Restaurant",
                CuisineType = "Vietnamese Contemporary Fine Dining",
                Address = "61 Van Mieu, Ha Noi, Viet Nam",
                Contact = "+84 896 682 996",
                SocialMedia = "@gia.hanoi",
                DiningFormat = "Fine dining · Seasonal tasting menu",
                ImageUrl = "/images/places/gia-hero.png",

                // Season classification
                Season = "spring",

                // Structured Evaluation
                MenuSeasonality =
                    "The tasting menu evolves every season, highlighting Northern Vietnamese herbs, freshwater ingredients, and carefully sourced local produce. " +
                    "Seasonality is not decorative — it determines structure, pacing, and ingredient narrative.",

                DiningMoodExperience =
                    "The atmosphere is calm, intimate, and reflective. " +
                    "Warm lighting and the preserved century-old house create a sense of quiet immersion. " +
                    "Service pacing is deliberate and unhurried, encouraging attentiveness.",

                FoodWeight =
                    "Overall weight: Light to Medium.\n" +
                    "Despite multiple courses, the progression feels balanced and never overwhelming. " +
                    "Broths, herbs, and clean finishes maintain energy throughout the meal.",

                CulturalNarratives =
                    "Gia reframes Vietnamese culinary memory through a contemporary lens. " +
                    "Rather than fusion, it refines traditional foundations into a structured tasting format. " +
                    "The concept preserves cultural identity while elevating technical execution.",

                PersonalRating = 9
            }
        );

        db.SaveChanges();
    }
}