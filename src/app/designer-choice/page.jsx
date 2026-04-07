// import MainLayout from "../layouts/MainLayout";
// import PortfolioCard from "../components/PortfolioCard";
// import BgImageCard from "../components/BgImageCard";
// import BackgroundImageRow from "../components/BackgroundImageRow";
// import { useEffect, useState } from "react";
// import api from "@/utils/api";

// const Designidea = () => {
//   const [designIdea, setDesignIdea] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [seoData, setSeoData] = useState({});

//   useEffect(() => {
//     setLoading(true);
//     const fetchDesignIdea = async () => {
//       try {
//         const response = await api.get("/cms-parent-child/designer_choice");
//         setDesignIdea(response.data);
//       } catch (err) {
//         console.error("Error fetching design idea:", err);
//         setError("Failed to load design ideas. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDesignIdea();
//   }, []);

//   useEffect(() => {
//     const fetchSeoData = async () => {
//       try {
//         const response = await api.get("/content-manager/slug/design-idea");
//         setSeoData(response.data);
//       } catch (err) {
//         console.error("Error fetching SEO data:", err);
//       }
//     };

//     fetchSeoData();
//   }, []);

//   // Sort records by ID in descending order (newest first)
//   const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

//   // Get the 8 oldest records
//   const staticRecords = sortedDesignIdea.slice(-5); // Last 8 records (oldest)

//   // Get the latest records (excluding the last 8)
//   const latestRecords = sortedDesignIdea.slice(0, -5); // Everything except last 8
//  console.log('latestRecords',latestRecords);
//   return (
//     <div>
//       <head>
//         <title>{seoData?.title ?? "High Creation Interior - Interior Design Gallery"}</title>
//         <meta name="title" content={seoData?.metaTitle ?? "High Creation Interior - Interior Design Gallery"} />
//         <meta
//           name="description"
//           content={seoData?.metaDescription ?? "Explore Interior Design gallery designed by Top interior designers at High Creation Interior."}
//         />
//         <meta
//           name="keywords"
//           content={seoData?.metaKeywords ?? "design idea, living room interior, living room design, living room decor"}
//         />
//       </head>
//       <MainLayout>
//         <main>
//         <div className="container">
//         <div className="text-center mt-3 mx-0 row">
//               <h1 className="wallpaperHeading">Designer Choice</h1>
//               <p className="px-lg-5 team_description">
//            Explore our curated selection of stunning interior designs, blending luxury, functionality, and innovation. From modern minimalism to timeless elegance, each space is crafted to inspire. Discover bespoke designs, premium materials, and expert craftsmanship that transform homes into masterpieces. Elevate your interiors with our exclusive designer choices.
//               </p>
//             </div>
//             </div> 
//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : error ? (
//             <div className="text-center alert alert-danger">{error}</div>
//           ) : (
//             <section className="container my-0">
              
//                 {/* Check if static records exist */}
//                 {staticRecords.length > 0 ? (
//               <div className="mt-0 row g-4 mx-0">
//               <div className="col-lg-5 col-md-6 col-12">
//                 <BgImageCard
//                  style={{
//                   backgroundImage: `url(${staticRecords[0]?.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${staticRecords[0]?.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={staticRecords[0]?.child_content?.title}
//                   descriptionBg={staticRecords[0]?.child_content?.description}
//                 />
//               </div>
//               <div className="col-lg-7 col-md-6 col-12">
//               <BgImageCard
//                  style={{
//                   backgroundImage: `url(${staticRecords[1]?.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${staticRecords[1]?.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={staticRecords[1]?.child_content?.title}
//                   descriptionBg={staticRecords[1]?.child_content?.description}
//                 />
//               </div>
//               <div className="col-lg-7 col-md-6 col-12">
//               <BgImageCard
//                  style={{
//                   backgroundImage: `url(${staticRecords[2]?.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${staticRecords[2]?.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={staticRecords[2]?.child_content?.title}
//                   descriptionBg={staticRecords[2]?.child_content?.description}
//                 />
//               </div>
//               <div className="col-lg-5 col-md-6 col-12">
//               <BgImageCard
//                  style={{
//                   backgroundImage: `url(${staticRecords[3]?.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${staticRecords[3]?.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={staticRecords[3]?.child_content?.title}
//                   descriptionBg={staticRecords[3]?.child_content?.description}
//                 />
//               </div>
//               <div className="col-lg-12 ">
//               <BgImageCard
//                  style={{
//                   backgroundImage: `url(${staticRecords[4]?.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${staticRecords[4]?.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={staticRecords[4]?.child_content?.title}
//                   descriptionBg={staticRecords[4]?.child_content?.description}
//                 />
//               </div>
//             </div>
//                 ) : (
//                   <></>
//                 )}
             
//              <div className="mt-4 row g-4 mx-0">
//                   {latestRecords.map((item) => (
//                     <div key={item.id} className="col-lg-6">

