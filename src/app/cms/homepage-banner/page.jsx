"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";


const CmsHomepageBanner = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        sub_title: "",
        top_slogan: "",
        top_icon: null,
        banner_image: null,
        item_index: null,
    });
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get('/cms-content/homepage_banner', {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            if (response.data && response.data.json_content) {
                setPagesList(response.data.json_content);
                setSelectedId(response.data.id);
                setLoading(false);
            }


        } catch (err) {
            toast.error(err.message || "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    // Handle input change for text fields and image
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "top_icon" && files.length > 0 || name === "banner_image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("sub_title", formData.sub_title);
        formDataToSend.append("top_slogan", formData.top_slogan);
        formDataToSend.append("item_index", formData.item_index);
        if (formData.top_icon) {
            formDataToSend.append("top_icon", formData.top_icon);
        }
        if (formData.banner_image) {
            formDataToSend.append("banner_image", formData.banner_image);
        }

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-content/update-json-homepage-banner/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("Form submitted successfully.");
                setFormData({
                    title: "",
                    sub_title: "",
                    top_slogan: "",
                    top_icon: null,
                    banner_image: null,
                    item_index: null,
                });

                // Close modal
                document.getElementById('addNewpageModalClose').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    // Set form data when edit button is clicked
    const handleEditClick = (item, index) => {
        setFormData({
            title: item.title,
            sub_title: item.sub_title,
            top_slogan: item.top_slogan,
            top_icon: null,
            banner_image: null,
            item_index: index,
        });
    };




    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - Homepage Banner</h1>
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
                                    <th>Sub Title</th>
                                    <th>Top Slogan</th>
                                    <th width="80">Top Icon</th>
                                    <th width="80">Banner Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList && pagesList?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.sub_title}</td>
                                        <td>{item.top_slogan}</td>
                                        <td>
                                            <img src={item?.top_icon} alt={item.title} height="80" />
                                        </td>
                                        <td>
                                            <img src={item?.banner_image} alt={item.title} height="80" />
                                        </td>
                                        <td>
                                            <button onClick={() => handleEditClick(item, index)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#addNewpageModal">
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
                                    <label className="form-label">Sub Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="sub_title"
                                        placeholder="Sub Title"
                                        value={formData.sub_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Top Slogan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="top_slogan"
                                        placeholder="Top Slogan"
                                        value={formData.top_slogan}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Top Icon</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="top_icon"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Upload Files</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="banner_image"
                                        accept="*"
                                        onChange={handleInputChange}
                                    />
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

export default CmsHomepageBanner;
