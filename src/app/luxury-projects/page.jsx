import ResidentialCard from "../components/ResidentialCard";
import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Luxury Projects Data ---
async function getLuxuryProjects(page = 1) {
  try {
    const baseURL = getBaseUrl();
    const limit = 20;
    const res = await fetch(
      `${baseURL}/portfolio-project/active/luxury_projects/page/${page}/limit/${limit}`,
      {
        // cache handled by page revalidate
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch luxury projects: ${res.status}`);
      return { data: [], meta: { totalPages: 1 } };
    }

    const responseJson = await res.json();
    
    // FIX: Return a structured object so { data, meta } can be destructured in the component
    return {
      data: responseJson.data || [],
      meta: responseJson.meta || { totalPages: 1 },
    };
  } catch (err) {
    console.error("Luxury Projects Fetch Error:", err);
    return { data: [], meta: { totalPages: 1 } };
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

    // Match the specific page URL for Luxury Projects
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/luxury-projects" ||
          tag.page_name?.endsWith("/luxury-projects")
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
    "Luxury Interior Project Interior Portfolio : High creation Interior";
  const defaultDesc =
    "Discover High Creation Interior's luxury interior project portfolio, featuring exquisite designs and elegant solutions crafted to transform spaces into timeless masterpieces.";
  const defaultCanonical = "https://hcinterior.in/luxury-projects";

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
export default async function LuxuryProjects({ searchParams }) {
  // Get current page from URL query params (default to 1)
  // Await searchParams as per Next.js 15+ (if you are on older versions, await is not needed but safe)
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  // Fetch data for the current page
  const { data: projects, meta } = await getLuxuryProjects(currentPage);
  const totalPages = meta?.totalPages || 1;

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center mb-5">
            <h1 className="wallpaperHeading">Luxury Projects</h1>
            <p className="px-lg-5 team_description">
              Explore a curated selection of premium living room interior designs
              and décor ideas at High Creation. We offer customizable,
              functional, and stylish solutions to elevate your living space.
              From modular TV units to wall art and innovative wall designs,
              find all the inspiration you need to transform your living room.
              Start browsing today to discover designs that perfectly reflect
              your personal style.
            </p>
          </div>
        </section>

        <section className="resi_card">
          <div className="container">
            <div className="row mx-0 g-4">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-12">
                    <ResidentialCard
                      projectCardLink={`/luxury-projects/project-gallery?id=${project.id}`}
                      cardNameResid="card_product"
                      resiImgUrl={project.image}
                      resiImgALt={project.title ?? defaultAltText}
                      resiImgClass={"resi_img"}
                      residentialTitle={project.title}
                      residentialTitleClass="product_heading"
                      residentialDescriptiion={project.description}
                      residentialClassCss="team_designation mb-0"
                      residentialButton="View More"
                      residentialButtonUrl={`/luxury-projects/project-gallery?id=${project.id}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No projects found.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Page navigation example mt-5 pt-5">
                <ul className="pagination justify-content-center mt-5">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href={
                        currentPage > 1
                          ? `/luxury-projects?page=${currentPage - 1}`
                          : "#"
                      }
                      aria-disabled={currentPage === 1}
                    >
                      Previous
                    </a>
                  </li>

                  {/* Render Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === pageNum ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href={`/luxury-projects?page=${pageNum}`}
                        >
                          {pageNum}
                        </a>
                      </li>
                    );
                  })}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href={
                        currentPage < totalPages
                          ? `/luxury-projects?page=${currentPage + 1}`
                          : "#"
                      }
                      aria-disabled={currentPage === totalPages}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </section>
        <hr className="mt-5" />
      </main>
    </MainLayout>
  );
}