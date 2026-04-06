"use client";
import { useState } from "react";

export default function FullScreenImage() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleClose = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      {/* Normal Image */}
      <img
        src="/images/Blog/blo_img1.webp"
        alt="Click to expand"
        
        onClick={handleClick}
        style={{ cursor: "pointer", width: "300px" }} // normal image size
      />

      {/* Fullscreen Image with Close Button */}
      {isFullScreen && (
        <div className="fullscreen-container">
          <button className="close-btn" onClick={handleClose}>
            &times; {/* Close Icon */}
          </button>
          <img
        src="/images/Blog/blo_img1.webp"
            alt="Fullscreen Image"
            className="fullscreen-image"
          />
        </div>
      )}

      <style jsx>{`
        .fullscreen-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .fullscreen-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 2rem;
          cursor: pointer;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}
