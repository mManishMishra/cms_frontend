"use client";

import React, { useState, useEffect } from "react";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";

const QueriesUrl = "https://high.creation.dev.api.crudbyte.com/queries"; // API endpoint for queries

const QueriesPage = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all queries from the API
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await api.get("/queries");
                setQueries(response.data);
            } catch (err) {
                console.error("Error fetching queries:", err);
                setError("Failed to load queries. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQueries();
    }, []);

    return (
        <AuthMainLayout>
            <main className="container my-5">
                <h2 className="mb-4 text-center">User Queries</h2>
                {loading ? (
                    <p className="text-center">Loading queries...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : (
                    <div className="row g-5">
                        {queries.length === 0 ? (
                            <p className="text-center">No queries available.</p>
                        ) : (
                            queries.map((query, index) => (
                                <div key={query.id} className="col-lg-6">
                                    <div className="p-4 shadow-sm query-card">
                                        <h4 className="query-title">{query.subject}</h4>
                                        <p className="query-description">
                                            {query.message}
                                        </p>
                                        <div className="mt-3 d-flex justify-content-between align-items-center">
                                            <span className="text-muted">
                                                By: {query.userName} | {new Date(query.createdAt).toLocaleDateString()}
                                            </span>
                                            <button className="btn btn-sm btn-primary">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <style jsx>{`
                .query-card {
                    background-color: white;
                    border-radius: 12px;
                    border: 1px solid #eaeaea;
                    transition: transform 0.3s, box-shadow 0.3s;
                }

                .query-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }

                .query-title {
                    font-weight: 600;
                    color: #333;
                }

                .query-description {
                    color: #555;
                    margin-bottom: 10px;
                }

                .btn-primary {
                    border-radius: 8px;
                    padding: 5px 10px;
                }
            `}</style>
        </AuthMainLayout>
    );
};

export default QueriesPage;
