import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On route change, scrolls viewport to just below the navbar
 * so the hero section is immediately visible without the navbar eating into it.
 *
 * Navbar height breakdown:
 *   margin-top: 16px + padding: 16px + ~38px content + padding: 16px + margin-bottom: 16px ≈ 102px
 */
const NAVBAR_HEIGHT = 102;

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: NAVBAR_HEIGHT, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}