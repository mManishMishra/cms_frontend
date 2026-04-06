// "use client";
// import {useCallback, useEffect, useState } from "react";
// import BackgroundImageRow from "../components/BackgroundImageRow";
// import WallpaperCard from "../components/WallpaperCard";
// import MainLayout from "../layouts/MainLayout";
// import api from "@/utils/api";
// import PortfolioCard from "../components/PortfolioCard";
 
// const Experience = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     contactNo: "",
//     email: "",
//     place: "",
//     query: "",
//     termsAccepted: false,
//   });

//   const [submissionError, setSubmissionError] = useState("");
//   const [submissionMessage, setSubmissionMessage] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({
//     fullName: false,
//     email: false,
//     contactNo: false,
//     place: false,
//     query: false,
//   });

//   const [experienceData, setExperienceData] = useState([]);
//   const [experienceDataVideo, setExperienceDataVideo] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
 
//   const [url, setUrl] = useState(""); 
//   const [slug, setSlug] = useState("");
//   useEffect(() => {
//     const fullUrl = window.location.href;
//     setUrl(fullUrl); // ✅ this will now set the state correctly
//     const path = window.location.pathname; // "/experience-center-gurugram"
//     const slugValue = path.split("/").filter(Boolean).pop(); // "experience-center-gurugram"
//     setSlug(slugValue);
    
//   });

//   const [seoData, setSeoData] = useState({});

//  useEffect(() => {
//   setLoading(true);
//   const fetchSeoTag = async () => {
//     try {
//       const response = await api.get("/seo-tag");
//       const allSeoTags = response.data;

//       const path = window.location.pathname;
//       const currentSlug = path.split("/").filter(Boolean).pop();

//       const matchedSeo = allSeoTags.find((seo) => {
//         const seoSlug = seo.page_name?.split("/").filter(Boolean).pop();
//         return seoSlug === currentSlug;
//       });
//       console.log("matchedSeo", matchedSeo);
//       if (matchedSeo) {
//         setSeoData(matchedSeo);
//       } else {
//         setSeoData({});
//       }
//     } catch (err) {
//       console.error("Error fetching SEO data:", err);
//       setError("Failed to load SEO data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchSeoTag();
// }, []);


//   // console.log('url', url);
//   // console.log('slug', slug);

//   // console.log('seoData', seoData);

 

//   useEffect(() => {
//     setLoading(true);
//     const fetchExperienceData = async () => {
//       try {
//         const response = await api.get("/cms-parent-child/experience_center_gurugram");
//         setExperienceData(response.data);
//       } catch (err) {
//         console.error("Error fetching experience data:", err);
//         setError(
//           err.message ?? "Failed to load experience data. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperienceData();
//   }, []);



//   useEffect(() => {
//     setLoading(true);
//     const fetchExperienceDataVideo = async () => {
//       try {
//         const response = await api.get("/cms-parent-child/experience_center_gurugram_video");
//         setExperienceDataVideo(response.data);
//       } catch (err) {
//         console.error("Error fetching experience data:", err);
//         setError(
//           err.message ?? "Failed to load experience data. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperienceDataVideo();
//   }, []);


  
//   // Handle input change for text fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: checked }));
//   };

//   // Validate form fields
//   const validateForm = () => {
//     const errors = {
//       fullName: formData.fullName.trim() === "",
//       email: !/^\S+@\S+\.\S+$/.test(formData.email),
//       contactNo: formData.contactNo.trim() === "",
//       place: formData.place.trim() === "",
//       query: formData.query.trim() === "",
//       termsAccepted: !formData.termsAccepted,
//     };

//     setFieldErrors(errors);

//     // Return true if no errors
//     return !Object.values(errors).some((error) => error === true);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form before submission
//     if (!validateForm()) {
//       setSubmissionError(
//         "Please fill in all required fields and accept the terms."
//       );
//       return;
//     }

//     const formRequestedData = {
//       name: formData.fullName,
//       email: formData.email,
//       mobile: formData.contactNo,
//       place: formData.place,
//       query: formData.query,
//     };


//     try {
//       // Send POST request to save form data
//       const response = await api.post("/user-queries", formRequestedData);

//       // Handle success response
//       if (response.status === 201) {
//         setSubmissionMessage("Form submitted successfully!");
//         setFormData({
//           fullName: "",
//           email: "",
//           contactNo: "",
//           place: "",
//           query: "",
//           termsAccepted: false,

//         });
//         setTimeout(() => {
//           window.location.href = "/thank-you";

