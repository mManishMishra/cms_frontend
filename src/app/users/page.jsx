"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get authToken from Redux store
    const authToken = useSelector((state) => state.auth.authToken);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users", {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Send auth token
                    },
                });

                setUsers(response.data);
                setLoading(false);

                // Initialize DataTables after data is fetched
                // $(document).ready(function () {
                //     $("#usersTable").DataTable();
                // });
            } catch (err) {
                setError("Failed to fetch users. Please try again.");
                setLoading(false);
            }
        };

        fetchUsers();

        // Cleanup DataTable on component unmount
        return () => {
            // if ($.fn.DataTable.isDataTable("#usersTable")) {
            //     $("#usersTable").DataTable().destroy(true);
            // }
        };
    }, [authToken]);

    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">Users List</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center alert alert-danger">{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table
                            id="usersTable"
                            className="table display table-striped table-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName } { user.lastName }</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.role}</td>
                                        <td>{user.isActive ? "Active" : "Inactive"}</td>
                                        <td>
                                            <button className="mx-2 btn btn-primary btn-sm">Edit</button>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthMainLayout>
    );
};

export default Users;
