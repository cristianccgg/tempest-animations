import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroVideoMp4 from "../../assets/Animations/Hero/hero-animation.mp4";
import heroPoster from "../../assets/Animations/Hero/hero-poster.png";
import heroImage from "../../assets/hero/hero.png";
import ExploreBtn from "../ExploreBtn";
import AboutModal from "./AboutModal";
import VideoModal from "./VideoModal";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const Hero = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(!isSafari);
  const videoSrc = "https://www.youtube.com/embed/your-video-id";

  const titleControls = useAnimation();
  const buttonControls = useAnimation();

  const [titleRef, titleInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [buttonRef, buttonInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (titleInView) titleControls.start("visible");
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (buttonInView) buttonControls.start("visible");
  }, [buttonInView, buttonControls]);

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

  useEffect(() => {
    if (window.location.hash === "#about") {
      setIsAboutModalOpen(true);
      setIsVideoModalOpen(false);
    }
  }, []);

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
    setIsVideoModalOpen(false);
    window.history.replaceState(null, "", "#about");
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const titleVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut" } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } },
  };

  const starsVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.2, 0.4, 0.2],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full">
      {/* Mobile: imagen estática con contenido */}
      <div
        className="md:hidden h-[1285px] bg-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={starsVariant}
          className="absolute inset-0 w-full h-full stars-background pointer-events-none"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 flex flex-col items-center gap-[19px] text-white">
          <motion.h1
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={titleVariant}
            className="text-[36px] font-spartan font-600 mb-0 mt-[257px]"
            style={{
              background: "linear-gradient(272.38deg, #FFFFFF 46.06%, #A9EAFA 81.53%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WELCOME
          </motion.h1>
          <motion.div ref={buttonRef} initial="hidden" animate={buttonControls} variants={buttonVariant}>
            <ExploreBtn text="Explore" className="font-orbitron font-[700px] text-[15px]" onClick={openAboutModal} />
          </motion.div>
        </div>
      </div>

      {/* Desktop: video animado con contenido */}
      <div className="hidden md:block relative">
        {videoReady ? (
          <video autoPlay loop muted playsInline className="w-full block" style={{ pointerEvents: "none" }}>
            <source src={heroVideoMp4} type="video/mp4" />
          </video>
        ) : (
          <img src={heroPoster} className="w-full block" style={{ pointerEvents: "none" }} />
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={starsVariant}
          className="absolute inset-0 w-full h-full stars-background pointer-events-none"
          style={{ zIndex: 1 }}
        />

        <div className="absolute inset-0 z-10 flex flex-col items-center gap-[19px] text-white">
          <motion.h1
            initial="hidden"
            animate={titleControls}
            variants={titleVariant}
            className="text-[55px] font-spartan font-600 mb-0 mt-[230px]"
            style={{
              background: "linear-gradient(272.38deg, #FFFFFF 46.06%, #A9EAFA 81.53%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WELCOME
          </motion.h1>
          <motion.div initial="hidden" animate={buttonControls} variants={buttonVariant}>
            <ExploreBtn text="Explore" className="font-orbitron font-[700px] text-[15px]" onClick={openAboutModal} />
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-[180px] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #38f0fd)", zIndex: 2 }}
        />
      </div>

      <AboutModal isOpen={isAboutModalOpen} onClose={closeAboutModal} onOpenVideo={openVideoModal} />
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} videoSrc={videoSrc} />

      <style jsx>{`
        .stars-background {
          background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          mix-blend-mode: screen;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default Hero;
