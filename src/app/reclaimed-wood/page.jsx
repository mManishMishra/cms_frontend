// import { useCallback, useEffect, useState } from "react";
// import WallpaperCard from "../components/WallpaperCard";
// import MainLayout from "../layouts/MainLayout";
// import api from "@/utils/api";
// import { toast } from "react-toastify";
// import { defaultAltText } from "@/utils/helper";
// const SustainableFurniture = () => {

//   const [exclusiveDesignData, setExclusiveDesignData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fetchContentManagerPages = useCallback(async () => {
//     try {
//       const response = await api.get(
//         `/cms-parent-child/sustainable_furniture_reclaimed_wood`,
//         {}
//       );

//       if (response.status === 200) {
//         setExclusiveDesignData(response.data);
//       }
//     } catch (err) {
//       setError(
//         err.message ??
//           "Failed to load space saving furniture. Please try again."
//       );
//       toast.error(err.message || "Failed to fetch data. Please try again.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchContentManagerPages();
//   }, [fetchContentManagerPages]);


//   return (
//     <div>
//       <head>
//         <title>
//         Custom Reclaimed wood furniture for your home - High Creation Interior	
//         </title>
//         <meta
//           name="description"
//           content="Bring character to your home with High Creation Interior's custom reclaimed wood furniture, blending sustainability with timeless craftsmanship and unique designs.	"
//         />
//         <link rel="canonical" href="https://hcinterior.in/reclaimed-wood"/>	
//       </head>
//       <MainLayout>
//         <main>
//           <section className="container my-5 rattan_wrapper">
//             <div className="text-center my-5">
//               <h1 className="wallpaperHeading">Reclaimed Wood</h1>
//               <p className="px-lg-5 team_description">
//                 High Creation Interior&apos;s custom reclaimed wood furniture. Each
//                 piece is crafted with care, using sustainable wood to create
//                 unique designs that stand out. By choosing reclaimed materials,
//                 you’re not only helping the environment but also bringing
//                 history and charm into your living space. Our furniture combines
//                 timeless craftsmanship with modern style, ensuring that every
//                 item is both durable and beautiful. From rustic tables to custom
//                 storage pieces, our reclaimed wood furniture brings a touch of
//                 nature and individuality to your home, making it a truly special
//                 place to live.
//               </p>
//             </div>
//             <div className="row g-4 mx-0">
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               {exclusiveDesignData?.map((design, index) => (
//                 <div key={index} className="col-lg-4 col-md-6 col-12">
//                   <WallpaperCard
//                     linkTagWallpaper={`/reclaimed-wood/gallery?id=${design?.id}`}
//                     wallpaperCard="wallpapercard"
//                     imgWallpaper={
//                       design?.child_content?.image ?? "/images/Bhk/1bhk.png"
//                     }
//                     wallpaperImgClass="wallpaperclass"
//                     altWallpaper={
//                       design?.child_content?.title ?? defaultAltText
//                     }
//                     portfolioTitle={design?.child_content?.title}
//                     wallpaperDescriptiion={design?.child_content?.description}
//                     descriptionClass="team_description mb-0"
//                     textBtnWallpaper="View Design"
//                     btnHrefWallpaper={`/reclaimed-wood/gallery?id=${design?.id}`}
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* <div className="row g-4 mx-0">
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/1.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="bar"
//                   portfolioTitle="Bar Unit"
//                   wallpaperDescriptiion="A bar unit design stores drinks, glassware, and adds style."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/2.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="cough"
//                   portfolioTitle="Couch"
//                   wallpaperDescriptiion="A couch design offers comfort and style, enhancing living spaces."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/3.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="puffy"
//                   portfolioTitle="Puffy"
//                   wallpaperDescriptiion="A puffy couch design provides ultimate comfort and stylish appeal."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/4.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="chester-unit"
//                   portfolioTitle="Chester Unit"
//                   wallpaperDescriptiion="A Chester unit design combines classic style with practical storage."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/5.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="shoe-rack"
//                   portfolioTitle="Shoe Rack"
//                   wallpaperDescriptiion="A shoe rack design offers practical storage and stylish organization."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/6.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="breakfast-counter"
//                   portfolioTitle="Breakfast Counter"
//                   wallpaperDescriptiion="A breakfast counter design enhances kitchens with style and utility."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/7.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="crockry"
//                   portfolioTitle="Crockry"
//                   wallpaperDescriptiion="A crockery design offers both style and organization for dinnerware."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/8.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="way-window"
//                   portfolioTitle="Way Window"
//                   wallpaperDescriptiion="A way window design enhances natural light and style in interiors."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/9.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="book-shelf"
//                   portfolioTitle="Bookshelf"
//                   wallpaperDescriptiion="A bookshelf design offers organized storage with aesthetic appeal."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/10.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="balcony-chair-table"
//                   portfolioTitle="Balcony Chair & Table"
//                   wallpaperDescriptiion="A balcony chair and table design enhances outdoor comfort and style."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/11.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="balcony-chair-table"
//                   portfolioTitle="Side Table"
//                   wallpaperDescriptiion="A sleek and practical piece, perfect for adding style and convenience to any space."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\reclaimed-wood/12.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="balcony-chair-table"
//                   portfolioTitle="Sofa Cushion"
//                   wallpaperDescriptiion="Compact and versatile side table adds convenience style to any room."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//             </div> */}
//           </section>
//           <hr />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default SustainableFurniture;
import MainLayout from "../layouts/MainLayout";
import WallpaperCard from "../components/WallpaperCard";
import { defaultAltText } from "@/utils/helper";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Reclaimed Wood Data ---
async function getReclaimedWoodData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(
      `${baseURL}/cms-parent-child/sustainable_furniture_reclaimed_wood`,
      {
        // cache handled by page revalidate
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch reclaimed wood data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Reclaimed Wood Data Fetch Error:", err);
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

    // Match the specific page URL for Reclaimed Wood
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/reclaimed-wood" ||
          tag.page_name?.endsWith("/reclaimed-wood")
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

  const defaultTitle =
    "Custom Reclaimed wood furniture for your home - High Creation Interior";
  const defaultDesc =
    "Bring character to your home with High Creation Interior's custom reclaimed wood furniture, blending sustainability with timeless craftsmanship and unique designs.";
  const defaultCanonical = "https://hcinterior.in/reclaimed-wood";

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
export default async function ReclaimedWood() {
  const exclusiveDesignData = await getReclaimedWoodData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5 rattan_wrapper">
          <div className="text-center my-5">
            <h1 className="wallpaperHeading">Reclaimed Wood</h1>
            <p className="px-lg-5 team_description">
              High Creation Interior&apos;s custom reclaimed wood furniture. Each
              piece is crafted with care, using sustainable wood to create unique
              designs that stand out. By choosing reclaimed materials, you’re not
              only helping the environment but also bringing history and charm
              into your living space. Our furniture combines timeless
              craftsmanship with modern style, ensuring that every item is both
              durable and beautiful. From rustic tables to custom storage pieces,
              our reclaimed wood furniture brings a touch of nature and
              individuality to your home, making it a truly special place to live.
            </p>
          </div>
          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/reclaimed-wood/gallery?id=${design?.id}`}
                    wallpaperCard="wallpapercard"
                    imgWallpaper={
                      design?.child_content?.image ?? "/images/Bhk/1bhk.png"
                    }
                    wallpaperImgClass="wallpaperclass"
                    altWallpaper={
                      design?.child_content?.title ?? defaultAltText
                    }
                    portfolioTitle={design?.child_content?.title}
                    wallpaperDescriptiion={design?.child_content?.description}
                    descriptionClass="team_description mb-0"
                    textBtnWallpaper="View Design"
                    btnHrefWallpaper={`/reclaimed-wood/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading reclaimed wood furniture...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}