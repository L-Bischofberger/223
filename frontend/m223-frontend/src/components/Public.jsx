import axios from "axios";
import MainNavigattion from "./MainNavigattion";
import React, { useState, useEffect }
    from "react";
import MainNavigation from "./MainNavigattion";
const baseURL = "http://localhost:8080"


const Public = () => {
    const [items, setItems] = useState(null);
    useEffect(() => {
        axios.get(baseURL + "/public")
            .then((response) => {
                setItems(response.data);
            });
    }, []); 
    
    return (
        <>
        <MainNavigation/>
        <div id="content">
            <h1>Public Area Data</h1>
            <div className ="mylist">
                {liste}
            </div>
        </div>
        </>
    )
};
export default  Public;