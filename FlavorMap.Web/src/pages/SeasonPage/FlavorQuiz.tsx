// FlavorQuiz.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "./data/sections";

type Props = {
    questions: QuizQuestion[];
    onResult: (section: string) => void;
    onSkip: () => void;
    accentColor: string;
    bgColor: string;
    onBack: () => void;
};

export default function FlavorQuiz({ questions, onResult, onSkip, accentColor, bgColor, onBack }: Props) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [revealing, setRevealing] = useState(false);

    const handleNext = () => {
        if (!selected) return;
        const newAnswers = [...answers, selected];
        if (step < questions.length - 1) {
            setAnswers(newAnswers);
            setSelected(null);
            setStep(step + 1);
        } else {
            const tally: Record<string, number> = {};
            newAnswers.forEach((a) => { tally[a] = (tally[a] ?? 0) + 1; });
            const result = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
            setRevealing(true);
            setTimeout(() => onResult(result), 1400);
        }
    };

    const q = questions[step];

    return (
        <div style={{ minHeight: "100vh", background: bgColor, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "43px 43px 0" }}>
                <button
                    onClick={onBack}
                    style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 19, color: "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6 }}
                >
                    ← Back to Map
                </button>
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px 60px" }}>
                <AnimatePresence mode="wait">
                    {!revealing ? (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ width: "100%", maxWidth: 520, textAlign: "center" }}
                        >
                            {/* Progress dots */}
                            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                                {questions.map((_, i) => (
                                    <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 3, background: i <= step ? accentColor : "rgba(255,255,255,0.12)", transition: "all 0.3s ease" }} />
                                ))}
                            </div>

                            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>
                                {`0${step + 1} / 0${questions.length}`}
                            </p>

                            <h2 style={{ fontFamily: "var(--font-title)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.88)", margin: "0 0 40px", lineHeight: 1.3 }}>
                                {q.question}
                            </h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                                {q.options.map((opt) => {
                                    const isSel = selected === opt.value;
                                    return (
                                        <motion.button
                                            key={opt.value}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelected(opt.value)}
                                            style={{
                                                background: isSel ? `${accentColor}30` : "rgba(255,255,255,0.04)",
                                                border: `1px solid ${isSel ? accentColor : "rgba(255,255,255,0.1)"}`,
                                                padding: "18px 28px",
                                                fontFamily: "var(--font-body)", fontSize: 16,
                                                color: isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                                                cursor: "pointer", transition: "all 0.2s ease",
                                                letterSpacing: "0.02em", textAlign: "left",
                                            }}
                                        >
                                            {opt.label}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button onClick={onSkip} style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: 15, letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)", cursor: "pointer", padding: 0 }}>
                                    Skip →
                                </button>
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleNext}
                                    style={{
                                        background: selected ? `${accentColor}cc` : "rgba(255,255,255,0.06)",
                                        border: `1px solid ${selected ? accentColor : "rgba(255,255,255,0.1)"}`,
                                        padding: "12px 32px",
                                        fontFamily: "var(--font-body)", fontSize: 15,
                                        letterSpacing: "0.2em", textTransform: "uppercase",
                                        color: selected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.2)",
                                        cursor: selected ? "pointer" : "default", transition: "all 0.25s ease",
                                    }}
                                >
                                    {step < questions.length - 1 ? "Next" : "See my season"}
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="reveal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} style={{ textAlign: "center" }}>
                            <motion.p
                                style={{ fontFamily: "var(--font-title)", fontSize: 40, fontStyle: "italic", color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}
                                animate={{ opacity: [0.55, 1, 0.55] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Finding your season...
                            </motion.p>
                            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                                {[0, 1, 2].map((i) => (
                                    <motion.div key={i}
                                        style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor }}
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