"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
 

const CmsHowItsWorks = () => {

    
    const authToken = useSelector((state) => state.auth.authToken);
    const [pagesList, setPagesList] = useState([]);
    const [pagesList_what_we_are, setPagesList_what_we_are] = useState([]);
    const [pagesList_meet_us, setPagesList_meet_us] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        designation: "",
        image: null,
        item_index: null,
    });
    const [formData2, setFormData2] = useState({
        title: "",
        description: "",
        designation: "",
        image: null,
        item_index: null,
    });
    const [selectedId, setSelectedId] = useState(null);
    const [selectedId_every_space, setSelectedId_every_space] = useState(null);


        // Handle form submission
        const handleEditSubmit_meet_us = async (e) => {
            e.preventDefault();
    
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("item_index", formData.item_index);
            formDataToSend.append("designation", formData.designation);
            if (formData.image) {
                formDataToSend.append("json_content[mid_image]", formData.image);
            }
            console.log('formdata', formDataToSend);
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
                    fetchContentManagerPages_meet_us();
                    toast.success("Form submitted successfully.");
                    setFormData({
                        title: "",
                        description: "",
                        designation: "",
                        image: null,
                    });
    
                    // Close modal
                    document.getElementById('editNewpageModalClose_meet_us').click();
    
                } else {
                    toast.error("Error submitting form. Please try again.");
                }
            } catch (error) {
                toast.error(error.message ?? "Error submitting form. Please try again.");
                console.error("Error:", error);
            }
        };
    
        const handleAddSubmit_meet_us = async (e) => {
            e.preventDefault();
    
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("designation", formData.designation);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }
    
            try {
                // Send POST request to save form data
                const response = await api.post(`/cms-content/home_page_content_meet_us`, formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });
    
                // Handle success response
                if (response.status === 201) {
                    fetchContentManagerPages_meet_us();
                    toast.success("Form submitted successfully.");
                    setFormData({
                        title: "",
                        description: "",
                        designation: "",
                        image: null,
                    });
    
                    // Close modal
                    document.getElementById('addNewpageModalClose_meet_us').click();
    
                } else {
                    toast.error("Error submitting form. Please try again.");
                }
            } catch (error) {
                toast.error(error.message ?? "Error submitting form. Please try again.");
                console.error("Error:", error);
            }
        };
    
     
        
        
    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get('/cms-content/home_page_content', {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            if (response.data?.length > 0) {
                setPagesList(response.data);
                setLoading(false);
            }


        } catch (err) {
            toast.error(err.message || "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

      // Handle form submission
      const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("item_index", formData.item_index);
        formDataToSend.append("designation", formData.designation);
        if (formData.image) {
            formDataToSend.append("json_content[mid_image]", formData.image);
        }

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
                fetchContentManagerPages();
                toast.success("Form submitted successfully.");
                setFormData({
                    title: "",
                    description: "",
                    designation: "",
                    image: null,
                });

                // Close modal
                document.getElementById('editNewpageModalClose').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("designation", formData.designation);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            // Send POST request to save form data
            const response = await api.post(`/cms-content/home_page_content`, formDataToSend, {
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
                    designation: "",
                    image: null,
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

     // Handle input change for text fields and image
     const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const fetchContentManagerPages_what_we_are = useCallback(async () => {
        try {
            const response = await api.get('/cms-content/home_page_content_what_we_are', {
                headers: {
                    Authorization: `Bearer ${authToken}`, 
                },
            });
    
            console.log("API Response:", response.data); // Debugging step
    
            if (response.data?.length > 0) {
                setPagesList_what_we_are(response.data);
               
            } else {
                setPagesList_what_we_are([]); // Set empty array if no data
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error(err.message || "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);
    
    // Handle form submission
      const handleEditSubmit_what_we_are = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("item_index", formData.item_index);
        formDataToSend.append("designation", formData.designation);
        if (formData.image) {
            formDataToSend.append("json_content[mid_image]", formData.image);
        }

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
                fetchContentManagerPages_what_we_are();
                toast.success("Form submitted successfully.");
                setFormData({
                    title: "",
                    description: "",
                    designation: "",
                    image: null,
                });

                // Close modal
                document.getElementById('editNewpageModalClose_what_we_are').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleAddSubmit_what_we_are = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("designation", formData.designation);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            // Send POST request to save form data
            const response = await api.post(`/cms-content/home_page_content_what_we_are`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 201) {
                fetchContentManagerPages_what_we_are();
                toast.success("Form submitted successfully.");
                setFormData({
                    title: "",
                    description: "",
                    designation: "",
                    image: null,
                });

                // Close modal
                document.getElementById('addNewpageModalClose_what_we_are').click();

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };


    const handleInputChange_what_we_are = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const fetchContentManagerPages_meet_us = useCallback(async () => {
        setLoading(true);
            try {
            const response = await api.get("/cms-content/home_page_content_meet_us", {
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
    
    const fetchContentManagerPages_every_space = useCallback(async () => {
        setLoading(true);
            try {
            const response = await api.get("/cms-content/home_page_content_every_space", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });
            if (response.data && response.data.json_content) {
                setFormData2({
                    top_title: response.data.json_content?.top_title || "",
                    top_description: response.data.json_content?.top_description || "",
                    mid_sub_title: response.data.json_content?.mid_sub_title || "",
                    mid_sub_description: response.data.json_content?.mid_sub_description || "",
                    mid_image: response.data.json_content?.mid_image || "",
                });
                setSelectedId_every_space(response.data.id);
            }
            setLoading(false);

        } catch (err) {
            toast.error(err.message ?? "Failed to fetch data. Please try again.");
            setLoading(false);
        }

    }, [authToken]);
    

    useEffect(() => {
        fetchContentManagerPages();
        fetchContentManagerPages_what_we_are();
        fetchContentManagerPages_meet_us();
        fetchContentManagerPages_every_space();
        console.log("API Response (Meet Us):", pagesList_meet_us);
        console.log("API Response (About Us):", pagesList);
     }, [fetchContentManagerPages, fetchContentManagerPages_what_we_are, fetchContentManagerPages_meet_us, fetchContentManagerPages_every_space]);
     
   
  
    // Set form data when edit button is clicked
  

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            try {
                const response = await api.delete(`/cms-content/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                if (response.status === 200) {
                    fetchContentManagerPages();
                    fetchContentManagerPages_what_we_are();
                    fetchContentManagerPages_meet_us();
                } else {
                    toast.error("Failed to delete team. Please try again.");
                }
            } catch (error) {
                toast.error("Failed to delete team. Please try again.");
                console.error("Error:", error);
            }
        }
    };

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
                //fetchContentManagerPages();
                fetchContentManagerPages_meet_us();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleInputChange_meet_us = (e) => {
        const { name, value, files } = e.target;
        if (name === "mid_image" && files.length > 0) {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const handleEditClick = (item, index) => {
        setSelectedId(item.id);
        setFormData({
            title: item?.json_content?.title,
            description: item?.json_content?.description,
            designation: item?.json_content?.designation,
            image: null, // Reset image field
            item_index: index,
        });
    };
    
    const handleSubmit_every_space = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("json_content[top_title]", formData2.top_title);
        formDataToSend.append("json_content[top_description]", formData2.top_description);
        formDataToSend.append("json_content[mid_sub_title]", formData2.mid_sub_title);
        formDataToSend.append("json_content[mid_sub_description]", formData2.mid_sub_description);
        formDataToSend.append("json_content[mid_image]", formData2.mid_image);

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-content/update-with-image/${selectedId_every_space}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                toast.success("Form submitted successfully.");
                //fetchContentManagerPages();
                fetchContentManagerPages_every_space();
            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleInputChange_every_space = (e) => {
        const { name, value, files } = e.target;
        if (name === "mid_image" && files.length > 0) {
            setFormData2((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData2((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    return (
        <div>
        <AuthMainLayout>
      
        <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - What People Say Videos </h1>
                <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => setFormData({ title: "", description: "", writer_name: "", published_on: "", image: null })}
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
                                    <th>Video Name</th>
                                    <th>Embed URL</th>
                                    {/* <th> </th> */}
                                    {/* <th width="80">Image</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagesList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.json_content?.title}</td>
                                        <td>{item?.json_content?.description}</td>
                                        {/* <td>{item?.json_content?.designation}</td>
                                        <td>
                                            <img src={item?.json_content?.image} alt={item?.json_content?.title} height="80" />
                                        </td> */}
                                        <td>
                                            <button onClick={() => handleEditClick(item, index)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#editNewpageModal">
                                                Edit
                                            </button>
                                            <button className="ms-2 btn btn-danger" onClick={() => deleteHandler(item.id)}>Delete</button>
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New</h1>
                            <button type="button" className="btn-close" id="addNewpageModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <label className="form-label">Embed URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="url"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* <div className="mb-3 col-md-12">
                                    <label className="form-label">Designation</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        placeholder="Designation"
                                        value={formData.designation}
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
                                </div> */}

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
                                    <label className="form-label">Embed URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="URL"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
{/* 
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Content</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        placeholder="Designation"
                                        value={formData.designation}
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
                                </div> */}

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

             {/* what we are  */}
             <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - All Home Page Content</h1>
                {/* <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => setFormData({ title: "", description: "", writer_name: "", published_on: "", image: null })}
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addNewpageModal_what_we_offer"
                    >
                        Add New
                    </button>
                </div> */}
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
                                    <th width="5%">SN</th>
                                    <th  width="15%">Text 1</th>
                                    <th width="25%">Text 2</th>
                                    <th width="25%">Text 3</th>
                                    <th width="10%">Image</th>
                                    <th width="100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    {pagesList_what_we_are.map((item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{item?.json_content?.title}</td>
            <td>{item?.json_content?.description}</td>
            <td>{item?.json_content?.designation}</td>
            <td>
                <img src={item?.json_content?.image} alt={item?.json_content?.title} width="80" />
            </td>
            <td>
                <button onClick={() => handleEditClick(item, index)} type="button" className="read_morebtn" data-bs-toggle="modal" data-bs-target="#editNewpageModal_what_we_offer">
                    Edit
                </button>
                {/* <button className="ms-2 btn btn-danger" onClick={() => deleteHandler(item.id)}>Delete</button> */}
            </td>
        </tr>
    ))}
</tbody>

                        </table>
                    </div>
                )}
            </div>

            <div className="modal fade" id="addNewpageModal_what_we_offer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New</h1>
                            <button type="button" className="btn-close" id="addNewpageModalClose_what_we_are" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddSubmit_what_we_are}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleInputChange_what_we_are}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange_what_we_are}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 3</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        placeholder="Designation"
                                        value={formData.designation}
                                        onChange={handleInputChange_what_we_are}
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
                                        onChange={handleInputChange_what_we_are}
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

            <div className="modal fade" id="editNewpageModal_what_we_offer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" id="editNewpageModalClose_what_we_are" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleEditSubmit_what_we_are}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleInputChange_what_we_are}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange_what_we_are}
                                        required
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Text 3</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        placeholder="Designation"
                                        value={formData.designation}
                                        onChange={handleInputChange_what_we_are}
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
                                        onChange={handleInputChange_what_we_are}
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
        <style>{`
          table tbody tr td {
            word-break: break-all;
          }
        `}</style>
        
        </div>

    );
};

export default CmsHowItsWorks;
