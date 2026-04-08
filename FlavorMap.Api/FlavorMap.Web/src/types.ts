export interface PlaceListItem {
    id: number;
    brandName: string;
    cuisineType: string;
    season: string;
    personalRating: number;
  
    imageUrl?: string;
    foodWeight?: string;
    address?: string;      
    socialMedia?: string;
    seasonSection: string;
    vibe?: string;
}

export interface PlaceDetail {
    id: number;
    brandName: string;
    cuisineType: string;
    address: string;
    contact: string;
    socialMedia: string;
    diningFormat: string;
    imageUrl: string;
    season: string;

    menuSeasonality: string;
    diningMoodExperience: string;
    foodWeight: string;
    culturalNarratives: string;

    personalRating: number;
    menuImage?: string;
    moodImage?: string;
    weightImage?: string;
    cultureImage?: string;
}