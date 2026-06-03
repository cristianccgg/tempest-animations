import React, { useState, useEffect } from "react";
import videoSrc from "../../assets/Animations/waterfall2/waterfall2-prueba-fondos.webm";
import videoSrcMov from "../../assets/Animations/waterfall2/waterfall2-prueba-fondos-hevc.mov";
import videoPoster from "../../assets/Animations/waterfall2/waterfall2.png";
import bgMidWaterfall from "../../assets/mid_waterfall/background.png";
import bgWaterfall2 from "../../assets/waterfall2/background.png";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const MidWaterfall2 = () => {
  const [videoReady, setVideoReady] = useState(!isSafari);

  useEffect(() => {
    if (!isSafari) return;
    const unlock = () => setVideoReady(true);
    document.addEventListener("click", unlock, { once: true });
    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("scroll", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });
    return () => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("scroll", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, []);

  return (
    <div className="w-full md:-mt-32 relative overflow-hidden z-10">
      {/* Mobile: fondos estáticos */}
      <div className="md:hidden">
        <div className="w-full h-[500px]">
          <div
            className="w-full h-full bg-no-repeat bg-center bg-[length:170%_100%]"
            style={{ backgroundImage: `url(${bgMidWaterfall})` }}
          />
        </div>
        <div className="w-full h-[800px] relative overflow-hidden">
          <div
            className="absolute w-full h-full bg-no-repeat bg-[length:125%_100%] sm:right-[-20%]"
            style={{ backgroundImage: `url(${bgWaterfall2})` }}
          />
        </div>
      </div>

      {/* Desktop: video */}
      <div className="hidden md:block relative">
        {videoReady ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
            style={{ pointerEvents: "none" }}
          >
            <source src={videoSrcMov} type="video/quicktime" />
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : (
          <img
            src={videoPoster}
            className="w-full block"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
    </div>
  );
};

export default MidWaterfall2;
