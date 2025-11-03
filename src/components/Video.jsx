import React from "react";

const Video = () => {
  return (
    <div className="h-screen w-screen ml-[10%] mt-14">
      <video className="h-full bg-black" autoPlay loop muted>
        <source src="/videos/turtle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
