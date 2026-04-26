import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./HomePage.css";

const SEASONS = [
    {
        name: "spring",
        label: "Spring",
        tagline: "New leaves, cool mist,\nthe city waking.",
        bg: "#0F1F12",
        accent: "#8EC97A",
        text: "#D2E8C8",
        image: "/images/sections/spring-hero.jpg",
        overlay: "rgba(8,20,12,0.62)",
    },
    {
        name: "summer",
        label: "Summer",
        tagline: "Cool from within,\nwarm from without.",
        bg: "#2B0A0D",
        accent: "#A31621",
        text: "#F5ECD8",
        image: "/images/sections/summer-hero.jpg",
        overlay: "rgba(20,10,4,0.62)",
    },
    {
        name: "autumn",
        label: "Autumn",
        tagline: "Amber light at 5pm —\nthe best season to sit still.",
        bg: "#1C1404",
        accent: "#D4A820",
        text: "#F5DC8C",
        image: "/images/sections/autumn-hero.jpg",
        overlay: "rgba(20,14,4,0.62)",
    },
    {
        name: "winter",
        label: "Winter",
        tagline: "A held breath —\nsteam, fog, a small bowl.",
        bg: "#080F1C",
        accent: "#7AA8D4",
        text: "#BED2F0",
        image: "/images/sections/winter-hero.jpg",
        overlay: "rgba(4,10,22,0.68)",
    },
];

export default function HomePage() {
    const nav = useNavigate();
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div className="home-v2">
            <div className="grain-overlay" />

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <section className="hv2-hero" ref={heroRef}>
               
                <motion.div
                    className="hv2-hero__bg"
                    style={{ y: heroY }}
                />
                <div className="hv2-hero__overlay" />

                <motion.div className="hv2-hero__content" style={{ opacity: heroOpacity }}>
                    <motion.div
                        className="hv2-hero__label"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        Hanoi · A Culinary Journey
                    </motion.div>

                    <motion.h1
                        className="hv2-hero__title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        flavor<br />map
                    </motion.h1>

                    <motion.p
                        className="hv2-hero__tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                    >
                        A personal guide to Hanoi's dining —<br />
                        organized by season, mood, and flavor.
                    </motion.p>

                    <motion.button
                        className="hv2-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        onClick={() => nav("/map")}
                    >
                        <span>Begin the Journey</span>
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hv2-scroll-hint"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="hv2-scroll-line" />
                    <span>scroll</span>
                </motion.div>
            </section>

            {/* ══ INTRO ═════════════════════════════════════════════════════ */}
            <section className="hv2-intro">
                <motion.div
                    className="hv2-intro__inner"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="hv2-intro__number">01</div>
                    <div className="hv2-intro__text">
                        <p>
                            When setting foot in a new city, the first impression that lingers is often the flavor of its culinary culture.
                            Sometimes, love for a place begins with something as simple as a single dish.
                        </p>
                        <p>
                            Ha Noi — where flavors tell stories and paint a canvas of vibrant colors — is a place where culinary traditions intertwine and creativity flows freely.
                            Each stop on this map represents the spirit of the city, organized by the season that brings it most alive.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ══ SEASON CARDS ════════════════════════════════════════════ */}
            <section className="hv2-seasons">
                <motion.div
                    className="hv2-seasons__header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="hv2-seasons__label">Explore by season</span>
                    <h2 className="hv2-seasons__title">
                        Four seasons,<br /><em>four different moods.</em>
                    </h2>
                </motion.div>

              
                <div
                    className="hv2-seasons__grid"
                    ref={(el) => {
                        if (!el) return;
                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (entry.isIntersecting) {
                                    el.classList.add("visible");
                                    observer.disconnect();
                                }
                            },
                            { threshold: 0.1 }
                        );
                        observer.observe(el);
                    }}
                >
                    {SEASONS.map((s, i) => (
                        <div
                            key={s.name}
                            className="hv2-season-card"
                            style={{
                                background: s.bg,
                                animationDelay: `${i * 80}ms`,   // stagger via CSS
                            }}
                            onClick={() => nav(`/season/${s.name}`)}
                        >
                            <div
                                className="hv2-season-card__img"
                                style={{ backgroundImage: `url('${s.image}')` }}
                            />
                            <div
                                className="hv2-season-card__overlay"
                                style={{ background: s.overlay }}
                            />
                            <div className="hv2-season-card__content">
                                <div className="hv2-season-card__number" style={{ color: s.accent }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="hv2-season-card__name" style={{ color: s.text }}>
                                    {s.label}
                                </h3>
                                <p className="hv2-season-card__tagline" style={{ color: `${s.text}99` }}>
                                    {s.tagline}
                                </p>
                                <div className="hv2-season-card__cta" style={{ color: s.accent, borderColor: `${s.accent}55` }}>
                                    Enter →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ MAP CTA ═══════════════════════════════════════════════════ */}
            <section className="hv2-map-cta">
                <motion.div
                    className="hv2-map-cta__inner"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="hv2-map-cta__label">02</div>
                    <h2 className="hv2-map-cta__title">
                        Not sure where to start?<br />
                        <em>Let the map guide you.</em>
                    </h2>
                    <p className="hv2-map-cta__sub">
                        Browse every restaurant across all seasons — filtered by flavor, mood, and the weight of the meal.
                    </p>
                    <button
                        className="hv2-map-cta__btn"
                        onClick={() => nav("/map")}
                    >
                        Open the Map
                    </button>
                </motion.div>
            </section>

            {/* ══ FOOTER ════════════════════════════════════════════════════ */}
            <footer className="hv2-footer">
                <div className="hv2-footer__inner">
                    <span className="hv2-footer__brand">flavormap</span>
                    <span className="hv2-footer__copy">A personal curation of Hanoi's dining · 2026</span>
                </div>
            </footer>
        </div>
    );
}