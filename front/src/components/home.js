import React from "react";
import Navbar from "../components/navbar";
import "../assets/css/home.css";
import logo from "../assets/images/logo.png";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <img src = {logo} alt = "logo"/>
      </div>
    </>
  );
}

export default Home;
