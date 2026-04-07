// import MainLayout from "../layouts/MainLayout";
// import BackgroundImageRow from "../components/BackgroundImageRow";
// import RowImage from "../components/RowImage";
// import ServicesRowLeft from "../components/ServicesRowLeft";
// import ServicesRightRow from "../components/ServicesRightRow";
// import { useEffect, useState } from "react";
// import api from "@/utils/api";
// import { toast } from "react-toastify";
// import { defaultAltText } from "@/utils/helper";
// const Services = () => {
// const [pageDataList, setPageDataList] = useState([]);
// const [HomePageContent, setHomePageContent] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState("");

// useEffect(() => {
//   setLoading(true);
//   const fetch_HomePageContent = async () => {
//     try {
//       const response = await api.get("/cms-content/home_page_content_what_we_are");
//       setHomePageContent(response.data);
//       console.log('fetch_HomePageContent', response.data);
//     } catch (err) {
//       console.error("Error fetching design idea:", err);
//       setError("Failed to load design ideas. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetch_HomePageContent();
// }, []);

//   return (
//     <div>
//       <MainLayout>
//         <main className="what_we_offer">
//           <BackgroundImageRow
//             sectionBgImages={"sectionbg services"}
//             sectionBgHeading="What We Offer"
//             secBgHeadingClass="sec_bgheading_lass"
//             sectionBgDescription="We provide bespoke interior design solutions, including residential and commercial styling, space planning, furniture selection, and décor enhancements, ensuring elegant, functional, and personalized spaces tailored to your vision."
//             secBgDesClass="secbgbesclass"
//           />

//           <div id="one">
//           <ServicesRowLeft
//             column1={"col-lg-6 d-flex align-items-center"}
//             ServicesImgUrl="/images/what_we_offer/design_planing.jpg"
//             servicesImgAlt='Design & Planning'
//             servicesImgClass="  offerimg"
//             column2={"col-lg-6"}
//             ServicesHeading='Design & Planning'
//             ServicesDescription='Our design and planning process is the foundation of a beautifully crafted home. We begin by understanding your lifestyle, preferences, and space requirements. Our expert designers create personalized layouts, mood boards, and 3D visualizations to help you visualize the transformation. Every detail—from space utilization to material selection—is thoughtfully planned to ensure functionality, style, and comfort. With a perfect balance of creativity and practicality, we turn your vision into a well-structured, elegant reality.'
//             textBtnServices="Read More"
//             linkBtnServices=''
//           />
// </div>

// <div id="two">
//           <ServicesRightRow
//             sectionServices={"services_sec_wrapper1"}
//             colum1="col-lg-6"
//             ServicesImgUrlRight="/images/what_we_offer/custom_solution.jpg"
//             servicesImgAltRight='Custom & Solution'
//             servicesImgClass="offerimg"
//             colum2={"col-lg-6 align-items-center d-flex"}
//             ServicesHeadingRight='Custom & Solution'
//             ServicesDescriptionRight="We specialize in providing customized solutions tailored to your needs. From furniture to interiors, everything is crafted just the way you want. Your style, your space — designed with your vision in mind. Choose from a wide range of materials, colors, and finishes. Every detail is personalized to suit your lifestyle and preferences. Our expert team ensures a seamless design-to-delivery experience. We don't just create furniture — we create solutions that fit you. Whether it's functionality, aesthetics, or space optimization, we’ve got you covered. Experience the perfect blend of comfort, style, and innovation. Because your space deserves more than standard — it deserves custom."
//             descrClass={"team_description"}
//             textBtnServicesRight="Read More"
//             linkBtnServices=''
//           />
// </div>

// <div id="three">
//           <ServicesRowLeft
//             column1={"col-lg-6 d-flex align-items-center"}
//             ServicesImgUrl="/images/what_we_offer/Furniture.jpg"
//             servicesImgAlt='Furniture'
//             servicesImgClass="offerimg"
//             column2={"col-lg-6"}
//             ServicesHeading='Furniture'
//             ServicesDescription='We offer beautifully customized furniture tailored to your needs and lifestyle.Choose from a wide range of designs, styles, and configurations to suit your space.Select your preferred fabric, colors, and finishes to match your interior theme.Each piece is carefully crafted to reflect your personal taste and comfort.Whether it’s a sofa, bed, wardrobe, or dining set – we’ve got you covered.Our expert team ensures every detail meets your specific requirements.Enjoy a seamless experience from design consultation to final delivery.We combine aesthetics with functionality, making your space truly yours.Get premium quality and craftsmanship at competitive prices.Let’s turn your dream furniture into reality – just the way you imagined.'
//             textBtnServices="Read More"
//             linkBtnServices=''
//           />
// </div>

// <div id="four">
//           <ServicesRightRow
//             sectionServices={"services_sec_wrapper1"}
//             colum1="col-lg-6"
//             ServicesImgUrlRight="/images/what_we_offer/modular_kitchen.jpg"
//             servicesImgAltRight='Modular Kitchens'
//             servicesImgClass="offerimg"
//             colum2={"col-lg-6 align-items-center d-flex"}
//             ServicesHeadingRight='Modular Kitchens'
//             ServicesDescriptionRight='We offer beautifully designed modular kitchens tailored to your needs and lifestyle.Customize every element to suit your space, functionality, and preferences.Choose from a wide range of designs, layouts, and finishes.You have the freedom to select your preferred materials, fabrics, and colors.Whether you prefer a modern, classic, or contemporary look, we’ve got you covered.Our team ensures a perfect blend of aesthetics and practicality.Every kitchen is thoughtfully planned for maximum storage and efficiency.We use high-quality materials to ensure durability and long-lasting performance.Enjoy a hassle-free experience with end-to-end design and installation support.Let us help you create a kitchen that reflects your taste and elevates your home.'
//              descrClass={"team_description"}
//             textBtnServicesRight="Read More"
//             linkBtnServices={HomePageContent[21]?.json_content?.designation}
//           />
// </div>

