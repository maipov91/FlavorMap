import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";
import type { PlaceListItem } from "../types";
import "./SeasonPage.css";

type Stage = "intro" | "quiz" | "list";

type SectionTheme = {
    sectionBg: string; overlayColor: string; headingColor: string; subtitleColor: string;
    dividerColor: string; cardBg: string; cardBgHover: string; cardTextHover: string;
    cardNameRest: string; cardSubRest: string; cardTagBorderRest: string; cardTagColorRest: string;
    weightBarBg: string; weightBarFill: string; weightLabelColor: string; badgeColor: string;
};

type SeasonConfig = {
    heroImage: string; heroOverlay: string; heroTitleColor: string; heroSubtitleColor: string;
    heroTaglineColor: string; tagline: string; heroLabel: string; heroPosition?: string;
    sectionThemes: Record<string, SectionTheme>;
};

const SUMMER_CONFIG: SeasonConfig = {
    heroImage: "/images/sections/summer-hero.jpg", heroOverlay: "rgba(20, 10, 4, 0.72)",
    heroTitleColor: "#F5ECD8", heroSubtitleColor: "rgba(245,236,216,0.35)",
    heroTaglineColor: "rgba(245,236,216,0.4)",
    tagline: "Hanoi in summer is a gentle weight —\ncool from within, warm from without.",
    heroLabel: "in season", heroPosition: "center 38%",
    sectionThemes: {
        outside: { sectionBg: "#2B0A0D", overlayColor: "rgba(20,10,4,0.55)", headingColor: "#A31621", subtitleColor: "rgba(245,236,216,0.55)", dividerColor: "rgba(245,236,216,0.15)", cardBg: "#3A0D11", cardBgHover: "#F5ECD8", cardTextHover: "#7A1015", cardNameRest: "#F5ECD8", cardSubRest: "rgba(245,236,216,0.75)", cardTagBorderRest: "rgba(245,236,216,0.18)", cardTagColorRest: "rgba(245,236,216,0.5)", weightBarBg: "rgba(245,236,216,0.15)", weightBarFill: "#A31621", weightLabelColor: "rgba(245,236,216,0.4)", badgeColor: "#A31621" },
        inside: { sectionBg: "#2B0A0D", overlayColor: "rgba(20,10,4,0.55)", headingColor: "#A31621", subtitleColor: "rgba(245,236,216,0.55)", dividerColor: "rgba(245,236,216,0.15)", cardBg: "#3A0D11", cardBgHover: "#F5ECD8", cardTextHover: "#7A1015", cardNameRest: "#F5ECD8", cardSubRest: "rgba(245,236,216,0.75)", cardTagBorderRest: "rgba(245,236,216,0.18)", cardTagColorRest: "rgba(245,236,216,0.5)", weightBarBg: "rgba(245,236,216,0.15)", weightBarFill: "#A31621", weightLabelColor: "rgba(245,236,216,0.4)", badgeColor: "#A31621" },
        together: { sectionBg: "#2B0A0D", overlayColor: "rgba(20,10,4,0.55)", headingColor: "#A31621", subtitleColor: "rgba(245,236,216,0.55)", dividerColor: "rgba(245,236,216,0.15)", cardBg: "#3A0D11", cardBgHover: "#F5ECD8", cardTextHover: "#7A1015", cardNameRest: "#F5ECD8", cardSubRest: "rgba(245,236,216,0.75)", cardTagBorderRest: "rgba(245,236,216,0.18)", cardTagColorRest: "rgba(245,236,216,0.5)", weightBarBg: "rgba(245,236,216,0.15)", weightBarFill: "#A31621", weightLabelColor: "rgba(245,236,216,0.4)", badgeColor: "#A31621" },
    },
};
const SPRING_CONFIG: SeasonConfig = {
    heroImage: "/images/sections/spring-hero.jpg", heroOverlay: "rgba(8, 20, 12, 0.72)",
    heroTitleColor: "rgba(210,232,200,0.92)", heroSubtitleColor: "rgba(210,232,200,0.35)",
    heroTaglineColor: "rgba(210,232,200,0.4)",
    tagline: "Hanoi in spring is a soft exhale —\nnew leaves, cool mist, and the city waking.",
    heroLabel: "in season", heroPosition: "center 30%",
    sectionThemes: {
        bloom: { sectionBg: "#0F1F12", overlayColor: "rgba(8,20,12,0.55)", headingColor: "#8EC97A", subtitleColor: "rgba(142,201,122,0.55)", dividerColor: "rgba(142,201,122,0.15)", cardBg: "#162510", cardBgHover: "#D2E8C8", cardTextHover: "#0C1F0A", cardNameRest: "#D2E8C8", cardSubRest: "rgba(210,232,200,0.75)", cardTagBorderRest: "rgba(210,232,200,0.18)", cardTagColorRest: "rgba(210,232,200,0.5)", weightBarBg: "rgba(210,232,200,0.15)", weightBarFill: "#6BAF52", weightLabelColor: "rgba(210,232,200,0.4)", badgeColor: "#8EC97A" },
        petal: { sectionBg: "#0C1A0E", overlayColor: "rgba(8,20,12,0.55)", headingColor: "#8EC97A", subtitleColor: "rgba(142,201,122,0.55)", dividerColor: "rgba(142,201,122,0.15)", cardBg: "#111E0D", cardBgHover: "#D2E8C8", cardTextHover: "#0C1F0A", cardNameRest: "#D2E8C8", cardSubRest: "rgba(210,232,200,0.75)", cardTagBorderRest: "rgba(210,232,200,0.18)", cardTagColorRest: "rgba(210,232,200,0.5)", weightBarBg: "rgba(210,232,200,0.15)", weightBarFill: "#6BAF52", weightLabelColor: "rgba(210,232,200,0.4)", badgeColor: "#8EC97A" },
        morning: { sectionBg: "#091509", overlayColor: "rgba(8,20,12,0.55)", headingColor: "#8EC97A", subtitleColor: "rgba(142,201,122,0.55)", dividerColor: "rgba(142,201,122,0.15)", cardBg: "#0D190A", cardBgHover: "#D2E8C8", cardTextHover: "#0C1F0A", cardNameRest: "#D2E8C8", cardSubRest: "rgba(210,232,200,0.75)", cardTagBorderRest: "rgba(210,232,200,0.18)", cardTagColorRest: "rgba(210,232,200,0.5)", weightBarBg: "rgba(210,232,200,0.15)", weightBarFill: "#6BAF52", weightLabelColor: "rgba(210,232,200,0.4)", badgeColor: "#8EC97A" },
    },
};
const AUTUMN_CONFIG: SeasonConfig = {
    heroImage: "/images/sections/autumn-hero.jpg", heroOverlay: "rgba(20, 14, 4, 0.72)",
    heroTitleColor: "rgba(245,220,140,0.92)", heroSubtitleColor: "rgba(245,220,140,0.35)",
    heroTaglineColor: "rgba(245,220,140,0.4)",
    tagline: "Hanoi in autumn is amber light at 5pm —\nthe best season for sitting still.",
    heroLabel: "in season", heroPosition: "center 56%",
    sectionThemes: {
        golden: { sectionBg: "#1C1404", overlayColor: "rgba(20,14,4,0.55)", headingColor: "#D4A820", subtitleColor: "rgba(212,168,32,0.55)", dividerColor: "rgba(212,168,32,0.15)", cardBg: "#261A04", cardBgHover: "#F5DC8C", cardTextHover: "#1A1002", cardNameRest: "#F5DC8C", cardSubRest: "rgba(245,220,140,0.75)", cardTagBorderRest: "rgba(245,220,140,0.18)", cardTagColorRest: "rgba(245,220,140,0.5)", weightBarBg: "rgba(245,220,140,0.15)", weightBarFill: "#B8880C", weightLabelColor: "rgba(245,220,140,0.4)", badgeColor: "#D4A820" },
        harvest: { sectionBg: "#160F02", overlayColor: "rgba(20,14,4,0.55)", headingColor: "#D4A820", subtitleColor: "rgba(212,168,32,0.55)", dividerColor: "rgba(212,168,32,0.15)", cardBg: "#1E1404", cardBgHover: "#F5DC8C", cardTextHover: "#1A1002", cardNameRest: "#F5DC8C", cardSubRest: "rgba(245,220,140,0.75)", cardTagBorderRest: "rgba(245,220,140,0.18)", cardTagColorRest: "rgba(245,220,140,0.5)", weightBarBg: "rgba(245,220,140,0.15)", weightBarFill: "#B8880C", weightLabelColor: "rgba(245,220,140,0.4)", badgeColor: "#D4A820" },
        dusk: { sectionBg: "#110B01", overlayColor: "rgba(20,14,4,0.55)", headingColor: "#D4A820", subtitleColor: "rgba(212,168,32,0.55)", dividerColor: "rgba(212,168,32,0.15)", cardBg: "#180F02", cardBgHover: "#F5DC8C", cardTextHover: "#1A1002", cardNameRest: "#F5DC8C", cardSubRest: "rgba(245,220,140,0.75)", cardTagBorderRest: "rgba(245,220,140,0.18)", cardTagColorRest: "rgba(245,220,140,0.5)", weightBarBg: "rgba(245,220,140,0.15)", weightBarFill: "#B8880C", weightLabelColor: "rgba(245,220,140,0.4)", badgeColor: "#D4A820" },
    },
};
const WINTER_CONFIG: SeasonConfig = {
    heroImage: "/images/sections/winter-hero.jpg", heroOverlay: "rgba(4, 10, 22, 0.75)",
    heroTitleColor: "rgba(190,210,240,0.92)", heroSubtitleColor: "rgba(190,210,240,0.35)",
    heroTaglineColor: "rgba(190,210,240,0.4)",
    tagline: "Hanoi in winter is a held breath —\nsteam, fog, and the warmth of a small bowl.",
    heroLabel: "in season", heroPosition: "center 42%",
    sectionThemes: {
        fog: { sectionBg: "#080F1C", overlayColor: "rgba(4,10,22,0.55)", headingColor: "#7AA8D4", subtitleColor: "rgba(122,168,212,0.55)", dividerColor: "rgba(122,168,212,0.15)", cardBg: "#0C1526", cardBgHover: "#BED2F0", cardTextHover: "#060E1E", cardNameRest: "#BED2F0", cardSubRest: "rgba(190,210,240,0.75)", cardTagBorderRest: "rgba(190,210,240,0.18)", cardTagColorRest: "rgba(190,210,240,0.5)", weightBarBg: "rgba(190,210,240,0.15)", weightBarFill: "#4A80B8", weightLabelColor: "rgba(190,210,240,0.4)", badgeColor: "#7AA8D4" },
        ember: { sectionBg: "#060C18", overlayColor: "rgba(4,10,22,0.55)", headingColor: "#7AA8D4", subtitleColor: "rgba(122,168,212,0.55)", dividerColor: "rgba(122,168,212,0.15)", cardBg: "#0A1220", cardBgHover: "#BED2F0", cardTextHover: "#060E1E", cardNameRest: "#BED2F0", cardSubRest: "rgba(190,210,240,0.75)", cardTagBorderRest: "rgba(190,210,240,0.18)", cardTagColorRest: "rgba(190,210,240,0.5)", weightBarBg: "rgba(190,210,240,0.15)", weightBarFill: "#4A80B8", weightLabelColor: "rgba(190,210,240,0.4)", badgeColor: "#7AA8D4" },
        lantern: { sectionBg: "#050A14", overlayColor: "rgba(4,10,22,0.55)", headingColor: "#7AA8D4", subtitleColor: "rgba(122,168,212,0.55)", dividerColor: "rgba(122,168,212,0.15)", cardBg: "#080F1C", cardBgHover: "#BED2F0", cardTextHover: "#060E1E", cardNameRest: "#BED2F0", cardSubRest: "rgba(190,210,240,0.75)", cardTagBorderRest: "rgba(190,210,240,0.18)", cardTagColorRest: "rgba(190,210,240,0.5)", weightBarBg: "rgba(190,210,240,0.15)", weightBarFill: "#4A80B8", weightLabelColor: "rgba(190,210,240,0.4)", badgeColor: "#7AA8D4" },
    },
};

