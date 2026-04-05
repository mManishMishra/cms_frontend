"use client";
import RowImage from "../components/RowImage";
import { IoIosShareAlt } from "react-icons/io";
import Card from "../components/Card";
import BgImageCard from "../components/BgImageCard";
import { FaComments } from "react-icons/fa";
import Blogs from "../components/Blogs";
import RoomOfice from "../components/RoomOfice";
import SliderCard from "../components/SliderCard";
import VideoTestimonialSlider from "../components/VideoTestimonialSlider";
import { MdKeyboardArrowRight } from "react-icons/md";
import IconBox from "../components/IconBox";
import CounterRow from "../components/CounterRow";
import { useState } from "react";
import axios from "axios";


const letsConnectUrl = "http://hc-admin.shivankgautam.com/lets-connect";
const Home = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        pickUpLocation: "",
        email: "",
        contact: "",  // Change from contactNo to contact to match the DTO
        checkInDate: "",
        checkOutDate: "",
        query: "",
        gdprConsent: false,  // Change from consent to gdprConsent to match the DTO
    });

    // State to handle errors and success messages
    const [submissionError, setSubmissionError] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData((prevData) => ({ ...prevData, gdprConsent: checked }));
        console.log("Checkbox state:", checked);  // Debugging line
    };

    // Handle form submission
    // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has provided consent
    if (!formData.gdprConsent) {  // Fix the key to formData.gdprConsent
        setSubmissionError("You must agree to the GDPR Terms before submitting.");
        return;
    }

    try {
        const response = await axios.post(letsConnectUrl, formData);
        if (response.status === 201) {
            setSubmissionMessage("Form submitted successfully!");
            setFormData({
                fullName: "",
                pickUpLocation: "",
                email: "",
                contact: "",
                checkInDate: "",
                checkOutDate: "",
                query: "",
                gdprConsent: false,  // Reset consent to gdprConsent
            });
        } else {
            setSubmissionError("Failed to submit form. Please try again.");
        }
    } catch (error) {
        setSubmissionError("Error submitting form. Please try again.");
        console.error("Error:", error);
    } finally {
        // Clear error message after some time
        setTimeout(() => {
            setSubmissionError("");
            setSubmissionMessage("");
        }, 5000);
    }
};

    return (
        <div>
            <section className="p-0 m-0 video_wrapper container-fluid position-relative">
                <video width="100%" height="auto" autoPlay loop muted id="myVideo">
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="rotate_div container-fluid me-0 ms-auto">
                    <div className="sssss me-0 ms-auto">
                        <a href="#form" className="know_moress">
                            Enquiry Now
                        </a>
                    </div>
                    <div className="mt-4 me-0 ms-auto">
                        <a href="" className="">
                            <img src="/images/whatsapp.svg" width={50} alt="" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="my-5 about_wrapper">
                <RowImage
                    imageColLg="6"
                    imageColXl="6"
                    imageColMd="6"
                    imageCol="12"
                    ImgAbout={"/images/iconsHC.png"}
                    ImgAboutClass={"aboout_img object-fit-contain w-100"}
                    imgAlt="About"
                    titleHeading="About"
                    subHeading={"High Creation"}
                    subHeadingClass="font_stylish ps-3"
                    description="HC Interior is a leading interior design company focused on crafting personalized,
                        functional spaces for homes and businesses. With a blend of creativity and expertise,
                        the team delivers designs tailored to individual tastes, ensuring comfort and style. They
                        handle a wide variety of projects, including living rooms, bedrooms, kitchens, and
                        corporate oBices, with an emphasis on cost-eBective, customized solutions. HC
                        Interior’s commitment to quality and detail ensures that each space is both beautiful
                        and practical, oBering free consultations, a one-year maintenance plan, and long-term
                        warranties."
                    textAboutBtn="READ MORE"
                    textAboutBtnCLass="read_morebtn"
                />
            </section>

            <div className="my-5 oofer_card">
                <div className="container">
                    <div className="mx-0 row g-4">
                        <h2 className="pb-3">
                            <span className="font_stylish">Explore</span> What we Offer
                        </h2>
                        <div className="col-lg-3 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/explore_offer_img1.webp"}
                                imgAlt={"room"}
                                imgClass={"offerimg"}
                                titleCard={"Design & Planning"}
                                descriptionCard={
                                    "We collaborate with you to bring your vision to life, ensuring tailored solutions that fit your needs"
                                }
                                buttonTextCard={"Know More"}
                                linkCard="#"
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/explore_offer_img2.webp"}
                                imgAlt={"room"}
                                imgClass={"offerimg"}
                                titleCard={"Custom & Solution"}
                                descriptionCard={
                                    "Our team works to craft unique and personalized designs, meeting both style and functionality."
                                }
                                buttonTextCard={"Know More"}
                                linkCard="#"
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/explore_offer_img3.webp"}
                                imgAlt={"room"}
                                imgClass={"offerimg"}
                                titleCard={"Furniture & Decor"}
                                descriptionCard={
                                    "We provide a curated selection of furniture and decor items that perfectly complement your space. "
                                }
                                buttonTextCard={"Know More"}
                                linkCard="#"
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/explore_offer_img4.webp"}
                                imgAlt={"room"}
                                imgClass={"offerimg"}
                                titleCard={"Kitchen"}
                                descriptionCard={
                                    "Our expert designs focus on creating practical, stylish kitchens suited to your lifestyle"
                                }
                                buttonTextCard={"Know More"}
                                linkCard={"#"}
                            />
                        </div>

                        <div className="mt-5 text-end">
                            <a href="" className="pe-2 know_more fs-6">
                                View More <MdKeyboardArrowRight className="fs-4" />{" "}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="way_wework">
                <div className="container">
                    <div className="mx-0 row justify-content-center g-lg-0">
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="box1">
                                <h3 className="box_heading">01</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6 ps-0">
                            <div className="box2">
                                <div className="px-4 py-4">
                                    <img src="/images/wework_icon1.png" width={60} alt="" />
                                    <h4 className="py-2 text-white"> Initial Concept:</h4>
                                    <p className="box_para">
                                        Your dream interior begins with a vision.
                                    </p>
                                    <button className="know_mores" href="">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="box_2">
                                <h3 className="box_heading">02</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6 ps-0">
                            <div className="box2_data">
                                <div className="px-4 py-4">
                                    <img src="/images/wework_icon2.png" width={60} alt="" />
                                    <h4 className="py-2 text-white">Creative Blueprint:</h4>
                                    <p className="box_para">
                                        Every design starts with a unique concept.
                                    </p>
                                    <button className="know_mores" href="">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="box_3">
                                <h3 className="box_heading">03</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6 ps-0">
                            <div className="box3_data">
                                <div className="px-4 py-4">
                                    <img src="/images/wework_icon3.png" width={60} alt="" />
                                    <h4 className="py-2 text-white">Design Strategy:</h4>
                                    <p className="box_para">
                                        Your dreams&apos; interiors originate with an idea.
                                    </p>
                                    <button className="know_mores" href="">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="box4 box_3">
                                <h3 className="box_heading">04</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6 ps-0">
                            <div className="box4_data">
                                <div className="px-4 py-4">
                                    <img src="/images/wework_icon4.png" width={60} alt="" />
                                    <h4 className="py-2 text-white">Plan Progress:</h4>
                                    <p className="box_para">
                                        An idea becomes your desired design.
                                    </p>
                                    <button className="know_mores" href="">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="box5 box_3">
                                <h3 className="box_heading">05</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6 ps-0">
                            <div className="box5_data">
                                <div className="px-4 py-4">
                                    <img src="/images/wework_icon5.png" width={60} alt="" />
                                    <h4 className="py-2 text-white">Customized Planning:</h4>
                                    <p className="box_para">
                                        It all starts with a tailored concept space.
                                    </p>
                                    <button className="know_mores" href="">
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5 video">
                <h3 className="pb-2 text-center">
                    <span className="font_stylish">Meet Us</span>
                </h3>
                <p className="pb-4 text-center">
                    Let us know more about each other. We can meet over a cup of coffee or
                    even online too. We’d like to know what you ’re looking for .
                </p>
                <div className="">
                    <iframe
                        width="100%"
                        height="480"
                        className="map"
                        src="https://www.youtube.com/embed/OzUkvzyBttA"
                        title="Simple &amp; Elegent 3bhk Home Tour @ Dighi | Best Interior Designer in Pune | Kams Designer Zone"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="pt-5 my-5 designidea">
                <div className="container">
                    <div className="mx-0 row ">
                        <h2 className="pb-5 text-center">
                            Design Idea for
                            <span className="font_stylish">Every Space</span>
                        </h2>

                        <div className="mb-5 col-lg-6 col-md-6 col-12 mb-lg-0">
                            <RoomOfice
                                cardRoomOffice={"card card_room border-0"}
                                badge_circle="badge_circle"
                                arrowIcon="images/arrow_icon.png"
                                altArrow="arrow"
                                width="80"
                                imageRoom_Office="images/residential_img.webp"
                                roomImg="residential_imgs"
                                altImage="Office Spaces"
                                cardBody="card_body room_card_body"
                                cardTitle="Residential Space "
                                cardText="The interior design of
your dream begins with
a concept."
                                btnText="Know More "
                                btnClass={"btn btn_knowmore"}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <RoomOfice
                                cardRoomOffice={"card card_room border-0"}
                                badge_circle="badge_circleblack"
                                arrowIcon="images/arrow_icon.png"
                                altArrow="arrow"
                                width="80"
                                imageRoom_Office="images/office_img.webp"
                                roomImg="residential_imgs"
                                altImage="room"
                                cardBody="card_body office_card_body"
                                cardTitle="Office Spaces"
                                cardText="The interior design of
your dream begins with
a concept."
                                btnText="Know More "
                                btnClass={"btn btn_knowmoreblack"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="my-5">
                <div className="container">
                    <div className="mx-0 row">
                        <span className="font_stylish">Fast-Track your decision</span>
                        <h3 className="text-center">with Our Exclusive Design Choices</h3>
                    </div>
                    <div className="d-flex justify-content-end ">
                        <select
                            className="form-select sort me-lg-5"
                            aria-label="Default select example"
                        >
                            <option>sort</option>
                            <option defaultValue="1">One</option>
                            <option defaultValue="2">Two</option>
                            <option defaultValue="3">Three</option>
                        </select>
                    </div>
                    <SliderCard />
                </div>
            </section>

            <div className="my-5 bgsectionroom">
                <div className="container">
                    <span className="pb-0 mb-0 text-center font_stylish d-grid">
                        Designer’s Choice:
                    </span>
                    <h3 className="pb-4 text-end pe-lg-5 me-lg-5">
                        Exclusive Design Specials <br />
                        curated just for you.
                    </h3>
                    <div className="row g-4">
                        <div className="col-lg-5 col-md-6 col-12">
                            <BgImageCard
                                designerCardBgDiv={"designercard designercardimg1"}
                                titleBgImage={"Dark Desier"}
                                descriptionBg={"Designed By Ranveer Singh "}
                                ratingBg={"4.73(130)"}
                                buttonShareBg={<IoIosShareAlt className="text-white fs-4" />}
                                buttonCommentBg={<FaComments className="text-white fs-4" />}
                            />
                        </div>
                        <div className="col-lg-7 col-md-6 col-12">
                            <BgImageCard
                                designerCardBgDiv={"designercard designercardimg2"}
                                titleBgImage={"Dark Desier"}
                                descriptionBg={"Designed By Ranveer Singh "}
                                ratingBg={"4.73(130)"}
                                buttonShareBg={<IoIosShareAlt className="text-white fs-4" />}
                                buttonCommentBg={<FaComments className="text-white fs-4" />}
                            />
                        </div>
                        <div className="col-lg-7 col-md-6 col-12">
                            <BgImageCard
                                designerCardBgDiv={"designercard designercardimg3"}
                                titleBgImage={"Dark Desier"}
                                descriptionBg={"Designed By Ranveer Singh "}
                                ratingBg={"4.73(130)"}
                                buttonShareBg={<IoIosShareAlt className="text-white fs-4" />}
                                buttonCommentBg={<FaComments className="text-white fs-4" />}
                            />
                        </div>
                        <div className="col-lg-5 col-md-6 col-12">
                            <BgImageCard
                                designerCardBgDiv={"designercard designercardimg4"}
                                titleBgImage={"Dark Desier"}
                                descriptionBg={"Designed By Ranveer Singh "}
                                ratingBg={"4.73(130)"}
                                buttonShareBg={<IoIosShareAlt className="text-white fs-4" />}
                                buttonCommentBg={<FaComments className="text-white fs-4" />}
                            />
                        </div>

                        <div className="col-lg-12">
                            <BgImageCard
                                designerCardBgDiv={"designercard designercardimg5"}
                                titleBgImage={"Dark Desier"}
                                descriptionBg={"Designed By Ranveer Singh "}
                                ratingBg={"4.73(130)"}
                                buttonShareBg={<IoIosShareAlt className="text-white fs-4" />}
                                buttonCommentBg={<FaComments className="text-white fs-4" />}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-5 celebereting">
                <div className="container">
                    <div className="mx-0 row">
                        <h3 className="text-center">
                            <span className="font_stylish">Celebrating Excellence:</span>
                        </h3>
                        <CounterRow
                            ImgCounter="/images/CelebratingExcellenc.jpeg"
                            ImgCounterClass="w-100"
                            imgAltCounter="CelebratingExcellenc"
                            divClassCounter="text-end"
                            counterStart="0"
                            counterEnd="250"
                            counterDuration="5"
                            counterSuffix="+"
                            counterStart2="0"
                            counterEnd2="500"
                            counterDuration2="5"
                            counterSuffix2=""
                            titleHeadingCounter="Our Projects Journey"
                            subHeadingClassCounter=""
                            subHeadingCounter=""
                            descriptionCounter="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
been the industry's standard dummy text ever since the 1500s, when an unknown printer
took a galley of type and scrambled it to make a type specimen book. It has survived not
only five centuries, but also the leap into electronic typesetting, remaining essentially
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum."
                            textAboutBtnCounter="View Our Projects"
                            textAboutBtnCLass="know_more me-lg-4"
                            textAboutBtnCounter2="All Services"
                            textAboutBtnCLass2="btn_services"
                        />
                    </div>
                </div>
            </div>

            <div className="savedesign">
                <div className="container">
                    <div className="mx-0 row g-4 justify-content-center">
                        <h3 className="mb-0">
                            <span className="font_stylish">Lets Save time</span>
                        </h3>
                        <h3 className="pb-5">Choose our Existing Exclusive designs.</h3>

                        <div className="col-lg-4 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/Bhk/1Bhk.webp"}
                                imgAlt={"room"}
                                imgClass={"bhkimg"}
                                titleCard={"1 BHK"}
                                titleClass="text-center mb-0 pb-0"
                            />
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/Bhk/2Bhk.webp"}
                                imgAlt={"room"}
                                imgClass={"bhkimg"}
                                titleCard={"2 BHK"}
                                titleClass="text-center mb-0 pb-0"
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <Card
                                cardNameALl="cardoffer"
                                imgSrc={"/images/Bhk/3Bhk.webp"}
                                imgAlt={"room"}
                                imgClass={"bhkimg"}
                                titleCard={"3 BHK"}
                                titleClass="text-center mb-0 pb-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="mb-5 lettransformbg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-3">
                            <img src="/images\Home_icon.png" width={150} alt="" />
                        </div>
                        <div className="col-lg-10 col-md-9 col-9">
                            <div className="pt-3 text-end">
                                <h3 className="text-white letheading">
                                    Let&apos;s transform your vision
                                </h3>
                                <p className="text-white">into interior masterpieces</p>
                                <a href="" className="know_more">
                                    Know More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="my-5 blogs_wrapper">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <h3 className="pb-4 font-bold text-center">Blogs</h3>
                        <div className="col-lg-4 col-md-6 col-12">
                            <Blogs
                                blogCard="blog_cards"
                                imgSrcBlog="/images/Blog/Blog_img1.webp"
                                blogImgALt="blog2"
                                blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                                blogdate="published on April 21, 2024"
                                blogTitle="High creation’s Premier Services
for Interior Design Tours ...
"
                                blogDescription="  Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry."
                                buttonBlog="Continue Reading"
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <Blogs
                                blogCard="blog_cards"
                                imgSrcBlog="/images/Blog/Blog_img2.webp"
                                blogImgALt="blog2"
                                blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                                blogdate="published on April 21, 2024"
                                blogTitle="High creation’s Premier Services
for Interior Design Tours ...
"
                                blogDescription="  Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry."
                                buttonBlog="Continue Reading"
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <Blogs
                                blogCard="blog_cards"
                                imgSrcBlog="/images/Blog/Blog_img3.webp"
                                blogImgALt="blog2"
                                blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                                blogdate="published on April 21, 2024"
                                blogTitle="High creation’s Premier Services
                  for Interior Design Tours ..."
                                blogDescription="  Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry."
                                buttonBlog="Continue Reading"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <section className="my-5">
                <VideoTestimonialSlider />
            </section>
            <hr />
            <section className="container my-5 iconbox">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row justify-content-center align-items-center g-4">
                            <div className="col-12 col-md-6 col-lg-4">
                                <IconBox
                                    iconUrl="/images/icon_check.png"
                                    iconAlt="checkicon"
                                    iconWidth="70"
                                    iconDescription="Because every corner . hold a unique design potentiBecause every
                corner . hold a unique design potential"
                                    descr="descriptionClass"
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <IconBox
                                    iconUrl="/images/icon_mobile.png"
                                    iconAlt="mobileicon"
                                    iconWidth="70"
                                    iconDescription=" Because every corner . hold a unique design potentiBecause every
                corner . hold a unique design potential"
                                    descr="descriptionClass"
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <IconBox
                                    iconUrl="/images/icon_play.png"
                                    iconAlt="play"
                                    iconWidth="70"
                                    iconDescription=" Because every corner . hold a unique design potentiBecause every
                corner . hold a unique design potential"
                                    descr="descriptionClass"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <div className="my-5 form">
                <div className="container">
                    <div className="row position-relative card_form_row">
                        <div className="col-lg-7 col-md-5 col-12">
                            <div className="rounded map pe-lg-5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.086690960129!2d77.3736059745727!3d28.62716378432606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce935de2f5987%3A0x4333ffee08ad5270!2sHigh%20Creation%20Interior%20-%20Best%20Home%20And%20Office%20Interior%20Designer%20In%20Noida!5e0!3m2!1sen!2sin!4v1727021310878!5m2!1sen!2sin"
                                    width="100%"
                                    height="500"
                                    className="map"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-7 col-12" id="form">
                            <div className="contact_form">
                                <h4 className="mb-3 text-black form_heading">
                                    Reach Out With Confidence
                                </h4>
                                <form className="row" onSubmit={handleSubmit}>
                                    {submissionMessage && (
                                        <div className="text-center alert alert-success alert-dismissible fade show">
                                            {submissionMessage}
                                        </div>
                                    )}
                                    {submissionError && (
                                        <div className="text-center alert alert-danger alert-dismissible fade show">
                                            {submissionError}
                                        </div>
                                    )}

                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            placeholder="*Full Name"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pickUpLocation"
                                            placeholder="*Pick Up Location"
                                            value={formData.pickUpLocation}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="*Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="contact"
                                            placeholder="*Contact No."
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="checkInDate"
                                            placeholder="*Check In Date"
                                            value={formData.checkInDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="checkOutDate"
                                            placeholder="*Check Out Date"
                                            value={formData.checkOutDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 col-md-12">
                                        <textarea
                                            className="form-control"
                                            name="query"
                                            placeholder="Query"
                                            rows="3"
                                            value={formData.query}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="invalidCheck"
                                                checked={formData.gdprConsent}
                                                onChange={handleCheckboxChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="invalidCheck">
                                                I consent to the GDPR Terms
                                            </label>
                                            <div className="invalid-feedback">You must agree before submitting.</div>
                                        </div>
                                    </div>

                                    <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                                        <button className="px-5 btn know_more" type="submit">
                                            SEND
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Home;