// <div id="five">
//           <ServicesRowLeft
//             column1={"col-lg-6 d-flex align-items-center"}
//             ServicesImgUrl="/images/what_we_offer/civil_work.jpg"
//             servicesImgAlt='Civil Work'
//             servicesImgClass="offerimg"
//             column2={"col-lg-6"}
//             ServicesHeading='Civil Work'
//             ServicesDescription="We offer customized civil work tailored to your specific needs and requirements.Our services are designed to suit your space, style, and preferences.You have complete freedom to choose the fabric, finishes, and color combinations.Whether it’s a full renovation or minor modifications, we’ve got you covered.Our team ensures quality workmanship with attention to detail in every step.We aim to bring your vision to life with practical and aesthetic solutions.All materials and designs are selected based on your taste and budget.We guide you through every stage—from planning to execution.Your satisfaction is our priority, and we ensure a seamless experience.Let us help you build a space that reflects your personality and lifestyle."
//             textBtnServices="Read More"
//             linkBtnServices=''
//           />
// </div>


// <div id="six">
//           <ServicesRightRow
//             sectionServices={"services_sec_wrapper1"}
//             colum1="col-lg-6"
//             ServicesImgUrlRight="/images/what_we_offer/one_year_maintenance.jpg"
//             servicesImgAltRight='1 Year Maintenance and 10 Years Of Warranty'
//             servicesImgClass="offerimg"
//             colum2={"col-lg-6 align-items-center d-flex"}
//             ServicesHeadingRight='1 Year Maintenance and 10 Years Of Warranty'
//             ServicesDescriptionRight='We believe in delivering quality that lasts.
// That’s why we offer 1 year of free maintenance — hassle-free and worry-free.
// Enjoy complete peace of mind after your interior work is done.
// Our dedicated team will take care of any minor fixes or adjustments during the first year.
// Beyond that, we’ve got you covered with a 10-year warranty on our work.
// This ensures long-term durability and confidence in your investment.
// Our warranty reflects our commitment to quality craftsmanship and trusted materials.
// You can rest assured knowing your home interiors are protected.
// We don’t just build spaces — we build long-lasting relationships.
// Because your satisfaction and comfort are always our priority.'
//              descrClass={"team_description"}
//             textBtnServicesRight="Read More"
//             linkBtnServices={HomePageContent[21]?.json_content?.designation}
//           />
// </div>
 

 
// <div id="seven">
//           <ServicesRowLeft
//             column1={"col-lg-6 d-flex align-items-center"}
//             ServicesImgUrl="/images/what_we_offer/personal_team_who_is_dedicated.jpg"
//             servicesImgAlt='Personal Team Who Is Dedicated To Your Work'
//             servicesImgClass="offerimg"
//             column2={"col-lg-6"}
//             ServicesHeading='Personal Team Who Is Dedicated To Your Work'
//             ServicesDescription="You get a dedicated personal team, focused solely on your project. From start to finish, every detail is managed with care and precision. Your team understands your vision and works closely to bring it to life.
// Seamless communication ensures you're always in the loop. Every query is addressed promptly — you're never left waiting. Expert designers, supervisors, and support staff just for you. Your project is treated as a priority, not just another assignment. Enjoy a hassle-free experience with end-to-end coordination.
// Quality, commitment, and timely delivery — all handled by your team. Because your dream space deserves a team that’s truly yours."
//             textBtnServices="Read More"
//             linkBtnServices=''
//           />
// </div>


//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default Services;
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Content ---
async function getWhatWeOfferContent() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-content/what_we_offer`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch 'what we offer' content: ${res.status}`);
      return "";
    }

    const text = await res.text();
    if (!text) return "";
    const data = JSON.parse(text);
    return data?.json_content?.html || "";
  } catch (err) {
    console.error("What We Offer Content Fetch Error:", err);
    return "";
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

    // Match the specific page URL for What We Offer
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/what-we-offer" ||
          tag.page_name?.endsWith("/what-we-offer")
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

  const defaultTitle = "What We Offer - High Creation Interior";
  const defaultDesc =
    "Explore the comprehensive interior design services offered by High Creation Interior. From residential to commercial projects, we provide tailored solutions to transform your space.";
  const defaultCanonical = "https://hcinterior.in/what-we-offer";

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
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function WhatWeOffer() {
  const pageData = await getWhatWeOfferContent();

  return (
    <MainLayout>
      <main>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper what_we_offer_banner"}
          sectionBgHeading="What We Offer"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass={"text-center text-white"}
        />

        <section className="privacy my-5">
          <div className="container">
            <div className="row mx-0">
              <div className="text-center mb-4">
                <h2>High Creation Interior</h2>
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    What We Offer
                  </span>
                </h3>
              </div>

              {/* Render HTML content from CMS */}
              <div dangerouslySetInnerHTML={{ __html: pageData }} />
            </div>
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}