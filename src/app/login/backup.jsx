

"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import vectorArt from "../../../public/assets/login.svg";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { setCookie } from "cookies-next";
import { RootState } from "../../store/store";
import { useHasMounted } from "../../utils/useHasMounted";

const LoginUrl = "http://hc-admin.shivankgautam.com/auth/login";

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
            const response = await fetch(LoginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
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
                    <h2 className="login-title">Welcome Back!</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <label htmlFor="email" className="login-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="login-input"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="password" className="login-label">
                                Password
                            </label>
                            <div className="login-password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="login-input"
                                    id="password"
                                    placeholder="Enter your password"
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
                        </div>
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                    <p className="login-footer">&copy; 2024 High Creation. All rights reserved.</p>
                </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="login-image-section">
                <Image src={vectorArt} alt="Login Illustration" width={600} height={600} />
            </div>
        </div>
    );
};

export default LoginPage;
