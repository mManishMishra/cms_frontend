"use client";

import { useState } from "react";
import api from "@/utils/api";

const LivingRoomForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    designerName: "",
    termsAccepted: false,
  });

  const [submissionError, setSubmissionError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    designerName: false,
    termsAccepted: false,
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
      fullName: formData.fullName === "",
      phoneNumber: formData.phoneNumber === "",
      email: formData.email === "",
      designerName: formData.designerName === "",
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

    try {
      const response = await api.post("/product-form", formData);

      if (response.status === 201) {
        setSubmissionMessage("Form submitted successfully!");
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          designerName: "",
          termsAccepted: false,
        });
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
    <section className="form_background">
      <div className="container">
        <div className="row">
          <h3 className="text-white">Styles to Suit Every Budget</h3>
          <p className="text-white">
            Get Your Dream house today. Let Our experts help you.
          </p>
          {submissionError && (
            <div className="text-center alert alert-danger">
              {submissionError}
            </div>
          )}
          {submissionMessage && (
            <div className="text-center alert alert-success">
              {submissionMessage}
            </div>
          )}
          <div className="col-lg-5">
            <div className="">
              <form onSubmit={handleSubmit} className="row">
                <div className="mb-3 col-md-12">
                  <input
                    type="text"
                    className={`form-control ${
                      fieldErrors.fullName ? "is-invalid" : ""
                    }`}
                    placeholder="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.fullName && (
                    <div className="invalid-feedback">
                      Please enter your full name.
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-4">
                  <input
                    type="text"
                    className={`form-control ${
                      fieldErrors.phoneNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Phone No."
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.phoneNumber && (
                    <div className="invalid-feedback">
                      Please enter your phone number.
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-8">
                  <input
                    type="email"
                    className={`form-control ${
                      fieldErrors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
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
                    className={`form-control ${
                      fieldErrors.designerName ? "is-invalid" : ""
                    }`}
                    placeholder="Designer Name"
                    name="designerName"
                    value={formData.designerName}
                    onChange={handleInputChange}
                    required
                  />
                  {fieldErrors.designerName && (
                    <div className="invalid-feedback">
                      Please enter the designer&apos;s name.
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        fieldErrors.termsAccepted ? "is-invalid" : ""
                      }`}
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      required
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor="invalidCheck"
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
                      <div className="invalid-feedback text-white">
                        You must agree before submitting.
                      </div>
                    )}
                  </div>
                </div>

                <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                  <button className="know_more w-100" type="submit">
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivingRoomForm;