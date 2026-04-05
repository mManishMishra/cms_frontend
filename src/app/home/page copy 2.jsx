"use client";
import RowImage from "../components/RowImage";
import Head from "next/head";
import { IoIosShareAlt } from "react-icons/io";
import Card from "../components/Card";
import { format, isValid, parseISO } from "date-fns";
import VideoCardHome from "../components/VideoCardHome";
import BgImageCard from "../components/BgImageCard";
import { FaComments } from "react-icons/fa";
import Blogs from "../components/Blogs";
import RoomOfice from "../components/RoomOfice";
import SliderCard from "../components/SliderCard";
import VideoTestimonialSlider from "../components/VideoTestimonialSlider";
import { MdKeyboardArrowRight } from "react-icons/md";
import IconBox from "../components/IconBox";
import CounterRow from "../components/CounterRow";
import { useCallback, useEffect, useState } from "react";
import ContactUsPopUp from "../components/ContactUsPopUp";
import api from "@/utils/api";
import HeadComponent from "../components/HeadComponent";

const Home = () => {
  // const [pageTitle, setPageTitle] = useState("homehc - My Website");
  // const [pageDescription, setPageDescription] = useState(
  //   "Learn team, and values."
  // );

  // useEffect(() => {
  //   document.title = pageTitle;
  // }, [pageTitle]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    place: "",
    query: "",
    termsAndConditions: false,
  });

  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [homepageBannerData, setHomepageBannerData] = useState();

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/homepage_banner", {});
      if (response.data && response.data.json_content) {
        setHomepageBannerData(response.data?.json_content);
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, []);


  const [designIdea, setDesignIdea] = useState([]);
  const [h3d_gallery, setH3d_gallery] = useState([]);
  const [HomePageContent, setHomePageContent] = useState([]);
  const [loading, setLoading] = useState(true);
   const [seoData, setSeoData] = useState({});

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  useEffect(() => {
    setLoading(true);
    const fetchDesignIdea = async () => {
      try {
        const response = await api.get("/cms-parent-child/designer_choice");
        setDesignIdea(response.data);
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignIdea();
  }, []);


  useEffect(() => {
    setLoading(true);
    const fetch_h3d_gallery = async () => {
      try {
        const response = await api.get("/cms-parent-child/h3d_gallery");
        setH3d_gallery(response.data);
        console.log('response.data', response.data);
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetch_h3d_gallery();
  }, []);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await api.get("/content-manager/slug/design-idea");
        setSeoData(response.data);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    fetchSeoData();
  }, []);


  useEffect(() => {
    setLoading(true);
    const fetch_HomePageContent = async () => {
      try {
        const response = await api.get("/cms-content/home_page_content_what_we_are");
        setHomePageContent(response.data);
        console.log('fetch_HomePageContent', response.data);
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetch_HomePageContent();
  }, []);

  // Sort records by ID in descending order (newest first)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

  // Get the 8 oldest records
  const staticRecords = sortedDesignIdea.slice(-5); // Last 8 records (oldest)

  // Get the latest records (excluding the last 8)
  const latestRecords = sortedDesignIdea.slice(0, -5); // Everything except last 8

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, termsAndConditions: checked }));
    console.log("Checkbox state:", checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAndConditions) {
      setSubmissionError(
        "You must agree to the Terms & Conditions before submitting."
      );
      return;
    }

    const formRequestData = {
      name: formData.fullName,
      mobile: formData.contact,
      email: formData.email,
      place: formData.place,
      query: formData.query,
    };

    try {
      const response = await api.post("/user-queries", formRequestData);
      console.log(response);
      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          contact: "",
          email: "",
          place: "",
          query: "",
          termsAndConditions: false,
        });
      } else {
        setSubmissionError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Error submitting form. Please try again.", error);
      console.error("Error:", error);
    } finally {
      // Clear error message after some time
      setTimeout(() => {
        setSubmissionError("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  const handleModalStateChange = useCallback((isOpen) => {
    setIsModalOpen(isOpen);
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch only the latest 3 blogs
  const fetchLatestBlogs = useCallback(async () => {
    try {
      const response = await api.get("/cms-blog"); // API to fetch all blogs
      if (response.status === 200) {
        // Get only the latest 3 blogs
        setBlogs(response.data.slice(0, 3)); // Slice to get only the first 3 blogs
      }
    } catch (err) {
      setError(err.message || "Failed to load blogs.");
    }
  }, []);

  useEffect(() => {
    fetchLatestBlogs(); // Call the function to fetch the latest blogs
  }, [fetchLatestBlogs]);

  const formatDate = (dateString) => {
    // Ensure the dateString is not empty and parse it
    const date = dateString ? parseISO(dateString) : null;

    // If date is valid, format it, else return "Invalid Date"
    return date && isValid(date) ? format(date, "dd-MM-yyyy") : "Invalid Date";
  };

  return (
    <>
      <head>
        <title>Top Interior Designers In Delhi NCR For Home	</title>
        <meta
          name="description"
          content="Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today"
        />
        <link rel="canonical" href="https://hcinterior.in" />	
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Top Interior Designers In Delhi NCR For Home"/>
        <meta property="og:description" content="Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://hcinterior.in"/>
        <meta property="og:site_name" content="High Creation Interior"/>
        <meta property="og:image" content="https://apidev.hcinterior.in/uploads/cms-content/image-1742221446171-185128721.png"/>
        <meta property="og:image:secure_url" content="https://apidev.hcinterior.in/uploads/cms-content/image-1742221446171-185128721.png"/>
        <meta property="og:image:width" content="624"/>
        <meta property="og:image:height" content="380"/>
        <meta property="og:image:alt" content="best interior designers in noida and gurugram"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="article:published_time" content="2022-03-31T06:00:17+00:00"/>
        <meta property="article:modified_time" content="2025-06-07T13:03:32+00:00"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Top Interior Designers In Delhi NCR For Home"/>
        <meta name="twitter:description" content="Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today"/>
        <meta name="twitter:image" content="https://hcinterior.in/images/new_hc_logo.png"/>
        <meta name="twitter:label1" content="Written by"/>
        <meta name="twitter:data1" content="High Creation Interior"/>
        <meta name="twitter:label2" content="Time to read"/>
        <meta name="twitter:data2" content="6 minutes"/>


      </head>
      <div className={isModalOpen ? "blur-bg" : ""}>
        <section className="position-relative">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
  {homepageBannerData?.map((banner, index) => {
    // Check if banner_image is a video (MP4 format)
    const isVideo = banner?.banner_image?.endsWith(".mp4");

    return (
      <div
        className={`carousel-item ${index === 0 ? "active" : ""}`}
        key={index}
      >
        {isVideo ? (
          <video
            width="100%"
           
            className="object-fit-cover home_video_banner"
            autoPlay
            loop
            muted
            id="myVideo"
          >
            <source
              src={banner?.banner_image ?? "/images/home-banner-1.mp4"}
              type="video/mp4"
            />
          </video>
        ) : (
          <img
            src={banner?.banner_image ?? "/images/home-banner-1.png"}
            className="d-block carousel_img"
            alt="carousel1"
            fetchpriority="high"
            loading="eager"
            data-no-lazy="1"
            heigth
          />
        )}

        <div className="pt-0 carousel-caption d-md-block">
   
          {/* <img
            src={banner?.top_icon ?? "/images/banner-icon.png"}
            width={90}
            
            fetchpriority="high"
            loading="eager"
            data-no-lazy="1"
          /> */}
          <h6 className="pb-0 mb-0 fw-lighter fs-3 home_subhead">
            {banner?.top_slogan}
          </h6>
          <div className="d-lg-flex">
            <div>
              <h3 className="letheading home_banner_heading">
                {banner?.title ?? ""}
              </h3>
              <div className="font_stylish_home">
                {banner?.sub_title}
              </div>
            </div>
            <div className="ps-lg-5">
              <div className="my-4 my-lg-5"></div>
              {/* <div>
                <a
                  href="contact"
                  className="text-black home_btn bg-light fw-bold"
                >
                  Let&apos;s Connect <MdKeyboardArrowRight className="fs-3" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="rotate_div container-fluid">
            <div className="sssss ms-auto me-0">
              <a href="/contact" className="know_moress">
                Enquiry Now
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
            ImgAbout={HomePageContent[2]?.json_content?.image}
            ImgAboutClass={"aboout_img object-fit-contain w-100"}
            imgAlt="About"
            titleHeading={HomePageContent[2]?.json_content?.title}
            subHeading={HomePageContent[2]?.json_content?.description}
            subHeadingClass="font_stylish ps-3"
            description={HomePageContent[2]?.json_content?.designation}
            textAboutBtn="READ MORE"
            btnLink="/about-us"
            textAboutBtnCLass="read_morebtn"
          />
        </section>

        <div className="my-5 oofer_card">
          <div className="container">
            <div className="mx-0 row g-4">
              <h2 className="pb-3 font_about">
                <span className="font_stylish">Explore</span> What we Offer
              </h2>
              <div className="col-lg-3 col-md-6 col-12">
                <Card
                  cardNameALl="cardoffer"
                  imgSrc={HomePageContent[23]?.json_content?.image}
                  imgAlt={"room"}
                  imgClass={"offerimg"}
                  titleCard={HomePageContent[23]?.json_content?.title}
                  descriptionCard={HomePageContent[23]?.json_content?.description}
                  buttonTextCard={"Know More"}
                  linkCard={HomePageContent[23]?.json_content?.designation}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12">
              <Card
                  cardNameALl="cardoffer"
                  imgSrc={HomePageContent[24]?.json_content?.image}
                  imgAlt={"room"}
                  imgClass={"offerimg"}
                  titleCard={HomePageContent[24]?.json_content?.title}
                  descriptionCard={HomePageContent[24]?.json_content?.description}
                  buttonTextCard={"Know More"}
                  linkCard={HomePageContent[24]?.json_content?.designation}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12">
              <Card
                  cardNameALl="cardoffer"
                  imgSrc={HomePageContent[22]?.json_content?.image}
                  imgAlt={"room"}
                  imgClass={"offerimg"}
                  titleCard={HomePageContent[22]?.json_content?.title}
                  descriptionCard={HomePageContent[22]?.json_content?.description}
                  buttonTextCard={"Know More"}
                  linkCard={HomePageContent[22]?.json_content?.designation}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12">
              <Card
                  cardNameALl="cardoffer"
                  imgSrc={HomePageContent[21]?.json_content?.image}
                  imgAlt={"room"}
                  imgClass={"offerimg"}
                  titleCard={HomePageContent[21]?.json_content?.title}
                  descriptionCard={HomePageContent[21]?.json_content?.description}
                  buttonTextCard={"Know More"}
                  linkCard={HomePageContent[21]?.json_content?.designation}
                />
              </div>

              <div className="mt-5 text-end">
                <a href="/what-we-offer" className="pe-2 know_more fs-6">
                  View More <MdKeyboardArrowRight className="fs-4" />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="way_wework">
          <div className="container">
            <h3 className="text-center font_about">
              The Way <span className="font_stylish">We Work</span>
            </h3>
            <div className="mx-0 row justify-content-center g-lg-0">
              <div className="col-lg-2 col-md-3 col-6 pe-0">
                <div className="box1">
                  <h3 className="box_heading">01</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-0">
                <div className="box2">
                  <div className="px-3 px-lg-4 py-4">
                    <img src={HomePageContent[20]?.json_content?.image} width={60} alt="" 
                    fetchpriority="high"
                    loading="eager"
                    data-no-lazy="1" 
                    />
                    <h4 className="py-2 text-white">{HomePageContent[20]?.json_content?.title}</h4>
                    <p className="box_para">
                    {HomePageContent[20]?.json_content?.description}
                    </p>
                    <div className="text-lg-center">
                      <a className="know_mores" href={HomePageContent[20]?.json_content?.designation}>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-lg-3 pe-0">
                <div className="box_2">
                  <h3 className="box_heading">02</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-0">
                <div className="box2_data">
                <div className="px-3 px-lg-4 py-4">
                    <img src={HomePageContent[19]?.json_content?.image} width={60} alt=""  fetchpriority="high"
  loading="eager"
  data-no-lazy="1"/>
                    <h4 className="py-2 text-white">{HomePageContent[19]?.json_content?.title}</h4>
                    <p className="box_para">
                    {HomePageContent[19]?.json_content?.description}
                    </p>
                    <div className="text-lg-center">
                      <a className="know_mores" href={HomePageContent[19]?.json_content?.designation}>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 pe-0 ps-lg-3">
                <div className="box_3">
                  <h3 className="box_heading">03</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-0">
                <div className="box3_data">
                <div className="px-3 px-lg-4 py-4">
                    <img src={HomePageContent[18]?.json_content?.image} width={60} alt="" />
                    <h4 className="py-2 text-white">{HomePageContent[18]?.json_content?.title}</h4>
                    <p className="box_para">
                    {HomePageContent[18]?.json_content?.description}
                    </p>
                    <div className="text-lg-center">
                      <a className="know_mores" href={HomePageContent[18]?.json_content?.designation}>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3">
                <div className="box4 box_3">
                  <h3 className="box_heading">04</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-0 mt-lg-3">
                <div className="box4_data">
                <div className="px-3 px-lg-4 py-4">
                    <img src={HomePageContent[17]?.json_content?.image} width={60} alt=""  fetchpriority="high"
  loading="eager"
  data-no-lazy="1" />
                    <h4 className="py-2 text-white">{HomePageContent[17]?.json_content?.title}</h4>
                    <p className="box_para">
                    {HomePageContent[17]?.json_content?.description}
                    </p>
                    <div className="text-lg-center">
                      <a className="know_mores" href={HomePageContent[17]?.json_content?.designation}>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3">
                <div className="box5 box_3">
                  <h3 className="box_heading">05</h3>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-6 ps-0 mt-lg-3">
                <div className="box5_data">
                <div className="px-3 px-lg-4 py-4">
                    <img src={HomePageContent[16]?.json_content?.image} width={60} alt=""  fetchpriority="high"
  loading="eager"
  data-no-lazy="1"/>
                    <h4 className="py-2 text-white">{HomePageContent[16]?.json_content?.title}</h4>
                    <p className="box_para">
                    {HomePageContent[16]?.json_content?.description}
                    </p>
                    <div className="text-lg-center">
                      <a className="know_mores" href={HomePageContent[16]?.json_content?.designation}>
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-5 video">
          <div className="row mx-0">
            <h3 className="pb-2 text-center">
              <span className="font_stylish">{HomePageContent[0]?.json_content?.title}</span>
            </h3>
            <p className="pb-4 text-center">
            {HomePageContent[0]?.json_content?.description}
            </p>
            <div className="">
              {/* <iframe
              width="100%"
              height="480"
              className="map"
              src="https://www.youtube.com/embed/REdh8A490Co"
              title="DESIGN YOUR DREAM HOME INTERIOR – TURNING LUXURY INTERIOR DESIGN SPACES"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe> */}
              <div class="col-lg-12 col-md-6 col-12">
                {/* <VideoBox
                videoUrl="https://www.youtube.com/embed/REdh8A490Co" // Replace with your video URL
                imageUrl="/images/video-bg-home.png"
              /> */}
                <VideoCardHome
                  videoUrl={HomePageContent[0]?.json_content?.designation} // Replace with your video URL
                  imageUrl={HomePageContent[0]?.json_content?.image}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 my-5 designidea"  style={{backgroundImage: `url(${HomePageContent[1]?.json_content?.image})`}}>
          <div className="container">
            <div className="mx-0 row ">
              <h2 className="pb-5 text-center font_about">
              {HomePageContent[1]?.json_content?.title}
                <span className="font_stylish">{HomePageContent[1]?.json_content?.description}</span>
              </h2>
              <div className="mb-5 col-lg-6 col-md-6 col-12 mb-lg-0">
              <RoomOfice
                  cardRoomOffice={"card card_room border-0"}
                  badge_circle="badge_circleblack"
                  arrowIcon="images/arrow_icon.png"
                  altArrow="arrow"
                  width="80"
                  imageRoom_Office={HomePageContent[15]?.json_content?.image}
                  roomImg="residential_imgs"
                  altImage="room"
                  cardBody="card_body office_card_body"
                  cardTitle={HomePageContent[15]?.json_content?.title}
                  cardText={HomePageContent[15]?.json_content?.description}
                  btnText="Know More "
                  btnLink={HomePageContent[15]?.json_content?.designation}
                  btnClass={"btn_knowmoreblack"}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12 mt-4 mt-lg-0">
                <RoomOfice
                  cardRoomOffice={"card card_room border-0"}
                  badge_circle="badge_circleblack"
                  arrowIcon="images/arrow_icon.png"
                  altArrow="arrow"
                  width="80"
                  imageRoom_Office={HomePageContent[14]?.json_content?.image}
                  roomImg="residential_imgs"
                  altImage="room"
                  cardBody="card_body office_card_body"
                  cardTitle={HomePageContent[14]?.json_content?.title}
                  cardText={HomePageContent[14]?.json_content?.description}
                  btnText="Know More "
                  btnLink={HomePageContent[14]?.json_content?.designation}
                  btnClass={"btn_knowmoreblack"}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="my-5">
          <div className="container">
            <div className="mx-0 row position-relative">
              <span className="font_stylish ss ms-lg-5">
                Ready ToGo Designs
              </span>
              <h3 className="text-center font_about with_heading w-auto">
                with Our Exclusive Design Choices
              </h3>
            </div>
            <SliderCard />
          </div>
        </section>

        <div className="my-5 bgsectionroom">
          <div className="container ">
            <div className="row position-relative mx-0">
              <span className="pb-0 mb-0 font_stylish d-grid ms-lg-5 designer">
                Designer&apos;s Choice:
              </span>

              <h3 className="pb-4 w-auto font_about excluisive_home_heading">
                Exclusive Design Specials
              </h3>
            </div>
            <div className="mt-4 row g-4 mx-0">
            <div className="col-lg-5 col-md-6 col-12">
                <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[0]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[0]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[0]?.child_content?.title}
                  descriptionBg={staticRecords[0]?.child_content?.description}
                />
              </div>
              <div className="col-lg-7 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[1]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[1]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[1]?.child_content?.title}
                  descriptionBg={staticRecords[1]?.child_content?.description}
                />
              </div>
              <div className="col-lg-7 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[2]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[2]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[2]?.child_content?.title}
                  descriptionBg={staticRecords[2]?.child_content?.description}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-12">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[3]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[3]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[3]?.child_content?.title}
                  descriptionBg={staticRecords[3]?.child_content?.description}
                />
              </div>
              <div className="col-lg-12 ">
              <BgImageCard
                 style={{
                  backgroundImage: `url(${staticRecords[4]?.child_content?.image})`,
                }}
                  cardLinkTag={`/designer-choice/gallery?id=${staticRecords[4]?.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={staticRecords[4]?.child_content?.title}
                  descriptionBg={staticRecords[4]?.child_content?.description}
                />
              </div>
              <div className="col-lg-12 text-right">
              <div className="button_text">
              <a href="/designer-choice" className="know_more">
                    Know More
                  </a>
              </div>
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
                ImgCounter={HomePageContent[13]?.json_content?.image}
                ImgCounterClass="w-100"
                imgAltCounter={HomePageContent[13]?.json_content?.title}
                divClassCounter="text-end"
                counterStart="0"
                counterEnd={HomePageContent[12]?.json_content?.title}
                counterDuration="5"
                counterSuffix=""
                counterStart2="0"
                counterEnd2={HomePageContent[11]?.json_content?.title}
                counterDuration2="5"
                counterSuffix2=""
                counterStart3="0"
                counterEnd3={HomePageContent[10]?.json_content?.title}
                counterDuration3="5"
                counterSuffix3=""
                counterStart4="0"
                counterEnd4={HomePageContent[9]?.json_content?.title}
                counterDuration4="5"
                er=""
                descriptionCounter={HomePageContent[13]?.json_content?.description}
                textAboutBtnCounter="View Our Projects"
                btnLink="/residential-projects"
                textAboutBtnCLass="know_more me-lg-4"
                textAboutBtnCounter2="All Services"
                textAboutBtnCLass2="btn_services"
                btnLink2={HomePageContent[13]?.json_content?.designation}
              />
            </div>
          </div>
        </div>

        <div className="savedesign">
          <div className="container">
            <div className="mx-0 row g-4 justify-content-center ">
              <div className="mb-5 position-relative">
                <div>
                  <h3 className="mb-0">
                    <span className="font_stylish">{HomePageContent[8]?.json_content?.title}</span>
                  </h3>
                </div>
                <h3 className="pb-0 pb-lg-4 font_about mt-0 designs_lets">
                {HomePageContent[8]?.json_content?.description}
                </h3>
              </div>

              

              {h3d_gallery.map((hd_gallery, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <Card
                 cardLinkName={`/design-idea/gallery?id=${hd_gallery?.id}`}
                   cardNameALl="cardoffer"
                  imgSrc={hd_gallery.child_content?.image}
                  imgAlt={"room"}
                  imgClass={"bhkimg"}
                  titleCard={hd_gallery.child_content.title}
                  titleClass="text-center mb-0 pb-0"
                />
              </div>
    ))}


            </div>
          </div>
        </div>

        <section className="mb-5 lettransformbg"  style={{
    backgroundImage: `url(${HomePageContent[7]?.json_content?.image})`,
  }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-3">
                <img src="/images\home_Icon.png" width={150} alt="home-icon" 
                 fetchpriority="high"
                  loading="eager"
                  data-no-lazy="1"
                  />
              </div>
              <div className="col-lg-10 col-md-9 col-9">
                <div className="pt-3 text-end">
                  <h3 className="text-white letheading">
                  {HomePageContent[7]?.json_content?.title}
                  </h3>
                  <p className="text-white">{HomePageContent[7]?.json_content?.description}</p>
                  <a href={HomePageContent[7]?.json_content?.designation} className="know_more">
                    Know More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="my-5 blogs_wrapper">
          <div className="container">
            <div className="row g-2 g-lg-4 justify-content-center mx-1">
              <h3 className="pb-2 pb-lg-4 text-center font_about">Blogs</h3>
              {/* <div className="col-lg-4 col-md-6 col-12">
                <Blogs
                  blogCard="blog_cards"
                  imgSrcBlog="/images/Blog/blo_img1.webp"
                  blogImglink="/blog-detail"
                  blogImgALt="blog1"
                  blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                  blogdate="published on April 21, 2024"
                  blogTitle="Interior decorator charge for the project in Noida 2024"
                  blogDescription="Interior decorator charge for the project in Noida Finding the best interior designer in NOIDA."
                  buttonBlog="Continue Reading"
                  blogBtnHref="/blog-detail"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <Blogs
                  blogCard="blog_cards"
                  imgSrcBlog="/images/Blog/10Blog.jpg"
                  blogImglink="/blog-detail"
                  blogImgALt="blog2"
                  blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                  blogdate="published on April 21, 2024"
                  blogTitle="10 Types Of Sofa Design For Modern Home Interior"
                  blogDescription="A sofa set is one of the most essential pieces of furniture that you can find in Indian homes."
                  buttonBlog="Continue Reading"
                  blogBtnHref="/blog-detail"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <Blogs
                  blogCard="blog_cards"
                  imgSrcBlog="/images/Blog/blog_del.webp"
                  blogImglink="/blog-detail"
                  blogImgALt="blog2"
                  blogClassImg={"card-img-top rounded-4 object-fit-cover"}
                  blogdate="published on April 21, 2024"
                  blogTitle="How To Decorate Your Home for Diwali Under ₹5000!"
                  blogDescription="How to Decorate Your Home for Diwali Under ₹5000!, Diwali festival lights is an exciting time to refresh your home."
                  buttonBlog="Continue Reading"
                  blogBtnHref="/blog-detail"
                />
              </div> */}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {blogs.map((blog, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <Blogs
                    blogCard="blog_cards"
                    imgSrcBlog={blog?.image || "/images/default.jpg"} // Default image if none is provided
                    blogImglink={`/${
                      blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`
                    }`} // Link to the full blog
                    blogImgALt={blog?.title || "Blog Image"}
                    blogClassImg="card-img-top rounded-4 object-fit-cover"
                    blogdate={
                      blog?.published_on
                        ? formatDate(blog.published_on)
                        : "Date not available"
                    } // Handle missing date
                    blogTitle={blog?.title || "Untitled Blog"}
                    blogDescription={
                      blog?.description || "No description available"
                    }
                    buttonBlog="Continue Reading"
                    blogBtnHref={`/${
                      blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`
                    }`} // Link to the detailed blog page
                    writer_name={blog?.writer_name || "High Creation"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <section className="my-5">
          <h3 className="text-center font_stylish">What People Say</h3>
          <VideoTestimonialSlider />
        </section>
        <hr />
        <section className="container-fluid my-5 iconbox">
          <div className="row justify-content-center mx-0">
            <div className="col-lg-11">
              <div className="row justify-content-center align-items-center g-4">
                <div className="col-12 col-md-6 col-lg-4">
                  <IconBox
                    iconUrl={HomePageContent[6]?.json_content?.image}
                    iconAlt="checkicon"
                    iconWidth="70"
                    iconDescription={HomePageContent[6]?.json_content?.description}
                    descr="descriptionClass"
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                <IconBox
                    iconUrl={HomePageContent[5]?.json_content?.image}
                    iconAlt="checkicon"
                    iconWidth="70"
                    iconDescription={HomePageContent[5]?.json_content?.description}
                    descr="descriptionClass"
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                <IconBox
                    iconUrl={HomePageContent[4]?.json_content?.image}
                    iconAlt="checkicon"
                    iconWidth="70"
                    iconDescription={HomePageContent[4]?.json_content?.description}
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
            <div className="row position-relative card_form_row mx-0">
              <div className="col-lg-7 col-md-5 col-12">
                <div className="rounded map pe-lg-5">
                   <iframe
                    src={HomePageContent[3]?.json_content?.description}
                    width="100%"
                    height="525"
                    className="map"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-5 col-md-7 col-12 mt-4 mt-lg-0" id="form">
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
                        value={formData.fullName}
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        placeholder="Contact No."
                        required
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3 col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        placeholder="Place"
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      <textarea
                        className="form-control"
                        id="query"
                        name="query"
                        value={formData.query}
                        placeholder="Query"
                        rows="3"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={formData.termsAndConditions}
                          id="termsAndConditions"
                          name="terms_and_conditions"
                          required
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="text-black form-check-label"
                          htmlFor="termsAndConditions"
                        >
                          Accept Terms & condition
                        </label>
                        <div className="text-black invalid-feedback">
                          You must agree before submitting.
                        </div>
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
        <ContactUsPopUp onModalStateChange={handleModalStateChange} />
      </div>
    </>
  );
};

export default Home;