// <BgImageCard
//                  style={{
//                   backgroundImage: `url(${item.child_content?.image})`,
//                 }}
//                   cardLinkTag={`/designer-choice/gallery?id=${item.id}`}
//                   designerCardBgDiv={"designercard designercardimg1"}
//                   titleBgImage={item.child_content?.title}
//                   descriptionBg={item.child_content?.description}
//                 />

                     
//                     </div>
//                   ))}
//                 </div>
//             </section>
//           )}
//           <hr className="mt-5" />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default Designidea;
import MainLayout from "../layouts/MainLayout";
import BgImageCard from "../components/BgImageCard";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Designer Choice Data ---
async function getDesignerChoices() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/designer_choice`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch designer choices: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Designer Choice Fetch Error:", err);
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

    // Match the specific page URL for Designer Choice
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/designer-choice" ||
          tag.page_name?.endsWith("/designer-choice")
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

  const defaultTitle = "High Creation Interior - Interior Design Gallery";
  const defaultDesc = "Explore Interior Design gallery designed by Top interior designers at High Creation Interior.";
  const defaultCanonical = "https://hcinterior.in/designer-choice";

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
export default async function DesignerChoice() {
  const designIdea = await getDesignerChoices();

  // --- LOGIC: Sort and Split Records ---
  // 1. Sort records by ID in descending order (newest first)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

  // 2. Get the 5 oldest records (The last 5 items of the descending list)
  // These are displayed in the specific featured grid at the top
  const staticRecords = sortedDesignIdea.slice(-5);

  // 3. Get the latest records (Everything except the last 5)
  // These are displayed in the list below the grid
  const latestRecords = sortedDesignIdea.slice(0, -5);

  return (
    <MainLayout>
      <main>
        <div className="container">
          <div className="text-center mt-3 mx-0 row">
            <h1 className="wallpaperHeading">Designer Choice</h1>
            <p className="px-lg-5 team_description">
              Explore our curated selection of stunning interior designs, blending luxury, functionality, and innovation. From modern minimalism to timeless elegance, each space is crafted to inspire. Discover bespoke designs, premium materials, and expert craftsmanship that transform homes into masterpieces. Elevate your interiors with our exclusive designer choices.
            </p>
          </div>
        </div>

        <section className="container my-0">
          {/* Static Records Grid (Oldest 5) */}
          {staticRecords.length > 0 && (
            <div className="mt-0 row g-4 mx-0">
              <div className="col-lg-5 col-md-6 col-12">
                {staticRecords[0] && (
                  <BgImageCard
                    style={{
                      backgroundImage: `url(${staticRecords[0]?.child_content?.image})`,
                    }}
                    cardLinkTag={`/designer-choice/gallery?id=${staticRecords[0]?.id}`}
                    designerCardBgDiv={"designercard designercardimg1"}
                    titleBgImage={staticRecords[0]?.child_content?.title}
                    descriptionBg={staticRecords[0]?.child_content?.description}
                  />
                )}
              </div>
              <div className="col-lg-7 col-md-6 col-12">
                {staticRecords[1] && (
                  <BgImageCard
                    style={{
                      backgroundImage: `url(${staticRecords[1]?.child_content?.image})`,
                    }}
                    cardLinkTag={`/designer-choice/gallery?id=${staticRecords[1]?.id}`}
                    designerCardBgDiv={"designercard designercardimg1"}
                    titleBgImage={staticRecords[1]?.child_content?.title}
                    descriptionBg={staticRecords[1]?.child_content?.description}
                  />
                )}
              </div>
              <div className="col-lg-7 col-md-6 col-12">
                {staticRecords[2] && (
                  <BgImageCard
                    style={{
                      backgroundImage: `url(${staticRecords[2]?.child_content?.image})`,
                    }}
                    cardLinkTag={`/designer-choice/gallery?id=${staticRecords[2]?.id}`}
                    designerCardBgDiv={"designercard designercardimg1"}
                    titleBgImage={staticRecords[2]?.child_content?.title}
                    descriptionBg={staticRecords[2]?.child_content?.description}
                  />
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-12">
                {staticRecords[3] && (
                  <BgImageCard
                    style={{
                      backgroundImage: `url(${staticRecords[3]?.child_content?.image})`,
                    }}
                    cardLinkTag={`/designer-choice/gallery?id=${staticRecords[3]?.id}`}
                    designerCardBgDiv={"designercard designercardimg1"}
                    titleBgImage={staticRecords[3]?.child_content?.title}
                    descriptionBg={staticRecords[3]?.child_content?.description}
                  />
                )}
              </div>
              <div className="col-lg-12">
                {staticRecords[4] && (
                  <BgImageCard
                    style={{
                      backgroundImage: `url(${staticRecords[4]?.child_content?.image})`,
                    }}
                    cardLinkTag={`/designer-choice/gallery?id=${staticRecords[4]?.id}`}
                    designerCardBgDiv={"designercard designercardimg1"}
                    titleBgImage={staticRecords[4]?.child_content?.title}
                    descriptionBg={staticRecords[4]?.child_content?.description}
                  />
                )}
              </div>
            </div>
          )}

          {/* Latest Records (Remainder) */}
          <div className="mt-4 row g-4 mx-0">
            {latestRecords.map((item) => (
              <div key={item.id} className="col-lg-6">
                <BgImageCard
                  style={{
                    backgroundImage: `url(${item.child_content?.image})`,
                  }}
                  cardLinkTag={`/designer-choice/gallery?id=${item.id}`}
                  designerCardBgDiv={"designercard designercardimg1"}
                  titleBgImage={item.child_content?.title}
                  descriptionBg={item.child_content?.description}
                />
              </div>
            ))}
          </div>
        </section>

        <hr className="mt-5" />
      </main>
    </MainLayout>
  );
}