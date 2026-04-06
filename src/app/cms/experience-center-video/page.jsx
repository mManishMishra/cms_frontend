"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const CmsAboutUs = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-content/about_us", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });
            if (response.data && response.data.json_content) {
                setFormData({
                    top_title: response.data.json_content?.top_title || "",
                    top_description: response.data.json_content?.top_description || "",
                    mid_sub_title: response.data.json_content?.mid_sub_title || "",
                    mid_sub_description: response.data.json_content?.mid_sub_description || "",
                    mid_image: response.data.json_content?.mid_image || "",
                });
                setSelectedId(response.data.id);
            }
            setLoading(false);

        } catch (err) {
            toast.error(err.message ?? "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    // Handle input change for text fields and image
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "mid_image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("json_content[top_title]", formData.top_title);
        formDataToSend.append("json_content[top_description]", formData.top_description);
        formDataToSend.append("json_content[mid_sub_title]", formData.mid_sub_title);
        formDataToSend.append("json_content[mid_sub_description]", formData.mid_sub_description);
        formDataToSend.append("json_content[mid_image]", formData.mid_image);

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-content/update-with-image/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                toast.success("Form submitted successfully.");
                fetchContentManagerPages();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - About Us</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label htmlFor="top_title" className="form-label">Top Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="top_title"
                                        placeholder="Top Title"
                                        value={formData.top_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="top_description" className="form-label">Top Description</label>
                                    <textarea
                                        className="form-control"
                                        name="top_description"
                                        placeholder="Top Description"
                                        rows="4"
                                        value={formData.top_description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="mid_sub_title" className="form-label">Mid Sub Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="mid_sub_title"
                                        placeholder="Mid Sub Title"
                                        value={formData.mid_sub_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="mid_sub_description" className="form-label">Mid Sub Description</label>
                                    <textarea
                                        className="form-control"
                                        name="mid_sub_description"
                                        placeholder="Mid Sub Description"
                                        rows="4"
                                        value={formData.mid_sub_description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                               <div className="row mb-3">
                               <div className="col-md-6">
                                    <label className="form-label">Mid Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="mid_image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                        {typeof formData?.mid_image === 'string' && <img src={formData?.mid_image} alt="Mid Image" style={{ height: '100px', marginTop: '10px' }} />}
                                    </div>
                               </div>
                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" type="submit">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>


        </AuthMainLayout>
    );
};

export default CmsAboutUs;