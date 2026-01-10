"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import moment from "moment";
import { toast } from "react-toastify";


const SeoTag = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        meta_description: "",
        page_name: "",
        meta_can_tag: "",
        status: "active"
     });

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    const fetchQueries = useCallback(async () => { 
        try {
            const response = await api.get("/seo-tag", {
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


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/seo-tag", formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Close modal
            document.getElementById('addNewpageModalClose').click();

            // Fetch updated data
            fetchQueries();
        } catch (err) {
            toast.error("Failed to save job data. Please try again.");
            console.error("Failed to save job data:", err);
        }
    }

    const handleEditClick = (query) => {
        setSelectedId(query.id);
        setFormData({
            title: query.title,
            meta_description: query.meta_description,
            page_name: query.page_name,
            meta_can_tag: query.meta_can_tag,
 
 
            status: query.status
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.patch(`/seo-tag/${selectedId}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Close modal
            document.getElementById('editNewpageModalClose').click();

            // Fetch updated data
            fetchQueries();
        } catch (err) {
            toast.error("Failed to save job data. Please try again.");
            console.error("Failed to save job data:", err);
        }
    }

    //delete handler with javascript confirm
    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this URL?")) {
            try {
                const response = await api.delete(`/seo-tag/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                if (response.status === 200) {
                    fetchQueries();
                } else {
                    toast.error("Failed to delete job. Please try again.");
                }
            } catch (error) {
                toast.error("Failed to delete job. Please try again.");
                console.error("Error:", error);
            }
        }
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">  Look URL</h1>
                <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => setFormData({ title: "", meta_description: "", meta_can_tag: "",  status: "active" })} // Clear form data
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addNewpageModal"
                    >
                        Add New
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
                                    <th>Page name</th>
                                    <th>Menu Title</th>
                                    <th>Meta Description</th>
                                    <th>Canonical Tag</th>
                                     <th>Status</th>
                                      <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => (
                                    <tr key={query.id}>
                                        <td>{index+1}</td>
                                        <td>{query.page_name}</td>
                                        <td>{query.title}</td>
                                         <td>{query.meta_description}</td>
                                         <td>{query.meta_can_tag}</td>
                                        <td className="text-capitalize">{query.status}</td>
                                          <td>
                                            <button
                                                onClick={() => handleEditClick(query)}
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editNewpageModal"
                                            >
                                                Edit
                                            </button>
                                            <button className="ms-2 btn btn-danger" onClick={() => deleteHandler(query.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" id="addNewpageModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Page Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="page_name"
                                        placeholder="Page Name"
                                        value={formData.page_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_description"
                                        placeholder="Meta Description"
                                        value={formData.meta_description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Canonical Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_can_tag"
                                        placeholder="Canonical"
                                        value={formData.meta_can_tag}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                               
                                
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" type="submit">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" id="editNewpageModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Page Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="page_name"
                                        placeholder="Page Name"
                                        value={formData.page_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Desciption</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_description"
                                        placeholder="Web URL"
                                        value={formData.meta_description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Canonical Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_can_tag"
                                        placeholder="Canonical Tag"
                                        value={formData.meta_can_tag}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                              
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" type="submit">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthMainLayout>
    );
};

export default SeoTag;
