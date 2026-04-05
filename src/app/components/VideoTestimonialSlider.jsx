"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "@/utils/api";
const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    <MdKeyboardArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    <MdOutlineChevronLeft />
  </div>
);

const VideoTestimonial = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchYoutubeVideos = async () => {
      try {
        const response = await api.get("/cms-content/home_page_content");
        setYoutubeVideos(response.data);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchYoutubeVideos();
  }, []);

  console.log('youtubeVideos', youtubeVideos);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "5px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 600, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center mx-0">
        <div className="col-lg-11">
          {loading ? (
            <p>Loading videos...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <Slider {...settings}>
              {youtubeVideos.length > 0
                ? youtubeVideos.map((video, index) => (
                    <div key={index} className="m-4">
                      <iframe
                        height="250"
                        className="map video_card"
                        src={video.json_content.description}
                        title={video.json_content.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))
                : // Fallback default videos if API fails
                  ["k2yUmWMMY_A", "CUSkOUgr0Oc", "Dc-7Fj8sOa8", "iqtAPVt4p-k"].map((id, index) => (
                    <div key={index} className="m-4">
                      <iframe
                        height="250"
                        className="map video_card"
                        src={`https://www.youtube.com/embed/${id}`}
                        title={`YouTube Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonial;
