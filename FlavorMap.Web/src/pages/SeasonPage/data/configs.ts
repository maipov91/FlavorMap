// data/configs.ts
// Tất cả config màu sắc, hình ảnh, tagline cho từng mùa

export type SectionTheme = {
    sectionBg: string;
    overlayColor: string;
    headingColor: string;
    subtitleColor: string;
    dividerColor: string;
    cardBg: string;
    cardBgHover: string;
    cardTextHover: string;
    cardNameRest: string;
    cardSubRest: string;
    cardTagBorderRest: string;
    cardTagColorRest: string;
    weightBarBg: string;
    weightBarFill: string;
    weightLabelColor: string;
    badgeColor: string;
};

export type SeasonConfig = {
    heroImage: string;
    heroOverlay: string;
    heroTitleColor: string;
    heroSubtitleColor: string;
    heroTaglineColor: string;
    tagline: string;
    heroLabel: string;
    heroPosition?: string;
    sectionThemes: Record<string, SectionTheme>;
};

const SUMMER_THEME: SectionTheme = {
    sectionBg: "#2B0A0D",
    overlayColor: "rgba(20,10,4,0.55)",
    headingColor: "#A31621",
    subtitleColor: "rgba(245,236,216,0.55)",
    dividerColor: "rgba(245,236,216,0.15)",
    cardBg: "#3A0D11",
    cardBgHover: "#F5ECD8",
    cardTextHover: "#7A1015",
    cardNameRest: "#F5ECD8",
    cardSubRest: "rgba(245,236,216,0.75)",
    cardTagBorderRest: "rgba(245,236,216,0.18)",
    cardTagColorRest: "rgba(245,236,216,0.5)",
    weightBarBg: "rgba(245,236,216,0.15)",
    weightBarFill: "#A31621",
    weightLabelColor: "rgba(245,236,216,0.4)",
    badgeColor: "#A31621",
};

const SPRING_THEME: SectionTheme = {
    sectionBg: "#0F1F12",
    overlayColor: "rgba(8,20,12,0.55)",
    headingColor: "#8EC97A",
    subtitleColor: "rgba(142,201,122,0.55)",
    dividerColor: "rgba(142,201,122,0.15)",
    cardBg: "#162510",
    cardBgHover: "#D2E8C8",
    cardTextHover: "#0C1F0A",
    cardNameRest: "#D2E8C8",
    cardSubRest: "rgba(210,232,200,0.75)",
    cardTagBorderRest: "rgba(210,232,200,0.18)",
    cardTagColorRest: "rgba(210,232,200,0.5)",
    weightBarBg: "rgba(210,232,200,0.15)",
    weightBarFill: "#6BAF52",
    weightLabelColor: "rgba(210,232,200,0.4)",
    badgeColor: "#8EC97A",
};

const AUTUMN_THEME: SectionTheme = {
    sectionBg: "#1C1404",
    overlayColor: "rgba(20,14,4,0.55)",
    headingColor: "#D4A820",
    subtitleColor: "rgba(212,168,32,0.55)",
    dividerColor: "rgba(212,168,32,0.15)",
    cardBg: "#261A04",
    cardBgHover: "#F5DC8C",
    cardTextHover: "#1A1002",
    cardNameRest: "#F5DC8C",
    cardSubRest: "rgba(245,220,140,0.75)",
    cardTagBorderRest: "rgba(245,220,140,0.18)",
    cardTagColorRest: "rgba(245,220,140,0.5)",
    weightBarBg: "rgba(245,220,140,0.15)",
    weightBarFill: "#B8880C",
    weightLabelColor: "rgba(245,220,140,0.4)",
    badgeColor: "#D4A820",
};

