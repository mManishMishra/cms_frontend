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

// --- HELPER: Fetch Ready To Go Design Data ---
async function getReadyToGoDesignData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/ready_to_go_design`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch ready-to-go design data: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Ready To Go Design Data Fetch Error:", err);
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

    // Match the specific page URL for Ready To Go Design
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/ready-togo-design" ||
          tag.page_name?.endsWith("/ready-togo-design")
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

  const defaultTitle = "Ready To Go Interior Design : High Creation Interior";
  const defaultDesc =
    "Explore our Ready-To-Go Interior Design solutions, offering stylish, pre-designed spaces that blend functionality and aesthetics for a hassle-free transformation.";
  const defaultCanonical = "https://hcinterior.in/ready-togo-design";

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
export default async function ReadyToGoDesign() {
  const exclusiveDesignData = await getReadyToGoDesignData();

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center mb-5 mx-0 row">
            <h1 className="pb-3">Ready To Go Design</h1>
            <p className="px-lg-5 team_description">
              Ready-To-Go Interior Design solutions, crafted to bring you
              beautifully designed spaces with ease. These pre-designed setups
              combine style and practicality, giving your home or office a
              fresh, modern look without the stress of planning. Whether you’re
              updating a single room or transforming an entire space, our
              solutions are tailored to meet your needs. Each design is
              thoughtfully created to balance aesthetics with functionality,
              ensuring a space that’s both visually appealing and practical. Let
              us take the hassle out of interior design so you can enjoy a
              seamless transformation that reflects your taste and lifestyle.
            </p>
          </div>
          <div className="row g-4 mx-0">
            {exclusiveDesignData && exclusiveDesignData.length > 0 ? (
              exclusiveDesignData.map((design, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <WallpaperCard
                    linkTagWallpaper={`/ready-togo-design/gallery?id=${design?.id}`}
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
                    btnHrefWallpaper={`/ready-togo-design/gallery?id=${design?.id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Loading designs...</p>
              </div>
            )}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}