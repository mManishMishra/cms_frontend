

"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import "../../../public/style/login.css";
import vectorArt from "../../../public/assets/login.svg";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { setCookie } from "cookies-next";
import { RootState } from "../../store/store";
import { useHasMounted } from "../../utils/useHasMounted";
import api from "@/utils/api";


// const LoginUrl = "http://hc-admin.shivankgautam.com/auth/login";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);
    const hasMounted = useHasMounted();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(loginStart());

        try {
            const response = await api.post("/auth/login", { email, password });

            const data = response.data;

            if (response.data) {
                if (data.accessToken && data.user) {
                    setCookie("authToken", data.accessToken, { path: "/" });
                    setCookie("authUser", JSON.stringify(data.user), { path: "/" });
                    dispatch(loginSuccess({ ...data.user, token: data.accessToken }));
                    router.push("/dashboard");
                } else {
                    dispatch(loginFailure("Invalid response format. Missing accessToken or user."));
                }
            } else {
                dispatch(loginFailure(data.message || "Failed to authenticate"));
            }
        } catch (error) {
            console.error("Login Error:", error);
            dispatch(loginFailure("Something went wrong. Please try again."));
        }
    };

    if (!hasMounted) return null;

    if (isLoggedIn) {
        router.push("/dashboard");
        return null;
    }

    return (
        <div className="login-container">
            {/* Left Section - Form */}
            <div className="login-form-section">
                <div className="login-card">
                    <div className="form_card w-100">
                        <form className="login-form"  onSubmit={handleSubmit}>
                            <h5 className="pb-3">Login</h5>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="mt-3 mb-3 login-password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control bol"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="login-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={24} />
                                    ) : (
                                        <AiOutlineEye size={24} />
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 form-check d-flex ps-1">
                            {error && <p className="login-error">{error}</p>}
                            </div>
                            <div className="mb-4 form-check d-flex ps-1">
                            <button type="submit" className="login-button btn btn-warning" disabled={loading}>
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                            </div>
                                {/* <a
                                    className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-end ms-auto forgot_text text-muted"
                                    href="/register"
                                >
                                    Create New Account
                                </a> */}
                        </form>
                    </div>
                    <p className="login-footer">&copy; 2024 High Creation. All rights reserved.</p>
                </div>
            </div>

            <div className="login-image-section">
                <img
                    src="/images/login_img.png"
                    className="w-100 object-fit-contain"
                    height={450}
                    alt=""
                />
            </div>
        </div>
    );
};

export default LoginPage;
