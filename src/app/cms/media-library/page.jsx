"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const initialUploadForm = {
    file: null,
    alt_text: "",
};

const MediaLibrary = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [savingAltFor, setSavingAltFor] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [uploadForm, setUploadForm] = useState(initialUploadForm);
    const [altDrafts, setAltDrafts] = useState({});
    const [uploadFieldKey, setUploadFieldKey] = useState(0);

    const getToken = useCallback(
        () => authToken || (typeof window !== "undefined" ? localStorage.getItem("token") : ""),
        [authToken]
    );

    const fetchMedia = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/cms-parent-child/media-library", {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            const files = response.data || [];
            setMediaFiles(files);
            setAltDrafts(
                files.reduce((accumulator, file) => {
                    accumulator[file.filename] = file.alt_text || "";
                    return accumulator;
                }, {})
            );
        } catch (err) {
            console.error("Fetch Media Error:", err);
            toast.error("Failed to load media library.");
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const formatBytes = (bytes) => {
        if (!bytes) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const handleCopyUrl = async (url) => {
        await navigator.clipboard.writeText(url);
        toast.success("Image URL copied to clipboard.");
    };

    const handleCopyHtml = async (file) => {
        const altText = (altDrafts[file.filename] || file.alt_text || file.filename).replace(/"/g, "&quot;");
        await navigator.clipboard.writeText(`<img src="${file.url}" alt="${altText}" decoding="async"  loading="lazy" />`);
        toast.success("Image HTML copied with alt text.");
    };

    const handleUploadFieldChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "file") {
            setUploadForm((prev) => ({ ...prev, file: files?.[0] || null }));
            return;
        }
        setUploadForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadSubmit = async (event) => {
        event.preventDefault();

        if (!uploadForm.file) {
            toast.error("Please choose an image to upload.");
            return;
        }

        if (!uploadForm.file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }

        if (!uploadForm.alt_text.trim()) {
            toast.error("Alt text is mandatory before upload.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("image", uploadForm.file);
        formData.append("alt_text", uploadForm.alt_text.trim());

        try {
            const response = await api.post("/cms-parent-child/upload-image", formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 201 || response.status === 200) {
                toast.success("Image uploaded to media library.");
                setUploadForm(initialUploadForm);
                setUploadFieldKey((prev) => prev + 1);
                await fetchMedia();
            }
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error(error.response?.data?.message || "Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const handleAltDraftChange = (filename, value) => {
        setAltDrafts((prev) => ({
            ...prev,
            [filename]: value,
        }));
    };

    const handleSaveAlt = async (filename) => {
        const altText = altDrafts[filename]?.trim();

        if (!altText) {
            toast.error("Alt text is mandatory.");
            return;
        }

        setSavingAltFor(filename);

        try {
            const response = await api.patch(
                `/cms-parent-child/media-library/${encodeURIComponent(filename)}/alt`,
                { alt_text: altText },
                {
                    headers: { Authorization: `Bearer ${getToken()}` }
                }
            );

            if (response.status === 200) {
                toast.success("Alt text updated.");
                await fetchMedia();
            }
        } catch (error) {
            console.error("Update Alt Error:", error);
            toast.error(error.response?.data?.message || "Failed to update alt text.");
        } finally {
            setSavingAltFor("");
        }
    };

    const handleReplaceImage = async (event, fileRecord) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            event.target.value = null;
            return;
        }

        const activeAltText = (altDrafts[fileRecord.filename] || fileRecord.alt_text || "").trim();
        if (!activeAltText) {
            toast.error("Add alt text before replacing the image.");
            event.target.value = null;
            return;
        }

        if (window.confirm(`Replace "${fileRecord.filename}" everywhere it is used? The public URL will stay the same.`)) {
            setUploading(true);

            const formData = new FormData();
            formData.append("image", file);
            formData.append("alt_text", activeAltText);

            try {
                const response = await api.post(
                    `/cms-parent-child/replace-image/${encodeURIComponent(fileRecord.filename)}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            "Content-Type": "multipart/form-data",
                        }
                    }
                );

                if (response.status === 201 || response.status === 200) {
                    toast.success("Image replaced. Existing URLs will keep working.");
                    await fetchMedia();
                }
            } catch (error) {
                console.error("Replacement Error:", error);
                toast.error(error.response?.data?.message || "Failed to replace image.");
            } finally {
                setUploading(false);
                event.target.value = null;
            }
        } else {
            event.target.value = null;
        }
    };

    const filteredMedia = mediaFiles.filter((file) => {
        const searchValue = searchTerm.trim().toLowerCase();
        if (!searchValue) return true;

        return (
            file.filename?.toLowerCase().includes(searchValue) ||
            file.alt_text?.toLowerCase().includes(searchValue)
        );
    });

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5">
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body p-4">
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 border-bottom pb-3">
                            <div>
                                <h1 className="h3 mb-1 text-gray-800">Media Library</h1>
                                <p className="text-muted mb-0 small">
                                    Upload reusable images, keep alt text mandatory, and replace files without changing live URLs.
                                </p>
                            </div>
                            <span className="badge bg-primary fs-6">{mediaFiles.length} Files</span>
                        </div>

                        <form onSubmit={handleUploadSubmit} className="row g-3 align-items-end">
                            <div className="col-lg-4 col-md-12">
                                <label className="form-label fw-semibold">Upload Image</label>
                                <input
                                    key={uploadFieldKey}
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    accept="image/*"
                                    onChange={handleUploadFieldChange}
                                    required
                                />
                            </div>
                            <div className="col-lg-5 col-md-8">
                                <label className="form-label fw-semibold">Alt Text</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="alt_text"
                                    placeholder="Describe the image for SEO and accessibility"
                                    value={uploadForm.alt_text}
                                    onChange={handleUploadFieldChange}
                                    required
                                />
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={uploading}
                                >
                                    {uploading ? "Uploading..." : "Upload to Library"}
                                </button>
                            </div>
                        </form>

                        <div className="alert alert-light border mt-4 mb-0 small">
                            Replacement keeps the same URL active, but use the same file format when swapping assets so browser delivery stays correct.
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <div className="row g-3 align-items-center mb-4">
                            <div className="col-md-6">
                                <h2 className="h5 mb-0">Library Assets</h2>
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by filename or alt text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {filteredMedia.length > 0 ? filteredMedia.map((file, index) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={`${file.filename}-${index}`}>
                                        <div className="card h-100 shadow-sm border-light position-relative overflow-hidden group-hover-effect">
                                            <div
                                                className="bg-light d-flex align-items-center justify-content-center p-2"
                                                style={{ height: "180px", borderBottom: "1px solid #f0f0f0" }}
                                            >
                                                <img
                                                    src={file.url}
                                                    alt={altDrafts[file.filename] || file.alt_text || file.filename}
                                                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                                                decoding="async"  loading="lazy" />
                                            </div>

                                            <div className="card-body p-3 d-flex flex-column">
                                                <h6 className="card-title text-truncate mb-1" title={file.filename}>
                                                    {file.filename}
                                                </h6>
                                                <div className="d-flex justify-content-between text-muted small mb-3">
                                                    <span>{formatBytes(file.size_bytes)}</span>
                                                    <span>{new Date(file.updated_at || file.created_at).toLocaleDateString()}</span>
                                                </div>

                                                <label className="form-label small fw-semibold">Alt Text</label>
                                                <textarea
                                                    className="form-control form-control-sm mb-3"
                                                    rows="3"
                                                    value={altDrafts[file.filename] || ""}
                                                    onChange={(event) => handleAltDraftChange(file.filename, event.target.value)}
                                                    placeholder="Describe this image"
                                                />

                                                <div className="d-grid gap-2 mt-auto">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleSaveAlt(file.filename)}
                                                        disabled={savingAltFor === file.filename}
                                                    >
                                                        {savingAltFor === file.filename ? "Saving..." : "Save Alt Text"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handleCopyUrl(file.url)}
                                                    >
                                                        Copy URL
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-dark"
                                                        onClick={() => handleCopyHtml(file)}
                                                    >
                                                        Copy HTML
                                                    </button>

                                                    <input
                                                        type="file"
                                                        id={`replace-${index}`}
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={(event) => handleReplaceImage(event, file)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => document.getElementById(`replace-${index}`).click()}
                                                    >
                                                        Replace Image
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-12 text-center py-5 text-muted">
                                        <h4>No media files found.</h4>
                                        <p>Upload a new image above or adjust your search.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .group-hover-effect:hover {
                    transform: translateY(-3px);
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                }
            ` }} />
        </AuthMainLayout>
    );
};

export default MediaLibrary;
