"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";

const initialFormState = { 
    firstName: "", 
    lastName: "", 
    username: "",
    email: "", 
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    password: "", 
    role: "Editor" 
};

const TeamManagement = () => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const authToken = useSelector((state) => state.auth.user?.token); 
    const isAdmin = user?.role?.toLowerCase() === "admin";

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (user && !isAdmin) {
            toast.error("Unauthorized Access. Only Admins can manage editors.");
            router.push("/dashboard");
        }
    }, [user, isAdmin, router]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const token = authToken || (typeof window !== "undefined" ? localStorage.getItem("token") : "");
            const response = await api.get("/cms-users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsersList(response.data || []);
        } catch (err) {
            toast.error("Failed to load CMS users.");
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        if (isAdmin) fetchUsers();
    }, [isAdmin, fetchUsers]);

    const handleInputChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            const response = await api.post("/cms-users", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsersList([response.data, ...usersList]);
            toast.success(`User ${formData.username} created successfully!`);
            setFormData(initialFormState);
            document.getElementById('createEditorModalClose').click();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create user.");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = authToken || localStorage.getItem("token");
            await api.patch(`/cms-users/${userId}/role`, { role: newRole }, { headers: { Authorization: `Bearer ${token}` } });
            setUsersList((prev) => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            toast.success(`User role updated to ${newRole}`);
        } catch (error) { toast.error("Failed to update role."); }
    };

    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
        try {
            const token = authToken || localStorage.getItem("token");
            await api.patch(`/cms-users/${userId}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
            setUsersList((prev) => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
            toast.info(`User access ${newStatus.toLowerCase()}.`);
        } catch (error) { toast.error("Failed to update status."); }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to permanently delete ${userName}?`)) {
            try {
                const token = authToken || localStorage.getItem("token");
                await api.delete(`/cms-users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
                setUsersList((prev) => prev.filter(u => u.id !== userId));
                toast.success(`${userName} has been deleted.`);
            } catch (error) { toast.error("Failed to delete user."); }
        }
    };

    if (!isAdmin) return null;

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="h3 mb-0 text-gray-800 fw-bold">Team Management</h1>
                        <p className="text-muted small mt-1 mb-0">Control system access and permissions for your team.</p>
                    </div>
                    <button className="btn btn-primary px-4 shadow-sm fw-semibold" data-bs-toggle="modal" data-bs-target="#createEditorModal">
                        <i className="bi bi-person-plus-fill me-2"></i> Add Team Member
                    </button>
                </div>

                {/* Table Card */}
                <div className="card shadow-sm border-0 rounded-3">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light text-uppercase small text-muted">
                                        <tr>
                                            <th className="ps-4 py-3">Team Member</th>
                                            <th className="py-3">Contact Info</th>
                                            <th className="py-3">System Role</th>
                                            <th className="py-3">Status</th>
                                            <th className="text-end pe-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.length > 0 ? usersList.map((usr) => (
                                            <tr key={usr.id}>
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center py-2">
                                                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center me-3 shadow-sm" style={{ width: "45px", height: "45px", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                            {usr.firstName?.charAt(0) || "U"}{usr.lastName?.charAt(0) || ""}
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold text-dark">{usr.firstName} {usr.lastName}</div>
                                                            <div className="small text-muted">@{usr.username}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-dark small"><i className="bi bi-envelope me-1 text-muted"></i> {usr.email}</div>
                                                    <div className="text-muted small"><i className="bi bi-telephone me-1"></i> {usr.phoneNumber || 'N/A'}</div>
                                                </td>
                                                <td>
                                                    <select 
                                                        className="form-select form-select-sm w-auto fw-bold text-dark bg-light border-0 shadow-sm" 
                                                        value={usr.role} 
                                                        onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                                                        disabled={usr.id === user?.id}
                                                    >
                                                        <option value="Editor">Editor</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <span className={`badge rounded-pill px-3 py-2 fw-normal shadow-sm ${usr.status === 'Active' ? 'bg-success bg-opacity-10 text-success border border-success' : 'bg-danger bg-opacity-10 text-danger border border-danger'}`}>
                                                        {usr.status === 'Active' ? <><i className="bi bi-check-circle-fill me-1"></i> Active</> : <><i className="bi bi-x-circle-fill me-1"></i> Suspended</>}
                                                    </span>
                                                </td>
                                                <td className="text-end pe-4">
    {usr.id !== user?.id && (
        <div className="d-flex justify-content-end gap-2">
            <button 
                onClick={() => handleStatusToggle(usr.id, usr.status || 'Active')} 
                className={`btn btn-sm fw-bold shadow-sm ${usr.status === 'Active' ? 'btn-warning text-dark' : 'btn-success'}`}
            >
                {usr.status === 'Active' ? (
                    <><i className="bi bi-pause-circle me-1"></i> Suspend Access</>
                ) : (
                    <><i className="bi bi-play-circle me-1"></i> Restore Access</>
                )}
            </button>
            
            <button 
                onClick={() => handleDeleteUser(usr.id, usr.firstName)} 
                className="btn btn-sm btn-danger fw-bold shadow-sm"
            >
                <i className="bi bi-trash3 me-1"></i> Delete User
            </button>
        </div>
    )}
</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" className="text-center py-5 text-muted">No team members found. Click {"Add Team Member"} to get started.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- PREMIUM CREATE EDITOR MODAL --- */}
            <div className="modal fade" id="createEditorModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white py-3 border-0">
                            <h5 className="modal-title fw-bold"><i className="bi bi-person-badge me-2"></i> Add New Team Member</h5>
                            <button type="button" id="createEditorModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleCreateUser}>
                            <div className="modal-body p-4 bg-light">
                                <div className="row g-3 bg-white p-4 rounded-3 shadow-sm border">
                                    
                                    <div className="col-12 mb-2 pb-2 border-bottom">
                                        <h6 className="fw-bold text-primary mb-0">Personal Information</h6>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">First Name *</label>
                                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="e.g. John" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Last Name *</label>
                                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="e.g. Doe" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Date of Birth</label>
                                        <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Gender</label>
                                        <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted">Phone Number</label>
                                        <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+91..." required />
                                    </div>

                                    <div className="col-12 mt-4 mb-2 pb-2 border-bottom">
                                        <h6 className="fw-bold text-primary mb-0">Account & Security</h6>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Unique Username *</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">@</span>
                                            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleInputChange} required placeholder="johndoe" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Corporate Email *</label>
                                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required placeholder="name@company.com" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">Initial Password *</label>
                                        <input type="text" className="form-control" name="password" value={formData.password} onChange={handleInputChange} placeholder="Assign a secure password" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted">System Role *</label>
                                        <select className="form-select bg-light fw-bold" name="role" value={formData.role} onChange={handleInputChange}>
                                            <option value="Editor">Editor (Content Management)</option>
                                            <option value="Admin">Admin (Full Control)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-white border-top-0 pt-0 pe-4 pb-4">
                                <button type="button" className="btn btn-light border px-4" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary px-5 fw-bold shadow-sm">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default TeamManagement;