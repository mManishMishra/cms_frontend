// import { useCallback, useEffect, useState } from "react";
// import api from "@/utils/api";
// import { toast } from "react-toastify";
// import WallpaperCard from "../components/WallpaperCard";
// import MainLayout from "../layouts/MainLayout";
// import { defaultAltText } from "@/utils/helper";

// const Wallpaper = () => {
//   const [exclusiveDesignData, setExclusiveDesignData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchContentManagerPages = useCallback(async () => {
//     try {
//       const response = await api.get(`/cms-parent-child/wallpaper`, {});

//       if (response.status === 200) {
//         setExclusiveDesignData(response.data);
//       }
//     } catch (err) {
//       setError(err.message ?? "Failed to load wallapers. Please try again.");
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
//         Customized wallpapers for your home - High Creation Interior	
//         </title>
//         <meta
//           name="description"
//           content="Transform your walls with stunning wallpapers that add style, texture, and personality to any space. Explore our collection of wall papers for every taste and design.	"
//         />
//         <link rel="canonical" href="https://hcinterior.in/wallpaper" />	
//       </head>
//       <MainLayout>
//         <main>
//           <section className="container my-5">
//             <div className="text-center row mx-0 mb-3 mb-lg-5">
//               <h1 className="wallpaperHeading">Wallpaper</h1>
//               <p className="px-lg-5 team_designation">
//                 Give your walls a fresh new look with our stunning wallpapers,
//                 designed to bring style, texture, and personality to any room.
//                 From bold patterns to subtle designs, our collection offers
//                 something for every taste and decor style. Whether you want to
//                 create a cozy ambiance, make a statement, or add a touch of
//                 elegance, our wallpapers make it easy to transform your space.
//                 Choose from a variety of colors, textures, and themes to match
//                 your vision and make your home truly yours. Simple to install
//                 and long-lasting, our wallpapers are the perfect way to elevate
//                 your interiors effortlessly.
//               </p>
//             </div>
//             {/* <div className="row g-4 mx-0">
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/lotus_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="Lotus"
//                   portfolioTitle="Lotus"
//                   wallpaperDescriptiion="Serene lotus-themed wallpaper brings harmony and calm with soft-toned blossoms for a tranquil space."
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/pichai_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="pichwai"
//                   portfolioTitle="Pichwai Cow Wallpaper"
//                   wallpaperDescriptiion="Pichwai interior wallpaper features intricate, traditional Indian art, floral motifs, and pastoral scenes."
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/floral_img.webp"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="floral"
//                   portfolioTitle="Floral"
//                   wallpaperDescriptiion="A vibrant floral interior wallpaper featuring intricate, colorful blossoms, adding elegance, warmth, and nature-inspired beauty to any space"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/rajmahel_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="rajmehel"
//                   portfolioTitle="Rajmahal"
//                   wallpaperDescriptiion="Rajmahal interior wallpaper features intricate floral patterns and rich color palettes, combining elegance with traditional motifs for a luxurious ambiance"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/flamingo_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="waFlamingoll"
//                   portfolioTitle="Flamingo"
//                   wallpaperDescriptiion="A vibrant flamingo interior wallpaper featuring tropical palm leaves and soft pink hues, adding an exotic, lively atmosphere"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/madhubani_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="madhuban"
//                   portfolioTitle="Madhuban"
//                   wallpaperDescriptiion="Madhubani interior wallpaper features intricate, vibrant designs inspired by traditional Indian folk art, showcasing nature, mythology, and cultural motifs"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/forest_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="forest"
//                   portfolioTitle="Forest"
//                   wallpaperDescriptiion="A serene, mist-covered forest filled with towering trees, lush green foliage, soft sunlight, and peaceful tranquility."
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/baloons_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="waFlamingoll"
//                   portfolioTitle="Baloons In The Cloud"
//                   wallpaperDescriptiion="Balloons float amidst soft, dreamy clouds, creating a whimsical, serene atmosphere. Perfect for uplifting, airy interior decor"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/forest_walk_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="jungle"
//                   portfolioTitle="Forest Walk In Jungle"
//                   wallpaperDescriptiion="A lush jungle interior wallpaper featuring a serene forest walk, surrounded by dense greenery, vibrant plants, and towering trees"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/monkey_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="monkey"
//                   portfolioTitle="Monkey"
//                   wallpaperDescriptiion="A playful monkey-themed wallpaper featuring vibrant jungle scenery, mischievous monkeys swinging on vines, adding a fun, lively vibe"
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/tropical_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="tropical"
//                   portfolioTitle="Tropical Forest Tropical Birds"
//                   wallpaperDescriptiion="Immerse your space in vibrant hues with this tropical forest wallpaper, featuring lush greenery and colorful tropical birds for a serene atmosphere."
//                   descriptionClass="team_designation mb-0"
//                   textBtnWallpaper="View Design"
//                   btnHrefWallpaper="/gallery-inner"
//                 />
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <WallpaperCard
//                   linkTagWallpaper="/gallery-inner"
//                   wallpaperCard="wallpapercard"
//                   imgWallpaper="/images/wallpaper/nature_img.jpg"
//                   wallpaperImgClass="wallpaperclass"
//                   altWallpaper="Nature"
//                   portfolioTitle="Nature"
//                   wallpaperDescriptiion="Transform your space with nature-inspired wallpaper, featuring lush greenery, serene landscapes, and vibrant florals that bring the outdoors inside."
//                   descriptionClass="team_designation mb-0"
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
//                     linkTagWallpaper={`/wallpaper/gallery?id=${design?.id}`}
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
//                     btnHrefWallpaper={`/wallpaper/gallery?id=${design?.id}`}
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

// export default Wallpaper;
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

// --- HELPER: Fetch Wallpaper Data ---
async function getWallpaperData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/wallpaper`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch wallpaper data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Wallpaper Data Fetch Error:", err);
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

    // Match the specific page URL for Wallpaper
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/wallpaper" ||
          tag.page_name?.endsWith("/wallpaper")
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
    "Customized wallpapers for your home - High Creation Interior";
  const defaultDesc =
    "Transform your walls with stunning wallpapers that add style, texture, and personality to any space. Explore our collection of wall papers for every taste and design.";
  const defaultCanonical = "https://hcinterior.in/wallpaper";

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
export default async function Wallpaper() {
  const exclusiveDesignData = await getWallpaperData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center row mx-0 mb-3 mb-lg-5">
            <h1 className="wallpaperHeading">Wallpaper</h1>
            <p className="px-lg-5 team_designation">
              Give your walls a fresh new look with our stunning wallpapers,
              designed to bring style, texture, and personality to any room.
              From bold patterns to subtle designs, our collection offers
              something for every taste and decor style. Whether you want to
              create a cozy ambiance, make a statement, or add a touch of
              elegance, our wallpapers make it easy to transform your space.
              Choose from a variety of colors, textures, and themes to match
              your vision and make your home truly yours. Simple to install and
              long-lasting, our wallpapers are the perfect way to elevate your
              interiors effortlessly.
            </p>
          </div>

          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/wallpaper/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/wallpaper/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading wallpapers...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}