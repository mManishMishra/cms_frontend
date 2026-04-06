"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import { useHasMounted } from "../../utils/useHasMounted";

const Profile = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const router = useRouter();
    const hasMounted = useHasMounted();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    const userId = user?.id;
    const accessToken = user?.token;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (hasMounted && !isLoggedIn) {
            router.push("/login");
        } else {
            fetchUserData();
        }
    }, [isLoggedIn, router, hasMounted]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const { createdAt, updatedAt, ...dataToUpdate } = formData; // Exclude these fields

        try {
            const response = await api.patch(`/users/${userId}`,
                dataToUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };


    if (!hasMounted || loading) return <p>Loading...</p>;

    return (
        <AuthMainLayout>
            <div className="profile-page-container">
                <div className="profile-left-card">
                    <FaUserCircle size={150} className="user-icon" />
                    <h2 className="user-name">
                        {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="user-role">{formData.role}</p>
                    <button className="profile-save-btn" onClick={handleSave}>
                        Save Profile
                    </button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>

                <div className="profile-right-content">
                    <ProfileSection title="Basic Information">
                        {renderInputField("username", "Username", formData, handleInputChange)}
                        {renderInputField("email", "Email", formData, handleInputChange)}
                        {renderInputField("phoneNumber", "Phone", formData, handleInputChange)}
                        {renderInputField("alternatePhoneNumber", "Alternate Phone", formData, handleInputChange)}
                        {renderInputField("gender", "Gender", formData, handleInputChange)}
                        {renderInputField("dateOfBirth", "Date of Birth", formData, handleInputChange, "date")}
                    </ProfileSection>

                    <ProfileSection title="Address Information">
                        {renderInputField("address", "Address", formData, handleInputChange)}
                        {renderInputField("city", "City", formData, handleInputChange)}
                        {renderInputField("state", "State", formData, handleInputChange)}
                        {renderInputField("country", "Country", formData, handleInputChange)}
                        {renderInputField("postalCode", "Postal Code", formData, handleInputChange)}
                    </ProfileSection>

                    <ProfileSection title="Preferences">
                        {renderInputField("preferredCurrency", "Preferred Currency", formData, handleInputChange)}
                        {renderInputField("languagePreference", "Language Preference", formData, handleInputChange)}
                        {renderInputField(
                            "favoriteProperties",
                            "Favorite Properties",
                            formData,
                            handleInputChange
                        )}
                    </ProfileSection>
                </div>
            </div>

            <style jsx>{`
                .profile-page-container {
                    display: flex;
                    gap: 30px;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 40px;
                    background: linear-gradient(to right, #fff, #f8f9fa);
                    min-height: 100vh;
                }

                .profile-left-card {
                    width: 30%;
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    text-align: center;
                }

                .user-icon {
                    color: #fd7e14;
                    margin-bottom: 10px;
                }

                .user-name {
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #333;
                }

                .user-role {
                    font-size: 14px;
                    color: #777;
                    margin-bottom: 20px;
                }

                .profile-save-btn {
                    background-color: #fd7e14;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 16px;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .profile-save-btn:hover {
                    background-color: white;
                    color: #fd7e14;
                    border: 2px solid #fd7e14;
                }

                .profile-right-content {
                    width: 65%;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .profile-section {
                    background-color: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                    padding: 20px;
                    margin-bottom: 20px;
                }

                .profile-section h5 {
                    color: #fd7e14;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                .form-control {
                    border-radius: 12px;
                    border: 1px solid #eaeaea;
                    padding: 15px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                }

                .form-control:focus {
                    border-color: #fd7e14;
                    outline: none;
                }

                .success-message {
                    margin-top: 10px;
                    color: green;
                    font-weight: 500;
                }
            `}</style>
        </AuthMainLayout>
    );
};

const ProfileSection = ({ title, children }) => (
    <div className="profile-section">
        <h5>{title}</h5>
        <div className="row">{children}</div>
    </div>
);

const renderInputField = (name, label, formData, handleInputChange, type = "text") => (
    <div className="mb-3 col-md-6">
        <input
            type={type}
            className="form-control"
            name={name}
            placeholder={label}
            value={formData[name] || ""}
            onChange={handleInputChange}
        />
    </div>
);

export default Profile;
