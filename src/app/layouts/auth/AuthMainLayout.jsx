"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13+
import { useSelector } from "react-redux";
import AuthFooter from "./AuthFooter";
import AuthHeader from "./AuthHeader";
import AuthSidebar from "./AuthSidebar";
import { useHasMounted } from "../../../utils/useHasMounted";

const AuthMainLayout = ({ children }) => {
    const hasMounted = useHasMounted(); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth); // ✅ Always call hooks at the top
    const router = useRouter();

    useEffect(() => {
        if (hasMounted && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router, hasMounted]);

    if (!hasMounted || !isLoggedIn) return null; // ✅ Moved outside of hooks to avoid breaking React rules

    return (
        <div className="page-container">
            <AuthHeader setIsSidebarOpen={setIsSidebarOpen} />
            <main>
                <section>
                    <div className="px-4 container-fluid">
                        <div className="row">
                            <div className={`col-md-3 d-md-block sidebar ${isSidebarOpen ? 'show' : 'collapse'} sticky-sidebar my_admin_sidebar_parent`}>
                                <AuthSidebar />
                            </div>
                            <div className="col-md-9 ms-sm-auto px-md-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AuthFooter />

            <style jsx>{`
                .sticky-sidebar {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    height: 100vh;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
};

export default AuthMainLayout;