//       }, 300); 
//       } else {
//         setSubmissionError("Failed to submit form. Please try again.");
//       }
//     } catch (error) {
//       setSubmissionError("Error submitting form. Please try again.");
//     } finally {
//       // Clear error messages after 5 seconds
//       setTimeout(() => {
//         setSubmissionError("");
//         setSubmissionMessage("");
//       }, 5000);
//     }
//   };

//   return (
//     <div>
//       <head>
//         <title>{seoData?.title ?? "High Creation Interior Experience Center Gurugram	"}</title>
//         <meta
//           name="title"
//           content={seoData?.metaTitle ?? "High Creation Interior Experience Center Gurugram "}
//         />
//         <meta
//           name="description"
//           content={
//             seoData?.metaDescription ??
//             "High Creation Interior Experience Center Gurugram	"
//           }
//         />
//         <meta
//           name="keywords"
//           content={
//             seoData?.metaKeywords ??
//             "design idea, living room interior, living room design, living room decor, modular TV units, wall art, wall designs"
//           }
//         />
//         <link rel="canonical" href="https://hcinterior.in/experience-center-gurugram" />	
//       </head>
//       <MainLayout>
//         <main>
//           {/* <BackgroundImageRow
//                         sectionBgImages={"sectionbg secbgimg1"}
//                         sectionBgHeading="Experience Center"
//                         secBgHeadingClass="sec_bgheading_lass"
//                         sectionBgDescription="Explore a curated selection of premium living room interior designs and décor ideas at High Creation.
// We offer customizable, functional, and stylish solutions to elevate your living space. From modular TV
// units to wall art and innovative wall designs, find all the inspiration you need to transform your living
// room. Start browsing today to discover designs that perfectly reflect your personal style.
// "
//                         secBgDesClass="secbgbesclass"
//                     /> */}
          
//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : error ? (
//             <div className="text-center alert alert-danger">{error}</div>
//           ) : (
//             <>
//             <section className="video_wrapper conatiner-fluid">
       
//             <video
//               width="100%"
//               height="590"
//               class="object-fit-cover"
//               autoPlay
//               loop
//               muted
//               id="myVideo"
//             >
//               <source src={experienceDataVideo[0]?.child_content?.image} type="video/mp4" />
//             </video>
//           </section>
         
          
//             <section className="container my-5">
//             <div className="row mx-0 g-4">
//               <div className="col-lg-7">
//                 <PortfolioCard
//               cardDetailLink={`/experience-center/gallery?id=${experienceData[0]?.id}`}
//                   portCard={"card_portfolio portfolio_1"}
//                   portfolioImgBg={"portfolioimgall desig_gal_bg1 design_exper"}
//                   portfolioImg={experienceData[0]?.child_content?.image}
//                   portfolioTitle={experienceData && experienceData[0]?.child_content?.title}
//                   // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
//                   // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//                   // firstKey="Style"
//                   // firstValue={experienceData && experienceData[0]?.style}
//                   // secondKey="Room Dimension"
//                   // secondValue={experienceData && experienceData[0]?.room_dimension}
//                 />
//                 <PortfolioCard
//                   cardDetailLink={`/experience-center/gallery?id=${experienceData[1]?.id}`}
//                   portCard={"card_portfolio portfolio_1"}
//                   portfolioImgBg={"portfolioimgall desig_gal_bg2"}
//                   portfolioImg={experienceData[1]?.child_content?.image}
//                   portfolioTitle={experienceData && experienceData[1]?.child_content?.title}
//                   // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
//                   // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//                   // firstKey="Style"
//                   // firstValue={experienceData&&experienceData[1]?.style}
//                   // secondKey="Room Dimension"
//                   // secondValue={experienceData&&experienceData[1]?.room_dimension}
//                 />
//               </div>
//               <div className="col-lg-5">
//                 <div className="text-white form_experience_center mx-0">
//                 <form onSubmit={handleSubmit}>
//                       <h5 className="text-center">Design for Every Budget</h5>
//                       <p className="mb-4 text-center text-white">
//                         Get Your Dream house today. Let Our experts help you.
//                       </p>

//                       {/* Full Name */}
//                       <div className="mt-3 mb-3">
//                         <input
//                           type="text"
//                           className={`form-control ${fieldErrors.fullName ? "is-invalid" : ""}`}
//                           placeholder="Name"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         {fieldErrors.fullName && (
//                           <div className="invalid-feedback">
//                             Please enter your full name.
//                           </div>
//                         )}
//                       </div>

//                       <div className="mb-3 col-md-12">
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="contactNo"
//                               placeholder="Contact No."
//                               value={formData.contactNo}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>

