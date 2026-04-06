"use client";

import React, { useState } from "react";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import { AiOutlineCloudUpload } from "react-icons/ai";

const RequirementsForm = () => {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        description: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add your submit logic here (API call, etc.)
    };

    return (
        <AuthMainLayout>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-5 shadow-lg form-card">
                    <h2 className="mb-4 text-center">Fill The Requirements</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productName"
                                    placeholder="Product Name"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                name="description"
                                placeholder="Description"
                                rows={3}
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4 text-center">
                            <label className="upload-label">
                                <AiOutlineCloudUpload size={50} />
                                <input
                                    type="file"
                                    className="d-none"
                                    onChange={handleFileChange}
                                    required
                                />
                                <p className="upload-text">Upload Image</p>
                            </label>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .form-card {
                    width: 600px;
                    background-color: white;
                    border-radius: 20px;
                    border: 2px solid #f5f5f5;
                    padding: 40px;
                }

                h2 {
                    font-weight: bold;
                    color: #333;
                }

                .form-control {
                    border-radius: 12px;
                    border: 1px solid #eaeaea;
                    padding: 15px;
                    font-size: 16px;
                }

                .upload-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    color: #666;
                    border: 2px dashed #eaeaea;
                    border-radius: 12px;
                    padding: 20px;
                    transition: background-color 0.3s;
                }

                .upload-label:hover {
                    background-color: #f9f9f9;
                }

                .upload-text {
                    margin-top: 10px;
                    font-size: 14px;
                    color: #999;
                }

                .btn-submit {
                    background-color: #fd7e14;
                    color: white;
                    padding: 10px 20px;
                    font-size: 18px;
                    border-radius: 12px;
                    border: none;
                    transition: background-color 0.3s;
                }

                .btn-submit:hover {
                    background-color: white;
                    color: #fd7e14;
                    border: 2px solid #fd7e14;
                }
            `}</style>
        </AuthMainLayout>
    );
};

export default RequirementsForm;
