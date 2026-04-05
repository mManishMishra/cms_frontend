"use client";

import { useState } from "react";
import api from "@/utils/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    place: "",
    query: "",
    termsAccepted: false,
  });

  // State to handle errors and success messages
  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, termsAccepted: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms are accepted
    if (!formData.termsAccepted) {
      setSubmissionError(
        "You must agree to the Terms & Conditions before submitting."
      );
      return;
    }

    const formRequestData = {
      name: formData.fullName,
      mobile: formData.contactNo,
      email: formData.email,
      place: formData.place,
      query: formData.query,
    };

    try {
      // Send POST request to save form data
      const response = await api.post("/user-queries", formRequestData);

      // Handle success response
      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          contactNo: "",
          email: "",
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
      console.error("Error:", error);
    } finally {
      // Clear error message after some time
      setTimeout(() => {
        setSubmissionError("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="contact_form contact">
        <h4 className="mb-3 text-black form_heading">Let’s Connect</h4>
        <form className="row" onSubmit={handleSubmit}>
          {submissionMessage && (
            <div className="text-center alert alert-success alert-dismissible fade show">
              {submissionMessage}
            </div>
          )}
          {submissionError && (
            <div className="text-center alert alert-danger alert-dismissible fade show">
              {submissionError}
            </div>
          )}

          <div className="mb-3 col-md-6">
            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
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

          <div className="mb-3 col-md-12">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
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

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="invalidCheck"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
                required
              />
              <label
                className="text-black form-check-label"
                htmlFor="invalidCheck"
              >
                Accept Terms & Conditions
              </label>
              <div className="text-black invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>

          <div className="m-auto mt-3 col-12 d-flex justify-content-center">
            <button className="px-5 know_more" type="submit">
              SEND
            </button>
          </div>
        </form>
      </div>
      {/* Applying global styles here to ensure they load on client */}
      <style jsx global>{`
        .contact_wrapper p {
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

export default ContactForm;