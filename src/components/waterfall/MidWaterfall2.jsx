import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import videoSrc from "../../assets/Animations/waterfall2/waterfall2-prueba-fondos.webm";
import videoSrcMov from "../../assets/Animations/waterfall2/waterfall2-prueba-fondos-hevc.mov";
import videoPoster from "../../assets/Animations/waterfall2/waterfall2.png";
import bgMidWaterfall from "../../assets/mid_waterfall/background.png";
import bgWaterfall2 from "../../assets/waterfall2/background.png";
import ArtCollectionCarousel from "./ArtCollectionCarousel";
import rocket from "../../assets/waterfall2/rocket.png";
import telescope from "../../assets/waterfall2/telescope.png";
import StarryNight from "../projects/StarryNight";
import AnimatedComic from "../projects/AnimatedComic";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const MidWaterfall2 = () => {
  const [videoReady, setVideoReady] = useState(!isSafari);
  const [activeCard, setActiveCard] = useState("rocket");
  const [activeProject, setActiveProject] = useState(null);

  const titleControls = useAnimation();
  const cardsControls = useAnimation();

  const [titleRef, titleInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [cardsRef, cardsInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (titleInView) titleControls.start("visible");
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (cardsInView) cardsControls.start("visible");
  }, [cardsInView, cardsControls]);

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
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const cardsContainerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.6, duration: 0.8 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  const starsVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
    },
  };

  return (
    <div className="w-full md:-mt-32 relative overflow-hidden z-10">
      {/* Mobile: fondos estáticos con contenido */}
      <div className="md:hidden">
        {/* MidWaterfall mobile — carousel */}
        <div className="w-full h-[500px] relative">
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-[length:170%_100%]"
            style={{ backgroundImage: `url(${bgMidWaterfall})` }}
          />
          <div className="relative z-10 h-full flex justify-center items-center">
            <div className="container mx-auto px-4">
              <ArtCollectionCarousel />
            </div>
          </div>
        </div>

        {/* Waterfall2 mobile — Web Design Projects */}
        <div className="w-full h-[800px] relative overflow-hidden">
          <div
            className="absolute w-full h-full bg-no-repeat bg-[length:125%_100%] sm:right-[-20%]"
            style={{ backgroundImage: `url(${bgWaterfall2})` }}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={starsVariant}
            className="absolute inset-0 w-full h-full stars-background pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <div className="relative z-10 h-full">
            <div className="flex flex-col items-center h-full">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardsContainerVariant}
                className="flex w-full items-center justify-center h-full"
              >
                <div className="relative w-82 max-w-md h-[510px] px-4">
                  <motion.div
                    variants={cardVariant}
                    className={`absolute top-25 w-full h-100 border-gradient-web-design rounded-2xl backdrop-blur-2xl p-6 transition-all duration-500 shadow-xl ${activeCard === "telescope" ? "z-20" : "z-10 bg-black/60 scale-[0.98]"} cursor-pointer`}
                    onMouseEnter={() => setActiveCard("telescope")}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <h3 className="font-inter text-2xl font-bold text-white mb-4 [text-shadow:_0px_4px_4px_rgba(255,255,255,0.5)]">StarryNight</h3>
                      <p className="font-inter text-white text-sm font-normal">This is a visual representation of an artwork turned into an interactive website. Using CSS, I animated a rotating galaxy with shiny stars representing links to different parts of the page.</p>
                      <div className="mt-auto flex justify-end">
                        <img src={telescope} alt="Telescope" onClick={() => setActiveProject("starrynight")} className="w-[163px] h-[181px] object-contain" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={cardVariant}
                    className={`absolute top-0 left-0 w-full h-100 border-gradient-web-design rounded-2xl backdrop-blur-2xl p-6 transition-all duration-500 shadow-xl ${activeCard === "rocket" ? "z-20" : "z-10 bg-black/60 scale-[0.98]"} cursor-pointer`}
                    onMouseEnter={() => setActiveCard("rocket")}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <h3 className="font-inter text-2xl font-bold text-white mb-4 [text-shadow:_0px_4px_4px_rgba(255,255,255,0.5)]">Animated Comic</h3>
                      <p className="font-inter text-white text-sm font-normal">An interactive page where you can read a comic from the Sonic The Hedgehog series in an animated style. Using the JS library, I made seamless transitions and image cut-ins for each panel.</p>
                      <div className="mt-auto flex justify-end">
                        <img src={rocket} alt="Rocket" onClick={() => setActiveProject("animatedcomic")} className="w-[151px] h-[166px] object-contain" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: video con contenido encima */}
      <div className="hidden md:block relative">
        {videoReady ? (
          <video autoPlay loop muted playsInline className="w-full block" style={{ pointerEvents: "none" }}>
            <source src={videoSrcMov} type="video/quicktime" />
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : (
          <img src={videoPoster} className="w-full block" style={{ pointerEvents: "none" }} />
        )}

        {/* Contenido desktop encima del video */}
        <div className="absolute inset-0">
          {/* Primera mitad — ArtCollectionCarousel */}
          <div className="absolute top-0 left-0 w-full h-1/2 flex justify-center items-start pt-[80px]">
            <div className="w-full max-w-[1360px] px-4">
              <ArtCollectionCarousel />
            </div>
          </div>

          {/* Título Animated Web Pages */}
          <motion.h2
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={titleVariant}
            className="hidden md:block font-orbitron text-nowrap font-black text-white absolute right-[38px] z-20 md:text-[40px] md:leading-[59px]"
            style={{ top: "calc(50% - 204px)", textShadow: "8px 12px 4px #000000" }}
          >
            Animated Web Pages
          </motion.h2>

          {/* Segunda mitad — Web Design Projects */}
          <div className="absolute bottom-0 left-0 w-full h-1/2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={starsVariant}
              className="absolute inset-0 w-full h-full stars-background pointer-events-none"
              style={{ zIndex: 1 }}
            />
            <div className="relative z-10 h-full">
              <div className="flex h-full">
                <motion.div
                  ref={cardsRef}
                  initial="hidden"
                  animate={cardsControls}
                  variants={cardsContainerVariant}
                  className="flex w-full items-start justify-end pr-[38px]"
                  style={{ marginTop: "-88px" }}
                >
                  <div className="relative w-[483px]">
                    <motion.div
                      variants={cardVariant}
                      className={`absolute top-25 -left-20 w-[483px] border-gradient-web-design rounded-2xl p-6 transition-all duration-500 shadow-xl ${activeCard === "telescope" ? "z-20" : "z-10 scale-[0.98]"} hover:shadow-[0_0_20px_rgba(147,197,253,0.5)] cursor-pointer`}
                      style={{ background: activeCard === "telescope" ? "#FFFFFF1A" : "#000B4280", backdropFilter: "blur(84.6px)", transition: "background 500ms" }}
                      onMouseEnter={() => setActiveCard("telescope")}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <h3 className="font-inter md:text-[40px] font-extrabold text-white md:leading-[59px]" style={{ textShadow: "0px 4px 4px #FFFFFF73", marginBottom: "10.35px" }}>StarryNight</h3>
                        <div className="font-inter text-white text-[20px] leading-[34px] flex flex-col gap-[34px]">
                          <p><span className="font-bold">Problem:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                          <p><span className="font-bold">Action:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                          <p><span className="font-bold">Result:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        <div className="mt-auto flex justify-end">
                          <img src={telescope} alt="Telescope" onClick={() => setActiveProject("starrynight")} className="w-[163px] h-[181px] object-contain cursor-pointer" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={cardVariant}
                      className={`absolute top-0 left-0 w-[483px] border-gradient-web-design rounded-2xl p-6 transition-all duration-500 shadow-xl ${activeCard === "rocket" ? "z-20" : "z-10 scale-[0.98]"} hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] cursor-pointer`}
                      style={{ background: activeCard === "rocket" ? "#FFFFFF1A" : "#000B4280", backdropFilter: "blur(84.6px)", transition: "background 500ms" }}
                      onMouseEnter={() => setActiveCard("rocket")}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <h3 className="font-inter md:text-[40px] font-extrabold text-white md:leading-[59px]" style={{ textShadow: "0px 4px 4px #FFFFFF73", marginBottom: "10.35px" }}>Animated Comic</h3>
                        <div className="font-inter text-white text-[20px] leading-[34px] flex flex-col gap-[34px]">
                          <p><span className="font-bold">Problem:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                          <p><span className="font-bold">Action:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                          <p><span className="font-bold">Result:</span><span className="font-normal"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </div>
                        <div className="mt-auto flex justify-end">
                          <img src={rocket} alt="Rocket" onClick={() => setActiveProject("animatedcomic")} className="w-[151px] h-[166px] object-contain cursor-pointer" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        }
      `}</style>

      {activeProject === "starrynight" && <StarryNight onClose={() => setActiveProject(null)} />}
      {activeProject === "animatedcomic" && <AnimatedComic onClose={() => setActiveProject(null)} />}
    </div>
  );
};

export default MidWaterfall2;
