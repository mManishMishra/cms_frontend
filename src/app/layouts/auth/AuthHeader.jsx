import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../../store/slices/authSlice';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const AuthHeader = ({ setIsSidebarOpen }) => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    // 🧠 Generate initials (keep it simple and reliable)
    const getInitials = (name = "") => {
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0]?.toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
        <header className="cms-header shadow-sm border-bottom bg-white d-flex align-items-center justify-content-between px-4">
            
            {/* LEFT: Logo */}
            <div className="d-flex align-items-center">
                <a href="/dashboard" className="text-decoration-none d-flex align-items-center gap-2">
                    <img 
                        src="/images/iconsHC.png" 
                        style={{ height: "45px", objectFit: "contain" }} 
                        alt="hc-logo" 
                    />
                    <span className="fs-5 fw-bold text-dark d-none d-md-block ms-2 border-start ps-3">
                        CMS Dashboard
                    </span>
                </a>
            </div>

            {/* RIGHT: User Section */}
            {isLoggedIn && (
                <div className="d-flex align-items-center gap-3">
                    
                    {/* Mobile Hamburger */}
                    <button 
                        className="btn btn-light d-md-none border" 
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                    >
                        <FaBars />
                    </button>

                    {/* Desktop Actions */}
                    <div className="d-none d-md-flex align-items-center gap-3">
                        
                        {/* 👤 Profile Block */}
                        <div className="d-flex align-items-center gap-2">
                            
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="profile"
                                    className="rounded-circle"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                <div className="initials-circle">
                                    {getInitials(user?.firstName || "Admin")}
                                </div>
                            )}

                            <span className="text-muted fw-medium">
                                {`${user?.firstName} ${user?.lastName}`|| "Admin"}
                            </span>
                        </div>

                        {/* 🚪 Logout */}
                        <button 
                            className="btn btn-danger btn-sm fw-bold d-flex align-items-center gap-2 px-3 py-2 shadow-sm" 
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Styles */}
            <style jsx>{`
                .cms-header {
                    position: sticky;
                    top: 0;
                    height: 70px;
                    z-index: 1050;
                }

                .initials-circle {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: #0d6efd;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                }
            `}</style>
        </header>
    );
};

export default AuthHeader;