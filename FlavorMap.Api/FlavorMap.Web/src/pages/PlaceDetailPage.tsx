// PlaceDetailPage.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { api } from "../api";
import type { PlaceDetail } from "../types";
import type { PlaceListItem } from "../types";
import { detailPageVariants } from "../pageTransitions";

const SEASON_COLORS: Record<string, { bg: string; text: string; accent: string; dark: string }> = {
    spring: { bg: "#0B1A0F", text: "#D2E8C8", accent: "#8EC97A", dark: "#162510" },
    summer: { bg: "#2B0A0D", text: "#F5ECD8", accent: "#A31621", dark: "#3A0D11" },
    autumn: { bg: "#1A1204", text: "#F5DC8C", accent: "#D4A820", dark: "#261A04" },
    winter: { bg: "#060E1A", text: "#BED2F0", accent: "#7AA8D4", dark: "#0C1526" },
};
const DEFAULT_SEASON = { bg: "#2B0A0D", text: "#F5ECD8", accent: "#A31621", dark: "#3A0D11" };

const RATING_LABELS: Record<number, string> = {
    10: "Extraordinary", 9: "Exceptional", 8: "Highly recommended",
    7: "Very good", 6: "Good", 5: "Average",
    4: "Below average", 3: "Disappointing", 2: "Poor", 1: "Unacceptable",
};

// ─── Types ──────────────────────────────────────────────────────────────────
type Review = { id: number; nickname: string; rating: number; description: string; createdAt: string };

// ─── Scroll reveal ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }: {
    children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
    const initial = direction === "up" ? { opacity: 0, y: 50 }
        : direction === "left" ? { opacity: 0, x: -50 } : { opacity: 0, x: 50 };
    return (
        <motion.div ref={ref} initial={initial}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    );
}

// ─── Story section ───────────────────────────────────────────────────────────
function StorySection({ title, text, imageUrl, imageAlt, reverse = false, accent }: {
    title: string; text: string; imageUrl?: string;
    imageAlt?: string; reverse?: boolean; accent: string;
}) {
    const apiBase = import.meta.env.VITE_API_BASE;
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: imageUrl ? "1fr 1fr" : "1fr",
            minHeight: "100vh",
            direction: reverse ? "rtl" : "ltr",
        }}>
            <Reveal direction={reverse ? "right" : "left"}>
                <div style={{
                    direction: "ltr",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px 72px",
                }}>
                    {/* Title — màu be, in hoa, in đậm */}
                    <div style={{
                        fontSize: 17,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 24,
                        fontFamily: "var(--font-body)",
                        color: "#F5ECD8",
                    }}>
                        {title}
                    </div>

                    {/* Body text — màu be, tất cả mùa */}
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        lineHeight: 1.95,
                        color: "rgba(245, 236, 216, 0.82)",
                        margin: 0,
                        whiteSpace: "pre-line",
                      
                    }}>
                        {text}
                    </p>

                    {/* Divider line — accent color của mùa */}
                    <div style={{
                        marginTop: 40,
                        width: 40,
                        height: 1,
                        background: accent,
                        opacity: 0.6,
                    }} />
                </div>
            </Reveal>

            {imageUrl && (
                <Reveal direction={reverse ? "left" : "right"}>
                    <div style={{
                        direction: "ltr",
                        height: "100vh",
                        minHeight: "100vh",
                        overflow: "hidden",
                    }}>
                        <motion.img
                            src={`${apiBase}${imageUrl}`}
                            alt={imageAlt ?? title}
                            whileInView={{ scale: 1 }}
                            initial={{ scale: 1.06 }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            style={{
                                width: "100%", height: "100%",
                                objectFit: "cover", display: "block",
                                objectPosition: "center center",
                            }}
                        />
                    </div>
                </Reveal>
            )}
        </div>
    );
}

// ─── Field label ─────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
    return <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.45, marginBottom: 8, fontFamily: "var(--font-body)", color: "#1f1f1f" }}>{children}</div>;
}

// ─── Review card ─────────────────────────────────────────────────────────────
function ReviewCard({ review, accent }: { review: Review; accent: string }) {
    const date = new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return (
        <motion.div

            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: "28px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#1f1f1f", marginBottom: 4 }}>{review.nickname}</div>
                    <div style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}>{date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: "var(--font-title)", fontSize: 32, color: accent, lineHeight: 1 }}>{review.rating}</span>
                    <span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-body)" }}>/10</span>
                </div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8, color: "rgba(0,0,0,0.6)", margin: 0 }}>{review.description}</p>
        </motion.div>
    );
}

