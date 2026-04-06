"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const CmsDesignGallery = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });
    const [selectedId, setSelectedId] = useState(null);
    const selectedPage = pagesList.find((page) => page.id === selectedId);

    const fetchContentManagerPages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get(`/cms-parent-child/gallery_design`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.data) {
                setPagesList(response.data);
            }
        } catch (err) {
            toast.error(err.message ?? "Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = selectedId
                ? await api.patch(`/cms-parent-child/${selectedId}`, formDataToSend, {
                      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authToken}` },
                  })
                : await api.post(`/cms-parent-child/gallery_design`, formDataToSend, {
                      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${authToken}` },
                  });

            if (response.status === 200 || response.status === 201) {
                fetchContentManagerPages();
                toast.success(selectedId ? "Updated successfully." : "Gallery added successfully.");
                setFormData({ title: "", description: "", image: null });
                document.getElementById(selectedId ? "editGalleryModalClose" : "addGalleryModalClose").click();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Error processing request. Please try again.");
        }
    };

    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            title: item.child_content?.title || "",
            description: item.child_content?.description || "",
            image: null,
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("page_type", "product");
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            // Send POST request to save form data
            const response = await api.post(`/cms-parent-child`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 201) {
                fetchContentManagerPages();
                toast.success("Form submitted successfully.");
                setFormData({
                    title: "",
                    description: "",
                    image: null,
                });

                // Close modal and clear form data
                document.getElementById('addNewpageModalClose').click();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.response.data.message ?? "Error fetching data. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - Design Gallery</h1>

                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGalleryModal">
                        Add Gallery
                    </button>
                </div>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table display table-striped table-bordered" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th width="80">Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={item?.child_content?.image} alt={item?.child_content?.title} height="80" />
                                        </td>
                                        <td>{item?.child_content?.title}</td>
                                        <td>{item?.child_content?.description}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="btn btn-warning me-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editGalleryModal"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Gallery Modal */}
            <div className="modal fade" id="addGalleryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add Gallery</h1>
                            <button type="button" className="btn-close" id="addGalleryModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="image" accept="image/*" onChange={handleInputChange} required />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-success" type="submit">Add Gallery</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit Gallery Modal */}
            <div className="modal fade" id="editGalleryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Gallery</h1>
                            <button type="button" className="btn-close" id="editGalleryModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" name="title" value={formData.title} onChange={handleInputChange} required />
                                <input type="text" className="form-control mb-3" name="description" value={formData.description} onChange={handleInputChange} required />
                                <input type="file" className="form-control mb-3" name="image" accept="image/*" onChange={handleInputChange} />
                                <div className="text-center">
                                    <button className="btn btn-success" type="submit">Save Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default CmsDesignGallery;
