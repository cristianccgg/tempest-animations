import React, { useEffect, useRef } from "react";
import background from "../../assets/waterfall/background.png";
import waterfallWebm from "../../assets/Animations/waterfall1/waterfall1_final.webm";

const Waterfall = () => {
  const mobileTextRef = useRef(null);
  const desktopTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mobileTextRef.current) observer.observe(mobileTextRef.current);
    if (desktopTextRef.current) observer.observe(desktopTextRef.current);

    return () => {
      if (mobileTextRef.current) observer.unobserve(mobileTextRef.current);
      if (desktopTextRef.current) observer.unobserve(desktopTextRef.current);
    };
  }, []);

  const mobileContent = (
    <div className="text-white flex justify-evenly items-center font-poppins font-[900]">
      <div className="flex flex-col items-center">
        <h1 className="text-[32px] tracking-[0.06em] leading-[44px] text-center">20+</h1>
        <h2 className="text-[32px] tracking-[0.06em] leading-[44px] text-center">SKILLS</h2>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-[32px] tracking-[0.06em] leading-[44px]">
          10+ Projects <br /> Completed
        </h1>
      </div>
    </div>
  );

  const desktopContent = null;

  return (
    <div className="w-full h-[750px] md:h-auto relative flex flex-col md:justify-end justify-center overflow-hidden">
      {/* Mobile: imagen estática con contenido */}
      <div
        className="md:hidden absolute w-full h-full bg-[length:170%_100%] bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="md:hidden relative z-10 flex flex-col justify-center h-full">
        <div
          ref={mobileTextRef}
          className="relative w-full max-w-[1359px] mx-auto opacity-0 transition-opacity duration-1000 ease-in-out fade-in mt-[120px]"
        >
          {mobileContent}
        </div>
      </div>

      {/* Desktop: video animado con contenido */}
      <div className="hidden md:block relative">
        <video autoPlay loop muted playsInline className="w-full block" style={{ pointerEvents: "none" }}>
          <source src={waterfallWebm} type="video/webm" />
        </video>
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 max-w-[1360px] mx-auto">
            {/* Grupo izquierdo — TECH Artist */}
            <div
              ref={desktopTextRef}
              className="absolute text-white font-poppins font-[900] flex flex-col items-center opacity-0 transition-opacity duration-1000 ease-in-out fade-in"
              style={{ bottom: "16.5%", left: "41px" }}
            >
              <h1 className="text-[100px] leading-none tracking-[0.05em] text-center">TECH</h1>
              <h2 className="text-[80px] leading-none tracking-[0.06em] text-center">Artist</h2>
            </div>
            {/* Grupo derecho — 10+ Projects */}
            <div
              className="absolute text-white font-poppins font-[900] flex flex-col items-center"
              style={{ bottom: "calc(16.5% - 66px)", right: "71px" }}
            >
              <h1 className="tracking-[0.06em] text-center flex flex-col items-center">
                <span className="text-[128px] leading-none">10+</span>
                <span className="block h-[40px]" />
                <span className="text-[48px] leading-[72px]">Projects<br/>Completed</span>
              </h1>
            </div>
          </div>{/* end max-w wrapper */}
        </div>
      </div>
    </div>
  );
};

export default Waterfall;
