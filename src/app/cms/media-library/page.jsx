"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import Image from "next/image";

const MediaLibrary = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Fetch all media files from the backend
    const fetchMedia = useCallback(async () => {
        setLoading(true);
        try {
            const token = authToken || (typeof window !== "undefined" ? localStorage.getItem("token") : "");
            const response = await api.get("/cms-parent-child/media-library", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMediaFiles(response.data || []);
        } catch (err) {
            console.error("Fetch Media Error:", err);
            toast.error("Failed to load media library.");
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    // Helper: Copy URL to clipboard
    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        toast.success("Image URL copied to clipboard!");
    };

    // Helper: Format file size
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Handle Image Replacement
    const handleReplaceImage = async (e, filename) => {
        const file = e.target.files[0];
        if (!file) return;

        // Ensure it's an image
        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file.");
            return;
        }

        if (window.confirm(`Are you sure you want to replace "${filename}"? This will overwrite the existing image everywhere it is used.`)) {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", file);

            try {
                const token = authToken || localStorage.getItem("token");
                const response = await api.post(`/cms-parent-child/replace-image/${filename}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });

                if (response.status === 201 || response.status === 200) {
                    toast.success("Image successfully replaced! Changes may take a minute to bypass browser cache.");
                    fetchMedia(); // Refresh the gallery
                }
            } catch (error) {
                console.error("Replacement Error:", error);
                toast.error("Failed to replace image.");
            } finally {
                setUploading(false);
                e.target.value = null; // Reset the file input
            }
        } else {
            e.target.value = null; // Reset if cancelled
        }
    };

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <div>
                                <h1 className="h3 mb-1 text-gray-800">Media Library</h1>
                                <p className="text-muted mb-0 small">Manage, copy, and seamlessly replace your website assets.</p>
                            </div>
                            <span className="badge bg-primary fs-6">{mediaFiles.length} Files</span>
                        </div>

                        {uploading && (
                            <div className="alert alert-info text-center py-3 fw-bold">
                                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                Uploading replacement image...
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {mediaFiles.length > 0 ? mediaFiles.map((file, index) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                                        <div className="card h-100 shadow-sm border-light position-relative overflow-hidden group-hover-effect">
                                            {/* Image Preview Container */}
                                            <div 
                                                className="bg-light d-flex align-items-center justify-content-center p-2" 
                                                style={{ height: "180px", borderBottom: "1px solid #f0f0f0" }}
                                            >
                                                <img 
                                                    src={file.url} 
                                                    alt={file.filename} 
                                                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
                                                />
                                            </div>
                                            
                                            {/* File Details */}
                                            <div className="card-body p-3">
                                                <h6 className="card-title text-truncate mb-1" title={file.filename}>
                                                    {file.filename}
                                                </h6>
                                                <div className="d-flex justify-content-between text-muted small mb-3">
                                                    <span>{formatBytes(file.size_bytes)}</span>
                                                    <span>{new Date(file.created_at).toLocaleDateString()}</span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="d-grid gap-2">
                                                    <button 
                                                        className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                                                        onClick={() => handleCopyUrl(file.url)}
                                                    >
                                                        <i className="bi bi-link-45deg me-2"></i> Copy URL
                                                    </button>
                                                    
                                                    {/* Hidden File Input for Replacement */}
                                                    <input 
                                                        type="file" 
                                                        id={`replace-${index}`} 
                                                        className="d-none" 
                                                        accept="image/*"
                                                        onChange={(e) => handleReplaceImage(e, file.filename)}
                                                    />
                                                    <button 
                                                        className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                                                        onClick={() => document.getElementById(`replace-${index}`).click()}
                                                    >
                                                        <i className="bi bi-arrow-repeat me-2"></i> Replace Image
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-12 text-center py-5 text-muted">
                                        <h4>No media files found.</h4>
                                        <p>Images uploaded through the CMS will appear here.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Minimal CSS for hover effect */}
            <style dangerouslySetInnerHTML={{__html: `
                .group-hover-effect:hover {
                    transform: translateY(-3px);
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                }
            `}} />
        </AuthMainLayout>
    );
};

export default MediaLibrary;