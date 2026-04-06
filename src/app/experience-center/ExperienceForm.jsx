"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/utils/api";
import { buildLeadMetadata } from "@/utils/leadForms";

const ExperienceForm = () => {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    place: "",
    query: "",
    termsAccepted: false,
  });

  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    email: false,
    contactNo: false,
    place: false,
    query: false,
  });

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      fullName: formData.fullName.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      contactNo: formData.contactNo.trim() === "",
      place: formData.place.trim() === "",
      query: formData.query.trim() === "",
      termsAccepted: !formData.termsAccepted,
    };

    setFieldErrors(errors);
    return !Object.values(errors).some((error) => error === true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmissionError(
        "Please fill in all required fields and accept the terms."
      );
      return;
    }

    const formRequestedData = {
      name: formData.fullName,
      email: formData.email,
      mobile: formData.contactNo,
      place: formData.place,
      query: formData.query,
      ...buildLeadMetadata({
        pathname,
        leadFormType: "inline",
        leadFormName: "Experience Center Lead Form",
        ctaText: "Get free Quote",
      }),
    };

    try {
      const response = await api.post("/user-queries", formRequestedData);

      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          contactNo: "",
          place: "",
          query: "",
          termsAccepted: false,
        });
        setTimeout(() => {
          window.location.href = "/thank-you";
        }, 300);
      } else {
        setSubmissionError("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setSubmissionError("Error submitting form. Please try again.");
    } finally {
      setTimeout(() => {
        setSubmissionError("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <div className="text-white form_experience_center mx-0">
      <form onSubmit={handleSubmit}>
        <h5 className="text-center">Design for Every Budget</h5>
        <p className="mb-4 text-center text-white">
          Get Your Dream house today. Let Our experts help you.
        </p>

        {/* Full Name */}
        <div className="mt-3 mb-3">
          <input
            type="text"
            className={`form-control ${
              fieldErrors.fullName ? "is-invalid" : ""
            }`}
            placeholder="Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          {fieldErrors.fullName && (
            <div className="invalid-feedback">Please enter your full name.</div>
          )}
        </div>

        <div className="mb-3 col-md-12">
          <input
            type="text"
            className="form-control"
            name="contactNo"
            placeholder="Contact No."
            value={formData.contactNo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
            placeholder="Email ID"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {fieldErrors.email && (
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          )}
        </div>

        <div className="mb-3 col-md-12">
          <input
            type="text"
            className="form-control"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            placeholder="Place"
            required
          />
        </div>

        <div className="mb-3 col-md-12">
          <textarea
            className="form-control"
            name="query"
            placeholder="Query"
            rows="3"
            value={formData.query}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mb-3">
          <button type="submit" className="mb-3 know_more w-100">
            Get free Quote
          </button>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className={`form-check-input ${
              fieldErrors.termsAccepted ? "is-invalid" : ""
            }`}
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            required
          />
          <label
            className="text-white form-check-label"
            htmlFor="exampleCheck1"
          >
            By submitting this form, you agree to the{" "}
            <a href="#" className="text-warning">
              privacy policy
            </a>{" "}
            &{" "}
            <a href="#" className="text-warning">
              terms and conditions
            </a>
            .
          </label>
          {fieldErrors.termsAccepted && (
            <div className="invalid-feedback">
              You must accept the terms and conditions.
            </div>
          )}
        </div>

        {submissionError && (
          <div className="text-center alert alert-danger">{submissionError}</div>
        )}
        {submissionMessage && (
          <div className="text-center alert alert-success">
            {submissionMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default ExperienceForm;
