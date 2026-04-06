import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import BackgroundImageRow from "../components/BackgroundImageRow";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Design Gallery Data ---
async function getDesignIdeas() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-parent-child/gallery_design`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch design ideas: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Design Idea Fetch Error:", err);
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

    // Match the specific page URL for Design Idea
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/design-idea" ||
          tag.page_name?.endsWith("/design-idea")
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

  const defaultTitle = "High Creation Interior - Interior Design gallery for your home";
  const defaultDesc = "Explore Interior Design gallery for your home , designed by Top interior designers at High Creation Interior.";
  const defaultCanonical = "https://hcinterior.in/design-idea";

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
export default async function DesignIdea() {
  const designIdea = await getDesignIdeas();

  // --- LOGIC: Sort and Split Records ---
  // 1. Sort records by ID in descending order (newest first)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

  // 2. Get the 8 oldest records (The last 8 items of the descending list)
  // These are displayed in the specific grid layout
  const staticRecords = sortedDesignIdea.slice(-8); 

  // 3. Get the latest records (Everything except the last 8)
  // These are displayed in the list below
  const latestRecords = sortedDesignIdea.slice(0, -8);

  return (
    <MainLayout>
      <main>
        <BackgroundImageRow
          sectionBgImages={"contact_wrapper design_gallery_banner"}
          sectionBgHeading="Design Gallery"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Explore our curated collection of stunning designs that reflect creativity, craftsmanship, and attention to detail. Each project tells a story — brought to life with passion and precision."
          secBgDesClass="secbgbesclass"
        />

        <section className="container my-5">
          {/* Static Records Grid (Oldest 8) */}
          {staticRecords.length > 0 && (
            <div className="row mx-0">
              {/* Row 1: Left Big Column (2 items) */}
              <div className="col-lg-7">
                {staticRecords[0] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[0]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg1"}
                    portfolioImg={staticRecords[0]?.child_content?.image}
                    portfolioTitle={staticRecords[0]?.child_content?.title}
                  />
                )}
                {staticRecords[1] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[1]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg2"}
                    portfolioImg={staticRecords[1]?.child_content?.image}
                    portfolioTitle={staticRecords[1]?.child_content?.title}
                  />
                )}
              </div>

              {/* Row 1: Right Column (1 item) */}
              <div className="col-lg-5">
                {staticRecords[2] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[2]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg3"}
                    portfolioImg={staticRecords[2]?.child_content?.image}
                    portfolioTitle={staticRecords[2]?.child_content?.title}
                  />
                )}
              </div>

              {/* Full Width Item */}
              <div className="col-lg-12">
                {staticRecords[3] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[3]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg4"}
                    portfolioImg={staticRecords[3]?.child_content?.image}
                    portfolioTitle={staticRecords[3]?.child_content?.title}
                  />
                )}
              </div>

              {/* Row 3: 75% Width */}
              <div className="col-lg-9">
                {staticRecords[4] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[4]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg5"}
                    portfolioImg={staticRecords[4]?.child_content?.image}
                    portfolioTitle={staticRecords[4]?.child_content?.title}
                  />
                )}
              </div>

              {/* Row 3: 25% Width */}
              <div className="col-lg-3">
                {staticRecords[5] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[5]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg6"}
                    portfolioImg={staticRecords[5]?.child_content?.image}
                    portfolioTitle={staticRecords[5]?.child_content?.title}
                  />
                )}
              </div>

              {/* Row 4: 50% Width */}
              <div className="col-lg-6">
                {staticRecords[6] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[6]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg7"}
                    portfolioImg={staticRecords[6]?.child_content?.image}
                    portfolioTitle={staticRecords[6]?.child_content?.title}
                  />
                )}
              </div>

              {/* Row 4: 50% Width */}
              <div className="col-lg-6">
                {staticRecords[7] && (
                  <PortfolioCard
                    cardDetailLink={`/design-idea/gallery?id=${staticRecords[7]?.id}`}
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall desig_gal_bg8"}
                    portfolioImg={staticRecords[7]?.child_content?.image}
                    portfolioTitle={staticRecords[7]?.child_content?.title}
                  />
                )}
              </div>
            </div>
          )}

          {/* Latest Records (Map remainder) */}
          <div className="row mx-0">
            {latestRecords.map((item) => (
              <div key={item.id} className="col-lg-6">
                <PortfolioCard
                  cardDetailLink={`/design-idea/gallery?id=${item.id}`}
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={`portfolioimgall desig_gal_bg8`}
                  portfolioImg={item.child_content?.image}
                  portfolioTitle={item.child_content?.title}
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