//                       {/* Email */}
//                       <div className="mb-3">
//                         <input
//                           type="email"
//                           className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
//                           placeholder="Email ID"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         {fieldErrors.email && (
//                           <div className="invalid-feedback">
//                             Please enter a valid email address.
//                           </div>
//                         )}
//                       </div>

//                           <div className="mb-3 col-md-12">
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="place"
//                               value={formData.place}
//                               onChange={handleInputChange}
//                               placeholder="Place"
//                               required
//                             />
//                           </div>

//                           <div className="mb-3 col-md-12">
//                             <textarea
//                               className="form-control"
//                               name="query"
//                               placeholder="Query"
//                               rows="3"
//                               value={formData.query}
//                               onChange={handleInputChange}
//                             ></textarea>
//                           </div>

                 
//                       {/* Submit Button */}
//                       <div className="mb-3">
//                         <button type="submit" className="mb-3 know_more w-100">
//                           Get free Quote
//                         </button>
//                       </div>

//                      {/* Terms and Conditions */}
//                      <div className="mb-3 form-check">
//                         <input
//                           type="checkbox"
//                           className={`form-check-input ${
//                             fieldErrors.termsAccepted ? "is-invalid" : ""
//                           }`}
//                           name="termsAccepted"
//                           checked={formData.termsAccepted}
//                           onChange={handleCheckboxChange}
//                           required
//                         />
//                         <label
//                           className="text-white form-check-label"
//                           htmlFor="exampleCheck1"
//                         >
//                           By submitting this form, you agree to the{" "}
//                           <a href="#" className="text-warning">
//                             privacy policy
//                           </a>{" "}
//                           &{" "}
//                           <a href="#" className="text-warning">
//                             terms and conditions
//                           </a>
//                           .
//                         </label>
//                         {fieldErrors.termsAccepted && (
//                           <div className="invalid-feedback">
//                             You must accept the terms and conditions.
//                           </div>
//                         )}
//                       </div>
//                       {/* Display Submission Error or Success Message */}
//                       {submissionError && (
//                         <div className="text-center alert alert-danger">
//                           {submissionError}
//                         </div>
//                       )}
//                       {submissionMessage && (
//                         <div className="text-center alert alert-success">
//                           {submissionMessage}
//                         </div>
//                       )}
//                     </form>
//                 </div>
//               </div>
//               <div className="col-lg-12">
//                 <PortfolioCard
//                   cardDetailLink={`/experience-center/gallery?id=${experienceData[2]?.id}`}
//                   portCard={"card_portfolio portfolio_1"}
//                   portfolioImgBg={"portfolioimgall desig_gal_bg4"}
//                   portfolioImg={experienceData[2]?.child_content?.image}
//                   portfolioTitle={experienceData && experienceData[2]?.child_content?.title}
//                   // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
//                   // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//                   // firstKey="Style"
//                   // firstValue={experienceData && experienceData[2]?.style}
//                   // secondKey="Room Dimension"
//                   // secondValue={experienceData && experienceData[2]?.room_dimension}
//                 />
//               </div>
//               <div className="col-lg-9">
//                 <PortfolioCard
//                   cardDetailLink={`/experience-center/gallery?id=${experienceData[3]?.id}`}
//                   portCard={"card_portfolio portfolio_1"}
//                   portfolioImgBg={"portfolioimgall desig_gal_bg5"}
//                   portfolioImg={experienceData[3]?.child_content?.image}
//                   portfolioTitle={experienceData && experienceData[3]?.child_content?.title}
//                   // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
//                   // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//                   // firstKey="Style"
//                   // firstValue={experienceData && experienceData[3]?.style}
//                   // secondKey="Room Dimension"
//                   // secondValue={experienceData && experienceData[3]?.room_dimension}
//                 />
//               </div>
//               <div className="col-lg-3">
//                 <PortfolioCard
//                   cardDetailLink={`/experience-center/gallery?id=${experienceData[4]?.id}`}
//                   portCard={"card_portfolio portfolio_1"}
//                   portfolioImgBg={"portfolioimgall desig_gal_bg6"}
//                   portfolioImg={experienceData[4]?.child_content?.image}
//                   portfolioTitle={experienceData && experienceData[4]?.child_content?.title}
//                   // portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
//                   // portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//                   // firstKey="Style"
//                   // firstValue={experienceData && experienceData[4]?.style}
//                   // secondKey="Room Dimension"
//                   // secondValue={experienceData && experienceData[4]?.room_dimension}
//                 />
//               </div>
//               <div className="col-lg-6">
//               <PortfolioCard
//                 cardDetailLink={`/experience-center/gallery?id=${experienceData[5]?.id}`}
//                 portCard={"card_portfolio portfolio_1"}
//                 portfolioImgBg={"portfolioimgall desig_gal_bg7"}
//                 portfolioImg={experienceData[5]?.child_content?.image}
//                 portfolioTitle={experienceData && experienceData[5]?.child_content?.title}
//                 portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//               />
//             </div>
//             <div className="col-lg-6">
//               <PortfolioCard
//                 cardDetailLink={`/experience-center/gallery?id=${experienceData[6]?.id}`}
//                 portCard={"card_portfolio portfolio_1"}
//                 portfolioImgBg={"portfolioimgall desig_gal_bg8"}
//                 portfolioImg={experienceData[6]?.child_content?.image}
//                 portfolioTitle={experienceData && experienceData[6]?.child_content?.title}
//                 portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
//               />
//             </div>
//             </div>

