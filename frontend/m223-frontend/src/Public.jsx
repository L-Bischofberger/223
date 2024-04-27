// src/Public.jsx
//import axios from "axios";
import React, { useState, useEffect }
    from "react";
//import MainNavigation from "./MainNavigattion";
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


/*import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseURL = "http://localhost:8080";

const Public = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    axios.get(baseURL + "/public/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!items) {
    return <p>no data fetched</p>;
  }

  const liste = items.map(item => (
    <dl key={item.key}>
      <dt>{item.key}</dt>
      <dd>{item.value}</dd>
    </dl>
  ));

  return (
    <div>
      <h1>Public Area Data</h1>
      <div>
        {liste}
      </div>
    </div>
  );
};

export default Public;*/
