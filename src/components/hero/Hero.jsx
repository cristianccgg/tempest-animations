import { useState, useEffect } from "react";
import heroVideoMp4 from "../../assets/Animations/Hero/hero-animation.mp4";
import heroPoster from "../../assets/Animations/Hero/hero-poster.png";
import heroImage from "../../assets/hero/hero.png";

const Hero = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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
    <div className="relative w-full">
      {/* Mobile: imagen estática */}
      <div
        className="md:hidden h-[1285px] bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Desktop: video animado */}
      <div className="hidden md:block">
        {videoReady ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
            style={{ pointerEvents: "none" }}
          >
            <source src={heroVideoMp4} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroPoster}
            className="w-full block"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>

      {/* Gradient transition to submarine section */}
      <div
        className="hidden md:block absolute bottom-0 left-0 w-full h-[180px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #38f0fd)",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Hero;
