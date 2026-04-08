// SeasonLayout.tsx
import { motion, AnimatePresence } from "framer-motion";
import type { PlaceListItem } from "../../types";
import type { SeasonConfig } from "./data/configs";
import type { SeasonSection } from "./data/sections";
import RestaurantCard from "./RestaurantCard";

// ── SeasonSectionBlock ────────────────────────────────────────────────────────
function SeasonSectionBlock({ section, places, onNavigate, highlighted, dimmed, config }: {
    section: SeasonSection;
    places: PlaceListItem[];
    onNavigate: (id: number) => void;
    highlighted: boolean;
    dimmed: boolean;
    config: SeasonConfig;
}) {
    const theme = config.sectionThemes[section.id];
    if (!theme) return null;

    const sectionPlaces = places.filter((p) => p.seasonSection === section.id);

    return (
        <div id={`section-${section.id}`} style={{ position: "relative", overflow: "hidden", background: theme.sectionBg }}>

            {/* Dim overlay */}
            <AnimatePresence>
                {dimmed && (
                    <motion.div
                        key="dim"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: "absolute", inset: 0,
                            background: "rgba(0,0,0,0.60)",
                            zIndex: 10,
                            pointerEvents: "none",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, padding: "64px 64px 72px" }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: 40 }}
                >
                    {/* Title row — number + title bên trái, badge bên phải */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        marginBottom: 10,
                    }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                            <span style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 13,
                                color: "rgba(245,236,216,0.4)",
                                letterSpacing: "0.1em",
                            }}>
                                {section.number}
                            </span>
                            <h2 style={{
                                fontFamily: "var(--font-title)",
                                fontSize: "clamp(28px, 3vw, 40px)",
                                fontWeight: 400,
                                fontStyle: "italic",
                                margin: 0,
                                color: "#F5ECD8",
                            }}>
                                {section.title}
                            </h2>
                        </div>

                        {/* "Your season" badge — góc phải cạnh title */}
                        <AnimatePresence>
                            {highlighted && (
                                <motion.div
                                    key="badge"
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 16 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        background: theme.badgeColor,
                                        color: "#fff",
                                        fontFamily: "var(--font-body)",
                                        fontSize: 11,
                                        letterSpacing: "0.25em",
                                        textTransform: "uppercase",
                                        padding: "7px 22px",
                                        whiteSpace: "nowrap",
                                        flexShrink: 0,
                                    }}
                                >
                                    &nbsp;&nbsp;your season
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ height: 0.5, background: "rgba(245,236,216,0.12)", marginBottom: 16 }} />
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: "#F5ECD8",
                        margin: 0,
                        maxWidth: 520,
                        fontStyle: "italic",
                    }}>
                        {section.subtitle}
                    </p>
                </motion.div>

                {/* Restaurant cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                    {sectionPlaces.map((place, ri) => (
                        <RestaurantCard
                            key={place.id}
                            place={place}
                            vibe={place.vibe ?? ""}
                            onNavigate={() => onNavigate(place.id)}
                            delay={ri * 0.12}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── SeasonLayout ──────────────────────────────────────────────────────────────
type Props = {
    seasonName: string;
    places: PlaceListItem[];
    sections: SeasonSection[];
    config: SeasonConfig;
    onNavigate: (id: number) => void;
    showBack: boolean;
    highlightedSection: string | null;
    onBack: () => void;
};

export default function SeasonLayout({
    seasonName, places, sections, config,
    onNavigate, showBack, highlightedSection, onBack,
}: Props) {
    return (
        <div className="summer-layout" style={{ width: "100%" }}>

            {/* Back button */}
            <AnimatePresence>
                {showBack && (
                    <motion.button
                        className="back-btn back-btn--summer"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={onBack}
                    >
                        ← Back to Map
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Hero banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div style={{
                    backgroundImage: `url('${config.heroImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: config.heroPosition ?? "center",
                    padding: "60px 64px 48px",
                    position: "relative",
                    minHeight: 280,
                    display: "flex",
                    alignItems: "flex-end",
                }}>
                    <div style={{ position: "absolute", inset: 0, background: config.heroOverlay, zIndex: 0 }} />
                    <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 15,
                                    letterSpacing: "0.3em",
                                    textTransform: "uppercase",
                                    color: config.heroSubtitleColor,
                                    marginBottom: 6,
                                }}>
                                    {config.heroLabel}
                                </div>
                                <h1 style={{
                                    fontFamily: "var(--font-title)",
                                    fontSize: "clamp(57px, 7vw, 90px)",
                                    fontWeight: 400,
                                    color: config.heroTitleColor,
                                    margin: 0,
                                    lineHeight: 1,
                                    textTransform: "capitalize",
                                }}>
                                    {seasonName.charAt(0).toUpperCase() + seasonName.slice(1)}
                                </h1>
                            </div>
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 14,
                                lineHeight: 1.8,
                                color: config.heroTaglineColor,
                                maxWidth: 260,
                                textAlign: "right",
                                margin: 0,
                                fontStyle: "italic",
                                whiteSpace: "pre-line",
                            }}>
                                {config.tagline}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section blocks */}
            <div style={{ width: "100%" }}>
                {sections.map((section) => (
                    <SeasonSectionBlock
                        key={section.id}
                        section={section}
                        places={places}
                        onNavigate={onNavigate}
                        highlighted={highlightedSection === section.id}
                        dimmed={highlightedSection !== null && highlightedSection !== section.id}
                        config={config}
                    />
                ))}
            </div>
        </div>
    );
}