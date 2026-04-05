import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Privacy Policy Content ---
async function getPrivacyPolicyContent() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-content/privacy_policy`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch privacy policy: ${res.status}`);
      return "";
    }

    const data = await res.json();
    return data?.json_content?.html || "";
  } catch (err) {
    console.error("Privacy Policy Content Fetch Error:", err);
    return "";
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

    // Match the specific page URL for Privacy Policy
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/privacy-policy" ||
          tag.page_name?.endsWith("/privacy-policy")
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

  const defaultTitle = "Privacy Policy";
  const defaultDesc =
    "Read the Privacy Policy of High Creation Interior to understand how we protect your personal information. Learn about data collection, usage, and your rights.";
  const defaultCanonical = "https://hcinterior.in/privacy-policy";

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
export default async function Privacy() {
  const pageData = await getPrivacyPolicyContent();

  return (
    <MainLayout>
      <BackgroundImageWithHeading
        sectionBgImages={"contact_wrapper privacy_policy_banner"}
        sectionBgHeading="Privacy Policy"
        secBgHeadingClass="sec_bgheading_lass"
        sectionBgDescription="Get all the information you need"
        secBgDesClass={"text-center text-white"}
      />
      <main>
        <section className="privacy my-5">
          <div className="container">
            <div className="row mx-0">
              <div>
                <h2>High Creation Interior</h2>
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    Privacy Policy
                  </span>
                </h3>
              </div>
              {/* Render HTML content from CMS */}
              <div dangerouslySetInnerHTML={{ __html: pageData }} />
            </div>
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}