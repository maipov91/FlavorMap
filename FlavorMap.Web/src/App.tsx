


import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import AboutPage from "./pages/AboutPage";

import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import SeasonPage from "./pages/SeasonPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";

function App() {
    const location = useLocation();

    return (
        <>
            <Navbar />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/season/:seasonName" element={<SeasonPage />} />
                    <Route path="/places/:id" element={<PlaceDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;

