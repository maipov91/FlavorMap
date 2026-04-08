// data/sections.ts
// Nội dung editorial và quiz cho từng mùa

export type SeasonSection = {
    number: string;
    id: string;
    title: string;
    subtitle: string;
    restaurants: string[];
    vibes: Record<string, string>;
};

export type QuizQuestion = {
    question: string;
    options: { label: string; value: string }[];
};

export const SEASON_SECTIONS: Record<string, SeasonSection[]> = {
    summer: [
        {
            number: "01", id: "outside",
            title: "Where the City Spills Into the Night",
            subtitle: "Neon lights, street noise, and the pulse of Hanoi after dark. Places you walk into without planning — and end up staying.",
            restaurants: ["Miss Ha Noi", "Tonkin Express"],
            vibes: {
                "Miss Ha Noi": "MISS in neon — folk rhymes turned menus, where heritage slips into a playful, modern rhythm beside the Temple of Literature.",
                "Tonkin Express": "Hidden behind an old drugstore sign. A cinematic escape — cold beer, dim lights, and the quiet hum of a city that never fully sleeps.",
            },
        },
        {
            number: "02", id: "inside",
            title: "A Table Hidden from the Heat",
            subtitle: "Cool air, green shadows, and the quiet relief of stepping away from the sun. A slower summer lived indoors.",
            restaurants: ["La Lot Vietnamese Cuisine & Wine", "Maii Bistro"],
            vibes: {
                "La Lot Vietnamese Cuisine & Wine": "A green sanctuary above the Old Quarter — tamarind, herbs, and soft light filtering the chaos below.",
                "Maii Bistro": "Like returning to a childhood home — ceiling fans, garden air, and the gentle comfort of familiar flavors reimagined.",
            },
        },
        {
            number: "03", id: "together",
            title: "Meals That Turn Strangers into Friends",
            subtitle: "Shared plates, clinking glasses, and conversations that stretch into the night. A summer made for staying longer.",
            restaurants: ["Cultra Taproom", "Zao Eatery"],
            vibes: {
                "Cultra Taproom": "A living museum where old bricks meet new energy — kombucha flows, laughter spreads, and the communal mat becomes a social ritual.",
                "Zao Eatery": "A lively intersection of flavors and people — where seafood, herbs, and shared stories blur the line between strangers and friends.",
            },
        },
    ],
    spring: [
        {
            number: "01", id: "bloom",
            title: "Where the Season Gently Wakes",
            subtitle: "A quiet unfolding — light, herbs, and the first warmth after winter. Meals that feel like the beginning of something new.",
            restaurants: ["GIA"],
            vibes: {
                "GIA": "A luminous awakening inside a century-old home — where forest ingredients, memory, and precision come together in a refined seasonal dialogue.",
            },
        },
        {
            number: "02", id: "petal",
            title: "Eating Close to the Earth",
            subtitle: "Fresh harvests, garden air, and ingredients still carrying the breath of the soil. A spring rooted in nature.",
            restaurants: ["Lamai Garden", "A Ban Mountain Dew"],
            vibes: {
                "Lamai Garden": "From garden to table — herbs picked during service, vegetables at their peak, and a quiet connection to the land in every dish.",
                "A Ban Mountain Dew": "A journey to the highlands — where wild herbs, mountain spices, and early harvests bring the spirit of spring into the city.",
            },
        },
        {
            number: "03", id: "morning",
            title: "Mornings That Feel Like a Beginning",
            subtitle: "Soft light, warm rice, and familiar flavors. The kind of meal that grounds you before the day begins.",
            restaurants: ["Tam Vi"],
            vibes: {
                "Tam Vi": "A Northern home preserved in time — where simple dishes, shared quietly, carry the depth of memory and everyday care.",
            },
        },
    ],
    autumn: [
        {
            number: "01", id: "golden",
            title: "In the Season of Quiet Light",
            subtitle: "Golden hours, open windows, and meals that unfold slowly — like the city itself in autumn.",
            restaurants: ["Vien Dining"],
            vibes: {
                "Vien Dining": "A poetic tasting journey — where each dish traces the cycle of the land, moving gently from light to depth.",
            },
        },
        {
            number: "02", id: "harvest",
            title: "A Slower Kind of Nourishment",
            subtitle: "Earthy tones, soft textures, and food that feels both grounding and calm. A season to eat with intention.",
            restaurants: ["Co Dam"],
            vibes: {
                "Co Dam": "A quiet, plant-based sanctuary — where vegetables, spices, and texture come together in a deeply balanced, meditative experience.",
            },
        },
        {
            number: "03", id: "dusk",
            title: "When the Evening Stays a Little Longer",
            subtitle: "Fading light, lingering conversations, and meals that stretch beyond time. Autumn at its most reflective.",
            restaurants: ["GIA"],
            vibes: {
                "GIA": "In the evening, the space becomes more intimate — each course unfolding like a quiet conversation between memory, season, and craft.",
            },
        },
    ],
    winter: [
        {
            number: "01", id: "fog",
            title: "Where Warmth Cuts Through the Cold",
            subtitle: "Steam rising, spices hitting, and the first bite that melts the winter air away.",
            restaurants: ["Toi Ot (Garlic & Chili)"],
            vibes: {
                "Toi Ot (Garlic & Chili)": "Garlic and chili in full force — bold, fragrant, and warming. A place where every bite feels like a spark in the cold.",
            },
        },
        {
            number: "02", id: "ember",
            title: "Gathered Around the Steam",
            subtitle: "Hot pots, shared tables, and conversations circling warmth. Winter as a communal ritual.",
            restaurants: ["Dung - Dip and Roll"],
            vibes: {
                "Dung - Dip and Roll": "A gentle, rhythmic ritual of dipping and sharing — where fruit-based broths and rising steam bring people closer together.",
            },
        },
        {
            number: "03", id: "lantern",
            title: "At Tables That Feel Like Home",
            subtitle: "Soft light, quiet rooms, and meals that linger — not for hunger, but for connection.",
            restaurants: ["Cui Restaurant", "T.U.N.G Dining"],
            vibes: {
                "Cui Restaurant": "Warm, intimate, and grounded — where Southern flavors and soft lighting create a slow, emotional dining experience.",
                "T.U.N.G Dining": "Refined yet comforting — a quiet space where modern Vietnamese cuisine unfolds with warmth and intention.",
            },
        },
    ],
};

