import React, { useState, useEffect } from "react";
import background from "../assets/footer/background.png";
import videoSrc from "../assets/Animations/footer/Footer_final.webm";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const Footer = () => {
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
    <div id="footer" className="w-full h-[400px] md:h-auto md:-mt-43 relative">
      {/* Mobile Background */}
      <div
        className="md:hidden absolute w-full h-full bg-[length:125%_100%] bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Desktop Background */}
      <div className="hidden md:block relative">
        <div
          className="absolute inset-0 w-full h-full bg-[length:100%_100%] bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        />
        {videoReady ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full block relative"
            style={{ pointerEvents: "none" }}
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-[length:100%_100%] bg-no-repeat"
            style={{ backgroundImage: `url(${background})` }}
          />
        )}
      </div>
    </div>
  );
};

export default Footer;