const SEASON_CONFIGS: Record<string, SeasonConfig> = {
    summer: SUMMER_CONFIG, spring: SPRING_CONFIG, autumn: AUTUMN_CONFIG, winter: WINTER_CONFIG,
};

type SeasonSection = {
    number: string; id: string; title: string; subtitle: string;
    restaurants: string[]; vibes: Record<string, string>;
};

const SEASON_SECTIONS: Record<string, SeasonSection[]> = {
    summer: [
        { number: "01", id: "outside", title: "Where the City Spills Into the Night", subtitle: "Neon lights, street noise, and the pulse of Hanoi after dark. Places you walk into without planning — and end up staying.", restaurants: ["Miss Ha Noi", "Tonkin Express"], vibes: { "Miss Ha Noi": "MISS in neon — folk rhymes turned menus, where heritage slips into a playful, modern rhythm beside the Temple of Literature.", "Tonkin Express": "Hidden behind an old drugstore sign. A cinematic escape — cold beer, dim lights, and the quiet hum of a city that never fully sleeps." } },
        { number: "02", id: "inside", title: "A Table Hidden from the Heat", subtitle: "Cool air, green shadows, and the quiet relief of stepping away from the sun. A slower summer lived indoors.", restaurants: ["La Lot Vietnamese Cuisine & Wine", "Maii Bistro"], vibes: { "La Lot Vietnamese Cuisine & Wine": "A green sanctuary above the Old Quarter — tamarind, herbs, and soft light filtering the chaos below.", "Maii Bistro": "Like returning to a childhood home — ceiling fans, garden air, and the gentle comfort of familiar flavors reimagined." } },
        { number: "03", id: "together", title: "Meals That Turn Strangers into Friends", subtitle: "Shared plates, clinking glasses, and conversations that stretch into the night. A summer made for staying longer.", restaurants: ["Cultra Taproom", "Zao Eatery"], vibes: { "Cultra Taproom": "A living museum where old bricks meet new energy — kombucha flows, laughter spreads, and the communal mat becomes a social ritual.", "Zao Eatery": "A lively intersection of flavors and people — where seafood, herbs, and shared stories blur the line between strangers and friends." } },
    ],
    spring: [
        { number: "01", id: "bloom", title: "Where the Season Gently Wakes", subtitle: "A quiet unfolding — light, herbs, and the first warmth after winter. Meals that feel like the beginning of something new.", restaurants: ["GIA"], vibes: { "GIA": "A luminous awakening inside a century-old home — where forest ingredients, memory, and precision come together in a refined seasonal dialogue." } },
        { number: "02", id: "petal", title: "Eating Close to the Earth", subtitle: "Fresh harvests, garden air, and ingredients still carrying the breath of the soil. A spring rooted in nature.", restaurants: ["Lamai Garden", "A Ban Mountain Dew"], vibes: { "Lamai Garden": "From garden to table — herbs picked during service, vegetables at their peak, and a quiet connection to the land in every dish.", "A Ban Mountain Dew": "A journey to the highlands — where wild herbs, mountain spices, and early harvests bring the spirit of spring into the city." } },
        { number: "03", id: "morning", title: "Mornings That Feel Like a Beginning", subtitle: "Soft light, warm rice, and familiar flavors. The kind of meal that grounds you before the day begins.", restaurants: ["Tam Vi"], vibes: { "Tam Vi": "A Northern home preserved in time — where simple dishes, shared quietly, carry the depth of memory and everyday care." } },
    ],
    autumn: [
        { number: "01", id: "golden", title: "In the Season of Quiet Light", subtitle: "Golden hours, open windows, and meals that unfold slowly — like the city itself in autumn.", restaurants: ["Vien Dining"], vibes: { "Vien Dining": "A poetic tasting journey — where each dish traces the cycle of the land, moving gently from light to depth." } },
        { number: "02", id: "harvest", title: "A Slower Kind of Nourishment", subtitle: "Earthy tones, soft textures, and food that feels both grounding and calm. A season to eat with intention.", restaurants: ["Co Dam"], vibes: { "Co Dam": "A quiet, plant-based sanctuary — where vegetables, spices, and texture come together in a deeply balanced, meditative experience." } },
        { number: "03", id: "dusk", title: "When the Evening Stays a Little Longer", subtitle: "Fading light, lingering conversations, and meals that stretch beyond time. Autumn at its most reflective.", restaurants: ["GIA"], vibes: { "GIA": "In the evening, the space becomes more intimate — each course unfolding like a quiet conversation between memory, season, and craft." } },
    ],
    winter: [
        { number: "01", id: "fog", title: "Where Warmth Cuts Through the Cold", subtitle: "Steam rising, spices hitting, and the first bite that melts the winter air away.", restaurants: ["Toi Ot (Garlic & Chili)"], vibes: { "Toi Ot (Garlic & Chili)": "Garlic and chili in full force — bold, fragrant, and warming. A place where every bite feels like a spark in the cold." } },
        { number: "02", id: "ember", title: "Gathered Around the Steam", subtitle: "Hot pots, shared tables, and conversations circling warmth. Winter as a communal ritual.", restaurants: ["Dung - Dip and Roll"], vibes: { "Dung - Dip and Roll": "A gentle, rhythmic ritual of dipping and sharing — where fruit-based broths and rising steam bring people closer together." } },
        { number: "03", id: "lantern", title: "At Tables That Feel Like Home", subtitle: "Soft light, quiet rooms, and meals that linger — not for hunger, but for connection.", restaurants: ["Cui Restaurant", "T.U.N.G Dining"], vibes: { "Cui Restaurant": "Warm, intimate, and grounded — where Southern flavors and soft lighting create a slow, emotional dining experience.", "T.U.N.G Dining": "Refined yet comforting — a quiet space where modern Vietnamese cuisine unfolds with warmth and intention." } },
    ],
};

