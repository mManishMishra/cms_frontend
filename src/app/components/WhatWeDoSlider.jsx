"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import MainLayout from "../layouts/MainLayout";
import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <MdKeyboardArrowRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <MdOutlineChevronLeft />
    </div>
  );
};

const SliderAbout = (props) => {
  const [aboutSlider, setAboutSlider] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/about_us_slider", {});
      if (response.data?.length > 0) {
        setAboutSlider(response.data ?? []);
      }
      setLoading(false);
    } catch (err) {
      toast.error(
        err.message ?? "Failed to fetch team data. Please try again."
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of slides
    slidesToScroll: 1,
    // className: "center",
    // centerMode: true,
    // centerPadding: "10px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="m-4">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-11 slider-container">
            {aboutSlider && (
              <Slider {...settings}>
                {aboutSlider.map((sliderItems) => (
                  <div key={sliderItems.id}>
                    <a href="#">
                      <div className="whatwedo_card">
                        <img
                          src={sliderItems?.json_content?.image}
                          alt={
                            sliderItems?.json_content?.title ?? defaultAltText
                          }
                          className="responsive-media object-fit-contain"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="card-body text-center pt-3">
                          <h4 className="card-title py-3 text-black">
                            {sliderItems?.json_content?.title ?? "-"}
                          </h4>
                          <p className="team_description">
                            {sliderItems?.json_content?.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderAbout;
