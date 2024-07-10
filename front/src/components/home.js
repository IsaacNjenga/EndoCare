import React from "react";
import Navbar from "../components/navbar";
import "../assets/css/home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">ENDOCARE</h1>
        <p className="home-description">Get your information here</p>
      </div>
    </>
  );
}

export default Home;
