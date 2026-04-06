"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import {
    getCmsAccess,
    getDeletePermissionMessage,
    getPublishWorkflowMessage,
} from "@/utils/cmsAccess";

const initialFormState = { old_url: "", new_url: "", status_code: 301, is_active: true };

const CmsRedirects = () => {
    const user = useSelector((state) => state.auth.user);
    const authToken = useSelector((state) => state.auth.authToken);
    const { canPublish, canDelete } = getCmsAccess(user);
    const [redirectsList, setRedirectsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ ...initialFormState, is_active: canPublish });
    const [selectedId, setSelectedId] = useState(null);
    const fileInputRef = useRef(null);

    const fetchRedirects = useCallback(async () => {
        setLoading(true);
        try {
            const token = authToken || (typeof window !== "undefined" ? localStorage.getItem("token") : "");
            const response = await api.get("/redirects", { headers: { Authorization: `Bearer ${token}` } });
            setRedirectsList(response.data || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error fetching redirects.");
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => { fetchRedirects(); }, [fetchRedirects]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            if (!canPublish && formData.is_active) {
                toast.info(getPublishWorkflowMessage("This redirect"));
            }
            const response = await api.post("/redirects", formData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 201 || response.status === 200) {
                fetchRedirects(); 
                toast.success("Redirect created successfully."); 
                document.getElementById('addRedirectModalClose').click();
            }
        } catch (error) { toast.error("Error creating redirect."); }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            if (!canPublish && formData.is_active) {
                toast.info(getPublishWorkflowMessage("This redirect"));
            }
            const response = await api.patch(`/redirects/${selectedId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                fetchRedirects(); 
                toast.success("Redirect updated."); 
                document.getElementById('editRedirectModalClose').click();
            }
        } catch (error) { toast.error("Error updating redirect."); }
    };

    const deleteHandler = async (id) => {
        if (!canDelete) {
            toast.error(getDeletePermissionMessage("this redirect"));
            return;
        }

        if (window.confirm("Are you sure you want to delete this redirect?")) {
            try {
                const token = authToken || localStorage.getItem("token");
                await api.delete(`/redirects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                fetchRedirects(); 
                toast.success("Redirect deleted."); 
            } catch (error) { toast.error("Failed to delete."); }
        }
    };

    const handleEditClick = (item) => {
        const nextActiveState = canPublish ? item.is_active !== false : false;
        if (!canPublish && item.is_active) {
            toast.info("Editing an active redirect will disable it until an admin republishes it.");
        }
        setSelectedId(item.id);
        setFormData({ old_url: item.old_url, new_url: item.new_url, status_code: item.status_code || 301, is_active: nextActiveState });
    };

    // --- BULK CSV UPLOAD LOGIC ---
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target.result;
            const lines = text.split('\n').map(line => line.trim()).filter(line => line);
            
            const bulkData = [];
            // Skip header if it exists (checks if first row contains 'old_url')
            const startIndex = lines[0].toLowerCase().includes('old_url') ? 1 : 0;

            for (let i = startIndex; i < lines.length; i++) {
                const [old_url, new_url, status_code] = lines[i].split(',');
                if (old_url && new_url) {
                    bulkData.push({
                        old_url: old_url.trim(),
                        new_url: new_url.trim(),
                        status_code: parseInt(status_code) || 301
                    });
                }
            }

            if(bulkData.length === 0) return toast.error("No valid data found in CSV.");

            try {
                const token = authToken || localStorage.getItem("token");
                if (!canPublish) {
                    toast.info("Bulk uploaded redirects will stay inactive until an admin publishes them.");
                }
                await api.post("/redirects/bulk", bulkData, { headers: { Authorization: `Bearer ${token}` } });
                fetchRedirects();
                toast.success(`${bulkData.length} redirects uploaded successfully!`);
            } catch (error) {
                toast.error("Error processing bulk upload.");
            }
            fileInputRef.current.value = ""; // Reset input
        };
        reader.readAsText(file);
    };

    const renderFormBody = () => (
            <div className="modal-body p-4 bg-light row g-3">
            <div className="col-md-12">
                <label className="form-label fw-bold">Old URL Path *</label>
                <input type="text" className="form-control" name="old_url" placeholder="e.g., /old-page-url" value={formData.old_url} onChange={handleInputChange} required />
            </div>
            <div className="col-md-12 mt-3">
                <label className="form-label fw-bold">New URL Destination *</label>
                <input type="text" className="form-control" name="new_url" placeholder="Type / for Home Page" value={formData.new_url} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6 mt-4">
                <label className="form-label fw-bold">Redirect Type</label>
                <select className="form-select" name="status_code" value={formData.status_code} onChange={handleInputChange}>
                    <option value={301}>301 (Permanent)</option>
                    <option value={302}>302 (Temporary)</option>
                </select>
            </div>
            <div className="col-md-6 mt-4 d-flex align-items-end">
                <div className="form-check form-switch fs-5">
                    <input className="form-check-input" type="checkbox" name="is_active" id="isActiveSwitch" checked={formData.is_active} onChange={handleInputChange} disabled={!canPublish} />
                    <label className="form-check-label ms-2 fs-6">{canPublish ? "Active" : "Admin Publish Required"}</label>
                </div>
            </div>
        </div>
    );

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5 px-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        {(!canPublish || !canDelete) && (
                            <div className="alert alert-info">
                                Editors can stage redirects here. Publish and delete access can be granted separately by an admin.
                            </div>
                        )}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h3 mb-1 text-gray-800">URL Redirects</h1>
                                <p className="text-muted small mb-0">Manage 301/302 routing and bulk uploads.</p>
                            </div>
                            <div className="d-flex gap-2">
                                <input type="file" accept=".csv" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
                                <button onClick={() => fileInputRef.current.click()} className="btn btn-outline-success shadow-sm px-3">
                                    <i className="bi bi-upload me-2"></i> Bulk Upload CSV
                                </button>
                                <button onClick={() => setFormData({ ...initialFormState, is_active: canPublish })} className="btn btn-primary px-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#addRedirectModal">
                                    + Add Redirect
                                </button>
                            </div>
                        </div>
                        
                        {loading && !redirectsList.length ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle border">
                                    <thead className="table-light"><tr><th>SN</th><th>Old URL</th><th>New URL</th><th>Code</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
                                    <tbody>
                                        {redirectsList.length > 0 ? redirectsList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="fw-bold text-muted">{index + 1}</td>
                                                <td className="text-danger fw-semibold">{item.old_url}</td>
                                                <td className="text-success fw-semibold">{item.new_url === '/' ? '/ (Home)' : item.new_url}</td>
                                                <td><span className={`badge ${item.status_code === 301 ? 'bg-primary' : 'bg-warning text-dark'}`}>{item.status_code}</span></td>
                                                <td>{item.is_active ? <span className="text-success fw-bold">Active</span> : <span className="text-muted">Disabled</span>}</td>
                                                <td className="text-end">
                                                    <button onClick={() => handleEditClick(item)} className="btn btn-sm btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#editRedirectModal">Edit</button>
                                                    {canDelete && <button className="btn btn-sm btn-outline-danger" onClick={() => deleteHandler(item.id)}>Delete</button>}
                                                </td>
                                            </tr>
                                        )) : (<tr><td colSpan="6" className="text-center py-4 text-muted">No redirects configured.</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals omitted for brevity, they remain identical to the previous implementation (with ID addRedirectModal and editRedirectModal) */}
            <div className="modal fade" id="addRedirectModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog"><div className="modal-content"><form onSubmit={handleAddSubmit}>{renderFormBody()}<div className="modal-footer"><button type="button" id="addRedirectModalClose" className="btn btn-secondary" data-bs-dismiss="modal">Close</button><button className="btn btn-primary" type="submit">Save</button></div></form></div></div>
            </div>
            <div className="modal fade" id="editRedirectModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog"><div className="modal-content"><form onSubmit={handleEditSubmit}>{renderFormBody()}<div className="modal-footer"><button type="button" id="editRedirectModalClose" className="btn btn-secondary" data-bs-dismiss="modal">Close</button><button className="btn btn-primary" type="submit">Update</button></div></form></div></div>
            </div>
        </AuthMainLayout>
    );
};

export default CmsRedirects;
