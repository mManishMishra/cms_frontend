"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";


const UserQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await api.get("/user-queries", {
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

    const handleExportToExcel = () => {
        try {
            api.get("/user-queries/export", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
                responseType: "blob",
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "user-queries.xlsx");
                document.body.appendChild(link);
                link.click();
            });
        } catch (err) {
            toast.error("Failed to export queries to excel. Please try again.");
        }
    }

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">User Queries List</h1>
                <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => {handleExportToExcel()}}
                        type="button"
                        className="btn btn-primary"
                    >
                        Export to Excel
                    </button>
                </div>
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
                                    <th>SN</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Place</th>
                                    <th>Query</th>
                                    <th>Submitted At</th>
                                    <th>IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => (
                                    <tr key={query.id}>
                                        <td>{index+1}</td>
                                        <td>{query.name}</td>
                                        <td>{query.email}</td>
                                        <td>{query.mobile}</td>
                                        <td>{query.place}</td>
                                        <td>{query.query}</td>
                                        <td>{new Date(query.created_at).toLocaleString()}</td>
                                        <td>{query.ip_address}</td>
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

export default UserQueries;
