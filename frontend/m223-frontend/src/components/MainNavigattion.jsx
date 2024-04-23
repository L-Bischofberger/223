import {link } from "react-router-dom"
import "../styles/MainNavigation"


const MainNavigation =() => {

    return (
        <>
            <nav id="main-nav">
                <ul>
                    <li>
                            <link to="/">Home</link>
                    </li>
                    <li>
                            <link to="/public">Public</link>
                    </li>
                    <li>
                            <link to="/private">Private</link>
                    </li>
                    <li>
                            <link to="/login">Login</link>
                    </li>
                </ul>
            </nav>
        </>)
    
}

export default MainNavigation;