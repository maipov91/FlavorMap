import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">
                <Link to="/" className="logo">flavormap</Link>
                <nav>
                    <Link to="/">Homepage</Link>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}