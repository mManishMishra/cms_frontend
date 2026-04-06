"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const PopupManager = () => {
    // Robust Auth Token Retrieval
    const user = useSelector((state) => state.auth?.user);
    const authToken = user?.token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const initialFormState = { 
        target_url: "", is_enabled: true, show_mobile: true, show_desktop: true, 
        trigger_type: "time", delay_seconds: 12, scroll_percentage: 50, 
        heading: "Let's Connect", sub_heading: "Get Your Dream Home Interior. Let Our experts help you", 
        cta_text: "SEND",
        lead_form_name: "General Popup Lead Form",
        redirect_url: "/thank-you",
        success_message: "Form submitted successfully!"
    };
    
    const [formData, setFormData] = useState(initialFormState);

    const fetchRules = async () => {
        try {
            const res = await api.get("/popup-rules");
            setRules(res.data || []);
        } catch (err) {
            toast.error("Error fetching rules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRules(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!authToken) {
            toast.error("Authentication Error: No token found. Please log in again.");
            return;
        }

        try {
            await api.post("/popup-rules", formData, { 
                headers: { Authorization: `Bearer ${authToken}` } 
            });
            toast.success("Popup rule saved successfully!");
            setFormData(initialFormState);
            fetchRules();
            document.getElementById("ruleModalClose").click();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save rule.");
        }
    };

    const deleteRule = async (id) => {
        if (!authToken) {
            toast.error("Authentication Error: No token found. Please log in again.");
            return;
        }

        if (window.confirm("Delete this rule?")) {
            try {
                await api.delete(`/popup-rules/${id}`, { 
                    headers: { Authorization: `Bearer ${authToken}` } 
                });
                toast.success("Rule deleted.");
                fetchRules();
            } catch (error) { 
                toast.error(error.response?.data?.message || "Failed to delete."); 
            }
        }
    };

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h3 mb-0 text-gray-800">Popup Management Rules</h1>
                                <small className="text-muted">Control popups per page. Use <b>*</b> as a Global fallback rule.</small>
                            </div>
                            <button onClick={() => setFormData(initialFormState)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ruleModal">+ Add New Rule</button>
                        </div>
                        
                        {loading ? <div className="text-center py-5">Loading...</div> : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle border">
                                    <thead className="table-light">
                                        <tr><th>Target URL</th><th>Lead Form</th><th>Status</th><th>Device Visibility</th><th>Trigger</th><th>CTA</th><th>Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        {rules.map((rule) => (
                                            <tr key={rule.id}>
                                                <td className="fw-bold">{rule.target_url === '*' ? 'Global (*)' : rule.target_url}</td>
                                                <td>
                                                    <div className="fw-semibold">{rule.lead_form_name || "General Popup Lead Form"}</div>
                                                    <small className="text-muted">{rule.redirect_url || "/thank-you"}</small>
                                                </td>
                                                <td><span className={`badge ${rule.is_enabled ? 'bg-success' : 'bg-danger'}`}>{rule.is_enabled ? 'Active' : 'Disabled'}</span></td>
                                                <td>
                                                    <span className={`badge me-2 ${rule.show_mobile ? 'bg-info text-dark' : 'bg-secondary'}`}>Mobile</span>
                                                    <span className={`badge ${rule.show_desktop ? 'bg-info text-dark' : 'bg-secondary'}`}>Desktop</span>
                                                </td>
                                                <td className="text-capitalize">
                                                    {rule.trigger_type === 'time' ? `${rule.delay_seconds}s Delay` : rule.trigger_type === 'scroll' ? `${rule.scroll_percentage}% Scroll` : 'Exit Intent'}
                                                </td>
                                                <td>{rule.cta_text || "SEND"}</td>
                                                <td>
                                                    <button onClick={() => setFormData({ ...initialFormState, ...rule })} className="btn btn-sm btn-primary me-2" data-bs-toggle="modal" data-bs-target="#ruleModal">Edit</button>
                                                    <button onClick={() => deleteRule(rule.id)} className="btn btn-sm btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {rules.length === 0 && (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-muted">No rules found. Add a global fallback rule (*) to get started.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rule Configuration Modal */}
            <div className="modal fade" id="ruleModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-dark text-white py-3">
                            <h5 className="modal-title fw-bold">Popup Rule Configuration</h5>
                            <button type="button" id="ruleModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body row g-3 p-4 bg-light">
                                <div className="col-md-12">
                                    <label className="fw-bold">Target Page URL *</label>
                                    <input type="text" className="form-control" name="target_url" value={formData.target_url} onChange={handleChange} placeholder="e.g. /home or /about-us or *" required />
                                    <small className="text-muted">Use <b>*</b> for all pages without a specific rule.</small>
                                </div>
                                
                                <div className="col-md-12 mt-4"><h6 className="fw-bold border-bottom pb-2 text-primary">Popup Triggers</h6></div>

                                <div className="col-md-4">
                                    <label className="fw-bold">Trigger Event</label>
                                    <select className="form-select" name="trigger_type" value={formData.trigger_type} onChange={handleChange}>
                                        <option value="time">Time Delay</option>
                                        <option value="scroll">Scroll Depth</option>
                                        <option value="exit">Exit Intent (Mouse Leave)</option>
                                    </select>
                                </div>

                                {formData.trigger_type === 'time' && (
                                    <div className="col-md-4">
                                        <label className="fw-bold">Delay (Seconds)</label>
                                        <input type="number" className="form-control" name="delay_seconds" value={formData.delay_seconds} onChange={handleChange} required />
                                    </div>
                                )}

                                {formData.trigger_type === 'scroll' && (
                                    <div className="col-md-4">
                                        <label className="fw-bold">Scroll Percentage (%)</label>
                                        <input type="number" className="form-control" name="scroll_percentage" value={formData.scroll_percentage} onChange={handleChange} required />
                                    </div>
                                )}

                                {formData.trigger_type === 'exit' && (
                                    <>
                                        <div className="col-md-8 pt-4">
                                            <span className="text-muted small"><i className="bi bi-info-circle me-1"></i>Popup will trigger when the user moves their mouse up to close the browser tab. On mobile, exit intent falls back to the delay below.</span>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="fw-bold">Mobile Fallback Delay (Seconds)</label>
                                            <input type="number" className="form-control" name="delay_seconds" value={formData.delay_seconds} onChange={handleChange} required />
                                        </div>
                                    </>
                                )}

                                <div className="col-md-12 mt-4"><h6 className="fw-bold border-bottom pb-2 text-primary">Visibility Controls</h6></div>
                                
                                <div className="col-md-4">
                                    <div className="form-check form-switch fs-5">
                                        <input className="form-check-input ms-0 me-2" style={{cursor:'pointer'}} type="checkbox" name="is_enabled" id="isEnabledToggle" checked={formData.is_enabled} onChange={handleChange} />
                                        <label className="form-check-label fs-6 mt-1" htmlFor="isEnabledToggle" style={{cursor:'pointer'}}>Rule Enabled</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check form-switch fs-5">
                                        <input className="form-check-input ms-0 me-2" style={{cursor:'pointer'}} type="checkbox" name="show_desktop" id="isDesktopToggle" checked={formData.show_desktop} onChange={handleChange} />
                                        <label className="form-check-label fs-6 mt-1" htmlFor="isDesktopToggle" style={{cursor:'pointer'}}>Show on Desktop</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check form-switch fs-5">
                                        <input className="form-check-input ms-0 me-2" style={{cursor:'pointer'}} type="checkbox" name="show_mobile" id="isMobileToggle" checked={formData.show_mobile} onChange={handleChange} />
                                        <label className="form-check-label fs-6 mt-1" htmlFor="isMobileToggle" style={{cursor:'pointer'}}>Show on Mobile</label>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-4"><h6 className="fw-bold border-bottom pb-2 text-primary">Text & CTA Customization</h6></div>

                                <div className="col-md-6 mt-2">
                                    <label className="fw-bold">Lead Form Name</label>
                                    <input type="text" className="form-control" name="lead_form_name" value={formData.lead_form_name} onChange={handleChange} required />
                                    <small className="text-muted">Used in lead reporting and exports.</small>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label className="fw-bold">Redirect URL After Submit</label>
                                    <input type="text" className="form-control" name="redirect_url" value={formData.redirect_url} onChange={handleChange} placeholder="/thank-you" required />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label className="fw-bold">Popup Heading</label>
                                    <input type="text" className="form-control" name="heading" value={formData.heading} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label className="fw-bold">Submit Button (CTA) Text</label>
                                    <input type="text" className="form-control" name="cta_text" value={formData.cta_text} onChange={handleChange} required />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="fw-bold">Popup Sub-heading</label>
                                    <textarea className="form-control" name="sub_heading" value={formData.sub_heading} onChange={handleChange} rows="2" required></textarea>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="fw-bold">Success Message</label>
                                    <input type="text" className="form-control" name="success_message" value={formData.success_message} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer bg-white border-top">
                                <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary px-5 fw-bold">Save Rule</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default PopupManager;
