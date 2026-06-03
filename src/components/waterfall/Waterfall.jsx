import React from "react";
import background from "../../assets/waterfall/background.png";
import waterfallWebm from "../../assets/Animations/waterfall1/waterfall1_final.webm";

const Waterfall = () => {
  return (
    <div className="w-full h-[750px] md:h-auto relative flex flex-col md:justify-end justify-center overflow-hidden">
      {/* Mobile: imagen estática */}
      <div
        className="md:hidden absolute w-full h-full bg-[length:170%_100%] bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Desktop: video animado */}
      <div className="hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full block"
          style={{ pointerEvents: "none" }}
        >
          <source src={waterfallWebm} type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Waterfall;
