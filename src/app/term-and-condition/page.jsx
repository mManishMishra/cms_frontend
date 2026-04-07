// import { toast } from "react-toastify";
// import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
// import MainLayout from "../layouts/MainLayout";
// import { useCallback, useEffect, useState } from "react";
// import api from "@/utils/api";
// // export const metadata = {
// //   title: "terms - My Website",
// //   description: "Learn more about our company, team, and values.",
// // };
// const Terms = () => {
//   const [pageData, setPageData] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchContentManagerPages = useCallback(async () => {
//     try {
//       const response = await api.get("/cms-content/term_and_condition", {});
//       if (response.data && response.data.json_content) {
//         setPageData(response.data?.json_content?.html);
//       }
//       setLoading(false);
//     } catch (err) {
//       toast.error(err.message ?? "Failed to fetch data. Please try again.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchContentManagerPages();
//   }, [fetchContentManagerPages]);

//   return (
//     <div>
//       <head>
//         <title>Terms & Conditions - High Creation Interior	</title>
//         <meta
//           name="description"
//           content="Read our terms & conditions ( customer's do's & don't ) including Terms of Use, Livspace Quality Promise, Cancellation Policy, Return, Exchange & Refunds Policy.	"
//         />
//           <link rel="canonical" href="https://hcinterior.in/term-and-condition" />	
//       </head>
//       <MainLayout>
//         <main>
//           <BackgroundImageWithHeading
//             sectionBgImages={"contact_wrapper   terms_and_condition"}
//             sectionBgHeading="Terms & Condition"
//             secBgHeadingClass="sec_bgheading_lass"
//             sectionBgDescription="Get all the information you need"
//             secBgDesClass={"text-center text-white"}
//           />

//           <section className="privacy my-5">
//             <div className="container">
//               <div className="  row mx-0">
//                 <h2>High Creation Interior</h2>
//                 <h3>
//                   <span className="font_stylish" style={{ color: "#ff914d" }}>
//                     Terms & Condition
//                   </span>
//                 </h3>

//                 <div dangerouslySetInnerHTML={{ __html: pageData }} />
//               </div>
//             </div>
//           </section>
//           <hr />
//         </main>
//       </MainLayout>
//     </div>
//   );
// };

// export default Terms;
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

// --- HELPER: Fetch Terms Content ---
async function getTermsContent() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-content/term_and_condition`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch terms content: ${res.status}`);
      return "";
    }

    const data = await res.json();
    return data?.json_content?.html || "";
  } catch (err) {
    console.error("Terms Content Fetch Error:", err);
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

    // Match the specific page URL for Terms & Conditions
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/term-and-condition" ||
          tag.page_name?.endsWith("/term-and-condition")
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

  const defaultTitle = "Terms & Conditions - High Creation Interior";
  const defaultDesc =
    "Read our terms & conditions (customer's do's & don't) including Terms of Use, Livspace Quality Promise, Cancellation Policy, Return, Exchange & Refunds Policy.";
  const defaultCanonical = "https://hcinterior.in/term-and-condition";

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
export default async function Terms() {
  const pageData = await getTermsContent();

  return (
    <MainLayout>
      <main>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper terms_and_condition"}
          sectionBgHeading="Terms & Condition"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass={"text-center text-white"}
        />

        <section className="privacy my-5">
          <div className="container">
            <div className="row mx-0">
              <h2>High Creation Interior</h2>
              <h3>
                <span className="font_stylish" style={{ color: "#ff914d" }}>
                  Terms & Condition
                </span>
              </h3>

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