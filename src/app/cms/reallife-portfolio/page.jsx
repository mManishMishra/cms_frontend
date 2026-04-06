"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const CmsRealLifePortfolio = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        style: "",
        room_dimension: "",
        image: null,
    });
    const [selectedId, setSelectedId] = useState(null);


    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-reallife-portfolio", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            setPagesList(response.data);
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
        if (name === "image" && files.length > 0) {
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
        formDataToSend.append("style", formData.style);
        formDataToSend.append("room_dimension", formData.room_dimension);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-reallife-portfolio/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("Page updated successfully.");
                setFormData({
                    title: "",
                    style: "",
                    room_dimension: "",
                    image: null,
                });

                // Close modal and clear form data
                setTimeout(() => {
                    document.getElementById('addNewpageModal').classList.remove('show');
                    document.querySelector('.modal-backdrop').remove();
                    document.body.classList.remove('modal-open');
                    document.body.style = "";
                }, 1000);

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    // Set form data when edit button is clicked
    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            title: item.title,
            style: item.style,
            room_dimension: item.room_dimension,
            image: null, // Reset image field
        });
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Real Life Portfolio</h1>
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
                                    <th width="80">Image</th>
                                    <th>Title</th>
                                    <th>Style</th>
                                    <th>Room Dimension</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList && pagesList?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src={item.image} alt={item.title} height="80" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.style}</td>
                                        <td>{item.room_dimension}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(item)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#addNewpageModal">
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
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
                                <label htmlFor="style" className="form-label">Style</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="style"
                                        placeholder="Style"
                                        value={formData.style}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                <label htmlFor="room_dimension" className="form-label">Room Dimension</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="room_dimension"
                                        placeholder="Room Dimension"
                                        value={formData.room_dimension}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        accept="image/*"
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

export default CmsRealLifePortfolio;