//           </section>
//           </>
//           )}
//           <hr />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default Experience
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import ExperienceForm from "./ExperienceForm";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Experience Data ---
async function getExperienceData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/experience_center_gurugram`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch experience data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Experience Data Fetch Error:", err);
    return [];
  }
}

// --- HELPER: Fetch Video Data ---
async function getExperienceDataVideo() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/experience_center_gurugram_video`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch video data: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Video Data Fetch Error:", err);
    return [];
  }
}

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    // Match the specific page URL for Experience Center Gurugram
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/experience-center-gurugram" ||
          tag.page_name?.endsWith("/experience-center-gurugram")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "High Creation Interior Experience Center Gurugram";
  const defaultDesc = "High Creation Interior Experience Center Gurugram";
  const defaultCanonical = "https://hcinterior.in/experience-center-gurugram";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
    keywords:
      seoData?.metaKeywords ||
      "design idea, living room interior, living room design, living room decor, modular TV units, wall art, wall designs",
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function ExperienceGurugram() {
  const experienceData = await getExperienceData();
  const experienceDataVideo = await getExperienceDataVideo();

  return (
    <MainLayout>
      <main>
        {/* Video Section */}
        <section className="video_wrapper conatiner-fluid">
          {experienceDataVideo[0]?.child_content?.image && (
            <video
              width="100%"
              height="590"
              className="object-fit-cover"
              autoPlay
              loop
              muted
              id="myVideo"
            >
              <source
                src={experienceDataVideo[0]?.child_content?.image}
                type="video/mp4"
              />
            </video>
          )}
        </section>

        {/* Content Section */}
        <section className="container my-5">
          <div className="row mx-0 g-4">
            {/* Left Column (Items 0 & 1) */}
            <div className="col-lg-7">
              {experienceData[0] && (
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[0]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={
                    "portfolioimgall desig_gal_bg1 design_exper"
                  }
                  portfolioImg={experienceData[0]?.child_content?.image}
                  portfolioTitle={experienceData[0]?.child_content?.title}
                />
              )}
              {experienceData[1] && (
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[1]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg2"}
                  portfolioImg={experienceData[1]?.child_content?.image}
                  portfolioTitle={experienceData[1]?.child_content?.title}
                />
              )}
            </div>

            {/* Right Column (Form) */}
            <div className="col-lg-5">
              <ExperienceForm />
            </div>

            {/* Bottom Section (Remaining Items) */}
            {experienceData[2] && (
              <div className="col-lg-12">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[2]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg4"}
                  portfolioImg={experienceData[2]?.child_content?.image}
                  portfolioTitle={experienceData[2]?.child_content?.title}
                />
              </div>
            )}

            {experienceData[3] && (
              <div className="col-lg-9">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[3]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg5"}
                  portfolioImg={experienceData[3]?.child_content?.image}
                  portfolioTitle={experienceData[3]?.child_content?.title}
                />
              </div>
            )}

            {experienceData[4] && (
              <div className="col-lg-3">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[4]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg6"}
                  portfolioImg={experienceData[4]?.child_content?.image}
                  portfolioTitle={experienceData[4]?.child_content?.title}
                />
              </div>
            )}

            {experienceData[5] && (
              <div className="col-lg-6">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[5]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg7"}
                  portfolioImg={experienceData[5]?.child_content?.image}
                  portfolioTitle={experienceData[5]?.child_content?.title}
                  portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                />
              </div>
            )}

            {experienceData[6] && (
              <div className="col-lg-6">
                <PortfolioCard
                  cardDetailLink={`/experience-center/gallery?id=${experienceData[6]?.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall desig_gal_bg8"}
                  portfolioImg={experienceData[6]?.child_content?.image}
                  portfolioTitle={experienceData[6]?.child_content?.title}
                  portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                />
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}