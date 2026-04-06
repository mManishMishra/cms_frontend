// "use client";

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import $ from "jquery";
// import AuthMainLayout from "../layouts/auth/AuthMainLayout";
// import api from "@/utils/api";


// const ExperienceForm = () => {
//     const [experiences, setExperiences] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Get authToken from Redux store
//     const authToken = useSelector((state) => state.auth.authToken);

//     // Load DataTables and initialize it after the component is rendered
//     // const loadDataTable = async () => {
//     //     try {
//     //         await import("datatables.net");
//     //         await import("datatables.net-dt/css/jquery.dataTables.min.css");

//     //         $(document).ready(function () {
//     //             $("#experienceTable").DataTable();
//     //         });
//     //     } catch (error) {
//     //         console.error("Failed to load DataTables:", error);
//     //     }
//     // };

//     useEffect(() => {
//         const fetchExperiences = async () => {
//             try {
//                 const response = await api.get("/experience", {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`, // Send auth token
//                     },
//                 });

//                 setExperiences(response.data);
//                 setLoading(false);

//                 // Load DataTables after data is fetched
//                 // loadDataTable();
//             } catch (err) {
//                 setError("Failed to fetch experience form data. Please try again.");
//                 setLoading(false);
//             }
//         };

//         fetchExperiences();

//         // Cleanup DataTable on component unmount
//         return () => {
//             // if ($.fn.DataTable.isDataTable("#experienceTable")) {
//             //     $("#experienceTable").DataTable().destroy(true);
//             // }
//         };
//     }, [authToken]);

//     return (
//         <AuthMainLayout>
//             <div className="container my-5">
//                 <h1 className="mb-4 text-center">Experience Form Submissions</h1>
//                 {loading ? (
//                     <div className="text-center">Loading...</div>
//                 ) : error ? (
//                     <div className="text-center alert alert-danger">{error}</div>
//                 ) : (
//                     <div className="table-responsive">
//                         <table
//                             id="experienceTable"
//                             className="table display table-striped table-bordered"
//                             style={{ width: "100%" }}
//                         >
//                             <thead>
//                                 <tr>
//                                     <th>Full Name</th>
//                                     <th>Email</th>
//                                     <th>Phone Number</th>
//                                     <th>Property Name</th>
//                                     <th>Submitted At</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {experiences.map((experience) => (
//                                     <tr key={experience.id}>
//                                         <td>{experience.fullName}</td>
//                                         <td>{experience.email}</td>
//                                         <td>{experience.contactNo}</td>
//                                         <td>{experience.propertyName}</td>
//                                         <td>{new Date(experience.createdAt).toLocaleString()}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </AuthMainLayout>
//     );
// };

// export default ExperienceForm;
import ExperienceFormClient from "./ExperienceFormClient";

// --- CONFIGURATION ---
// Admin pages usually don't need caching, so we can set this to 0 or leave default
export const revalidate = 0; 

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch SEO Data (Optional for Admin Pages) ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    // Check if there is a tag for "experience-form" or "admin"
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/experience-form" ||
          tag.page_name?.endsWith("/experience-form")
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

  const defaultTitle = "Experience Form Submissions | Admin Panel";
  const defaultDesc = "View experience center form submissions.";
  const defaultCanonical = "https://hcinterior.in/experience-form";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    robots: {
      index: false, // Usually admin pages should NOT be indexed by Google
      follow: false,
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default function ExperienceFormPage() {
  return <ExperienceFormClient />;
}