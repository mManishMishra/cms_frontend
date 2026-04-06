import MainLayout from "../layouts/MainLayout";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";

// --- CONFIGURATION ---
export const revalidate = 60; 

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Gurgaon Data to use for Faridabad ---
async function getCityData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-city`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allCities = await res.json();

    // DUPLICATE LOGIC: Find Gurgaon/Gurugram data to use as a fallback for Faridabad
    const gurgaonData = allCities.find(
      (city) => 
        city.city_type?.toLowerCase() === "gurgaon" || 
        city.city_type?.toLowerCase() === "gurugram"
    );

    return gurgaonData || null;
  } catch (err) {
    console.error("City Fetch Error:", err);
    return null;
  }
}

// --- HELPER: Fetch SEO Data specifically for Faridabad ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/interior-designers-in-faridabad" ||
          tag.page_name?.endsWith("/interior-designers-in-faridabad")
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

  const defaultTitle = "Top Interior Designers in Faridabad | High Creation Interior";
  const defaultDesc = "Looking for the best interior designers in Faridabad? High Creation Interior offers premium residential and commercial interior design services.";
  const defaultCanonical = "https://hcinterior.in/interior-designers-in-faridabad";

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
export default async function FaridabadCityPage() {
  const cityData = await getCityData();

  // If even Gurgaon data is missing, fail gracefully
  if (!cityData) {
    return (
      <MainLayout>
        <div className="container text-center my-5 py-5">
          <h2>Content coming soon for Faridabad!</h2>
        </div>
      </MainLayout>
    );
  }

  // Small trick: Replace "Gurgaon" with "Faridabad" in the duplicated text
  const displayTitle = cityData.main_title?.replace(/Gurgaon|Gurugram/gi, "Faridabad") || "Interior Designers in Faridabad";
  const displayDescription = cityData.main_description?.replace(/Gurgaon|Gurugram/gi, "Faridabad") || "";

  return (
    <MainLayout>
      <main>
        {/* You can adjust the background image class if you have a specific one for Faridabad */}
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper"} 
          sectionBgHeading={displayTitle}
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription={displayDescription}
          secBgDesClass={"text-center text-white"}
        />

        <section className="container my-5">
          <div className="row mx-0 g-4 align-items-center">
            <div className="col-lg-6">
              <img 
                src={cityData.location_image || "/images/services/1-min.png"} 
                alt="Interior Designers in Faridabad" 
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="mb-4">{displayTitle}</h2>
              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                {displayDescription}
              </p>
              {/* Optional: Add a call to action button here */}
              <a href="/contact" className="know_more px-4 py-2 mt-3 d-inline-block text-decoration-none">
                Get a Free Estimate
              </a>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}