"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const GlobalSettings = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        phone: "", email: "", address: "", 
        facebook_url: "", instagram_url: "", 
        twitter_url: "", linkedin_url: "", pinterest_url: "", youtube_url: ""
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get("/site-settings");
                if (response.data) setFormData(response.data);
            } catch (err) {
                toast.error("Failed to load settings.");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = authToken || localStorage.getItem("token");
            await api.patch("/site-settings", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Global Settings successfully updated!");
        } catch (error) {
            toast.error("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-dark text-white py-3">
                        <h4 className="mb-0">Global Site Settings</h4>
                        <small>This information automatically updates your SEO Schemas and Social Links across the site.</small>
                    </div>
                    <div className="card-body p-4">
                        {loading ? <div className="text-center py-5">Loading...</div> : (
                            <form onSubmit={handleSave} className="row g-4">
                                <div className="col-md-12 mb-2"><h5 className="border-bottom pb-2 text-primary">Contact Details</h5></div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Company Phone Number</label>
                                    <input type="text" className="form-control" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="+91-..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Company Email</label>
                                    <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="info@hcinterior.in" />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label fw-bold">Physical Address (Used for Google Local SEO)</label>
                                    <textarea className="form-control" name="address" rows="2" value={formData.address || ''} onChange={handleInputChange} placeholder="Street, City, State, ZIP"></textarea>
                                </div>

                                <div className="col-md-12 mt-4 mb-2"><h5 className="border-bottom pb-2 text-primary">Social Media Links</h5></div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Facebook URL</label>
                                    <input type="url" className="form-control" name="facebook_url" value={formData.facebook_url || ''} onChange={handleInputChange} placeholder="https://facebook.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Instagram URL</label>
                                    <input type="url" className="form-control" name="instagram_url" value={formData.instagram_url || ''} onChange={handleInputChange} placeholder="https://instagram.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">X (Twitter) URL</label>
                                    <input type="url" className="form-control" name="twitter_url" value={formData.twitter_url || ''} onChange={handleInputChange} placeholder="https://x.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">LinkedIn URL</label>
                                    <input type="url" className="form-control" name="linkedin_url" value={formData.linkedin_url || ''} onChange={handleInputChange} placeholder="https://linkedin.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Pinterest URL</label>
                                    <input type="url" className="form-control" name="pinterest_url" value={formData.pinterest_url || ''} onChange={handleInputChange} placeholder="https://pinterest.com/..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">YouTube URL</label>
                                    <input type="url" className="form-control" name="youtube_url" value={formData.youtube_url || ''} onChange={handleInputChange} placeholder="https://youtube.com/..." />
                                </div>

                                <div className="col-12 mt-4 pt-3 border-top text-end">
                                    <button type="submit" className="btn btn-primary px-5 fw-bold" disabled={saving}>
                                        {saving ? "Saving..." : "Save Global Settings"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default GlobalSettings;