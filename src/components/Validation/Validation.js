import React, { useState } from 'react';
import styles from "./Validation.module.css"

export const Validation = ({ text , InitialDisplay}) => {
  const [display, setDisplay] = useState("no");
  return (
    <form 
    className={styles.form} style={{ position:'fixed' , zIndex:"5000", top:"50%", left:"50%", transform :"translate(-50%,-50%)",
    border: '1px solid #ccc', padding: '20px', borderRadius: '5px'  , opacity: InitialDisplay == "yes" ? "100%" : "0%"}}>
      <h3>{text}</h3>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <button style={{width:"40%"}}  className={styles.button30}>YES</button>
        <button style={{width:"40%"}}  className={styles.button30} >NO</button>
      </div>
     
    </form>
  );
};


