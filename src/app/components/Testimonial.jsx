"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi"; // Import the icons

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next arrow_landing_next" onClick={onClick}>
      <MdKeyboardArrowRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev arrow_landing_prev" onClick={onClick}>
      <MdOutlineChevronLeft />
    </div>
  );
};
const Testimonial = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1, // Default number of slides
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
          slidesToShow: 1,
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
    <div className="m-lg-4">
      <div className="swiper-container my-5">
        <Slider {...settings}>
          <div className="m-lg-4">
            <div className="testimonial-card">
              <BiSolidQuoteAltLeft className="quote-icon left-quote" />

              <img
                src="/images/hc_landing_2/testimonial_1.png"
                className="testimonial-image"
                alt=""
              />
              <p className="testimonial-feedback">
                I got my interior work done through HC interiors. The project
                was handled well and the work was completed on time. Overall,
                given that interior work has its ups and downs, I am satisfied
                with the work done
              </p>
              <p className="testimonial-name">- Raman Walia</p>
              <BiSolidQuoteAltRight className="quote-icon right-quote" />
            </div>
          </div>
          <div className="m-lg-4">
            <div className="testimonial-card">
              <BiSolidQuoteAltLeft className="quote-icon left-quote" />

              <img
                src="/images/hc_landing_2/testimonial_2.png"
                className="testimonial-image"
                alt=""
              />
              <p className="testimonial-feedback">
                I got my interior work done through HC interiors. The project
                was handled well and the work was completed on time. Overall,
                given that interior work has its ups and downs, I am satisfied
                with the work done
              </p>
              <p className="testimonial-name">- Raman Walia</p>
              <BiSolidQuoteAltRight className="quote-icon right-quote" />
            </div>
          </div>
          <div className="m-lg-4">
            <div className="testimonial-card">
              <BiSolidQuoteAltLeft className="quote-icon left-quote" />

              <img
                src="/images/hc_landing_2/testimonial_1.png"
                className="testimonial-image"
                alt=""
              />
              <p className="testimonial-feedback">
                I got my interior work done through HC interiors. The project
                was handled well and the work was completed on time. Overall,
                given that interior work has its ups and downs, I am satisfied
                with the work done
              </p>
              <p className="testimonial-name">- Raman Walia</p>
              <BiSolidQuoteAltRight className="quote-icon right-quote" />
            </div>
          </div>
          <div className="m-lg-4">
            <div className="testimonial-card">
              <BiSolidQuoteAltLeft className="quote-icon left-quote" />

              <img
                src="/images/hc_landing_2/testimonial_2.png"
                className="testimonial-image"
                alt=""
              />
              <p className="testimonial-feedback">
                I got my interior work done through HC interiors. The project
                was handled well and the work was completed on time. Overall,
                given that interior work has its ups and downs, I am satisfied
                with the work done
              </p>
              <p className="testimonial-name">- Raman Walia</p>
              <BiSolidQuoteAltRight className="quote-icon right-quote" />
            </div>
          </div>
          <div className="m-lg-4">
            <div className="testimonial-card">
              <BiSolidQuoteAltLeft className="quote-icon left-quote" />

              <img
                src="/images/hc_landing_2/testimonial_2.png"
                className="testimonial-image"
                alt=""
              />
              <p className="testimonial-feedback">
                I got my interior work done through HC interiors. The project
                was handled well and the work was completed on time. Overall,
                given that interior work has its ups and downs, I am satisfied
                with the work done
              </p>
              <p className="testimonial-name">- Raman Walia</p>
              <BiSolidQuoteAltRight className="quote-icon right-quote" />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
