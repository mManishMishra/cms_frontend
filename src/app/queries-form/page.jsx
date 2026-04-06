"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";


const QueriesForm = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    // Load DataTables and initialize it after the component is rendered
    // const loadDataTable = async () => {
    //     try {
    //         await import("datatables.net");
    //         await import("datatables.net-dt/css/jquery.dataTables.min.css");

    //         $(document).ready(function () {
    //             $("#queriesTable").DataTable();
    //         });
    //     } catch (error) {
    //         console.error("Failed to load DataTables:", error);
    //     }
    // };

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await api.get("/lets-connect", {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                setQueries(response.data);
                setLoading(false);

                // Load DataTables after data is fetched
                // loadDataTable();
            } catch (err) {
                setError("Failed to fetch queries form data. Please try again.");
                setLoading(false);
            }
        };

        fetchQueries();

        // Cleanup DataTable on component unmount
        return () => {
            // if ($.fn.DataTable.isDataTable("#queriesTable")) {
            //     $("#queriesTable").DataTable().destroy(true);
            // }
        };
    }, [authToken]);

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Queries Form Submissions</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center alert alert-danger">{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table
                            id="queriesTable"
                            className="table display table-striped table-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Query</th>
                                    <th>Submitted At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query) => (
                                    <tr key={query.id}>
                                        <td>{query.fullName}</td>
                                        <td>{query.email}</td>
                                        <td>{query.contactNo}</td>
                                        <td>{query.query}</td>
                                        <td>{new Date(query.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthMainLayout>
    );
};

export default QueriesForm;
