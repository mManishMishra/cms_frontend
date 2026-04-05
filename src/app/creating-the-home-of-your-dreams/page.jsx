"use client";
import BgImageCard from "../components/BgImageCard";
import RowImage from "../components/RowImage";
import { IoIosShareAlt } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaComments } from "react-icons/fa";
import ContactUsPopUp from "../components/ContactUsPopUp";
import { useCallback, useEffect, useState } from "react";
import VideoBox from "../components/VideoBox";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { image } from "@nextui-org/theme";
const HCLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const [designIdea, setDesignIdea] = useState([]);


  const [faqData, setFaqData] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchFAQs = async () => {

      try {
        const response = await api.get("/cms-content/faqs");
        setFaqData(response.data || []);
      }
     catch (err) {
        setError("Failed to fetch FAQ data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);


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


    // Sort records by ID in descending order (newest first)
    const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

    // Get the 8 oldest records
    const staticRecords = sortedDesignIdea.slice(-5); // Last 8 records (oldest)
  
    // Get the latest records (excluding the last 8)
    const latestRecords = sortedDesignIdea.slice(0, -5); // Everything except last 8

  // section one 
  const [data1, setdata1] = useState();
   const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams", {});
      if (response.data && response.data.json_content) {
        setdata1(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);



  // section two 
  const [data2, setdata2] = useState();
   const fetchContentManagerPages_2 = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams_2", {});
      if (response.data && response.data.json_content) {
        setdata2(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);

  // section three 
  const [data3, setdata3] = useState();
   const fetchContentManagerPages_3 = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams_3", {});
      if (response.data && response.data.json_content) {
        setdata3(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);

  // section four 
  const [data4, setdata4] = useState();
   const fetchContentManagerPages_4 = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams_4", {});
      if (response.data && response.data.json_content) {
        setdata4(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);


  // section five 
  const [data5, setdata5] = useState();
   const fetchContentManagerPages_5 = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams_5", {});
      if (response.data && response.data.json_content) {
        setdata5(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);


  // section six 
  const [data6, setdata6] = useState();
   const fetchContentManagerPages_6 = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/creating_the_home_of_your_dreams_6", {});
      if (response.data && response.data.json_content) {
        setdata6(response.data?.json_content);

      }
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
    }
  }, []);


  useEffect(() => {
    fetchContentManagerPages();
    fetchContentManagerPages_2();
    fetchContentManagerPages_3();
    fetchContentManagerPages_4();
    fetchContentManagerPages_5();
    fetchContentManagerPages_6();
  }, [fetchContentManagerPages], [fetchContentManagerPages_2], [fetchContentManagerPages_3], [fetchContentManagerPages_4],[fetchContentManagerPages_5],[fetchContentManagerPages_6]);

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
      toast.error("You must agree to the Terms & Conditions before submitting.")
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
        setTimeout(() => {
          window.location.href = "/thank-you";

      }, 300); 
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Failed to submit form. Please try again.");
        setSubmissionError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error(error.message)
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
  return (
    <div>
      <head>
        <title>
        Creating the home of your dreams. - High Creation Interior

        </title>
      </head>
      <div className={isModalOpen ? "blur-bg" : ""}>
        <header className="container-fluid px-lg-5 px-3">
          <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid">
              <a className="navbar-brand ms-lg-5" href="/">
                <img
                  src="/images/new_hc_logo.png"
                  width={90}
                  height={90}
                  alt="hc-logo"
                  className="p-2"
                />
              </a>
              <button
                className="navbar-toggler d-block d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                  <li className="mb-3 mb-lg-0">
                    <a href="tel:18001200532" className="btn read_morebtn">
                      <IoIosCall className="callicon me-2" />
                      1800 1200 532
                    </a>
                  </li>
                  <li className="mb-4 mb-lg-0">
                    <a href="/contact" className="read_morebtn py-2">
                      Let’s Connect
                    </a>
                  </li>
                  <li className="mb-3 mb-lg-0">
                    <a href="/estimator-for-home" className="read_morebtn py-2">
                      Estimator for Your Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="mt-0 pt-0">
        <section
  className="contact_wrapper hc_landing_ban1 position-relative"
  style={{
    backgroundImage: `url(${data1?.mid_image})`, 
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
             <div className="container">
              <div className="row">
                <div className="col-lg-7 d-flex align-items-center">
                  <div className="pe-lg-5">
                    <h6 className="fw-lighter fs-3 pb-0 mb-0 home_subhead">
                    {data1?.top_title}
                    </h6>
                    <h3 className="letheading home_banner_heading">
                  
                      {data1?.mid_sub_title}

                    </h3>
                    <p>
                    {data1?.top_description}
                    </p>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="contact_form contact shadow-none bg-transparent">
                    <h4 className="text-black form_heading mb-3">
                      Styles to Suit Every Budget
                    </h4>
                    <p>Get Your Dream house today. Let Our experts help you</p>
                    <form className="row" onSubmit={handleSubmit}>
                      <div className="col-md-12 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          placeholder="Name"
                          name="fullName"
                          onChange={handleInputChange}
                          value={formData.fullName}
                          required
                        />
                      </div>
                      <div className="col-md-5 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          placeholder="Contact No."
                          name="contact"
                          onChange={handleInputChange}
                          value={formData.contact}
                          required
                        />
                      </div>

                      <div className="col-md-7 mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="validationCustom03"
                          placeholder="Email ID"
                          name="email"
                          onChange={handleInputChange}
                          value={formData.email}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="Design Name / Message"
                          name="query"
                          onChange={handleInputChange}
                          value={formData.query}
                          rows="1"
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={formData.termsAndConditions}
                            id="invalidCheck"
                            required
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label text-black"
                            htmlFor="invalidCheck "
                          >
                            By submitting this form, you agree to the privacy
                            policy & terms and conditions
                          </label>
                          <div className="invalid-feedback text-black">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-3 d-flex m-auto justify-content-center">
                        <button
                          className="btn know_more px-5 w-100"
                          type="submit"
                        >
                          SEND
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="rotate_div  ">
              <div className="sssss   me-0">
                <a href="/contact" className="know_moress">
                  Enquiry Now
                </a>
              </div>
              <div className="mt-4    me-0">
                <a href="https://wa.me/919560277787">
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
              ImgAbout={data2?.mid_image}
              ImgAboutClass={"aboout_img object-fit-contain w-100"}
              imgAlt="About"
              titleHeading=  {data2?.top_title}   
              subHeading= {data2?.top_description} 
              subHeadingClass="our_experts_text_land pt-3"
              desClass="team_description"
              description= {data2?.mid_sub_title} 
              textAboutBtn="READ MORE"
              btnLink={data2?.mid_sub_description}
              textAboutBtnCLass="read_morebtn"
            />
          </section>
          <hr />
          <section>
            <div className="container">
              <div className="row py-5 mx-0 g-4">
                <center>
                  <h3 className="font_about text-left pb-2">
                  {data3?.top_title}   
                  </h3>
                  <p className="team_description pb-4 px-3 px-lg-5">
                  {data3?.top_description}   
                  </p>
                </center>
                <div className="col-lg-6 col-md-6 col-12">
                  <VideoBox
                    videoUrl={data3?.mid_sub_title}    // Replace with your video URL
                    imageUrl="/images/Designer_Choice/Vintage_blue.webp"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <VideoBox
                    videoUrl={data3?.mid_sub_description}  
                    imageUrl="/images/Designer_Choice/Natural.jpg"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="my-5 home_interior_wrapper">
            <div className="container ">
              <div className="row position-relative mx-0">
                <center>
                  <h3 className="pb-3 font_about">{data4?.top_title}   </h3>
                  <p className="team_description px-3 px-lg-5 pb-2">
                  {data4?.top_description}
                  </p>
                  <div className="my-2">
                    <a href={data4?.mid_sub_title} className="read_morebtn py-2">
                      Let’s Connect
                    </a>
                  </div>
                </center>
              </div>


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
              {/* <div className="row g-4 mt-4 mx-0">
                <div className="col-lg-5 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard homecardimg1"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-7 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard homecardimg2"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-7 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard homecardimg3"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-5 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard homecardimg4"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>

                <div className="col-lg-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard homecardimg5"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="my-5 corporate_interior">
            <div className="container ">
              <div className="row position-relative mx-0">
                <center>
                  <h3 className="pb-3 font_about">{data5?.top_title}</h3>
                  <p className="team_description px-3 px-lg-5 pb-2">
                  {data5?.top_description}
                  </p>
                  <div className="my-2">
                    <a href={data5?.mid_sub_title} className="read_morebtn py-2">
                      Let’s Connect
                    </a>
                  </div>
                </center>
              </div>
              <div className="row g-4 mt-4 mx-0">
                <div className="col-lg-5 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard corporatecardimg1"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-7 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard corporatecardimg2"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard corporatecardimg5"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-5 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard corporatecardimg3"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
                <div className="col-lg-7 col-md-6 col-12">
                  <BgImageCard
                    designerCardBgDiv={"designercard corporatecardimg4"}
                    titleBgImage={"Dark Desier"}
                    descriptionBg={"Designed By Ranveer Singh "}
                    // ratingBg={"4.73(130)"}
                    // buttonShareBg={
                    //   <IoIosShareAlt className="text-white fs-4" />
                    // }
                    // buttonCommentBg={<FaComments className="text-white fs-4" />}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <section className="faq_wrapper savedesign">
            <div className="container">
              <div className="text-start">
                <h3 className="font_about">High Creation Interior</h3>
                <h3>
                  <span className="font_stylish our_experts_text_land">
                    Common Questions
                  </span>
                </h3>

                {loading ? (
                  <p>Loading FAQs...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : (
                  <div className="row justify-content-center mx-0">
                    <div className="col-lg-12">
                      <div className="accordion " id="faqAccordion">
                        {faqData.map((faq, index) => (
                          <div className="accordion-item" key={index}>
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button bg-transparent faq_landing ${
                                  index === 0 ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded={index === 0 ? "true" : "false"}
                                aria-controls={`collapse${index}`}
                              >
                                {faq.json_content.title}
                              </button>
                            </h2>
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              data-bs-parent="#faqAccordion"
                            >
                              <div className="accordion-body ps-0">
                                {faq.json_content.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
          <footer>
            <div className="footer_top py-4">
              <center>
                <h3 className="font_about">{data6?.top_title}</h3>
                <h3>
                  <span className="our_experts_text_land">
                  {data6?.top_description}
                  </span>
                </h3>
                <div>
                  <a href={data6?.mid_sub_title} className="read_morebtn py-2">
                    Let&apos;s Connect
                  </a>
                </div>
              </center>
            </div>
            <hr />
            <div className="pt-5 pb-2 mx-0 row justify-content-center">
              <div className="col-lg-10">
                <div className="row justify-content-lg-center g-4 mx-0">
                  <div className="col-lg-3 ps-lg-5 col-md-4 col-12">
                    <div>
                      <a href="/">
                        {" "}
                        <img
                          src="/images/new_hc_logo.png"
                          alt="hero image"
                          className=""
                          width={150}
                          height={150}
                        />
                      </a>
                    </div>

                    <div>
                      <h6 className="pt-3">FOR QUERY</h6>
                      <p className="mb-0">
                        <a
                          href="callto:+19810506301"
                          className="footer_land text-black"
                        >
                          +91 9810506301
                        </a>
                      </p>
                      <a
                        href="callto:9810503881"
                        className="footer_land text-black"
                      >
                        +91 9810503881
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-2 col-12">
                    <h4 className="footer_heading">Our Expertise</h4>
                    <ul className="list-unstyled ps-0">
                      <li className="footer_land">
                        <a href="" className="text-black">
                          Home Interior Designs
                        </a>
                      </li>
                      <li className="footer_land">
                        <a href="" className="text-black">
                          Corporate Interior Design
                        </a>
                      </li>
                      <li className="footer_land">
                        <a href="" className="text-black">
                          All Interior Designs
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-4 ps-lg-0 col-md-6 col-12">
                    <h4 className="footer_heading">Branch Office</h4>
                    <ul className="list-unstyled">
                      <li className="footer_land pb-2">
                        <a
                          href="https://maps.app.goo.gl/6oJ1uEQqPAbde7Ke6"
                          className="text-black"
                        >
                          NOIDA – H101, LGF, Sector-63, Noida, Uttar Pradesh-
                          201301
                        </a>
                      </li>
                      <li className="footer_land pb-2">
                        <a
                          href="/https://maps.app.goo.gl/xkxyztKSbkCcMs8c9/"
                          className="text-black"
                        >
                          NOIDA – H56 , 1st Floor, Sector-63, Noida, Uttar
                          Pradesh- 201301
                        </a>
                      </li>
                      <li className="footer_land pb-2">
                        <a
                          href="/https://maps.app.goo.gl/fgvUV2sVYxd3uPct9/"
                          className="text-black"
                        >
                          Our Factory – Plot no 3 , Sorkha Village, SEC – 115,
                          Noida
                        </a>
                      </li>
                      <li className="footer_land pb-2">
                        <a
                          href="/https://maps.app.goo.gl/FuyE6B2jZS1qXQuR6/"
                          className="text-black"
                        >
                          Jmd Galleria Mall, Badshahpur Sohna Rd Hwy, Sector 47,
                          Sector 48, Gurugram, Haryana 122001
                        </a>
                      </li>
                      <ul>
                        <li className="footer_land">
                          Phone:{" "}
                          <a href="callto:+19810506301" className="text-black">
                            +91 9810503881
                          </a>{" "}
                        </li>
                        <li className="footer_land">
                          Email:
                          <a
                            href="mailto:Info@hcinterior.in"
                            className="text-black"
                          >
                            {" "}
                            Info@hcinterior.in
                          </a>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
        <ContactUsPopUp onModalStateChange={handleModalStateChange} />
      </div>
    </div>
  );
};

export default HCLandingPage;
