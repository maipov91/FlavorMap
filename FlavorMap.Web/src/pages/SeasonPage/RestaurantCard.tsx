// RestaurantCard.tsx
// ✅ FIX: dùng VITE_API_BASE thay vì hardcode localhost:5065
import { useState } from "react";
import { motion } from "framer-motion";
import type { PlaceListItem } from "../../types";
import type { SectionTheme } from "./data/configs";

// ── FoodWeightBar ──────────────────────────────────────────────────────────────
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
            <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: labelColor, flexShrink: 0, transition: "color 0.3s ease" }}>
                food weight
            </span>
            <div style={{ flex: 1, height: 1, background: barBg, position: "relative", maxWidth: 120, transition: "background 0.3s ease" }}>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${fill * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    style={{ position: "absolute", top: 0, left: 0, bottom: 0, background: barFill, transition: "background 0.3s ease" }}
                />
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: labelColor, flexShrink: 0, transition: "color 0.3s ease" }}>
                {label || "Medium"}
            </span>
        </div>
    );
}

// ── RestaurantCard ──────────────────────────────────────────────────────────────
type Props = {
    place: PlaceListItem;
    vibe: string;
    onNavigate: () => void;
    delay: number;
    theme: SectionTheme;
};

export default function RestaurantCard({ place, vibe, onNavigate, delay, theme }: Props) {
    const [hovered, setHovered] = useState(false);

    // ✅ FIX: dùng env variable thay vì hardcode localhost:5065
    const apiBase = import.meta.env.VITE_API_BASE;

    const mapsQuery = [place.brandName, place.address].filter(Boolean).join(", ");
    const mapsUrl = mapsQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}` : null;
    const igHandle = place.socialMedia?.replace(/^@/, "").trim();
    const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? theme.cardBgHover : theme.cardBg,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.35)" : "0 6px 24px rgba(0,0,0,0.25)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Image */}
            <div onClick={onNavigate} style={{ width: "100%", height: 200, overflow: "hidden", background: `${theme.cardBg}cc` }}>
                {place.imageUrl
                    ? (
                        <img
                            src={`${apiBase}${place.imageUrl}`}
                            alt={place.brandName}
                            style={{
                                width: "100%", height: "100%", objectFit: "cover",
                                transition: "transform 0.6s ease, filter 0.3s ease",
                                transform: hovered ? "scale(1.05)" : "scale(1)",
                                filter: hovered ? "brightness(1.05)" : "brightness(0.9)",
                            }}
                        />
                    )
                    : <div style={{ width: "100%", height: "100%" }} />
                }
            </div>

            {/* Content */}
            <div onClick={onNavigate} style={{ padding: "24px 28px 16px" }}>
                <h3 style={{ fontFamily: "var(--font-title)", fontSize: 23, fontStyle: "italic", margin: "0 0 10px", color: hovered ? theme.cardTextHover : theme.cardNameRest, transition: "color 0.3s ease" }}>
                    {place.brandName}
                </h3>
                <p style={{ fontSize: 17, lineHeight: 1.75, margin: 0, color: hovered ? `${theme.cardTextHover}bb` : theme.cardSubRest, transition: "color 0.3s ease", fontFamily: "var(--font-body)" }}>
                    {vibe}
                </p>
                <FoodWeightBar weight={place.foodWeight ?? place.cuisineType} theme={theme} hovered={hovered} />
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 28px 20px", borderTop: `1px solid ${hovered ? `${theme.cardTextHover}18` : "rgba(255,255,255,0.06)"}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, transition: "border-color 0.3s ease" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                        <span style={{ fontFamily: "var(--font-title)", fontSize: 26, lineHeight: 1, color: hovered ? theme.cardTextHover : theme.badgeColor, transition: "color 0.3s ease" }}>
                            {place.personalRating}
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: hovered ? `${theme.cardTextHover}66` : theme.weightLabelColor, transition: "color 0.3s ease" }}>
                            / 10
                        </span>
                    </div>
                    {mapsUrl && (
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.5, color: hovered ? `${theme.cardTextHover}88` : theme.weightLabelColor, textDecoration: "none", transition: "color 0.3s ease", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            📍 {place.address}
                        </a>
                    )}
                </div>
                {igUrl && (
                    <a href={igUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{ flexShrink: 0, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${hovered ? `${theme.cardTextHover}40` : "rgba(255,255,255,0.15)"}`, color: hovered ? theme.cardTextHover : theme.weightLabelColor, textDecoration: "none", transition: "all 0.2s ease" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                )}
            </div>
        </motion.div>
    );
}