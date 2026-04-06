// src/app/register/page.tsx

"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import vectorArt from "../../../public/assets/register.svg";
import { registerStart, loginSuccess, registerSuccess, registerFailure } from "../../store/slices/authSlice";
import { useHasMounted } from "../../utils/useHasMounted";
import { useSelector } from "react-redux";
import "../../../public/style/login.css";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterUrl = "https://high.creation.dev.api.crudbyte.com/auth/register";
const CheckExistenceUrl = "https://high.creation.dev.api.crudbyte.com/users/check/exists";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const hasMounted = useHasMounted();

    const { isLoggedIn } = useSelector((state) => state.auth);

    const checkIfUserExists = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (username) queryParams.append("username", username);
            if (email) queryParams.append("email", email);
            if (phoneNumber) queryParams.append("phoneNumber", phoneNumber);

            const response = await fetch(`${CheckExistenceUrl}?${queryParams.toString()}`);
            const result = await response.json();
            return result.exists || false;
        } catch (error) {
            setError("Failed to check existing users.");
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setRegistrationSuccess(false);
        setLoading(true);
        dispatch(registerStart());

        const userExists = await checkIfUserExists();

        if (userExists) {
            setError("User with this username, email, or phone number already exists.");
            dispatch(registerFailure("User already exists."));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(RegisterUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email, firstName, lastName, dateOfBirth, gender, phoneNumber }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                dispatch(registerSuccess(data.user));
                setRegistrationSuccess(true);
                dispatch(loginSuccess({ ...data.user, token: data.accessToken }));
                router.push("/dashboard");
            } else {
                setError(data.message || "Failed to register");
                dispatch(registerFailure(data.message || "Failed to register"));
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
            dispatch(registerFailure("Something went wrong. Please try again."));
        }
    };

    if (!hasMounted) return null;

    if (isLoggedIn) {
        router.push("/dashboard");
        return null;
    }

    return (
        <div className="container-fluid vh-100 d-flex">
            <div className="login-form-section">
                <div className="login-card">
                    <div className="form_card w-100">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h5 className="pb-3">Register</h5>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="userName"
                                    id="userName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="User Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    placeholder="Date of Birth"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    name="gender"
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div className="mt-3 mb-3 login-password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
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

                            {error && <p className="login-error">{error}</p>}
                            <div className="mb-4 form-check d-flex ps-1">
                                <button type="submit" className="login-button btn btn-warning" disabled={loading}>
                                    {loading ? "Registering user..." : "Register"}
                                </button>
                            </div>
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

export default RegisterPage;
