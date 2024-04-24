import React from "react";
import { Link } from "react-router-dom"; // Importiere Link statt link
import "../MainNavigation.css";

const MainNavigation = () => {
    return (
        <nav id="main-nav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/public">Public</Link>
                </li>
                <li>
                    <Link to="/private">Private</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation;
