"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import dynamic from "next/dynamic";
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

const CKEditorComponent = dynamic(() => import('@/app/components/CKEditorComponent'), { ssr: false });

const initialFormData = {
    title: "",
    description: "",
    writer_name: "",
    published_on: "",
    image: null,
    image_alt: "",
    status: "Draft",
};

const CmsBlog = () => {
    const user = useSelector((state) => state.auth.user);
    const authToken = useSelector((state) => state.auth.authToken);
    const { canPublish, canDelete } = getCmsAccess(user);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formSeoContentData, setFormSeoContentData] = useState({
        slug: "",
        canonical_url: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        custom_code: "",
        meta_robots_index: "index",
        meta_robots_follow: "follow",
        include_in_sitemap: true,
        sitemap_change_frequency: DEFAULT_SITEMAP_CHANGE_FREQUENCY,
        sitemap_priority: String(DEFAULT_SITEMAP_PRIORITY),
    });
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-blog/all", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            setPagesList(response.data);
            setLoading(false);

        } catch (err) {
            toast.error(err.response.data.message ?? "Error fetching data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    // Handle input change for text fields and image
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("writer_name", formData.writer_name);
        formDataToSend.append("published_on", formData.published_on);
        formDataToSend.append("image_alt", formData.image_alt);
        formDataToSend.append("status", formData.status);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (!canPublish && formData.status === "Published") {
                toast.info(getPublishWorkflowMessage("This blog"));
            }

            // Send POST request to save form data
            const response = await api.patch(`/cms-blog/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("Blog moved to Pending Approval for admin review.");
                } else {
                    toast.success("Form submitted successfully.");
                }
                setFormData(initialFormData);

                // Close modal and clear form data
                document.getElementById('editNewpageModalClose').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.response.data.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("writer_name", formData.writer_name);
        formDataToSend.append("published_on", formData.published_on);
        formDataToSend.append("image_alt", formData.image_alt);
        formDataToSend.append("status", formData.status);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (!canPublish && formData.status === "Published") {
                toast.info(getPublishWorkflowMessage("This blog"));
            }

            // Send POST request to save form data
            const response = await api.post("/cms-blog", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 201) {
                fetchContentManagerPages();
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("Blog saved as Pending Approval for admin review.");
                } else {
                    toast.success("Form submitted successfully.");
                }
                setFormData(initialFormData);

                // Close modal and clear form data
                document.getElementById('addNewpageModalClose').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.response.data.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    // Set form data when edit button is clicked
    const handleEditClick = (item) => {
        let nextStatus = item.status || "Draft";

        if (!canPublish && nextStatus === "Published") {
            nextStatus = "Pending Approval";
            toast.info("Editing a live blog will move it to Pending Approval.");
        }

        setSelectedId(item.id);
        setFormData({
            title: item.title,
            description: item.description,
            writer_name: item.writer_name,
            published_on: item.published_on,
            image: null,
            image_alt: item.image_alt || "",
            status: nextStatus,
        });
    };

    const handleManageSeoContentClick = (id, item) => {
        setSelectedId(id);
        setFormSeoContentData({
            slug: item?.slug ?? "",
            canonical_url: item?.canonical_url ?? "",
            meta_title: item?.meta_title ?? "",
            meta_description: item?.meta_description ?? "",
            meta_keywords: item?.meta_keywords ?? "",
            custom_code: item?.custom_code ?? "",
            meta_robots_index: item?.meta_robots_index ?? "index",
            meta_robots_follow: item?.meta_robots_follow ?? "follow",
            include_in_sitemap: item?.include_in_sitemap ?? true,
            sitemap_change_frequency: item?.sitemap_change_frequency ?? DEFAULT_SITEMAP_CHANGE_FREQUENCY,
            sitemap_priority: String(item?.sitemap_priority ?? DEFAULT_SITEMAP_PRIORITY),
        });
    };

    const deleteHandler = async (id) => {
        if (!canDelete) {
            toast.error(getDeletePermissionMessage("this blog"));
            return;
        }

        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await api.delete(`/cms-blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                if (response.status === 200) {
                    fetchContentManagerPages();
                } else {
                    toast.error("Failed to delete blog. Please try again.");
                }
            } catch (error) {
                toast.error("Failed to delete blog. Please try again.");
                console.error("Error:", error);
            }
        }
    };

    const setDescriptionData = (data) => {
        setFormData((prevData) => ({ ...prevData, description: data }));
    };

    const quickApproveHandler = async (id) => {
        try {
            const response = await api.patch(
                `/cms-blog/${id}`,
                { status: "Published" },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );

            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("Blog approved and published.");
            }
        } catch (error) {
            toast.error("Failed to approve blog.");
        }
    };

    const handleSeoContentInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormSeoContentData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSeoContentSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            slug: formSeoContentData.slug,
            canonical_url: formSeoContentData.canonical_url,
            meta_title: formSeoContentData.meta_title,
            meta_description: formSeoContentData.meta_description,
            meta_keywords: formSeoContentData.meta_keywords,
            custom_code: formSeoContentData.custom_code,
            meta_robots_index: formSeoContentData.meta_robots_index,
            meta_robots_follow: formSeoContentData.meta_robots_follow,
            include_in_sitemap: formSeoContentData.include_in_sitemap,
            sitemap_change_frequency: formSeoContentData.sitemap_change_frequency,
            sitemap_priority: formSeoContentData.sitemap_priority,
        };

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-blog/seo-content/${selectedId}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("SEO changes moved this blog to Pending Approval for admin review.");
                } else {
                    toast.success("SEO Content saved successfully.");
                }
                // Close modal and clear form data
                document.getElementById('seoContentModalClose').click();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.response.data.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    }

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - Blog</h1>
                {(!canPublish || !canDelete) && (
                    <div className="alert alert-info">
                        Editors can create and update blogs. Publish and delete access can be granted separately by an admin.
                    </div>
                )}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => setFormData(initialFormData)}
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
                ) : (
                    <div className="table-responsive">
                        <table
                            id="usersTable"
                            className="table display table-striped table-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Title</th>
                                    <th>Writer Name</th>
                                    <th>Published On</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th>SEO Content</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList && pagesList?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.writer_name}</td>
                                        <td>{item?.published_on ? new Date(item?.published_on).toLocaleDateString() : ""}</td>
                                        <td>
                                            <span className={`badge ${item.status === "Published" ? "bg-success" : item.status === "Pending Approval" ? "bg-info text-dark" : "bg-warning text-dark"}`}>
                                                {item.status || "Draft"}
                                            </span>
                                        </td>
                                        <td>
                                            <img src={item.image} alt={item.image_alt || item.title || "Blog Image"} height="80" decoding="async"  loading="lazy" />
                                        </td>
                                        <td width={150}>
                                            <button onClick={() => handleManageSeoContentClick(item.id, item.seo_content)} className="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#seoContentModal">SEO Content</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditClick(item)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#editNewpageModal">
                                                Edit
                                            </button>
                                            {canPublish && item.status === "Pending Approval" && (
                                                <button className="ms-2 btn btn-success" onClick={() => quickApproveHandler(item.id)}>
                                                    Approve
                                                </button>
                                            )}
                                            {item.status === "Published" && item.seo_content?.slug && (
                                                <a
                                                    className="ms-2 btn btn-outline-success"
                                                    href={`/${item.seo_content.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Live Link
                                                </a>
                                            )}
                                            {canDelete && <button className="ms-2 btn btn-danger" onClick={() => deleteHandler(item.id)}>Delete</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Page</h1>
                            <button type="button" id="addNewpageModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddSubmit}>
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
                                    <label className="form-label">Description</label>
                                    <CKEditorComponent pageData={formData.description} setPageData={setDescriptionData} />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Writer Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="writer_name"
                                        placeholder="Writer Name"
                                        value={formData.writer_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Published On</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="published_on"
                                        placeholder="Published On"
                                        value={formData.published_on}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Image Alt Text</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="image_alt"
                                        placeholder="Describe the featured image"
                                        value={formData.image_alt}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Workflow Status</label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Pending Approval">Pending Approval</option>
                                        {canPublish && <option value="Published">Published</option>}
                                    </select>
                                </div>
                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" id="editNewpageModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <label className="form-label">Description</label>
                                    <CKEditorComponent pageData={formData.description} setPageData={setDescriptionData} />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Writer Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="writer_name"
                                        placeholder="Writer Name"
                                        value={formData.writer_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Published On</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="published_on"
                                        placeholder="Published On"
                                        value={formData.published_on && !isNaN(new Date(formData.published_on)) ? format(new Date(formData.published_on), "yyyy-MM-dd") : ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Image Alt Text</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="image_alt"
                                        placeholder="Describe the featured image"
                                        value={formData.image_alt}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Workflow Status</label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Pending Approval">Pending Approval</option>
                                        {canPublish && <option value="Published">Published</option>}
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

            <div className="modal fade" id="seoContentModal" tabIndex="-1" aria-labelledby="seoContentModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="seoContentModalLabel">Manage SEO Content</h1>
                            <button type="button" id="seoContentModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSeoContentSubmit}>
                            <div className="modal-body row">
                                {/* for slug */}
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Slug</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="slug"
                                        placeholder="Slug"
                                        value={formSeoContentData.slug}
                                        onChange={handleSeoContentInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Canonical URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="canonical_url"
                                        placeholder="Canonical URL"
                                        value={formSeoContentData.canonical_url}
                                        onChange={handleSeoContentInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_title"
                                        placeholder="Meta Title"
                                        value={formSeoContentData.meta_title}
                                        onChange={handleSeoContentInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Description</label>
                                    <textarea
                                        className="form-control"
                                        name="meta_description"
                                        placeholder="Meta Description"
                                        value={formSeoContentData.meta_description}
                                        onChange={handleSeoContentInputChange}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Search Engine Indexing</label>
                                    <select
                                        className="form-control"
                                        name="meta_robots_index"
                                        value={formSeoContentData.meta_robots_index}
                                        onChange={handleSeoContentInputChange}
                                    >
                                        <option value="index">Index</option>
                                        <option value="noindex">No Index</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Link Following</label>
                                    <select
                                        className="form-control"
                                        name="meta_robots_follow"
                                        value={formSeoContentData.meta_robots_follow}
                                        onChange={handleSeoContentInputChange}
                                    >
                                        <option value="follow">Follow</option>
                                        <option value="nofollow">No Follow</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-12">
                                    <div className="form-check form-switch bg-light rounded border p-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="blogIncludeInSitemap"
                                            name="include_in_sitemap"
                                            checked={Boolean(formSeoContentData.include_in_sitemap)}
                                            onChange={handleSeoContentInputChange}
                                        />
                                        <label className="form-check-label fw-bold ms-2" htmlFor="blogIncludeInSitemap">
                                            Include this blog in sitemap.xml
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Sitemap Change Frequency</label>
                                    <select
                                        className="form-control"
                                        name="sitemap_change_frequency"
                                        value={formSeoContentData.sitemap_change_frequency}
                                        onChange={handleSeoContentInputChange}
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
                                        value={formSeoContentData.sitemap_priority}
                                        onChange={handleSeoContentInputChange}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Keywords</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_keywords"
                                        placeholder="Meta Keywords"
                                        value={formSeoContentData.meta_keywords}
                                        onChange={handleSeoContentInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Custom Code</label>
                                    <textarea
                                        className="form-control"
                                        name="custom_code"
                                        placeholder="Custom Code"
                                        rows="3"
                                        value={formSeoContentData.custom_code}
                                        onChange={handleSeoContentInputChange}
                                    ></textarea>
                                </div>
                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" type="submit">
                                        Save
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

export default CmsBlog;
