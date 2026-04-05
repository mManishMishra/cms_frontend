"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import $ from "jquery"; // Keep jquery import if you plan to uncomment DataTable later
import AuthMainLayout from "../layouts/auth/AuthMainLayout";
import api from "@/utils/api";

const ExperienceFormClient = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get authToken from Redux store
  const authToken = useSelector((state) => state.auth.authToken);

  // Load DataTables (Commented out as in original code)
  // const loadDataTable = async () => {
  //     try {
  //         await import("datatables.net");
  //         await import("datatables.net-dt/css/jquery.dataTables.min.css");
  //         $(document).ready(function () {
  //             $("#experienceTable").DataTable();
  //         });
  //     } catch (error) {
  //         console.error("Failed to load DataTables:", error);
  //     }
  // };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Only fetch if authToken exists
        if (!authToken) return;

        const response = await api.get("/experience", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send auth token
          },
        });

        setExperiences(response.data);
        setLoading(false);

        // Load DataTables after data is fetched
        // loadDataTable();
      } catch (err) {
        console.error("Error fetching experience data:", err);
        setError("Failed to fetch experience form data. Please try again.");
        setLoading(false);
      }
    };

    fetchExperiences();

    // Cleanup DataTable on component unmount
    return () => {
      // if ($.fn.DataTable.isDataTable("#experienceTable")) {
      //     $("#experienceTable").DataTable().destroy(true);
      // }
    };
  }, [authToken]);

  return (
    <AuthMainLayout>
      <div className="container my-5">
        <h1 className="mb-4 text-center">Experience Form Submissions</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table
              id="experienceTable"
              className="table display table-striped table-bordered"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Property Name</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience) => (
                  <tr key={experience.id}>
                    <td>{experience.fullName}</td>
                    <td>{experience.email}</td>
                    <td>{experience.contactNo}</td>
                    <td>{experience.propertyName}</td>
                    <td>
                      {new Date(experience.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {experiences.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthMainLayout>
  );
};

export default ExperienceFormClient;