export const SEASON_QUIZZES: Record<string, QuizQuestion[]> = {
    summer: [
        { question: "Tonight feels like...", options: [{ label: "Stepping into the city's rhythm after dark", value: "outside" }, { label: "Escaping the heat somewhere quiet and cool", value: "inside" }, { label: "Finding a table where no one wants to leave", value: "together" }] },
        { question: "You're drawn to...", options: [{ label: "Neon lights, street sounds, a little chaos", value: "outside" }, { label: "Soft air, greenery, and a slower pace", value: "inside" }, { label: "Shared plates, laughter, and flowing drinks", value: "together" }] },
        { question: "The perfect summer meal should...", options: [{ label: "Feel alive, bold, and a little unpredictable", value: "outside" }, { label: "Cool you down without slowing you down", value: "inside" }, { label: "Bring people closer, one dish at a time", value: "together" }] },
    ],
    spring: [
        { question: "This moment of spring feels like...", options: [{ label: "Something new quietly beginning", value: "bloom" }, { label: "Getting closer to nature and its rhythm", value: "petal" }, { label: "A gentle start to the day", value: "morning" }] },
        { question: "You're looking for a meal that...", options: [{ label: "Feels refined, light, and intentional", value: "bloom" }, { label: "Feels fresh, grounded, and close to the source", value: "petal" }, { label: "Feels familiar, warm, and easy", value: "morning" }] },
        { question: "After eating, you want to feel...", options: [{ label: "Clear, awakened, and slightly inspired", value: "bloom" }, { label: "Balanced, calm, and connected to the moment", value: "petal" }, { label: "Comforted, steady, and ready for the day", value: "morning" }] },
    ],
    autumn: [
        { question: "Late afternoon draws you toward...", options: [{ label: "A quiet place where light moves slowly", value: "golden" }, { label: "Something grounding, calm, and nourishing", value: "harvest" }, { label: "A dinner that stretches into the evening", value: "dusk" }] },
        { question: "Autumn should feel like...", options: [{ label: "Soft light, subtle flavors, and quiet detail", value: "golden" }, { label: "Depth, warmth, and a slower pace", value: "harvest" }, { label: "Lingering moments and unhurried conversations", value: "dusk" }] },
        { question: "The meal you want is one that...", options: [{ label: "Unfolds gently, course by course", value: "golden" }, { label: "Nourishes without overwhelming", value: "harvest" }, { label: "Makes you lose track of time", value: "dusk" }] },
    ],
    winter: [
        { question: "The cold makes you want...", options: [{ label: "A burst of heat that cuts through the air", value: "fog" }, { label: "Something shared, steaming, and close", value: "ember" }, { label: "A table that feels warm and familiar", value: "lantern" }] },
        { question: "You're looking for a place that...", options: [{ label: "Wakes you up with bold, warming flavors", value: "fog" }, { label: "Brings people together around the table", value: "ember" }, { label: "Feels intimate, quiet, and comforting", value: "lantern" }] },
        { question: "After the meal, you want to feel...", options: [{ label: "Warm from the inside out", value: "fog" }, { label: "Close, full, and content with others", value: "ember" }, { label: "Still, grounded, and emotionally full", value: "lantern" }] },
    ],
};