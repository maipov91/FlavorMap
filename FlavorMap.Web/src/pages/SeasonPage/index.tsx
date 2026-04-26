// index.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../api";
import type { PlaceListItem } from "../../types";

import { SEASON_CONFIGS } from "./data/configs";
import { SEASON_SECTIONS, SEASON_QUIZZES } from "./data/sections";
import FlavorQuiz from "./FlavorQuiz";
import SeasonLayout from "./SeasonLayout";
import "./SeasonPage.css";

type Stage = "intro" | "quiz" | "list";

const EDITORIAL_SEASONS = ["summer", "spring", "autumn", "winter"];

export default function SeasonPage() {
    const { seasonName } = useParams();
    const nav = useNavigate();

    const [places, setPlaces] = useState<PlaceListItem[]>([]);
    const [stage, setStage] = useState<Stage>("intro");
    const [showBack, setShowBack] = useState(true);
    const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
    

    const lastScrollY = useRef(0);
    const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingSection = useRef<string | null>(null);

    const isEditorial = EDITORIAL_SEASONS.includes(seasonName ?? "");
    const config = SEASON_CONFIGS[seasonName ?? ""];
    const sections = SEASON_SECTIONS[seasonName ?? ""] ?? [];
    const quizQuestions = SEASON_QUIZZES[seasonName ?? ""] ?? SEASON_QUIZZES.summer;

    const firstTheme = config ? Object.values(config.sectionThemes)[0] : null;
    const quizAccentColor = firstTheme?.headingColor ?? "#A31621";
    const quizBg = seasonName === "summer" ? "#2B0A0D" : (firstTheme?.sectionBg ?? "#261A0F");

    // Fetch places
    useEffect(() => {
        if (!seasonName) return;
        api<PlaceListItem[]>(`/api/places?season=${seasonName}`)
            .then(setPlaces)
            .catch(console.error);
    }, [seasonName]);

    // Auto-advance intro → quiz
    useEffect(() => {
        const timer = setTimeout(() => {
            setStage(isEditorial ? "quiz" : "list");
        }, 1000);
        return () => clearTimeout(timer);
    }, [seasonName, isEditorial]);

    // Hide/show back button on scroll
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
    if (stage !== "list" || !pendingSection.current) return;
    const section = pendingSection.current;
    pendingSection.current = null;

    // requestAnimationFrame đảm bảo DOM đã paint xong
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const el = document.getElementById(`section-${section}`);
            if (el) el.scrollIntoView({ behavior: "instant", block: "start" });

            if (clearTimer.current) clearTimeout(clearTimer.current);
            clearTimer.current = setTimeout(() => {
                setHighlightedSection(null);
            }, 5000);
        });
    });
}, [stage]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => { if (clearTimer.current) clearTimeout(clearTimer.current); };
    }, []);

    const handleQuizResult = useCallback((section: string) => {
    setHighlightedSection(section);

    // Render list ngầm trước, KHÔNG đổi stage ngay
    // Dùng ref để scroll sau khi DOM có section
    pendingSection.current = section;
    setStage("list");
}, []);
    return (
        <motion.div
            key={seasonName}
            className={`season-page ${seasonName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
           
            transition={{ duration: 0.6 }}
            style={{ width: "100%", overflowX: "hidden" }}
        >
            <div className="season-inner" style={{ width: "100%" }}>
                <div className="grain-overlay" />

                <AnimatePresence>
                    {/* Stage: Intro */}
                    {stage === "intro" && (
                        <motion.div
                            key="intro"
                            className="season-intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.h1
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                {seasonName?.toUpperCase()}
                            </motion.h1>
                        </motion.div>
                    )}

                    {/* Stage: Quiz */}
                    {stage === "quiz" && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            
                            transition={{ duration: 0.5 }}
                        >
                            <FlavorQuiz
                                questions={quizQuestions}
                                onResult={handleQuizResult}
                                onSkip={() => setStage("list")}
                                accentColor={quizAccentColor}
                                bgColor={quizBg}
                                onBack={() => nav("/map")}
                            />
                        </motion.div>
                    )}

                    {/* Stage: List */}
                    {stage === "list" && (
                        <motion.div
                            key="list"
                            className="season-map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ width: "100%" }}
                        >
                            
                            {isEditorial && places.length === 0 && (
                               <div style={{
                                   minHeight: "100vh",
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   color: "rgba(255,255,255,0.3)",
                                   fontFamily: "var(--font-body)",
                                   fontSize: 14,
                                   letterSpacing: "0.2em",
                             }}>
                                    Loading...
                                </div>
                             )}        
                            {isEditorial && places.length > 0 && config && (
                                <SeasonLayout
                                    seasonName={seasonName!}
                                    places={places}
                                    sections={sections}
                                    config={config}
                                    onNavigate={(id) => nav(`/places/${id}`)}
                                    showBack={showBack}
                                    highlightedSection={highlightedSection}
                                    onBack={() => nav("/map")}
                                />
                            )}
                            {!isEditorial && (
                                <button
                                    className="back-btn"
                                    onClick={() => nav("/map")}
                                    style={{ opacity: showBack ? 1 : 0 }}
                                >
                                    ← Back to Map
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}