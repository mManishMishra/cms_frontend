"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const CmsCancellationPolicy = () => {

    const authToken = useSelector((state) => state.auth.authToken);
    const [loading, setLoading] = useState(false);
    const [pagesList, setPagesList] = useState([]);
    const [formData, setFormData] = useState({
        phase: "",
        time_period: "",
        eligibility: "",
    });
    const [selectedId, setSelectedId] = useState(null);

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-content/cancellation_policy", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });
            if (response.data && response.data) {
                setPagesList(response.data)
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
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("json_content[phase]", formData.phase);
        formDataToSend.append("json_content[time_period]", formData.time_period);
        formDataToSend.append("json_content[eligibility]", formData.eligibility);

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-content/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("Form submitted successfully.");
                document.getElementById('addNewpageModalClose').click();
                
                setFormData({
                    phase: "",
                    time_period: "",
                    eligibility: ""
                });

            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setFormData({
            phase: item.json_content?.phase,
            time_period: item.json_content?.time_period,
            eligibility: item.json_content?.eligibility
        });
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - Cancellation Policy</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table
                                id="usersTable"
                                className="table display table-striped table-bordered"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Phase</th>
                                        <th>Time Period</th>
                                        <th>Eligibility</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagesList && pagesList?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.json_content?.phase}</td>
                                            <td>{item.json_content?.time_period}</td>
                                            <td>{item.json_content?.eligibility}</td>
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
                    </>
                )}
            </div>

            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" id="addNewpageModalClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row">

                                <div className="mb-3 col-md-12">
                                    <label htmlFor="phase" className="form-label">Phase</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phase"
                                        placeholder="Phase"
                                        value={formData.phase}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="time_period" className="form-label">Time Period</label>
                                    <textarea
                                        className="form-control"
                                        name="time_period"
                                        placeholder="Time Period"
                                        rows="3"
                                        value={formData.time_period}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label htmlFor="eligibility" className="form-label">Eligibility</label>
                                    <textarea
                                        className="form-control"
                                        name="eligibility"
                                        placeholder="Eligibility"
                                        rows="3"
                                        value={formData.eligibility}
                                        onChange={handleInputChange}
                                    ></textarea>
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

export default CmsCancellationPolicy;