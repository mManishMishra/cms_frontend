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

// --- HELPER: Fetch Furniture Data ---
async function getFurnitureData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/furniture`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch furniture data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Furniture Data Fetch Error:", err);
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

    // Match the specific page URL for Furniture
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/furniture" ||
          tag.page_name?.endsWith("/furniture")
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

  const defaultTitle = "Explore customized furniture design for your dream home";
  const defaultDesc =
    "Discover customized furniture designs tailored for your dream home, blending style, functionality, and personalization to create spaces you’ll love.";
  const defaultCanonical = "https://hcinterior.in/furniture";

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
export default async function Furniture() {
  const exclusiveDesignData = await getFurnitureData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center mb-5 row mx-0">
            <h1 className="wallpaperHeading">Furniture</h1>
            <p className="px-lg-5">
              Create the perfect home with customized furniture designs that are
              designed to your needs. We combine style, functionality, and
              personalization to craft pieces that fit seamlessly into your
              space. Whether you&apos;re updating a single room or redesigning
              your entire home, our furniture is designed to enhance both form
              and function. Each item is made with attention to detail, ensuring
              it complements your style while making everyday life easier.
              Discover furniture that not only looks great but works for you,
              turning your house into a space you’ll truly love to live in. Let
              us bring your dream home to life.
            </p>
          </div>

          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/furniture/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/furniture/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading furniture items...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}