type QuizQuestion = { question: string; options: { label: string; value: string }[] };
const SEASON_QUIZZES: Record<string, QuizQuestion[]> = {
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

// ─── FlavorQuiz ───────────────────────────────────────────────────────────────
function FlavorQuiz({ questions, onResult, onSkip, accentColor, bgColor, onBack }: {
    questions: QuizQuestion[]; onResult: (section: string) => void; onSkip: () => void;
    accentColor: string; bgColor: string; onBack: () => void;
}) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [revealing, setRevealing] = useState(false);

    const handleNext = () => {
        if (!selected) return;
        const newAnswers = [...answers, selected];
        if (step < questions.length - 1) {
            setAnswers(newAnswers); setSelected(null); setStep(step + 1);
        } else {
            const tally: Record<string, number> = {};
            newAnswers.forEach((a) => { tally[a] = (tally[a] ?? 0) + 1; });
            const result = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
            setRevealing(true);
            // Show "Finding your season..." for 1.4s before transitioning
            setTimeout(() => onResult(result), 1400);
        }
    };

    const q = questions[step];
    return (
        <div style={{ minHeight: "100vh", background: bgColor, display: "flex", flexDirection: "column" as const }}>
            <div style={{ padding: "43px 43px 0" }}>
                <button onClick={onBack} style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 19, color: "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
                    ← Back to Map
                </button>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px 60px" }}>
                <AnimatePresence mode="wait">
                    {!revealing ? (
                        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", maxWidth: 520, textAlign: "center" as const }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                                {questions.map((_, i) => (
                                    <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 3, background: i <= step ? accentColor : "rgba(255,255,255,0.12)", transition: "all 0.3s ease" }} />
                                ))}
                            </div>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>{`0${step + 1} / 0${questions.length}`}</p>
                            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.88)", margin: "0 0 40px", lineHeight: 1.3 }}>{q.question}</h2>
                            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 40 }}>
                                {q.options.map((opt) => {
                                    const isSel = selected === opt.value;
                                    return (
                                        <motion.button key={opt.value} whileTap={{ scale: 0.98 }} onClick={() => setSelected(opt.value)} style={{ background: isSel ? `${accentColor}30` : "rgba(255,255,255,0.04)", border: `1px solid ${isSel ? accentColor : "rgba(255,255,255,0.1)"}`, padding: "18px 28px", fontFamily: "var(--font-body)", fontSize: 16, color: isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.02em", textAlign: "left" as const }}>
                                            {opt.label}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button onClick={onSkip} style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 15, letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)", cursor: "pointer", padding: 0 }}>Skip →</button>
                                <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext} style={{ background: selected ? `${accentColor}cc` : "rgba(255,255,255,0.06)", border: `1px solid ${selected ? accentColor : "rgba(255,255,255,0.1)"}`, padding: "12px 32px", fontFamily: "var(--font-body)", fontSize: 15, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: selected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.2)", cursor: selected ? "pointer" : "default", transition: "all 0.25s ease" }}>
                                    {step < questions.length - 1 ? "Next" : "See my season"}
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        // ── "Finding your season..." ──────────────────────────
                        <motion.div key="reveal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} style={{ textAlign: "center" as const }}>
                            <motion.p
                                style={{ fontFamily: "var(--font-title)", fontSize: 40, fontStyle: "italic", color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}
                                animate={{ opacity: [0.55, 1, 0.55] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Finding your season...
                            </motion.p>
                            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                                {[0, 1, 2].map((i) => (
                                    <motion.div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor }}
                                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── FoodWeightBar ────────────────────────────────────────────────────────────
function FoodWeightBar({ weight, theme, hovered }: { weight: string; theme: SectionTheme; hovered: boolean }) {
    const lower = weight.toLowerCase();
    let fill = 0.5;
    if (lower.includes("light to medium")) fill = 0.35;
    else if (lower.includes("medium to") || lower.includes("medium-heavy")) fill = 0.72;
    else if (lower.includes("light")) fill = 0.2;
    else if (lower.includes("medium")) fill = 0.5;
    else if (lower.includes("heavy")) fill = 0.85;
    const label = weight.split(".")[0].replace("Overall weight:", "").trim();
    const labelColor = hovered ? `${theme.cardTextHover}88` : theme.weightLabelColor;
    const barBg = hovered ? `${theme.cardTextHover}18` : theme.weightBarBg;
    const barFill = hovered ? `${theme.cardTextHover}55` : theme.weightBarFill;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: labelColor, flexShrink: 0, transition: "color 0.3s ease" }}>food weight</span>
            <div style={{ flex: 1, height: 1, background: barBg, position: "relative" as const, maxWidth: 120, transition: "background 0.3s ease" }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${fill * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} style={{ position: "absolute" as const, top: 0, left: 0, bottom: 0, background: barFill, transition: "background 0.3s ease" }} />
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: labelColor, flexShrink: 0, transition: "color 0.3s ease" }}>{label || "Medium"}</span>
        </div>
    );
}

// ─── RestaurantCard ───────────────────────────────────────────────────────────
function RestaurantCard({ place, vibe, onNavigate, delay, theme }: {
    place: PlaceListItem; vibe: string; onNavigate: () => void; delay: number; theme: SectionTheme;
}) {
    const [hovered, setHovered] = useState(false);
    const mapsQuery = [place.brandName, place.address].filter(Boolean).join(", ");
    const mapsUrl = mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}` : null;
    const igHandle = place.socialMedia?.replace(/^@/, "").trim();
    const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{ background: hovered ? theme.cardBgHover : theme.cardBg, cursor: "pointer", transition: "all 0.3s ease", boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.35)" : "0 6px 24px rgba(0,0,0,0.25)", overflow: "hidden", display: "flex", flexDirection: "column" as const }}
        >
            <div onClick={onNavigate} style={{ width: "100%", height: 200, overflow: "hidden", background: `${theme.cardBg}cc` }}>
                {place.imageUrl
                    ? <img src={`http://localhost:5065${place.imageUrl}`} alt={place.brandName} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease, filter 0.3s ease", transform: hovered ? "scale(1.05)" : "scale(1)", filter: hovered ? "brightness(1.05)" : "brightness(0.9)" }} />
                    : <div style={{ width: "100%", height: "100%" }} />
                }
            </div>
            <div onClick={onNavigate} style={{ padding: "24px 28px 16px" }}>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: 23, fontStyle: "italic", margin: "0 0 10px", color: hovered ? theme.cardTextHover : theme.cardNameRest, transition: "color 0.3s ease" }}>{place.brandName}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.75, margin: 0, color: hovered ? `${theme.cardTextHover}bb` : theme.cardSubRest, transition: "color 0.3s ease", fontFamily: "var(--font-body)" }}>{vibe}</p>
                <FoodWeightBar weight={place.foodWeight ?? place.cuisineType} theme={theme} hovered={hovered} />
            </div>
            <div style={{ padding: "12px 28px 20px", borderTop: `1px solid ${hovered ? `${theme.cardTextHover}18` : "rgba(255,255,255,0.06)"}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, transition: "border-color 0.3s ease" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                        <span style={{ fontFamily: "var(--font-title)", fontSize: 26, lineHeight: 1, color: hovered ? theme.cardTextHover : theme.badgeColor, transition: "color 0.3s ease" }}>{place.personalRating}</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: hovered ? `${theme.cardTextHover}66` : theme.weightLabelColor, transition: "color 0.3s ease" }}>/ 10</span>
                    </div>
                    {mapsUrl && (
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: hovered ? `${theme.cardTextHover}88` : theme.weightLabelColor, textDecoration: "none", transition: "color 0.3s ease", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                            📍 {place.address}
                        </a>
                    )}
                </div>
                {igUrl && (
                    <a href={igUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${hovered ? `${theme.cardTextHover}40` : "rgba(255,255,255,0.15)"}`, color: hovered ? theme.cardTextHover : theme.weightLabelColor, textDecoration: "none", transition: "all 0.2s ease" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                )}
            </div>
        </motion.div>
    );
}

