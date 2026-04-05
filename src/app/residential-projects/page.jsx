// "use client";
// import { useCallback, useEffect, useState } from "react";
// import ResidentialCard from "../components/ResidentialCard";
// import MainLayout from "../layouts/MainLayout";
// import api from "@/utils/api";
// import { defaultAltText } from "@/utils/helper";

// const ResidentialProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchContentManagerPages = useCallback(async () => {
//     try {
//       const response = await api.get(
//         `/portfolio-project/active/residential_projects/page/${currentPage}/limit/20`,
//         {}
//       );

//       if (response.status === 200) {
//         setProjects(response.data.data);
//         setTotalPages(response.data.meta.totalPages);
//       }
//     } catch (err) {
//       toast.error(err.message || "Failed to fetch data. Please try again.");
//       setLoading(false);
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     fetchContentManagerPages();
//   }, [fetchContentManagerPages]);

//   return (
//     <div>
//       <head>
//         <title>
//         Residential Project Interior Portfolio : High creation Interior	
//         </title>
//         <meta
//           name="title"
//           content="Residential Project Interior Portfolio : High creation Interior	"/>
//         <meta
//           name="description"
//           content=
//             "Explore High Creation Interior's stunning residential project portfolio showcasing luxurious and functional designs. Discover inspiring interiors tailored to elevate your living spaces.	"/>
//       <link rel="canonical" href="https://hcinterior.in/residential-projects" />	
//       </head>

//       <MainLayout>
//         <main>
//           <section className="container my-5">
//             <div className="text-center mb-5">
//               <h1 className="wallpaperHeading">Residential Projects</h1>
//               <p className="px-lg-5 team_description">
//                 Explore a curated selection of premium living room interior
//                 designs and décor ideas at High Creation. We offer customizable,
//                 functional, and stylish solutions to elevate your living space.
//                 From modular TV units to wall art and innovative wall designs,
//                 find all the inspiration you need to transform your living room.
//                 Start browsing today to discover designs that perfectly reflect
//                 your personal style.
//               </p>
//             </div>
//           </section>
//           <section className="resi_card">
//             <div className="container">
//               <div className="row mx-0 g-4">
//                 {projects?.map((project, index) => (
//                   <div key={index} className="col-lg-4 col-md-6 col-12">
//                     <ResidentialCard
//                       projectCardLink={`/residential-projects/project-gallery?id=${project.id}`}
//                       cardNameResid="card_product"
//                       resiImgUrl={project.image}
//                       resiImgALt={project.title ?? defaultAltText}
//                       resiImgClass={"resi_img"}
//                       residentialTitle={project.title}
//                       residentialTitleClass="product_heading"
//                       residentialDescriptiion={project.description}
//                       residentialClassCss="team_designation mb-0"
//                       residentialButton="View More"
//                       residentialButtonUrl={`/residential-projects/project-gallery?id=${project.id}`}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <nav aria-label="Page navigation example mt-5 pt-5">
//                 <ul className="pagination justify-content-center">
//                   <li
//                     className={`page-item ${
//                       currentPage === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                       Previous
//                     </button>
//                   </li>
//                   {[...Array(totalPages)].map((_, index) => (
//                     <li
//                       key={index}
//                       className={`page-item ${
//                         currentPage === index + 1 ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(index + 1)}
//                       >
//                         {index + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       currentPage === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </section>
//           <hr className="mt-5" />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default ResidentialProjects;
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

// --- HELPER: Fetch Residential Projects Data ---
async function getResidentialProjects(page = 1) {
  try {
    const baseURL = getBaseUrl();
    const limit = 20;
    const res = await fetch(
      `${baseURL}/portfolio-project/active/residential_projects/page/${page}/limit/${limit}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch residential projects: ${res.status}`);
      return { data: [], meta: { totalPages: 1 } };
    }

    const responseJson = await res.json();
    
    // FIX: Return an object with 'data' and 'meta' properties so it can be destructured later.
    return {
      data: responseJson.data || [],
      meta: responseJson.meta || { totalPages: 1 },
    };
  } catch (err) {
    console.error("Residential Projects Fetch Error:", err);
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

    // Match the specific page URL for Residential Projects
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/residential-projects" ||
          tag.page_name?.endsWith("/residential-projects")
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
    "Residential Project Interior Portfolio : High creation Interior";
  const defaultDesc =
    "Explore High Creation Interior's stunning residential project portfolio showcasing luxurious and functional designs. Discover inspiring interiors tailored to elevate your living spaces.";
  const defaultCanonical = "https://hcinterior.in/residential-projects";

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
export default async function ResidentialProjects({ searchParams }) {
  // Get current page from URL query params (default to 1)
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  // Fetch data for the current page
  const { data: projects, meta } = await getResidentialProjects(currentPage);
  const totalPages = meta?.totalPages || 1;

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="text-center mb-5">
            <h1 className="wallpaperHeading">Residential Projects</h1>
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
                      projectCardLink={`/residential-projects/project-gallery?id=${project.id}`}
                      cardNameResid="card_product"
                      resiImgUrl={project.image}
                      resiImgALt={project.title ?? defaultAltText}
                      resiImgClass={"resi_img"}
                      residentialTitle={project.title}
                      residentialTitleClass="product_heading"
                      residentialDescriptiion={project.description}
                      residentialClassCss="team_designation mb-0"
                      residentialButton="View More"
                      residentialButtonUrl={`/residential-projects/project-gallery?id=${project.id}`}
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
                          ? `/residential-projects?page=${currentPage - 1}`
                          : "#"
                      }
                      aria-disabled={currentPage === 1}
                    >
                      Previous
                    </a>
                  </li>

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
                          href={`/residential-projects?page=${pageNum}`}
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
                          ? `/residential-projects?page=${currentPage + 1}`
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