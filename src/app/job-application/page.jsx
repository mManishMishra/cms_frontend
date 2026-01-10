"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";


const ManageJob = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    const fetchQueries = useCallback(async () => {
        try {
            const response = await api.get("/job-application", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            setQueries(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch queries form data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchQueries();
    }, [fetchQueries]);

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Job Application List</h1>
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
                                    <th>Job Posting</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>contact No</th>
                                    <th>Job Position</th>
                                    <th>Applied On</th>
                                    <th>Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => (
                                    <tr key={query.id}>
                                        <td>{index+1}</td>
                                        <td>{query?.manageJob?.title ?? "-"}</td>
                                        <td>{query.name}</td>
                                        <td>{query.email}</td>
                                        <td>{query.phone}</td>
                                        <td>{query.your_job_title}</td>
                                        <td>{new Date(query.created_at).toLocaleString()}</td>
                                        <td>
                                            <a
                                                href={query.resume}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View
                                            </a>
                                        </td>
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

export default ManageJob;
