// pages/index.js
"use client";
import { useState } from "react";

const EstimaterSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Logic to save data (could be API call here)
    console.log("Form data saved:", formData);
    alert("Form data saved!");
  };

  return (
    <div className="container">
      {/* Top Bar with Step Indicator */}
      <div className="topbar">
        <div className={`step step1 ${step === 1 ? "active" : ""}`}>
          1 House Details
        </div>
        <div className={`step step2 ${step === 2 ? "active" : ""}`}>
          2 User Details & Verification
        </div>
        <div className={`step step3 ${step === 3 ? "active" : ""}`}>
          3 Quotation
        </div>
      </div>

      <form>
        {/* Step 1 */}
        {step === 1 && (
          <div className="step-content">
            <h2>Step 1: Enter Your Name</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="step-content">
            <h2>Step 2: Enter Your Email</h2>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="step-content">
            <h2>Step 3: Enter Your Phone Number</h2>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Navigation and Action Buttons */}
        <div className="buttons">
          {step > 1 && (
            <button type="button" className="know_more" onClick={handleBack}>
              Back
            </button>
          )}

          {step < 3 ? (
            <button type="button" className="know_more" onClick={handleNext}>
              Next
            </button>
          ) : (
            <>
              <button type="button" className="know_more" onClick={handleSave}>
                Save Data
              </button>
              <button type="button" className="know_more" onClick={handleBack}>
                Previous Step
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EstimaterSetup;
