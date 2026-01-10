import { useState } from "react";

const GalleryDetail = ({ imgGalUrl, imgGalAlt, imgGalImgClass, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Ensure images array has valid data
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[currentIndex]?.image : imgGalUrl;

  const handleNext = () => {
    if (hasImages) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (hasImages) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handleClick = (index) => {
    if (hasImages) {
      setCurrentIndex(index); // Set index based on clicked image
      setIsFullScreen(true);
    }
  };

  const handleClose = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      {/* Main Image */}
      <img
  src={imgGalUrl}
  alt={imgGalAlt}
  className={imgGalImgClass}
  onClick={() => handleClick(images.findIndex(img => img.image === imgGalUrl))}
  style={{ cursor: "pointer" }}
/>

      {/* Fullscreen View */}
      {isFullScreen && (
        <div className="container-fluid2">
          <div className="container popup_container">
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <img src={currentImage} alt="Fullscreen Image" className="popup_img" />
            {hasImages && (
              <>
                <button className="nav-btn left" onClick={handlePrev}>❮</button>
                <button className="nav-btn right" onClick={handleNext}>❯</button>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .container-fluid2 {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        }
        .popup_container {
          position: relative;
          height: 80vh;
          display: flex;
          align-items: center;
        }
        .popup_img {
           width: 100%;
          max-height: 80vh;
          object-fit: contain;
        }
        .close-btn {
          position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, .7);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    height: 40px;
    width: 40px;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          color: white;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
        }
        .nav-btn.left {
          left: 10px;
        }
        .nav-btn.right {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default GalleryDetail;
