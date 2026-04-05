"use client";
import { useEffect, useState } from "react";
import BackgroundImageRow from "../components/BackgroundImageRow";
import WallpaperCard from "../components/WallpaperCard";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import PortfolioCard from "../components/PortfolioCard";


const Experience = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    place: "",
    query: "",
    termsAccepted: false,
  });

  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    email: false,
    contactNo: false,
    place: false,
    query: false,
  });

  const [experienceData, setExperienceData] = useState([]);
  const [experienceDataVideo, setExperienceDataVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchExperienceData = async () => {
      try {
        const response = await api.get("/cms-parent-child/experience_center_gurugram");
        setExperienceData(response.data);
      } catch (err) {
        console.error("Error fetching experience data:", err);
        setError(
          err.message ?? "Failed to load experience data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);



  useEffect(() => {
    setLoading(true);
    const fetchExperienceDataVideo = async () => {
      try {
        const response = await api.get("/cms-parent-child/experience_center_gurugram_video");
        setExperienceDataVideo(response.data);
      } catch (err) {
        console.error("Error fetching experience data:", err);
        setError(
          err.message ?? "Failed to load experience data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceDataVideo();
  }, []);


  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await axapiios.get(`/content-manager/slug/experience-center`);
        setSeoData(response.data);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    fetchSeoData();
  }, []);

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      fullName: formData.fullName.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      contactNo: formData.contactNo.trim() === "",
      place: formData.place.trim() === "",
      query: formData.query.trim() === "",
      termsAccepted: !formData.termsAccepted,
    };

    setFieldErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some((error) => error === true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      setSubmissionError(
        "Please fill in all required fields and accept the terms."
      );
      return;
    }

    const formRequestedData = {
      name: formData.fullName,
      email: formData.email,
      mobile: formData.contactNo,
      place: formData.place,
      query: formData.query,
    };


    try {
      // Send POST request to save form data
      const response = await api.post("/user-queries", formRequestedData);

      // Handle success response
      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          contactNo: "",
          place: "",
          query: "",
          termsAccepted: false,

        });
      } else {
        setSubmissionError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Error submitting form. Please try again.");
    } finally {
      // Clear error messages after 5 seconds
      setTimeout(() => {
        setSubmissionError("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <head>
        <title>{seoData?.title ?? "High Creation Interior Experience Center Noida "}</title>
        <meta
          name="title"
          content={seoData?.metaTitle ?? "High Creation Interior Experience Center Noida "}
        />
        <meta
          name="description"
          content={
            seoData?.metaDescription ??
            "Explore our Interior experience center in Noida to feel the experience of your dream home interior with comfort, warmth, and unique design elements. "
          }
        />
        <meta
          name="keywords"
          content={
            seoData?.metaKeywords ??
            "design idea, living room interior, living room design, living room decor, modular TV units, wall art, wall designs"
          }
        />
      </head>
      <MainLayout>
        <main>
          {/* <BackgroundImageRow
                        sectionBgImages={"sectionbg secbgimg1"}
                        sectionBgHeading="Experience Center"
                        secBgHeadingClass="sec_bgheading_lass"
                        sectionBgDescription="Explore a curated selection of premium living room interior designs and décor ideas at High Creation.
We offer customizable, functional, and stylish solutions to elevate your living space. From modular TV
units to wall art and innovative wall designs, find all the inspiration you need to transform your living
room. Start browsing today to discover designs that perfectly reflect your personal style.
"
                        secBgDesClass="secbgbesclass"
                    /> */}
          
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center alert alert-danger">{error}</div>
          ) : (
            <>
            <section className="video_wrapper conatiner-fluid">
            <video
              width="100%"
              height="590"
              class="object-fit-cover"
              autoPlay
              loop
              muted
              id="myVideo"
            >
              <source src={experienceDataVideo[0]?.child_content?.image} type="video/mp4" />
            </video>
          </section>
          
            <section className="container my-5">
            <div className="row mx-0 g-4">
              <div className="col-lg-7">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[0]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg1 design_exper"}
                  portfolioImg={experienceData[0]?.child_content?.image}
                  portfolioTitle={experienceData && experienceData[0]?.child_content?.title}
                  // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                  // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                  // firstKey="Style"
                  // firstValue={experienceData && experienceData[0]?.style}
                  // secondKey="Room Dimension"
                  // secondValue={experienceData && experienceData[0]?.room_dimension}
                />
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[1]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg2"}
                  portfolioImg={experienceData[1]?.child_content?.image}
                  portfolioTitle={experienceData && experienceData[1]?.child_content?.title}
                  // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                  // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                  // firstKey="Style"
                  // firstValue={experienceData&&experienceData[1]?.style}
                  // secondKey="Room Dimension"
                  // secondValue={experienceData&&experienceData[1]?.room_dimension}
                />
              </div>
              <div className="col-lg-5">
                <div className="text-white form_experience_center mx-0">
                <form onSubmit={handleSubmit}>
                      <h5 className="text-center">Design for Every Budget</h5>
                      <p className="mb-4 text-center text-white">
                        Get Your Dream house today. Let Our experts help you.
                      </p>

                      {/* Full Name */}
                      <div className="mt-3 mb-3">
                        <input
                          type="text"
                          className={`form-control ${
                            fieldErrors.fullName ? "is-invalid" : ""
                          }`}
                          placeholder="Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                        {fieldErrors.fullName && (
                          <div className="invalid-feedback">
                            Please enter your full name.
                          </div>
                        )}
                      </div>

                      <div className="mb-3 col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              name="contactNo"
                              placeholder="Contact No."
                              value={formData.contactNo}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                      {/* Email */}
                      <div className="mb-3">
                        <input
                          type="email"
                          className={`form-control ${
                            fieldErrors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email ID"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {fieldErrors.email && (
                          <div className="invalid-feedback">
                            Please enter a valid email address.
                          </div>
                        )}
                      </div>

                          <div className="mb-3 col-md-12">
                            <input
                              type="text"
                              className="form-control"
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
                              name="query"
                              placeholder="Query"
                              rows="3"
                              value={formData.query}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>

                 
                      {/* Submit Button */}
                      <div className="mb-3">
                        <button type="submit" className="mb-3 know_more w-100">
                          Get free Quote
                        </button>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className={`form-check-input ${
                            fieldErrors.termsAccepted ? "is-invalid" : ""
                          }`}
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleCheckboxChange}
                          required
                        />
                        <label
                          className="text-white form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          By submitting this form, you agree to the{" "}
                          <a href="#" className="text-warning">
                            privacy policy
                          </a>{" "}
                          &{" "}
                          <a href="#" className="text-warning">
                            terms and conditions
                          </a>
                          .
                        </label>
                        {fieldErrors.termsAccepted && (
                          <div className="invalid-feedback">
                            You must accept the terms and conditions.
                          </div>
                        )}
                      </div>

                      {/* Display Submission Error or Success Message */}
                      {submissionError && (
                        <div className="text-center alert alert-danger">
                          {submissionError}
                        </div>
                      )}
                      {submissionMessage && (
                        <div className="text-center alert alert-success">
                          {submissionMessage}
                        </div>
                      )}
                    </form>
                </div>
              </div>
              <div className="col-lg-12">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[2]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg4"}
                  portfolioImg={experienceData[2]?.child_content?.image}
                  portfolioTitle={experienceData && experienceData[2]?.child_content?.title}
                  // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                  // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                  // firstKey="Style"
                  // firstValue={experienceData && experienceData[2]?.style}
                  // secondKey="Room Dimension"
                  // secondValue={experienceData && experienceData[2]?.room_dimension}
                />
              </div>
              <div className="col-lg-9">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[3]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg5"}
                  portfolioImg={experienceData[3]?.child_content?.image}
                  portfolioTitle={experienceData && experienceData[3]?.child_content?.title}
                  // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                  // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                  // firstKey="Style"
                  // firstValue={experienceData && experienceData[3]?.style}
                  // secondKey="Room Dimension"
                  // secondValue={experienceData && experienceData[3]?.room_dimension}
                />
              </div>
              <div className="col-lg-3">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[4]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg6"}
                  portfolioImg={experienceData[4]?.child_content?.image}
                  portfolioTitle={experienceData && experienceData[4]?.child_content?.title}
                  // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                  // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                  // firstKey="Style"
                  // firstValue={experienceData && experienceData[4]?.style}
                  // secondKey="Room Dimension"
                  // secondValue={experienceData && experienceData[4]?.room_dimension}
                />
              </div>
              <div className="col-lg-6">
              <PortfolioCard
                cardDetailLink={`/experience-center/gallery?id=${experienceData[5]?.id}`}
                portCard={"card_portfolio portfolio_1"}
                portfolioImgBg={"portfolioimgall desig_gal_bg7"}
                portfolioImg={experienceData[5]?.child_content?.image}
                portfolioTitle={experienceData && experienceData[5]?.child_content?.title}
                portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
              />
            </div>
            <div className="col-lg-6">
              <PortfolioCard
                cardDetailLink={`/experience-center/gallery?id=${experienceData[6]?.id}`}
                portCard={"card_portfolio portfolio_1"}
                portfolioImgBg={"portfolioimgall desig_gal_bg8"}
                portfolioImg={experienceData[6]?.child_content?.image}
                portfolioTitle={experienceData && experienceData[6]?.child_content?.title}
                portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
              />
            </div>
            </div>

          </section>
          </>
          )}
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Experience;
