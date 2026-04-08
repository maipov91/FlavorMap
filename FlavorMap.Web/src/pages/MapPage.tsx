import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./MapPage.css";

export default function MapPage() {
    const nav = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
        >
            <div className="map-layout">
                <main className="map-canvas">
                    {/* BACKGROUND IMAGE */}
                    <img
                        src="/images/map-bg.png"
                        className="map-bg"
                    />
                    <button
                        className="back-btn"
                        onClick={() => nav("/")}
                    >
                        ← Back to Homepage
                    </button>

                    {/* SPRING */}
                    <motion.button
                        className="season-pin spring"

                        initial={{ opacity: 0, x: -30, rotate: -45 }}
                        animate={{ opacity: 1, x: 0, rotate: -45 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        onClick={() => nav("/season/spring")}

                    >
                        <span className="season-label">Spring</span>
                    </motion.button>

                    {/* SUMMER */}
                    <motion.button
                        className="season-pin summer"
                        initial={{ opacity: 0, x: -30, rotate: -45 }}
                        animate={{ opacity: 1, x: 0, rotate: -45 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        onClick={() => nav("/season/summer")}
                    >

                        <span className="season-label">Summer</span>
                    </motion.button>
                    {/* AUTUMN */}
                    <motion.button
                        className="season-pin autumn"
                        initial={{ opacity: 0, x: -30, rotate: -45 }}
                        animate={{ opacity: 1, x: 0, rotate: -45 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        onClick={() => nav("/season/autumn")}
                    >
                        <span className="season-label">Autumn</span>
                    </motion.button>

                    {/* WINTER */}
                    <motion.button
                        className="season-pin winter"
                        initial={{ opacity: 0, x: -30, rotate: -45 }}
                        animate={{ opacity: 1, x: 0, rotate: -45 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        onClick={() => nav("/season/winter")}
                    >
                        <span className="season-label">Winter</span>
                    </motion.button>

                </main>
            </div>
        </motion.div>
    );
}