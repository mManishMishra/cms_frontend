"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const CKEditorComponent = dynamic(() => import('@/app/components/CKEditorComponent'), { ssr: false });

const CmsCity = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        city_type: "",
        main_title: "",
        main_description: "",
        location_image: null,
        side_title: "",
        side_description: "",
        side_image: null,
    });
    const [formSeoContentData, setFormSeoContentData] = useState({
        meta_title: "",
        meta_description: ""
    });
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-city", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            setPagesList(response.data);
            setSelectedId(response.data.id);
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
        if (name === "location_image" || name==="side_image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const formDataToSend = new FormData();
        formDataToSend.append("main_title", formData.main_title);
        formDataToSend.append("main_description", formData.main_description);
        formDataToSend.append("side_title", formData.side_title);
        formDataToSend.append("side_description", formData.side_description);

        if (formData.location_image) {
            formDataToSend.append("location_image", formData.location_image);
        }

        if (formData.side_image) {
            formDataToSend.append("side_image", formData.side_image);
        }

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-city/${selectedId}`, formDataToSend, {
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
                    city_type: "",
                    main_title: "",
                    main_description: "",
                    location_image: null,
                    side_title: "",
                    side_description: "",
                    side_image: null,
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
            toast.error(error.response.data.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    // Set form data when edit button is clicked
    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            city_type: item.city_type,
            main_title: item.main_title,
            main_description: item.main_description,
            location_image: null,
            side_title: item.side_title,
            side_description: item.side_description,
            side_image: null
        });
    };

    const setMainDescriptionData = (data) => {
        setFormData((prevData) => ({ ...prevData, main_description: data }));
    }

    const setSideDescriptionData = (data) => {
        setFormData((prevData) => ({ ...prevData, side_description: data }));
    }

    const handleManageSeoContentClick = (id, item) => {
        console.log("parms", id, item)
        setSelectedId(id);
        setFormSeoContentData({
            meta_title: item.meta_title ?? "",
            meta_description: item.meta_description ?? ""
        });
    };

    const handleSeoContentInputChange = (e) => {
        const { name, value } = e.target;
        setFormSeoContentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSeoContentSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            meta_title: formSeoContentData.meta_title,
            meta_description: formSeoContentData.meta_description,
        };

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-city/seo-content/${selectedId}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("SEO Content saved successfully.");
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
                <h1 className="mb-4 text-center">CMS - City</h1>
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
                                    <th>City Type</th>
                                    <th>Main Title</th>
                                    <th>Main Description</th>
                                    <th>Location Image</th>
                                    <th>Side Title</th>
                                    <th>Side Description</th>
                                    <th>Side Image</th>
                                    <th>SEO Content</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList && pagesList?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="text-capitalize">{item.city_type}</td>
                                        <td>{item.main_title}</td>
                                        <td>
                                            <span className="d-inline-block text-truncate" style={{ width: "250px" }} dangerouslySetInnerHTML={{ __html: item.main_description }}></span>
                                        </td>
                                        <td>
                                            <img src={item.location_image} alt="Location Image" height="80" />
                                        </td>
                                        <td>{item.side_title}</td>
                                        <td>
                                            <span className="d-inline-block text-truncate" style={{ width: "250px" }} dangerouslySetInnerHTML={{ __html: item.side_description }}></span>
                                        </td>
                                        <td>
                                            <img src={item.side_image} alt="Side Image" height="80" />
                                        </td>
                                        <td width={150}>
                                            <button onClick={() => handleManageSeoContentClick(item.id, item.seo_content)} className="btn btn-info text-nowrap" type="button" data-bs-toggle="modal" data-bs-target="#seoContentModal">SEO Content</button>
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

            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                <label class="form-label">City Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city_type"
                                        placeholder="City Type"
                                        value={formData.city_type}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Main Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="main_title"
                                        placeholder="Main Title"
                                        value={formData.main_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Main Description</label>
                                    <CKEditorComponent pageData={formData.main_description} setPageData={setMainDescriptionData} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Location Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="location_image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Side Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="side_title"
                                        placeholder="Side Title"
                                        value={formData.side_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Side Description</label>
                                    <CKEditorComponent pageData={formData.side_description} setPageData={setSideDescriptionData} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label class="form-label">Side Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="side_image"
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

            <div className="modal fade" id="seoContentModal" tabIndex="-1" aria-labelledby="seoContentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="seoContentModalLabel">Manage SEO Content</h1>
                            <button type="button" id="seoContentModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSeoContentSubmit}>
                            <div className="modal-body row">
                                
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Meta Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meta_title"
                                        placeholder="Meta Title"
                                        value={formSeoContentData?.meta_title}
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
                                        value={formSeoContentData?.meta_description}
                                        onChange={handleSeoContentInputChange}
                                        rows="3"
                                        required
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

export default CmsCity;