const WINTER_THEME: SectionTheme = {
    sectionBg: "#080F1C",
    overlayColor: "rgba(4,10,22,0.55)",
    headingColor: "#7AA8D4",
    subtitleColor: "rgba(122,168,212,0.55)",
    dividerColor: "rgba(122,168,212,0.15)",
    cardBg: "#0C1526",
    cardBgHover: "#BED2F0",
    cardTextHover: "#060E1E",
    cardNameRest: "#BED2F0",
    cardSubRest: "rgba(190,210,240,0.75)",
    cardTagBorderRest: "rgba(190,210,240,0.18)",
    cardTagColorRest: "rgba(190,210,240,0.5)",
    weightBarBg: "rgba(190,210,240,0.15)",
    weightBarFill: "#4A80B8",
    weightLabelColor: "rgba(190,210,240,0.4)",
    badgeColor: "#7AA8D4",
};

export const SEASON_CONFIGS: Record<string, SeasonConfig> = {
    summer: {
        heroImage: "/images/sections/summer-hero.jpg",
        heroOverlay: "rgba(20, 10, 4, 0.72)",
        heroTitleColor: "#F5ECD8",
        heroSubtitleColor: "rgba(245,236,216,0.35)",
        heroTaglineColor: "rgba(245,236,216,0.4)",
        tagline: "Hanoi in summer is a gentle weight —\ncool from within, warm from without.",
        heroLabel: "in season",
        heroPosition: "center 38%",
        sectionThemes: {
            outside: SUMMER_THEME,
            inside: { ...SUMMER_THEME },
            together: { ...SUMMER_THEME },
        },
    },
    spring: {
        heroImage: "/images/sections/spring-hero.jpg",
        heroOverlay: "rgba(8, 20, 12, 0.72)",
        heroTitleColor: "rgba(210,232,200,0.92)",
        heroSubtitleColor: "rgba(210,232,200,0.35)",
        heroTaglineColor: "rgba(210,232,200,0.4)",
        tagline: "Hanoi in spring is a soft exhale —\nnew leaves, cool mist, and the city waking.",
        heroLabel: "in season",
        heroPosition: "center 30%",
        sectionThemes: {
            bloom: SPRING_THEME,
            petal: { ...SPRING_THEME, sectionBg: "#0C1A0E", cardBg: "#111E0D" },
            morning: { ...SPRING_THEME, sectionBg: "#091509", cardBg: "#0D190A" },
        },
    },
    autumn: {
        heroImage: "/images/sections/autumn-hero.jpg",
        heroOverlay: "rgba(20, 14, 4, 0.72)",
        heroTitleColor: "rgba(245,220,140,0.92)",
        heroSubtitleColor: "rgba(245,220,140,0.35)",
        heroTaglineColor: "rgba(245,220,140,0.4)",
        tagline: "Hanoi in autumn is amber light at 5pm —\nthe best season for sitting still.",
        heroLabel: "in season",
        heroPosition: "center 56%",
        sectionThemes: {
            golden: AUTUMN_THEME,
            harvest: { ...AUTUMN_THEME, sectionBg: "#160F02", cardBg: "#1E1404" },
            dusk: { ...AUTUMN_THEME, sectionBg: "#110B01", cardBg: "#180F02" },
        },
    },
    winter: {
        heroImage: "/images/sections/winter-hero.jpg",
        heroOverlay: "rgba(4, 10, 22, 0.75)",
        heroTitleColor: "rgba(190,210,240,0.92)",
        heroSubtitleColor: "rgba(190,210,240,0.35)",
        heroTaglineColor: "rgba(190,210,240,0.4)",
        tagline: "Hanoi in winter is a held breath —\nsteam, fog, and the warmth of a small bowl.",
        heroLabel: "in season",
        heroPosition: "center 42%",
        sectionThemes: {
            fog: WINTER_THEME,
            ember: { ...WINTER_THEME, sectionBg: "#060C18", cardBg: "#0A1220" },
            lantern: { ...WINTER_THEME, sectionBg: "#050A14", cardBg: "#080F1C" },
        },
    },
};