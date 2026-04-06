"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import { useHasMounted } from "../../utils/useHasMounted";
import {
    AiOutlineUser, AiOutlineFileText, AiOutlineFolderOpen,
    AiOutlineQuestionCircle, AiOutlinePhone, AiOutlineEnvironment,
    AiOutlineSetting, AiOutlineForm
} from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaCalculator, FaUsers } from "react-icons/fa6";

const Dashboard = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const router = useRouter();
    const hasMounted = useHasMounted();

    useEffect(() => {
        if (hasMounted && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router, hasMounted]);

    if (!hasMounted || !isLoggedIn) return null;

    const cards = [
        {
            title: "Blogs",
            link: "/cms/blog",
            description: "Create and manage blog posts.",
            color: "#ff914d",
            icon: <AiOutlineFileText size={40} />
        },
        {
            title: "Estimator Setup",
            link: "/estimator-for-home/setup",
            description: "Organize and maintain website content.",
            color: "#ff914d",
            icon: <FaCalculator size={40} />
        },
        {
            title: "Leads",
            link: "/leads",
            description: "Manage users and roles.",
            color: "#ff914d",
            icon: <FiUsers size={40} />
        },
        {
            title: "User Queries",
            link: "/user-queries",
            description: "Handle user queries and messages.",
            color: "#ff914d",
            icon: <AiOutlineQuestionCircle size={40} />
        },
        {
            title: "Job Application",
            link: "/job-application",
            description: "Handle user queries and messages.",
            color: "#ff914d",
            icon: <AiOutlinePhone size={40} />
        },
        {
            title: "Teams",
            link: "/cms/team",
            description: "Handle user queries and messages.",
            color: "#ff914d",
            icon: <FaUsers size={40} />
        }
    ];

    return (
        <AuthMainLayout>
            <div className="dashboard-container">
                <div className="dashboard-cards">
                    {cards.map((card, index) => (
                        <a
                            key={index}
                            href={card.link}
                            className="dashboard-card-link"
                            style={{ "--card-color": card.color }}
                        >
                            <div className="dashboard-card">
                                <div className="dashboard-card-icon">
                                    {card.icon}
                                </div>
                                <h5 className="text-white dashboard-card-title">{card.title}</h5>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .dashboard-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: auto;
                    background-color: #f8f9fa;
                }

                .dashboard-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    width: 80%;
                    max-width: 1200px;
                }

                .dashboard-card-link {
                    text-decoration: none;
                }

                .dashboard-card {
                    background-color: var(--card-color);
                    border-radius: 12px;
                    padding: 20px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: transform 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .dashboard-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                }

                .dashboard-card-icon {
                    margin-bottom: 10px;
                }

                .dashboard-card-title {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
            `}</style>
        </AuthMainLayout>
    );
};

export default Dashboard;
