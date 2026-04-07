// import { useCallback, useEffect, useState } from "react";
// import WallpaperCard from "../components/WallpaperCard";
// import MainLayout from "../layouts/MainLayout";
// import api from "@/utils/api";
// import { toast } from "react-toastify";
// import { defaultAltText } from "@/utils/helper";
// const SpaceSavingFurniture = () => {
//   const [exclusiveDesignData, setExclusiveDesignData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fetchContentManagerPages = useCallback(async () => {
//     try {
//       const response = await api.get(
//         `/cms-parent-child/space_saving_furniture`,
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
//         Space saving furniture for your home - High Creation Interior	
//         </title>
//         <meta
//           name="description"
//           content="Maximize your home’s potential with High Creation Interior's space-saving furniture. Stylish, functional designs crafted to optimize every inch of your living space.	"
//         />
//         <link rel="canonical" href="https://hcinterior.in/spacesaving-furniture" />
//       </head>
//       <MainLayout>
//         <main>
//           <section className="container my-5">
//             <div className="text-center row mx-0 mb-3 mb-lg-5">
//               <h1 className="wallpaperHeading">Space-Saving Furniture</h1>
//               <p className="px-lg-5 team_designation pt-3">
//                 Make the most of your home with High Creation Interior&apos; s
//                 space-saving furniture. Our stylish and practical designs are
//                 created to help you optimize every corner of your living space.
//                 Whether you have a small apartment or want to create more room
//                 in your home, our furniture combines functionality and elegance
//                 to suit your needs. From multi-purpose tables to smart storage
//                 solutions, each piece is thoughtfully designed to bring both
//                 convenience and beauty to your space. Transform your home into a
//                 more organized, comfortable, and inviting place with furniture
//                 that adapts to your lifestyle and enhances your daily living.
//               </p>
//             </div>
//             {/* <div className="row g-4 mx-0">
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/1.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Smart Furniture for Compact Homes"
//                   wallpaperDescriptiion="Upgrade your home with stylish, space-saving furniture for a clutter-free lifestyle."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/2.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Space-Saving Furniture Solutions"
//                   wallpaperDescriptiion="Discover comfold space-saving furniture that blends style with smart functionality."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/3.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Foldable Furniture for All Spaces"
//                   wallpaperDescriptiion="Transform small rooms with foldable furniture designed for modern, compact living."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/4.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Comfold Interiors for Smart Living"
//                   wallpaperDescriptiion="Redefine your home with comfold space-saving furniture and elegant interiors."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>

//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/5.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Smart Home Furniture Ideas"
//                   wallpaperDescriptiion="Maximize every corner with stylish, space-saving furniture for a smarter home."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/6.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Compact Living, Smart Interiors"
//                   wallpaperDescriptiion="Experience foldable and space-saving furniture for a stylish, functional home."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/7.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Space-Saving Home Solutions"
//                   wallpaperDescriptiion="Our smart furniture designs bring style and function to any compact living space."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/space-saving-furniture/8.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="wall"
//                   portfolioTitle="Stylish Smart Furniture Designs"
//                   wallpaperDescriptiion="Choose space-saving and foldable furniture to create a modern, spacious home."
//                   descriptionClass="team_description mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//             </div> */}

//             <div className="row g-4 mx-0">
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               {exclusiveDesignData?.map((design, index) => (
//                 <div key={index} className="col-lg-6 col-md-6 col-12">
//                   <WallpaperCard
//                     linkTagWallpaper={`/spacesaving-furniture/gallery?id=${design?.id}`}
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
//                     btnHrefWallpaper={`/spacesaving-furniture/gallery?id=${design?.id}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>
//           <hr />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default SpaceSavingFurniture;
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

// --- HELPER: Fetch Space Saving Furniture Data ---
async function getSpaceSavingFurnitureData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(
      `${baseURL}/cms-parent-child/space_saving_furniture`,
      {
        // cache handled by page revalidate
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch space saving furniture: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Space Saving Furniture Data Fetch Error:", err);
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

    // Match the specific page URL for Space Saving Furniture
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/spacesaving-furniture" ||
          tag.page_name?.endsWith("/spacesaving-furniture")
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
    "Space saving furniture for your home - High Creation Interior";
  const defaultDesc =
    "Maximize your home’s potential with High Creation Interior's space-saving furniture. Stylish, functional designs crafted to optimize every inch of your living space.";
  const defaultCanonical = "https://hcinterior.in/spacesaving-furniture";

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
export default async function SpaceSavingFurniture() {
  const exclusiveDesignData = await getSpaceSavingFurnitureData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center row mx-0 mb-3 mb-lg-5">
            <h1 className="wallpaperHeading">Space-Saving Furniture</h1>
            <p className="px-lg-5 team_designation pt-3">
              Make the most of your home with High Creation Interior&apos;s
              space-saving furniture. Our stylish and practical designs are
              created to help you optimize every corner of your living space.
              Whether you have a small apartment or want to create more room in
              your home, our furniture combines functionality and elegance to
              suit your needs. From multi-purpose tables to smart storage
              solutions, each piece is thoughtfully designed to bring both
              convenience and beauty to your space. Transform your home into a
              more organized, comfortable, and inviting place with furniture
              that adapts to your lifestyle and enhances your daily living.
            </p>
          </div>

          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/spacesaving-furniture/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/spacesaving-furniture/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading furniture...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}