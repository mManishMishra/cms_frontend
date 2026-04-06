"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainLayout from "../layouts/MainLayout";
import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import Card from "../components/Card";

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
const page = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    margin: 25,
    autoHeight: false,
    stagePadding: 50,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="m-4">
      <MainLayout>
        <main>
          <div className="container my-5">
            <Slider {...settings}>
              <div className="m-4">
                <Card
                  cardoffer="card"
                  imgSrc={"/images/fastTrack_Slide1.webp"}
                  imgAlt={"room"}
                  imgClass={"fastrack_img"}
                  titleCard={"Living Room "}
                  titleclassName="text-center mb-0 pb-0"
                />
              </div>
              <div className="m-4">
                <Card
                  cardoffer="card"
                  imgSrc={"/images/fastTrack_Slide2.webp"}
                  imgAlt={"room"}
                  imgClass={"fastrack_img"}
                  titleCard={"Attic"}
                  titleclassName="text-center mb-0 pb-0"
                />
              </div>
              <div className="m-4">
                <Card
                  cardoffer="card"
                  imgSrc={"/images/fastTrack_Slide3.webp"}
                  imgAlt={"room"}
                  imgClass={"fastrack_img"}
                  titleCard={"Cozy room"}
                  titleclassName="text-center mb-0 pb-0"
                />
              </div>
              <div className="m-4">
                <Card
                  cardoffer="card"
                  imgSrc={"/images/fastTrack_Slide1.webp"}
                  imgAlt={"room"}
                  imgClass={"fastrack_img"}
                  titleCard={"Attic"}
                  titleclassName="text-center mb-0 pb-0"
                />
              </div>
              <div className="m-4">
                <Card
                  cardoffer="card"
                  imgSrc={"/images/fastTrack_Slide1.webp"}
                  imgAlt={"room"}
                  imgClass={"fastrack_img"}
                  titleCard={"Living Room "}
                  titleclassName="text-center mb-0 pb-0"
                />
              </div>
            </Slider>
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default page;
