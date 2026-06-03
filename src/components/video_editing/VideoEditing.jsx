import React from "react";
import background from "../../assets/video_editing/background.png";
import videoEditingWebm from "../../assets/Animations/video-editing/Video-editing-section_final.webm";

const VideoEditing = () => {
  return (
    <div className="w-full h-[759px] md:h-auto relative overflow-hidden">
      {/* Mobile: imagen estática */}
      <div
        className="md:hidden absolute inset-0 h-full bg-center bg-cover -right-[260px] bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Desktop: video animado */}
      <div className="hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
          style={{ pointerEvents: "none" }}
        >
          <source src={videoEditingWebm} type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default VideoEditing;
