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

// --- HELPER: Fetch FAQ Data ---
async function getFaqData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-content/faqs`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch FAQs: ${res.status}`);
      return [];
    }

    const data = await res.json();
    // The API seems to return the array directly based on your previous code (response.data)
    // If the API returns { data: [...] }, adjust accordingly. 
    // Based on 'setFaqData(response.data)', it likely returns the array directly or inside a data property.
    return Array.isArray(data) ? data : (data.data || []); 
  } catch (err) {
    console.error("FAQ Fetch Error:", err);
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

    // Match the specific page URL for FAQ
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/faq" ||
          tag.page_name?.endsWith("/faq")
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

  const defaultTitle = "Here Know About FAQs Of High Creation Interior | Policy";
  const defaultDesc =
    "Find answers to common questions about High Creation Interior. Our FAQ page covers design process, pricing, project timelines, cancellation policy, and more to help you understand our services";
  const defaultCanonical = "https://hcinterior.in/faq";

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
    keywords: seoData?.metaKeywords || "Interior Design FAQs, High Creation Interior Policy, Design Process, Pricing",
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function FaqPage() {
  const faqData = await getFaqData();

  return (
    <MainLayout>
      <main>
        <BackgroundImageWithHeading
          sectionBgImages="contact_wrapper faq_banner"
          sectionBgHeading="Frequently Asked Questions"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass="text-center text-white"
        />

        <section className="privacy my-5">
          <div className="container">
            <div className="text-center">
              <h2>High Creation Interior</h2>
              <h3>
                <span className="font_stylish" style={{ color: "#ff914d" }}>
                  Frequently Asked Questions
                </span>
              </h3>

              <div className="row justify-content-center mx-0">
                <div className="col-lg-12">
                  {faqData.length > 0 ? (
                    <div className="accordion" id="faqAccordion">
                      {faqData.map((faq, index) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${
                                index === 0 ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                              aria-expanded={index === 0 ? "true" : "false"}
                              aria-controls={`collapse${index}`}
                            >
                              {faq?.json_content?.title}
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse ${
                              index === 0 ? "show" : ""
                            }`}
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body ps-0">
                              {faq?.json_content?.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4">No FAQs found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}