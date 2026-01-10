"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";


const LeadsQuery = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await api.get("/estimater", {
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
            api.get("/estimater/export", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
                responseType: "blob",
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "leads-list.xlsx");
                document.body.appendChild(link);
                link.click();
            });
        } catch (err) {
            toast.error("Failed to export leads list to excel. Please try again.");
        }
    }

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Leads List</h1>
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
                                    <th>Location</th>
                                    <th>Selection</th>
                                    <th>Total Price</th>
                                    <th>Submitted At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => (
                                    <tr key={query.id}>
                                        <td>{index+1}</td>
                                        <td>{query.firstName} {query.lastName}</td>
                                        <td>{query.email}</td>
                                        <td>{query.mobile}</td>
                                        <td>{query.query}</td>
                                        <td width={250}>
                                            {Object&&Object?.entries(query?.json_content)?.map(([key, value]) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {value === true ? "Yes" : value === false ? "No" : value}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{query.total_price}</td>
                                        <td>{new Date(query.created_at).toLocaleString()}</td>
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

export default LeadsQuery;
