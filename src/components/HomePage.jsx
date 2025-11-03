import React from "react";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="h-screen relative grid grid-rows-4 grid-cols-[200px_minmax(900px,1fr)_100px] text-white text-tight">
      <div className="row-start-2 col-start-2">
        <div className="text-7xl col-start-2 font-normal w-140 mb-10">
          <h1>We empower brands to inspire people</h1>
        </div>
        <div className="border-b-2 border-b-primary inline-block">
          <p>EXPLORE OUR UNIVERSE</p>
        </div>
      </div>

      <Navbar />

      <div className="h-screen"></div>
    </div>
  );
};

export default HomePage;
