import React, { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GameCarousel from "./GameCarousel";
import background from "../../assets/game_programming/background.png";
import submarineVideo from "../../assets/Animations/Submarine/submarine_section_final.webm";
import submarinePoster from "../../assets/Animations/Submarine/submarine.png";
import Rive from "@rive-app/react-canvas";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const GameProgrammingSection = () => {
  const [videoReady, setVideoReady] = useState(!isSafari);

  const titleControls = useAnimation();
  const descriptionControls = useAnimation();
  const carouselControls = useAnimation();
  const riveAnimationControls = useAnimation();

  const [titleRef, titleInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [descriptionRef, descriptionInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [carouselRef, carouselInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [riveRef, riveInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (titleInView) titleControls.start("visible");
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (descriptionInView) descriptionControls.start("visible");
  }, [descriptionInView, descriptionControls]);

  useEffect(() => {
    if (carouselInView) carouselControls.start("visible");
  }, [carouselInView, carouselControls]);

  useEffect(() => {
    if (riveInView) riveAnimationControls.start("visible");
  }, [riveInView, riveAnimationControls]);

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

  const titleVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  const descriptionVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 0.1, ease: "easeOut" } },
  };

  const carouselVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.8, ease: "easeOut" } },
  };

  const riveVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 1.2, ease: "easeOut" } },
  };

  return (
    <div
      id="game-programming-section"
      className="w-full h-[822px] md:h-auto relative overflow-hidden"
    >
      {/* Mobile: imagen estática */}
      <div
        className="md:hidden absolute inset-0 h-full bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Desktop: video animado */}
      <div className="hidden md:block">
        {videoReady ? (
          <video autoPlay loop muted playsInline className="w-full block" style={{ pointerEvents: "none" }}>
            <source src={submarineVideo} type="video/webm" />
          </video>
        ) : (
          <img src={submarinePoster} className="w-full block" style={{ pointerEvents: "none" }} />
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

      {/* Contenido */}
      <div className="absolute inset-0 z-10 w-full">
        {/* Wrapper max-width */}
        <div className="absolute inset-0 w-full max-w-[1360px] mx-auto">

          {/* Carousel — anclado a bottom 25.8% */}
          <motion.div
            ref={carouselRef}
            initial="hidden"
            animate={carouselControls}
            variants={carouselVariant}
            className="absolute left-0 w-full flex justify-center"
            style={{ bottom: "calc(25.8% + 35px)" }}
          >
            <div className="w-full max-w-[1200px]">
              <GameCarousel />
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={titleVariant}
            className="font-orbitron font-bold text-white text-[26.53px] md:text-[40px] leading-none md:leading-none text-start ps-[40px] md:ps-0 md:ms-[48px] [text-shadow:_5px_5px_4px_#0A27BB] md:[text-shadow:_5px_5px_4px_#348CF0] absolute h-[100px] flex items-start w-full"
            style={{ bottom: "calc(25.8% + 200px + 84px + 102px + 75px)" }}
          >
            <span className="md:hidden">Game Programming</span>
            <span className="hidden md:inline">Gameplay Implementation/Visual Scripting</span>
          </motion.h1>

          {/* Descripción */}
          <motion.div
            ref={descriptionRef}
            initial="hidden"
            animate={descriptionControls}
            variants={descriptionVariant}
            className="w-[calc(100%-40px)] md:w-[681px] h-[102px] absolute left-[40px] md:left-auto md:right-[48px]"
            style={{ bottom: "calc(25.8% + 200px + 84px + 75px - 113px + 75px)" }}
          >
            <h2 className="h-full flex items-center text-white font-rajdhani font-semibold text-[16px] leading-[26px] md:text-[22px] md:leading-[26px] p-7 border-3 border-[#FFFFFF47] border-r-0 md:border-r-3 md:rounded-[35px] rounded-l-[35px]" style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) -1.52%, rgba(255, 255, 255, 0.024) 104.35%)", backdropFilter: "blur(79.2px)" }}>
              <span className="block w-[274px] md:w-auto">Discover my game dev projects developed in Unity, showcasing my skills in game design and programming.</span>
            </h2>
          </motion.div>

        </div>{/* end max-w wrapper */}

        <motion.div
          ref={riveRef}
          initial="hidden"
          animate={riveAnimationControls}
          variants={riveVariant}
          className="absolute -bottom-80 left-0 md:left-50 w-[300px] h-[300px] z-20"
        >
          <Rive src="/animations/untitled.riv" animations="Timeline 1" autoPlay={true} />
        </motion.div>
      </div>

      {/* Additional space for mobile */}
      <div className="h-[200px] md:h-0 w-full" />

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
