"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import {
    DEFAULT_SITEMAP_CHANGE_FREQUENCY,
    DEFAULT_SITEMAP_PRIORITY,
    SITEMAP_CHANGE_FREQUENCY_OPTIONS
} from "@/utils/seoHelpers";
import {
    getCmsAccess,
    getDeletePermissionMessage,
    getPublishWorkflowMessage,
} from "@/utils/cmsAccess";


const SeoTag = () => {
    const user = useSelector((state) => state.auth.user);
    const { canPublish, canDelete } = getCmsAccess(user);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        meta_description: "",
        page_name: "",
        meta_can_tag: "",
        meta_robots: "index, follow", // New field for Index Control
        og_image: "",                 // New field for Open Graph Image
        include_in_sitemap: true,
        sitemap_change_frequency: DEFAULT_SITEMAP_CHANGE_FREQUENCY,
        sitemap_priority: String(DEFAULT_SITEMAP_PRIORITY),
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
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!canPublish && formData.status === "active") {
                toast.info(getPublishWorkflowMessage("This SEO record"));
            }
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
        const nextStatus = !canPublish && query.status === "active" ? "inactive" : (query.status || "active");
        if (!canPublish && query.status === "active") {
            toast.info("Editing an active SEO record will save it as inactive until an admin republishes it.");
        }
        setFormData({
            title: query.title || "",
            meta_description: query.meta_description || "",
            page_name: query.page_name || "",
            meta_can_tag: query.meta_can_tag || "",
            meta_robots: query.meta_robots || "index, follow", // Include new field
            og_image: query.og_image || "",                    // Include new field
            include_in_sitemap: query.include_in_sitemap ?? true,
            sitemap_change_frequency: query.sitemap_change_frequency || DEFAULT_SITEMAP_CHANGE_FREQUENCY,
            sitemap_priority: String(query.sitemap_priority ?? DEFAULT_SITEMAP_PRIORITY),
            status: nextStatus
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!canPublish && formData.status === "active") {
                toast.info(getPublishWorkflowMessage("This SEO record"));
            }
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
        if (!canDelete) {
            toast.error(getDeletePermissionMessage("this SEO record"));
            return;
        }

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
                {(!canPublish || !canDelete) && (
                    <div className="alert alert-info">
                        Editors can prepare SEO entries here. Publish and delete access can be granted separately by an admin.
                    </div>
                )}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        // Make sure to clear the new fields when adding a new entry
                        onClick={() => setFormData({
                            title: "",
                            meta_description: "",
                            page_name: "",
                            meta_can_tag: "",
                            meta_robots: "index, follow",
                            og_image: "",
                            include_in_sitemap: true,
                            sitemap_change_frequency: DEFAULT_SITEMAP_CHANGE_FREQUENCY,
                            sitemap_priority: String(DEFAULT_SITEMAP_PRIORITY),
                            status: canPublish ? "active" : "inactive"
                        })} 
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
                                    <th>Sitemap</th>
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
                                        <td>
                                            <span className={`badge ${query.include_in_sitemap === false ? "bg-secondary" : "bg-success"}`}>
                                                {query.include_in_sitemap === false ? "Excluded" : "Included"}
                                            </span>
                                        </td>
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
                                            {canDelete && <button className="ms-2 btn btn-danger" onClick={() => deleteHandler(query.id)}>Delete</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New</h1>
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
                                
                                {/* NEW FIELD: Meta Robots */}
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Robots (Index Control)</label>
                                    <select
                                        className="form-control"
                                        name="meta_robots"
                                        value={formData.meta_robots}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="index, follow">Index, Follow (Recommended)</option>
                                        <option value="noindex, nofollow">No Index, No Follow (Hide from Google)</option>
                                        <option value="index, nofollow">Index, No Follow</option>
                                        <option value="noindex, follow">No Index, Follow</option>
                                    </select>
                                </div>

                                {/* NEW FIELD: OG Image */}
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">OG Image URL (Social Media Preview)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="og_image"
                                        placeholder="https://yoursite.com/image.jpg"
                                        value={formData.og_image}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <div className="form-check form-switch bg-light rounded border p-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="seoTagIncludeInSitemapCreate"
                                            name="include_in_sitemap"
                                            checked={Boolean(formData.include_in_sitemap)}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label fw-bold ms-2" htmlFor="seoTagIncludeInSitemapCreate">
                                            Include this URL in sitemap.xml
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Sitemap Change Frequency</label>
                                    <select
                                        className="form-control"
                                        name="sitemap_change_frequency"
                                        value={formData.sitemap_change_frequency}
                                        onChange={handleInputChange}
                                    >
                                        {SITEMAP_CHANGE_FREQUENCY_OPTIONS.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Sitemap Priority</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sitemap_priority"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={formData.sitemap_priority}
                                        onChange={handleInputChange}
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
                                        {canPublish && <option value="active">Active</option>}
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
                <div className="modal-dialog modal-lg">
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

                                {/* NEW FIELD: Meta Robots */}
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Robots (Index Control)</label>
                                    <select
                                        className="form-control"
                                        name="meta_robots"
                                        value={formData.meta_robots}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="index, follow">Index, Follow (Recommended)</option>
                                        <option value="noindex, nofollow">No Index, No Follow (Hide from Google)</option>
                                        <option value="index, nofollow">Index, No Follow</option>
                                        <option value="noindex, follow">No Index, Follow</option>
                                    </select>
                                </div>

                                {/* NEW FIELD: OG Image */}
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">OG Image URL (Social Media Preview)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="og_image"
                                        placeholder="https://yoursite.com/image.jpg"
                                        value={formData.og_image}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <div className="form-check form-switch bg-light rounded border p-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="seoTagIncludeInSitemapEdit"
                                            name="include_in_sitemap"
                                            checked={Boolean(formData.include_in_sitemap)}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label fw-bold ms-2" htmlFor="seoTagIncludeInSitemapEdit">
                                            Include this URL in sitemap.xml
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Sitemap Change Frequency</label>
                                    <select
                                        className="form-control"
                                        name="sitemap_change_frequency"
                                        value={formData.sitemap_change_frequency}
                                        onChange={handleInputChange}
                                    >
                                        {SITEMAP_CHANGE_FREQUENCY_OPTIONS.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Sitemap Priority</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sitemap_priority"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={formData.sitemap_priority}
                                        onChange={handleInputChange}
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
                                        {canPublish && <option value="active">Active</option>}
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
