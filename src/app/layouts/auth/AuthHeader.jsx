import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../../store/slices/authSlice';
// import "../../globals.css";
import { FaBars } from 'react-icons/fa6';

const AuthHeader = ({setIsSidebarOpen}) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const handleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return (
        <>
            <div className="shadow header_wrapper sticky-header">
                <div className="px-3 container-fluid px-lg-5">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                <img src="/images/iconsHC.png" width={60} height={60} alt="hc-logo" />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {isLoggedIn && (
                                <>
                                    <button className="btn border-none d-lg-none" onClick={handleSidebar}>
                                        <FaBars className="fs-3 mt-1" />
                                    </button>
                                </>
                            )}
                           
                            <div
                                className="collapse navbar-collapse d-flex justify-content-end"
                                id="navbarSupportedContent"
                            >
                                <ul className="mb-2 ms-auto me-0 navbar-nav mb-lg-0">
                                    {isLoggedIn ? (
                                        <>
                                            {/* <li className="nav_item">
                                                <a className="nav-link" aria-current="page" href="/">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="nav_item">
                                                <a className="nav-link" aria-current="page" href="/dashboard">
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li className="nav_item">
                                                <a className="nav-link" aria-current="page" href="/profile">
                                                    Profile
                                                </a>
                                            </li>
                                            <li className="nav_item">
                                                <button
                                                    className="nav-link btn btn-link"
                                                    aria-current="page"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </li> */}
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav_item">
                                                <a className="nav-link" aria-current="page" href="/login">
                                                    Login
                                                </a>
                                            </li>
                                            <li className="nav_item">
                                                <a className="nav-link" aria-current="page" href="/register">
                                                    Register
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <style jsx>{`
                .sticky-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000; /* Ensure the header stays above other content */
                    background-color: white; /* Match the background color to the header */
                }
            `}</style>
        </>
    );
};

export default AuthHeader;