// ─── SeasonSectionBlock ───────────────────────────────────────────────────────
// KEY FIX: dim effect = position:absolute overlay div (not opacity on the section)
// → persists through scroll, doesn't affect section layout or card interactions
function SeasonSectionBlock({ section, places, onNavigate, highlighted, dimmed, config }: {
    section: SeasonSection; places: PlaceListItem[]; onNavigate: (id: number) => void;
    highlighted: boolean; dimmed: boolean; config: SeasonConfig;
}) {
    const theme = config.sectionThemes[section.id];
    if (!theme) return null;
    const sectionPlaces = places.filter(p => p.seasonSection === section.id);

    return (
        <div id={`section-${section.id}`} style={{ position: "relative", overflow: "hidden", background: theme.sectionBg }}>

            {/* ── DIM OVERLAY — absolute, pointer-events none ──────────── */}
            <AnimatePresence>
                {dimmed && (
                    <motion.div
                        key="dim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: "absolute", inset: 0,
                            background: "rgba(0,0,0,0.60)",
                            zIndex: 10,
                            pointerEvents: "none",   // let scroll pass through
                        }}
                    />
                )}
            </AnimatePresence>

            {/* ── YOUR SEASON banner — top-center, full-width strip ─────── */}
            <AnimatePresence>
                {highlighted && (
                    <motion.div
                        key="badge"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            zIndex: 20,
                            display: "flex", justifyContent: "center",
                            pointerEvents: "none",
                        }}
                    >
                        <div style={{
                            background: theme.badgeColor,
                            color: "#fff",
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            letterSpacing: "0.32em",
                            textTransform: "uppercase" as const,
                            padding: "11px 36px",
                        }}>
                            ✦&nbsp;&nbsp;your season&nbsp;&nbsp;✦
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Content ───────────────────────────────────────────────── */}
            <div style={{ position: "relative", zIndex: 2, padding: "64px 64px 72px" }}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 10 }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(245,236,216,0.4)", letterSpacing: "0.1em" }}>{section.number}</span>
                        <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, fontStyle: "italic", margin: 0, color: "#F5ECD8" }}>{section.title}</h2>
                    </div>
                    <div style={{ height: 0.5, background: "rgba(245,236,216,0.12)", marginBottom: 16 }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "#F5ECD8", margin: 0, maxWidth: 520, fontStyle: "italic" }}>{section.subtitle}</p>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {sectionPlaces.map((place, ri) => (
                        <RestaurantCard key={place.id} place={place} vibe={place.vibe ?? ""} onNavigate={() => onNavigate(place.id)} delay={ri * 0.12} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── SeasonLayout ─────────────────────────────────────────────────────────────
function SeasonLayout({ seasonName, places, onNavigate, showBack, highlightedSection, onBack }: {
    seasonName: string; places: PlaceListItem[]; onNavigate: (id: number) => void;
    showBack: boolean; highlightedSection: string | null; onBack: () => void;
}) {
    const config = SEASON_CONFIGS[seasonName];
    const sections = SEASON_SECTIONS[seasonName] ?? [];
    if (!config) return null;

    return (
        <div className="summer-layout" style={{ width: "100%" }}>
            <AnimatePresence>
                {showBack && (
                    <motion.button className="back-btn back-btn--summer" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onClick={onBack}>
                        ← Back to Map
                    </motion.button>
                )}
            </AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ backgroundImage: `url('${config.heroImage}')`, backgroundSize: "cover", backgroundPosition: config.heroPosition || "center", padding: "60px 64px 48px", position: "relative" as const, minHeight: 280, display: "flex", alignItems: "flex-end" }}>
                    <div style={{ position: "absolute" as const, inset: 0, background: config.heroOverlay, zIndex: 0 }} />
                    <div style={{ position: "relative" as const, zIndex: 1, width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: config.heroSubtitleColor, marginBottom: 6 }}>{config.heroLabel}</div>
                                <h1 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(57px, 7vw, 90px)", fontWeight: 400, color: config.heroTitleColor, margin: 0, lineHeight: 1, textTransform: "capitalize" as const }}>{seasonName.charAt(0).toUpperCase() + seasonName.slice(1)}</h1>
                            </div>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8, color: config.heroTaglineColor, maxWidth: 260, textAlign: "right" as const, margin: 0, fontStyle: "italic", whiteSpace: "pre-line" as const }}>{config.tagline}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div style={{ width: "100%" }}>
                {sections.map((section) => (
                    <SeasonSectionBlock key={section.id} section={section} places={places} onNavigate={onNavigate}
                        highlighted={highlightedSection === section.id}
                        dimmed={highlightedSection !== null && highlightedSection !== section.id}
                        config={config}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SeasonPage() {
    const { seasonName } = useParams();
    const nav = useNavigate();
    const [places, setPlaces] = useState<PlaceListItem[]>([]);
    const [stage, setStage] = useState<Stage>("intro");
    const [showBack, setShowBack] = useState(true);
    const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
    const lastScrollY = useRef(0);
    const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const EDITORIAL_SEASONS = ["summer", "spring", "autumn", "winter"];
    const isEditorial = EDITORIAL_SEASONS.includes(seasonName ?? "");

    useEffect(() => {
        if (!seasonName) return;
        api<PlaceListItem[]>(`/api/places?season=${seasonName}`).then(setPlaces).catch(console.error);
    }, [seasonName]);

    useEffect(() => {
        const timer = setTimeout(() => { setStage(isEditorial ? "quiz" : "list"); }, 1000);
        return () => clearTimeout(timer);
    }, [seasonName, isEditorial]);

    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;
            setShowBack(current < 80 || current < lastScrollY.current);
            lastScrollY.current = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        return () => { if (clearTimer.current) clearTimeout(clearTimer.current); };
    }, []);

    const handleQuizResult = useCallback((section: string) => {
        // Step 1: switch view + set highlight
        setStage("list");
        setHighlightedSection(section);

        // Step 2: after React paints the list, scroll to section
        setTimeout(() => {
            const el = document.getElementById(`section-${section}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

            // Step 3: hold dim+badge for 5s AFTER scroll lands (~700ms)
            //         total = 700ms scroll + 5000ms hold → clear at 5700ms
            if (clearTimer.current) clearTimeout(clearTimer.current);
            clearTimer.current = setTimeout(() => {
                setHighlightedSection(null);
            }, 5700);
        }, 80);
    }, []);

    const quizQuestions = SEASON_QUIZZES[seasonName ?? ""] ?? SEASON_QUIZZES.summer;
    const config = SEASON_CONFIGS[seasonName ?? ""] ?? SUMMER_CONFIG;
    const firstTheme = Object.values(config.sectionThemes)[0];
    const quizAccentColor = firstTheme?.headingColor ?? "#A31621";
    const quizBg = seasonName === "summer" ? "#2B0A0D" : firstTheme?.sectionBg ?? "#261A0F";

    return (
        <motion.div key={seasonName} className={`season-page ${seasonName}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} style={{ width: "100%", overflowX: "hidden" }}>
            <div className="season-inner" style={{ width: "100%" }}>
                <div className="grain-overlay" />
                <AnimatePresence mode="wait">
                    {stage === "intro" && (
                        <motion.div key="intro" className="season-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.h1 initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>{seasonName?.toUpperCase()}</motion.h1>
                        </motion.div>
                    )}
                    {stage === "quiz" && (
                        <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                            <FlavorQuiz questions={quizQuestions} onResult={handleQuizResult} onSkip={() => setStage("list")} accentColor={quizAccentColor} bgColor={quizBg} onBack={() => nav("/map")} />
                        </motion.div>
                    )}
                    {stage === "list" && (
                        <motion.div key="list" className="season-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: "100%" }}>
                            {isEditorial && places.length > 0 && (
                                <SeasonLayout seasonName={seasonName!} places={places} onNavigate={(id) => nav(`/places/${id}`)} showBack={showBack} highlightedSection={highlightedSection} onBack={() => nav("/map")} />
                            )}
                            {!isEditorial && (
                                <button className="back-btn" onClick={() => nav("/map")} style={{ opacity: showBack ? 1 : 0 }}>← Back to Map</button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}