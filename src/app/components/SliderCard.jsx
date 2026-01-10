"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainLayout from "../layouts/MainLayout";
import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import Card from "../components/Card";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";

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
const SliderCard = (props) => {
  const [sliderListData, setSliderListData] = useState([]);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get(`/cms-parent-child/ready_to_go_design`, {});

      if (response.status === 200) {
        setSliderListData(response.data);
      }

    } catch (err) {
      toast.error(err.message || "Failed to fetch data. Please try again.");
    }
  }, []);

useEffect(() => {
    fetchContentManagerPages();
}, [fetchContentManagerPages]);


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of slides
    slidesToScroll: 1,
    margin: 25,
    autoHeight: false,
    stagePadding: 50,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          stagePadding: 30,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          stagePadding: 20,
        },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          stagePadding: 10,
        },
      },
    ],
  };

  return (
    <div className="m-4">
      <div className="container my-5">
        <Slider {...settings}>
          {sliderListData&&sliderListData?.map((slider) => (
            <div className="m-4ss" key={slider.id}>
              <Card
                cardLinkName={`/ready-togo-design/gallery?id=${slider?.id}`}
                cardoffer="card"
                imgSrc={slider?.child_content?.image}
                imgAlt={slider.child_content.title ?? defaultAltText}
                imgClass={"fastrack_img"}
                titleCard={slider.child_content.title}
                titleClass="text-center text-muted mb-0 pb-0"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderCard;
