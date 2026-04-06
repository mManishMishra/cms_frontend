"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import $ from "jquery"; // Keep jquery import if you plan to uncomment DataTable later
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";

const ProductFormClient = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const authToken = useSelector((state) => state.auth.authToken);

    // const loadDataTable = async () => {
    //     try {
    //         await import("datatables.net");
    //         await import("datatables.net-dt/css/jquery.dataTables.min.css");

    //         $(document).ready(function () {
    //             $("#productsTable").DataTable();
    //         });
    //     } catch (error) {
    //         console.error("Failed to load DataTables:", error);
    //     }
    // };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Only fetch if authToken exists
                if (!authToken) return;

                const response = await api.get("/product-form", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                setProducts(response.data);
                setLoading(false);

                // loadDataTable();
            } catch (err) {
                console.error("Error fetching product form data:", err);
                setError("Failed to fetch product form data. Please try again.");
                setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            // if ($.fn.DataTable.isDataTable("#productsTable")) {
            //     $("#productsTable").DataTable().destroy(true);
            // }
        };
    }, [authToken]);

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Product Form Submissions</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center alert alert-danger">{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table
                            id="productsTable"
                            className="table display table-striped table-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Submitted At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.fullName}</td>
                                        <td>{product.email}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                        <td>{new Date(product.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No submissions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthMainLayout>
    );
};

export default ProductFormClient;