function RelatedRestaurantsEditorial({
    season,
    accent,
    currentId,        
}: {
    season: string;
    accent: string;
    currentId: number; 
}) {
    const [places, setPlaces] = useState<PlaceListItem[]>([]);
    const apiBase = import.meta.env.VITE_API_BASE;

    useEffect(() => {
        fetch(`${apiBase}/api/places?season=${season}`)
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const others = data.filter((p: PlaceListItem) => p.id !== currentId);
                    // Shuffle random
                    const shuffled = others.sort(() => Math.random() - 0.5);
                    setPlaces(shuffled.slice(0, 3));
                }
            })
            .catch(() => setPlaces([]));
    }, [season]);

    if (places.length === 0) return null;

    return (
        <div
            style={{
                padding: "80px 60px",
                background: "#F5ECD8", 
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* HEADER */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 48,
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 20,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#1f1f1f",
                            margin: 0,
                        }}
                    >
                        Season’s Restaurants
                    </h2>

                    <a
                        href={`/season/${season}`}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: accent,
                            textDecoration: "none",
                        }}
                    >
                        Discover more ↗
                    </a>
                </div>

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 32,
                    }}
                >
                    {places.map((p) => (
                        <div key={p.id}>
                           
                            <a
                                href={`/places/${p.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {/* IMAGE */}
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4/3",
                                        overflow: "hidden",
                                        marginBottom: 18,
                                    }}
                                >
                                    <img
                                        src={`${apiBase}${p.imageUrl}`}
                                        alt={p.brandName}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>

                                {/* NAME */}
                                <h3
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        margin: "0 0 8px",
                                        color: "#1f1f1f",
                                    }}
                                >
                                    {p.brandName}
                                </h3>

                                {/* SUB */}
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "rgba(0,0,0,0.5)",
                                        lineHeight: 1.6,
                                        margin: 0,
                                    }}
                                >
                                    {p.cuisineType}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PlaceDetailPage() {
    const { id } = useParams();
    const [place, setPlace] = useState<PlaceDetail | null>(null);
    const [err, setErr] = useState("");

    // Submit form state
    const [nickname, setNickname] = useState("");
    const [rating, setRating] = useState(8);
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitErr, setSubmitErr] = useState("");

    // Reviews from other users
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        api<PlaceDetail>(`/api/places/${id}`).then(setPlace).catch((e) => setErr(String(e)));
    }, [id]);

    // Fetch existing reviews
    useEffect(() => {
        if (!id) return;
        const apiBase = import.meta.env.VITE_API_BASE;
        fetch(`${apiBase}/api/places/${id}/reviews`)
            .then((r) => r.json())
            .then((data) => setReviews(Array.isArray(data) ? data : []))
            .catch(() => setReviews([]));
    }, [id, submitted]);

    if (err) return <div style={{ padding: 40 }}>Error: {err}</div>;
    if (!place) return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: 40, color: "#999" }}>Loading...</motion.div>;

    const season = SEASON_COLORS[place.season.toLowerCase()] ?? DEFAULT_SEASON;
    const apiBase = import.meta.env.VITE_API_BASE;

    const handleSubmit = async () => {
        if (!nickname.trim() || !description.trim()) {
            setSubmitErr("Please fill in your name and experience.");
            return;
        }
        setSubmitting(true); setSubmitErr("");
        try {
            await fetch(`${apiBase}/api/places/${id}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nickname, rating, description, season: place.season }),
            });
            setSubmitted(true);
            setNickname(""); setDescription(""); setRating(8);
        } catch { setSubmitErr("Something went wrong. Please try again."); }
        finally { setSubmitting(false); }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "12px 0", background: "transparent",
        border: "none", borderBottom: "1px solid rgba(0,0,0,0.2)",
        fontFamily: "var(--font-body)", fontSize: 14, color: "#1f1f1f", outline: "none",
    };

    return (
        <motion.div variants={detailPageVariants} initial="initial" animate="animate" exit="exit" style={{ background: season.bg, minHeight: "100vh" }}>

            {/* ── HERO ──────────────────────────────────────────────────── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
                <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <img src={`${apiBase}${place.imageUrl}`} alt={place.brandName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 72px 80px", background: season.dark }}>
                    <div style={{ display: "inline-flex", alignSelf: "flex-start", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 40, background: season.accent, color: "#fff", fontFamily: "var(--font-body)", marginBottom: 40 }}>{place.season}</div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: "var(--font-title)", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 24px", color: "#fff", letterSpacing: "-0.01em" }}>{place.brandName}</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", maxWidth: 380, margin: "0 0 48px" }}>{place.diningMoodExperience?.split(".")[0]}.</motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 32 }}>
                        {[
                            { label: "Cuisine", value: place.cuisineType },
                            { label: "Address", value: place.address },
                            { label: "Contact", value: place.contact },
                            { label: "Format", value: place.diningFormat },
                            ...(place.socialMedia ? [{ label: "Social", value: place.socialMedia }] : []),
                        ].map(({ label, value }) => (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", gap: 16 }}>
                                <span style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{label}</span>
                                <span style={{ fontSize: 15, whiteSpace: "pre-line", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", textAlign: "right" }}>{value}</span>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} style={{ marginTop: 40, display: "flex", gap: 12 }}>
                        <Link to={`/season/${place.season}`} style={{ flex: 1 }}>
                            <motion.div whileHover={{ background: season.accent }} transition={{ duration: 0.2 }} style={{ padding: "12px 20px", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", fontFamily: "var(--font-body)", cursor: "pointer" }}>← {place.season}</motion.div>
                        </Link>
                        <Link to="/map" style={{ flex: 1 }}>
                            <motion.div whileHover={{ background: "rgba(255,255,255,0.2)" }} transition={{ duration: 0.2 }} style={{ padding: "12px 20px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", fontFamily: "var(--font-body)", cursor: "pointer" }}>Map</motion.div>
                        </Link>
                    </motion.div>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ marginTop: 60, display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.3)" }}>
                        <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.3)" }} />
                        <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── STORY SECTIONS ───────────────────────────────────────── */}
            <div>
                <StorySection title="Menu & Ingredient Seasonality" text={place.menuSeasonality} imageUrl={place.menuImage} imageAlt="Menu" reverse={false} accent={season.accent}  />
                <div style={{ height: 2, background: "rgba(0,0,0,0.06)" }} />
                <StorySection title="Dining Mood / Experience" text={place.diningMoodExperience} imageUrl={place.moodImage} imageAlt="Dining mood" reverse={true} accent={season.accent}  />
                <div style={{ height: 2, background: "rgba(0,0,0,0.06)" }} />
                <StorySection title="Food Weight" text={place.foodWeight} imageUrl={place.weightImage} imageAlt="Food weight" reverse={false} accent={season.accent}  />
                <div style={{ height: 2, background: "rgba(0,0,0,0.06)" }} />
                <StorySection title="Cultural Narratives" text={place.culturalNarratives} imageUrl={place.cultureImage} imageAlt="Cultural narratives" reverse={true} accent={season.accent}  />
            </div>

            {/* ── RATING + SUBMIT + REVIEWS ─────────────────────────────── */}
            <div style={{ background: "#F5ECD8", color: "#1f1f1f" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 80,
                        paddingTop: 120,
                        paddingLeft: 80,
                        paddingRight: 80,
                        paddingBottom: 40,
                        alignItems: "start",
                    }}
                >
                    {/* ─── LEFT: MY RATING ───────────────────────── */}
                    <Reveal>
                        <div
                            style={{
                                paddingRight: 40,
                               
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 15,
                                    letterSpacing: "0.3em",
                                    textTransform: "uppercase",
                                    opacity: 0.4,
                                    marginBottom: 10,
                                    fontFamily: "var(--font-body)",
                                    color: "#1f1f1f",
                                }}
                            >
                                My Rating
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                                <span
                                    style={{
                                        fontFamily: "var(--font-title)",
                                        fontSize: "clamp(80px, 12vw, 140px)",
                                        fontWeight: 400,
                                        lineHeight: 1,
                                        color: season.accent,
                                        flexShrink: 0,
                                    }}
                                >
                                    {place.personalRating}
                                </span>

                                <div
                                    style={{
                                        width: 1,
                                        height: 80,
                                        background: "rgba(0,0,0,0.12)",
                                        flexShrink: 0,
                                    }}
                                />

                                <div>
                                    <div
                                        style={{
                                            fontSize: 16,
                                            opacity: 0.35,
                                            marginBottom: 8,
                                            fontFamily: "var(--font-body)",
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        / 10
                                    </div>

                                    <div
                                        style={{
                                            fontFamily: "var(--font-title)",
                                            fontSize: 28,
                                            fontWeight: 400,
                                            fontStyle: "italic",
                                            color: season.accent,
                                            marginBottom: 12,
                                        }}
                                    >
                                        {RATING_LABELS[Math.round(place.personalRating)] ??
                                            "Recommended"}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 16,
                                            opacity: 0.5,
                                            fontFamily: "var(--font-body)",
                                            lineHeight: 1.7,
                                            maxWidth: 300,
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        My personal curation based on flavor profile, seasonal
                                        alignment, and dining experience.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* ─── RIGHT: SHARE EXPERIENCE ───────────────── */}
                    <Reveal delay={0.1}>
                        <div style={{ paddingLeft: 20 }}>
                            <p
                                style={{
                                    fontFamily: "var(--font-title)",
                                    fontSize: 30,
                                    fontWeight: 400,
                                    fontStyle: "italic",
                                    lineHeight: 1.3,
                                    margin: "0 0 48px",
                                    color: "rgba(0,0,0,0.55)",
                                }}
                            >
                                Share your taste journey here and help others discover new
                                flavors on the map.
                            </p>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "var(--font-title)",
                                            fontSize: 36,
                                            marginBottom: 12,
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        Thank you.
                                    </div>

                                    <div
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: 15,
                                            opacity: 0.5,
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        Your experience has been added to the map.
                                    </div>

                                    <button
                                        onClick={() => setSubmitted(false)}
                                        style={{
                                            marginTop: 24,
                                            fontFamily: "var(--font-body)",
                                            fontSize: 15,
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase",
                                            opacity: 0.4,
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        Share another →
                                    </button>
                                </motion.div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 36,
                                    }}
                                >
                                    <div>
                                        <FieldLabel>Your Name</FieldLabel>
                                        <input
                                            type="text"
                                            value={nickname}
                                            onChange={(e) =>
                                                setNickname(e.target.value)
                                            }
                                            placeholder="How would you like to be known?"
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel>Your Rating</FieldLabel>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 20,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: "var(--font-title)",
                                                    fontSize: 52,
                                                    fontWeight: 400,
                                                    lineHeight: 1,
                                                    color: season.accent,
                                                    flexShrink: 0,
                                                    minWidth: 52,
                                                }}
                                            >
                                                {rating}
                                            </span>

                                            <div style={{ flex: 1 }}>
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        accentColor: season.accent,
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        fontSize: 20,
                                                        fontFamily: "var(--font-body)",
                                                        fontStyle: "italic",
                                                        opacity: 0.45,
                                                        marginTop: 6,
                                                        color: "#1f1f1f",
                                                    }}
                                                >
                                                    {RATING_LABELS[rating]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <FieldLabel>Your Experience</FieldLabel>
                                        <textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="Describe what made this meal memorable..."
                                            rows={5}
                                            style={{
                                                ...inputStyle,
                                                borderBottom: "none",
                                                border: "1px solid rgba(0,0,0,0.15)",
                                                padding: "14px",
                                                resize: "none",
                                                lineHeight: 1.75,
                                            }}
                                        />
                                    </div>

                                    {submitErr && (
                                        <div style={{ fontSize: 18, color: "#B85C38" }}>
                                            {submitErr}
                                        </div>
                                    )}

                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        whileHover={{
                                            backgroundColor: season.accent,
                                            color: "#fff",
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            padding: "14px 40px",
                                            background: "#1f1f1f",
                                            color: "#fff",
                                            fontSize: 13,
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            fontFamily: "var(--font-body)",
                                            cursor: submitting
                                                ? "not-allowed"
                                                : "pointer",
                                            opacity: submitting ? 0.5 : 1,
                                            alignSelf: "flex-start",
                                            border: "none",
                                        }}
                                    >
                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Experience"}
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>

                {/* Community reviews */}
                {reviews.length > 0 && (
                    <Reveal delay={0.15}>
                        <div
                            style={{
                                marginTop: 40,
                                paddingTop: 0,

                                
                                maxWidth: 520,
                                marginLeft: 80, 
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    marginBottom: 48,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 15,
                                        letterSpacing: "0.3em",
                                        textTransform: "uppercase",
                                        opacity: 0.4,
                                        marginBottom: 12,
                                        fontFamily: "var(--font-body)",
                                        color: "#1f1f1f",
                                    }}
                                >
                                    From the community
                                </div>

                                <h3
                                    style={{
                                        fontFamily: "var(--font-title)",
                                        fontSize: "clamp(28px, 2.5vw, 36px)", 
                                        fontWeight: 400,
                                        fontStyle: "italic",
                                        margin: 0,
                                        color: "#1f1f1f",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    What others are saying
                                </h3>

                                <div
                                    style={{
                                        marginTop: 10,
                                        fontFamily: "var(--font-body)",
                                        fontSize: 13,
                                        opacity: 0.35,
                                        color: "#1f1f1f",
                                    }}
                                >
                                    {reviews.length}{" "}
                                    {reviews.length === 1 ? "review" : "reviews"}
                                </div>
                            </div>

                            {/* List */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                                {reviews.map((r) => (
                                    <ReviewCard
                                        key={r.id}
                                        review={r}
                                        accent={season.accent}
                                    />
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
                </div>
            

            {/* ── RELATED POSTS ─────────────────────────────────────────── */}
            <RelatedRestaurantsEditorial
                season={place?.season ?? "summer"}
                accent={season.accent}
                currentId={place.id}
            />
        </motion.div>
    );
}