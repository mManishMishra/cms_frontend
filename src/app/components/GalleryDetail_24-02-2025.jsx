import { useState } from "react";

const GalleryDetail = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Function to toggle fullscreen mode
  const handleClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Function to close fullscreen mode
  const handleClose = () => {
    setIsFullScreen(false);
  };

  return (
    <div>
      {/* Image that triggers fullscreen on click */}

      <img
        src={props.imgGalUrl} // Use the dynamic image URL
        alt={props.imgGalAlt} // Use the dynamic alt text
        className={props.imgGalImgClass} // Dynamic class for styling
        onClick={handleClick}
        style={{ cursor: "pointer" }} // Adjust size as necessary
      />

      {/* Fullscreen Mode */}
      {isFullScreen && (
        <div className="container-fluid">
          <div
            className="container popup_container"
            style={{
              height: "80vh",
            }}
          >
            <button className="close-btn me-5 mt-3" onClick={handleClose}>
              &times; {/* Close Icon */}
            </button>
            {/* Display full-size image */}
            <img
              src={props.imgGalUrl} // Use the dynamic full-screen image URL
              alt="Fullscreen Image"
              className="d-flex m-auto popup_img"
              style={{
                height: "80vh",
                maxWidth: "100%",
                display: "flex",
                margin: "auto",
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .container-fluid {
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding-top:106px;
          bottom: 0;
          curser:pointer;
        background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          z-index: 1000;
        }

        .fullscreen-image {
          // max-width: 100%;
          // max-height: 100%;
          // object-fit: contain;
          width: 100%;
          height: auto;
          border-radius:16px;
    object-fit: cover;
        }

        .close-btn {
    position: absolute;
    top: 110px;
    right: 0px;
    background: rgba(0, 0, 0, .7);
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 5px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    z-index: 1100;
    width: 40px;
    height: 40px;
    align-items: center;
    display: flex
;
    justify-content: center;
}
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.9);
        }
          @media screen and (min-width: 300px) and (max-width: 991px) {
  .container-fluid {
          padding-top:0px;
  }
      }
  @media only screen and (max-width: 767px) {
.popup_container{
height:50vh !important;
}
.popup_img{
height:50vh !important;
}
}
      `}</style>
    </div>
  );
};

export default GalleryDetail;
