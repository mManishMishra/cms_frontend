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

// --- HELPER: Fetch Cancellation Policy Content ---
async function getCancellationPolicyContent() {
  try {
    const baseURL = getBaseUrl();
    
    // Fetching the array of policy data
    const res = await fetch(`${baseURL}/cms-content/cancellation_policy`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`Failed to fetch cancellation policy: ${res.status}`);
      return [];
    }

    const data = await res.json();
    
    // Ensure we are returning an array
    if (Array.isArray(data)) {
      // Sort by ID ascending so that "Project Booking" (id 18) appears before "Phase 4" (id 21)
      return data;
    }
    
    return [];
  } catch (err) {
    console.error("Cancellation Policy Content Fetch Error:", err);
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

    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/cancelletion-policy" ||
          tag.page_name === "https://hcinterior.in/cancellation-policy" ||
          tag.page_name?.endsWith("/cancelletion-policy") ||
          tag.page_name?.endsWith("/cancellation-policy")
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

  const defaultTitle = "Cancellation Policy - High Creation Interior";
  const defaultDesc =
    "Understand the terms and conditions for canceling design projects, including timelines, fees, and other important information.";
  const defaultCanonical = "https://hcinterior.in/cancelletion-policy";

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
export default async function CancelletionPolicy() {
  const policyData = await getCancellationPolicyContent();

  return (
    <MainLayout>
      <BackgroundImageWithHeading
        sectionBgImages={"contact_wrapper cancelation_policy_banner"}
        sectionBgHeading="Cancellation Policy"
        secBgHeadingClass="sec_bgheading_lass"
        sectionBgDescription="Get all the information you need"
        secBgDesClass={"text-center text-white"}
      />
      <section className="privacy my-5">
        <div className="container">
          <div className="text-center row mx-0">
            <h2>High Creation Interior</h2>
            <h3>
              <span className="font_stylish" style={{ color: "#ff914d" }}>
                Cancellation Policy
              </span>
            </h3>
            
            <div className="col-12 mt-4 text-start">
              {policyData.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                  <table className="table table-bordered table-striped table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="py-3 px-4">Phase</th>
                        <th scope="col" className="py-3 px-4">Time Period</th>
                        <th scope="col" className="py-3 px-4">Eligibility / Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policyData.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3 px-4 fw-bold text-secondary">
                            {item.json_content?.phase || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {item.json_content?.time_period || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {item.json_content?.eligibility || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info text-center" role="alert">
                  No cancellation policy details are currently available. Please check back later.
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
      <hr />
    </MainLayout>
  );
}