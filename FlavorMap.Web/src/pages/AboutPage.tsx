import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";


const SEASONS = [
    { name: "Spring", color: "#8EC97A", bg: "#0F1F12", count: 5 },
    { name: "Summer", color: "#A31621", bg: "#2B0A0D", count: 6 },
    { name: "Autumn", color: "#D4A820", bg: "#1C1404", count: 4 },
    { name: "Winter", color: "#7AA8D4", bg: "#080F1C", count: 4 },
];

export default function AboutPage() {
    const nav = useNavigate();

    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        ><section className="about-hero">

    <div className="about-hero__bg" />
    <div className="about-hero__overlay" />

    <div className="about-hero__inner">
        <motion.div
            className="about-hero__label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            About the project
        </motion.div>
        <motion.h1
            className="about-hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            flavor<br />map
        </motion.h1>
        <motion.p
            className="about-hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
        >
            A personal guide to Hanoi's dining —<br />
            organized by season, mood, and flavor.
        </motion.p>
    </div>
</section>

            {/* ── CONCEPT ──────────────────────────────────────────────── */}
            <section className="about-concept">
                <div className="about-concept__inner">
                    <div className="about-section-number">01</div>
                    <div className="about-concept__content">
                        <h2 className="about-section-title">The idea</h2>
                        <p>
                            FlavorMap began with a simple belief — that the best way to understand a city
                            is through its food. Not through lists or star ratings, but through the feeling
                            of a meal at the right time, in the right season.
                        </p>
                        <p>
                            Hanoi has four distinct seasons, and each one shapes the way people eat.
                            Spring calls for lightness and renewal. Summer for cool retreats or communal
                            tables. Autumn for slow, reflective meals. Winter for warmth and closeness.
                        </p>
                        <p>
                            This project maps 19 carefully curated restaurants across those four seasons —
                            each chosen not just for the quality of food, but for the way it embodies a
                            particular mood, a cultural narrative, and a moment in time.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── SEASONS BREAKDOWN ────────────────────────────────────── */}
            <section className="about-seasons">
                <div className="about-seasons__inner">
                    <div className="about-section-number">02</div>
                    <div style={{ flex: 1 }}>
                        <h2 className="about-section-title" style={{ color: "#F5ECD8" }}>19 restaurants · 4 seasons</h2>
                        <div className="about-seasons__grid">
                            {SEASONS.map((s, i) => (
                                <motion.div
                                    key={s.name}
                                    className="about-season-card"
                                    style={{ background: s.bg, borderColor: `${s.color}30` }}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => nav(`/season/${s.name.toLowerCase()}`)}
                                >
                                    <div className="about-season-card__num" style={{ color: s.color }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="about-season-card__name" style={{ color: s.color }}>
                                        {s.name}
                                    </div>
                                    <div className="about-season-card__count">
                                        {s.count} restaurants
                                    </div>
                                    <div className="about-season-card__cta" style={{ color: `${s.color}88` }}>
                                        Explore →
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
            <section className="about-how">
                <div className="about-how__inner">
                    <div className="about-section-number">03</div>
                    <div className="about-how__content">
                        <h2 className="about-section-title">How it works</h2>
                        <div className="about-how__steps">
                            <div className="about-how__step">
                                <div className="about-how__step-num">I</div>
                                <div>
                                    <div className="about-how__step-title">Choose your season</div>
                                    <p className="about-how__step-body">
                                        Navigate through the map and select a season that matches your mood.
                                        Each season has its own color palette, atmosphere, and curated restaurants.
                                    </p>
                                </div>
                            </div>
                            <div className="about-how__step">
                                <div className="about-how__step-num">II</div>
                                <div>
                                    <div className="about-how__step-title">Take the flavor quiz</div>
                                    <p className="about-how__step-body">
                                        Answer three questions about how you feel tonight. The quiz guides you
                                        to the section within the season that best matches your current mood.
                                    </p>
                                </div>
                            </div>
                            <div className="about-how__step">
                                <div className="about-how__step-num">III</div>
                                <div>
                                    <div className="about-how__step-title">Discover & share</div>
                                    <p className="about-how__step-body">
                                        Each restaurant is documented with four dimensions — menu seasonality,
                                        dining mood, food weight, and cultural narratives. After visiting,
                                        share your own experience and rating with the community.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           
            {/* ── CTA ──────────────────────────────────────────────────── */}
            <section className="about-cta">
                <div className="about-cta__inner">
                    <h2 className="about-cta__title">
                        Ready to explore?<br />
                        <em>The map is waiting.</em>
                    </h2>
                    <button className="about-cta__btn" onClick={() => nav("/map")}>
                        <span>Open the Map</span>
                    </button>
                </div>
            </section>

            {/* ── FOOTER ───────────────────────────────────────────────── */}
            <footer className="about-footer">
                <div className="about-footer__inner">
                    <span className="about-footer__brand">flavormap</span>
                    <span className="about-footer__copy">A personal curation of Hanoi's dining · 2025</span>
                </div>
            </footer>
        </motion.div>
    );
}