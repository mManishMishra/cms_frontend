
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import $ from "jquery";
// import AuthMainLayout from "../layouts/auth/AuthMainLayout";
// import api from "@/utils/api";


// const ProductForm = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const authToken = useSelector((state) => state.auth.authToken);

//     // const loadDataTable = async () => {
//     //     try {
//     //         await import("datatables.net");
//     //         await import("datatables.net-dt/css/jquery.dataTables.min.css");

//     //         $(document).ready(function () {
//     //             $("#productsTable").DataTable();
//     //         });
//     //     } catch (error) {
//     //         console.error("Failed to load DataTables:", error);
//     //     }
//     // };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get("/product-form", {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 });

//                 setProducts(response.data);
//                 setLoading(false);

//                 // loadDataTable();
//             } catch (err) {
//                 setError("Failed to fetch product form data. Please try again.");
//                 setLoading(false);
//             }
//         };

//         fetchProducts();

//         return () => {
//             // if ($.fn.DataTable.isDataTable("#productsTable")) {
//             //     $("#productsTable").DataTable().destroy(true);
//             // }
//         };
//     }, [authToken]);

//     return (
//         <AuthMainLayout>
//             <div className="container my-5">
//                 <h1 className="mb-4 text-center">Product Form Submissions</h1>
//                 {loading ? (
//                     <div className="text-center">Loading...</div>
//                 ) : error ? (
//                     <div className="text-center alert alert-danger">{error}</div>
//                 ) : (
//                     <div className="table-responsive">
//                         <table
//                             id="productsTable"
//                             className="table display table-striped table-bordered"
//                             style={{ width: "100%" }}
//                         >
//                             <thead>
//                                 <tr>
//                                     <th>Full Name</th>
//                                     <th>Email</th>
//                                     <th>Product Name</th>
//                                     <th>Quantity</th>
//                                     <th>Submitted At</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {products.map((product) => (
//                                     <tr key={product.id}>
//                                         <td>{product.fullName}</td>
//                                         <td>{product.email}</td>
//                                         <td>{product.productName}</td>
//                                         <td>{product.quantity}</td>
//                                         <td>{new Date(product.createdAt).toLocaleString()}</td>
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

// export default ProductForm;
import ProductFormClient from "./ProductFormClient";

// --- CONFIGURATION ---
// Admin pages usually don't need caching
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

    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/product-form" ||
          tag.page_name?.endsWith("/product-form")
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

  const defaultTitle = "Product Form Submissions | Admin Panel";
  const defaultDesc = "View product form submissions.";
  const defaultCanonical = "https://hcinterior.in/product-form";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    robots: {
      index: false, // Admin pages should not be indexed
      follow: false,
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default function ProductFormPage() {
  return <ProductFormClient />;
}