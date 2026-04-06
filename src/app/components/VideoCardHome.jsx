"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import the optimized image component

const VideoThumbnail = ({ videoUrl, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-thumbnail">
      {isPlaying ? (
        <iframe
          src={videoUrl}
          title="Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="video-frame"
        ></iframe>
      ) : (
        <div className="thumbnail-container">
          {/* OPTIMIZATION: Use Next/Image instead of background-image */}
          <Image 
            src={imageUrl || "/images/default-thumbnail.jpg"} // Fallback if image is missing
            alt="Video Thumbnail"
            fill
            className="thumbnail-img"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} // Loads immediately
          />
          
          <button onClick={handlePlay} className="play-button">
            {/* Increased width to 80 to match live site feel */}
            <Image 
              src="/images/circle_play.png" 
              width={80} 
              height={80} 
              alt="play" 
            />
          </button>
        </div>
      )}

      <style jsx>{`
        .video-thumbnail {
          position: relative;
          width: 100%;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          background-color: #f0f0f0;
        }

        .video-frame {
          width: 100%;
          height: 100%;
          border: none;
          background: black;
          display: block;
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        :global(.thumbnail-img) {
          object-fit: cover;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: transparent; /* Removed the white background */
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s ease;
          z-index: 10;
        }

        .play-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        @media screen and (max-width: 767px) {
          .video-thumbnail {
            min-height: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoThumbnail;
