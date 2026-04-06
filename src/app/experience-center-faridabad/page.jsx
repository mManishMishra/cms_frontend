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
    const res = await fetch(`${baseURL}/cms-parent-child/experience_center_faridabad`, {
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
    const res = await fetch(`${baseURL}/cms-parent-child/experience_center_faridabad_video`, {
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

    // Match the specific page URL for Experience Center Faridabad
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/experience-center-faridabad" ||
          tag.page_name?.endsWith("/experience-center-faridabad")
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

  const defaultTitle = "High Creation Interior Experience Center Faridabad";
  const defaultDesc = "High Creation Interior Experience Center Faridabad";
  const defaultCanonical = "https://hcinterior.in/experience-center-faridabad";

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
export default async function ExperienceFaridabad() {
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