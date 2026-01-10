"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const CmsAboutUs = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [loading, setLoading] = useState(false);

    // State for first section
    const [formData, setFormData] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId, setSelectedId] = useState(null);

    // State for second section
    const [formData_2, setFormData_2] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId_2, setSelectedId_2] = useState(null);

    // State for third section
    const [formData_3, setFormData_3] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId_3, setSelectedId_3] = useState(null);
 
    // State for forth section
    const [formData_4, setFormData_4] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId_4, setSelectedId_4] = useState(null);
   
    // State for fifth section
    const [formData_5, setFormData_5] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId_5, setSelectedId_5] = useState(null);
   
   
    // State for six section
    const [formData_6, setFormData_6] = useState({
        top_title: "",
        top_description: "",
        mid_sub_title: "",
        mid_sub_description: "",
        mid_image: null
    });
    const [selectedId_6, setSelectedId_6] = useState(null);
   
 

    // Fetch CMS data function
    const fetchContent = useCallback(async (endpoint, setForm, setId) => {
        try {
            const response = await api.get(`/cms-content/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.data && response.data.json_content) {
                setForm({
                    top_title: response.data.json_content?.top_title || "",
                    top_description: response.data.json_content?.top_description || "",
                    mid_sub_title: response.data.json_content?.mid_sub_title || "",
                    mid_sub_description: response.data.json_content?.mid_sub_description || "",
                    mid_image: response.data.json_content?.mid_image || "",
                });
                setId(response.data.id);
            }
            setLoading(false);
        } catch (err) {
            toast.error(err.message ?? "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContent("creating_the_home_of_your_dreams", setFormData, setSelectedId);
        fetchContent("creating_the_home_of_your_dreams_2", setFormData_2, setSelectedId_2);
        fetchContent("creating_the_home_of_your_dreams_3", setFormData_3, setSelectedId_3);
        fetchContent("creating_the_home_of_your_dreams_4", setFormData_4, setSelectedId_4);
        fetchContent("creating_the_home_of_your_dreams_5", setFormData_5, setSelectedId_5);
        fetchContent("creating_the_home_of_your_dreams_6", setFormData_6, setSelectedId_6);
    }, [fetchContent]);

    // Handle input change for text fields and image
    const handleInputChange = (e, setFormData) => {
        const { name, value, files } = e.target;
        if (name === "mid_image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e, selectedId, formData, fetchFunction) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("json_content[top_title]", formData.top_title);
        formDataToSend.append("json_content[top_description]", formData.top_description);
        formDataToSend.append("json_content[mid_sub_title]", formData.mid_sub_title);
        formDataToSend.append("json_content[mid_sub_description]", formData.mid_sub_description);
        formDataToSend.append("json_content[mid_image]", formData.mid_image);

        try {
            const response = await api.patch(`/cms-content/update-with-image/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                toast.success("Form submitted successfully.");
                fetchFunction();
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
                <h1 className="mb-4 text-center"> Banner Section (First)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId, formData, () => fetchContent("creating_the_home_of_your_dreams", setFormData, setSelectedId))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Top Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData)}
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
                                    onChange={(e) => handleInputChange(e, setFormData)}
                                ></textarea>
                            </div>

                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Banner Title 2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Top Title"
                                    value={formData.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData)}
                                    required
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Banner Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="mid_image"
                                        accept="image/*"
                                        onChange={(e) => handleInputChange(e, setFormData)}
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
                )}
            </div>

            <div className="container my-5">
                <h1 className="mb-4 text-center"> Banner Bottom (Second)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId_2, formData_2, () => fetchContent("creating_the_home_of_your_dreams_2", setFormData_2, setSelectedId_2))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Banner  Title 1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData_2.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData_2)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_description" className="form-label">Text 2</label>
                                <input
                                    className="form-control"
                                    name="top_description"
                                    placeholder="Top Description"
                                    rows="4"
                                    value={formData_2.top_description}
                                    onChange={(e) => handleInputChange(e, setFormData_2)}
                                /> 
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Description</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Text 3"
                                    value={formData_2.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData_2)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Button Link </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_description"
                                    placeholder="Button Link"
                                    value={formData_2.mid_sub_description}
                                    onChange={(e) => handleInputChange(e, setFormData_2)}
                                    required
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="mid_image"
                                        accept="image/*"
                                        onChange={(e) => handleInputChange(e, setFormData_2)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    {typeof formData_2?.mid_image === 'string' && <img src={formData_2?.mid_image} alt="Mid Image" style={{ height: '100px', marginTop: '10px' }} />}
                                </div>
                            </div>


                            <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                <button className="px-5 read_morebtn" type="submit">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            <div className="container my-5">
                <h1 className="mb-4 text-center"> Video Section (Third)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId_3, formData_3, () => fetchContent("creating_the_home_of_your_dreams_3", setFormData_3, setSelectedId_3))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Banner  Title 1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData_3.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData_3)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_description" className="form-label">Text 2</label>
                                <input
                                    className="form-control"
                                    name="top_description"
                                    placeholder="Top Description"
                                    rows="4"
                                    value={formData_3.top_description}
                                    onChange={(e) => handleInputChange(e, setFormData_3)}
                                /> 
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Video 1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Button Link"
                                    value={formData_3.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData_3)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Video  2</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_description"
                                    placeholder="Button Link"
                                    value={formData_3.mid_sub_description}
                                    onChange={(e) => handleInputChange(e, setFormData_3)}
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
                )}
            </div>

            <div className="container my-5">
                <h1 className="mb-4 text-center">   Section (Forth)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId_4, formData_4, () => fetchContent("creating_the_home_of_your_dreams_4", setFormData_4, setSelectedId_4))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">   Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData_4.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData_4)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="top_description"
                                    placeholder="Top Description"
                                    rows="4"
                                    value={formData_4.top_description}
                                    onChange={(e) => handleInputChange(e, setFormData_4)}
                                ></textarea> 
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Button Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Button Link"
                                    value={formData_4.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData_4)}
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
                )}
            </div>


            <div className="container my-5">
                <h1 className="mb-4 text-center">   Section (Fifth)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId_5, formData_5, () => fetchContent("creating_the_home_of_your_dreams_5", setFormData_5, setSelectedId_5))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">   Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData_5.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData_5)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="top_description"
                                    placeholder="Top Description"
                                    rows="4"
                                    value={formData_5.top_description}
                                    onChange={(e) => handleInputChange(e, setFormData_5)}
                                ></textarea> 
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Button Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Button Link"
                                    value={formData_5.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData_5)}
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
                )}
            </div>


            <div className="container my-5">
                <h1 className="mb-4 text-center">   Section (Six)</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e, selectedId_6, formData_6, () => fetchContent("creating_the_home_of_your_dreams_6", setFormData_6, setSelectedId_6))}>
                        <div className="modal-body row">
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">   Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="top_title"
                                    placeholder="Top Title"
                                    value={formData_6.top_title}
                                    onChange={(e) => handleInputChange(e, setFormData_6)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="top_description"
                                    placeholder="Top Description"
                                    rows="4"
                                    value={formData_6.top_description}
                                    onChange={(e) => handleInputChange(e, setFormData_6)}
                                ></textarea> 
                            </div>
                            <div className="mb-3 col-md-12">
                                <label htmlFor="top_title" className="form-label">Button Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mid_sub_title"
                                    placeholder="Button Link"
                                    value={formData_6.mid_sub_title}
                                    onChange={(e) => handleInputChange(e, setFormData_6)}
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
                )}
            </div>

        </AuthMainLayout>
    );
};

export default CmsAboutUs;
