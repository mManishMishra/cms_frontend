"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";

const addContentMangerUrl = "https://high.creation.dev.api.crudbyte.com/content-manager";

const Content = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
    });

    // State to handle errors and success messages
    const [submissionError, setSubmissionError] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/content-manager", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            setPagesList(response.data);
            setLoading(false);


        } catch (err) {
            setError("Failed to fetch page list. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError("");
        setSubmissionMessage("");

        try {
            // Send POST request to save form data
            const response = await api.patch(`/content-manager/${selectedId}`, formData);

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                setSubmissionMessage("Form submitted successfully!");
                setFormData({
                    title: "",
                    slug: "",
                    metaTitle: "",
                    metaDescription: "",
                    metaKeywords: "",

                });

                // Close modal and clear form data
                setTimeout(() => {
                    document.getElementById('addNewpageModal').classList.remove('show');
                    document.querySelector('.modal-backdrop').remove();
                    document.body.classList.remove('modal-open');
                    document.body.style = "";
                }, 1000);

                // Clear error message after some time
                setTimeout(() => {
                    setSubmissionError("");
                    setSubmissionMessage("");
                }, 5000);


            } else {
                setSubmissionError("Failed to submit form. Please try again.");
            }
        } catch (error) {
            setSubmissionError(error.response.data.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    //delete handler with javascript confirm
    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this page?")) {
            try {
                const response = await api.delete(`/content-manager/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                if (response.status === 200) {
                    fetchContentManagerPages();
                } else {
                    setSubmissionError("Failed to delete page. Please try again.");
                }
            } catch (error) {
                setSubmissionError("Error deleting page. Please try again.");
                console.error("Error:", error);
            }
        }
    };


    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            title: item.title,
            slug: item.slug,
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeywords: item.metaKeywords,
        });
    }


    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Pages List</h1>
                {/* <div className="flex text-end mb-4">
                    <button type="button" className="mt-3 btn know_more" data-bs-toggle="modal" data-bs-target="#addNewpageModal">
                        Add New Page
                    </button>

                </div> */}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center alert alert-danger">{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table
                            id="usersTable"
                            className="table display table-striped table-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Meta Title</th>
                                    <th>Meta Description</th>
                                    <th>Meta Keywords</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.slug}</td>
                                        <td>{item.metaTitle}</td>
                                        <td>{item.metaDescription}</td>
                                        <td>{item.metaKeywords}</td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        <td>
                                        <button onClick={() => handleEditClick(item)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#addNewpageModal">
                                                Edit
                                            </button>
                                            {/* <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(item.id)}>Delete</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            <div class="modal fade" id="addNewpageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Page</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="modal-body row">

                                {submissionMessage && (
                                    <div className="text-center alert alert-success alert-dismissible fade show">
                                        {submissionMessage}
                                    </div>
                                )}
                                {submissionError && (
                                    <div className="text-center alert alert-danger alert-dismissible fade show">
                                        {submissionError}
                                    </div>
                                )}

                                <div className="mb-3 col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="slug"
                                        placeholder="Slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        required
                                        disabled
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="metaTitle"
                                        placeholder="Meta Title"
                                        value={formData.metaTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="metaDescription"
                                        placeholder="Meta Description"
                                        value={formData.metaDescription}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="metaKeywords"
                                        placeholder="Meta Keywords"
                                        value={formData.metaKeywords}
                                        onChange={handleInputChange}
                                        required
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

export default Content;
