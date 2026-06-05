import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import background from "../../assets/game_programming/background.png";
import submarineVideo from "../../assets/Animations/Submarine/submarine_section_final.webm";
import submarinePoster from "../../assets/Animations/Submarine/submarine.png";

const GameProgrammingSection = () => {
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
    <div
      id="game-programming-section"
      className="w-full md:h-[1260px] min-h-[822px] relative overflow-hidden"
    >
      {/* Mobile: imagen estática */}
      <div
        className="md:hidden absolute inset-0 h-full bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Desktop: video animado */}
      <div className="hidden md:block">
        {videoReady ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full"
            style={{ pointerEvents: "none" }}
          >
            <source src={submarineVideo} type="video/webm" />
          </video>
        ) : (
          <img
            src={submarinePoster}
            className="w-full block"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>

      {/* Stars background overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-40 stars-background"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 w-full h-full opacity-20 stars-background-small"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      />

      {/* Additional space for mobile */}
      <div className="h-[200px] md:h-0 w-full"></div>

      <style jsx>{`
        .stars-background {
          background-image:
            radial-gradient(2px 2px at 20px 30px, #77a0ff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 40px 70px, #a1b8ff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 50px 160px, #5d99ff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 90px 40px, #8bb3ff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 130px 80px, #4f7df2, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 120px, #97c1ff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }
        .stars-background-small {
          background-image:
            radial-gradient(1px 1px at 10px 10px, #77a0ff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 150px 150px, #a1b8ff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 100px 50px, #5d99ff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 60px 120px, #8bb3ff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 175px 55px, #4f7df2, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 20px 180px, #97c1ff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }
      `}</style>
    </div>
  );
};

export default GameProgrammingSection;
