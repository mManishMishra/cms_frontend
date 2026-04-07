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
//         `/cms-parent-child/sustainable_furniture_rattan`,
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
//         Custom Rattan furniture for your home - High Creation Interior	
//         </title>
//         <meta
//           name="description"
//           content="Enhance your home with High Creation Interior's custom rattan furniture, handcrafted for timeless elegance, durability, and personalized style.	"
//         />
//         <link rel="canonical" href="https://hcinterior.in/rattan" />	
//       </head>
//       <MainLayout>
//         <main>
//           <section className="container my-5 rattan_wrapper">
//             <div className="text-center mb-5">
//               <h1 className="wallpaperHeading">Rattan</h1>
//               <p className="px-lg-5 team_description">
//                 Upgrade your home with High Creation Interior&apos;s custom rattan
//                 furniture, beautifully handcrafted to bring timeless elegance
//                 and durability to your space. Each piece is made with care,
//                 blending natural materials and expert craftsmanship to create
//                 furniture that’s both stylish and functional. Whether you’re
//                 looking for a cozy chair, a statement table, or unique storage
//                 solutions, our rattan designs can be tailored to match your
//                 personal taste and needs. Perfect for any room, these pieces add
//                 warmth and character while standing the test of time. Experience
//                 the charm of rattan furniture designed just for you, combining
//                 beauty and practicality seamlessly.
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
//                     linkTagWallpaper={`/rattan/gallery?id=${design?.id}`}
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
//                     btnHrefWallpaper={`/rattan/gallery?id=${design?.id}`}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* <div className="row g-4 mx-0">
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/\rattan/1.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="bed"
//                   portfolioTitle="Bed"
//                   wallpaperDescriptiion="Elegant and durable, a rattan bed adds rustic charm to bedrooms."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/2.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="Kidsbed"
//                   portfolioTitle="Kid's Bed"
//                   wallpaperDescriptiion="Adorable and durable, a kids' rattan bed adds natural warmth.
// "
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/3.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="singlesofa"
//                   portfolioTitle="Sofa"
//                   wallpaperDescriptiion="Comfortable and chic, a rattan sofa brings natural charm home."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/4.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="chair"
//                   portfolioTitle="Chair"
//                   wallpaperDescriptiion="A rattan chair blends timeless charm with lightweight durability."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/5.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="centertable"
//                   portfolioTitle="Center Table"
//                   wallpaperDescriptiion="A rattan center table offers a stylish, eco-friendly touch.
// "
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/6.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="coffee"
//                   portfolioTitle="Coffee Table"
//                   wallpaperDescriptiion="A rattan coffee table brings a warm, natural vibe to any space."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/7.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="side-table"
//                   portfolioTitle="Side Table"
//                   wallpaperDescriptiion="Rattan side table designs feature unique, natural elegance and style."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/8.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="dressing-table"
//                   portfolioTitle="Dressing Unit"
//                   wallpaperDescriptiion="A rattan dressing unit design offers functional elegance and charm."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/9.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="dining-table"
//                   portfolioTitle="Dining Table & Unit"
//                   wallpaperDescriptiion="Rattan dining table & unit designs offer chic, functional elegance."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/10.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="mandir"
//                   portfolioTitle="Mandir Unit"
//                   wallpaperDescriptiion="Rattan mandir unit designs feature intricate craftsmanship and serenity."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/11.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="study-table"
//                   portfolioTitle="Study table"
//                   wallpaperDescriptiion="Rattan study table designs provide a stylish, functional workspace."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-4 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/sustainable-furniture/rattan/1.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="tv"
//                   portfolioTitle="TV Unit"
//                   wallpaperDescriptiion="Rattan study table designs provide a stylish, functional workspace."
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

// --- HELPER: Fetch Rattan Furniture Data ---
async function getRattanData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(
      `${baseURL}/cms-parent-child/sustainable_furniture_rattan`,
      {
        // cache handled by page revalidate
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch rattan data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Rattan Data Fetch Error:", err);
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

    // Match the specific page URL for Rattan
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/rattan" ||
          tag.page_name?.endsWith("/rattan")
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
    "Custom Rattan furniture for your home - High Creation Interior";
  const defaultDesc =
    "Enhance your home with High Creation Interior's custom rattan furniture, handcrafted for timeless elegance, durability, and personalized style.";
  const defaultCanonical = "https://hcinterior.in/rattan";

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
export default async function SustainableFurniture() {
  const exclusiveDesignData = await getRattanData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5 rattan_wrapper">
          <div className="text-center mb-5">
            <h1 className="wallpaperHeading">Rattan</h1>
            <p className="px-lg-5 team_description">
              Upgrade your home with High Creation Interior&apos;s custom rattan
              furniture, beautifully handcrafted to bring timeless elegance and
              durability to your space. Each piece is made with care, blending
              natural materials and expert craftsmanship to create furniture
              that’s both stylish and functional. Whether you’re looking for a
              cozy chair, a statement table, or unique storage solutions, our
              rattan designs can be tailored to match your personal taste and
              needs. Perfect for any room, these pieces add warmth and character
              while standing the test of time. Experience the charm of rattan
              furniture designed just for you, combining beauty and practicality
              seamlessly.
            </p>
          </div>

          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/rattan/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/rattan/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading rattan furniture...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}