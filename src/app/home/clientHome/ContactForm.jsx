"use client";
import { useState } from "react";
import api from "@/utils/api";

export default function ContactForm({ mapSrc }) {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    place: "",
    query: "",
    termsAndConditions: false,
  });

  const [status, setStatus] = useState({ error: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, termsAndConditions: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAndConditions) {
      setStatus({ error: "You must agree to the Terms & Conditions.", message: "" });
      return;
    }
    try {
      const response = await api.post("/user-queries", {
        name: formData.fullName,
        mobile: formData.contact,
        email: formData.email,
        place: formData.place,
        query: formData.query,
      });
      if (response.status === 201) {
        setStatus({ message: "Form submitted successfully!", error: "" });
        setFormData({ fullName: "", contact: "", email: "", place: "", query: "", termsAndConditions: false });
      } else {
        setStatus({ error: "Failed to submit. Please try again.", message: "" });
      }
    } catch (error) {
      setStatus({ error: "Error submitting form. Please try again.", message: "" });
    } finally {
      setTimeout(() => setStatus({ error: "", message: "" }), 5000);
    }
  };

  return (
    <div className="my-5 form">
      <div className="container">
        <div className="row position-relative card_form_row mx-0">
          <div className="col-lg-7 col-md-5 col-12">
            <div className="rounded map pe-lg-5" style={{ minHeight: "525px" }}>
              <iframe 
                src={mapSrc} 
                width="100%" height="525" className="map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-7 col-12 mt-4 mt-lg-0">
            <div className="contact_form">
              <h4 className="mb-3 text-black form_heading">Reach Out With Confidence</h4>
              <form className="row" onSubmit={handleSubmit}>
                {status.message && <div className="text-center alert alert-success">{status.message}</div>}
                {status.error && <div className="text-center alert alert-danger">{status.error}</div>}
                
                {/* Inputs */}
                <div className="mb-3 col-md-6">
                  <input type="text" className="form-control" value={formData.fullName} name="fullName" placeholder="Full Name" required onChange={handleInputChange} />
                </div>
                <div className="mb-3 col-md-6">
                  <input type="text" className="form-control" name="contact" value={formData.contact} placeholder="Contact No." required onChange={handleInputChange} />
                </div>
                <div className="mb-3 col-md-12">
                  <input type="email" className="form-control" name="email" value={formData.email} placeholder="Email" required onChange={handleInputChange} />
                </div>
                <div className="mb-3 col-md-12">
                  <input type="text" className="form-control" name="place" value={formData.place} onChange={handleInputChange} placeholder="Place" required />
                </div>
                <div className="mb-3 col-md-12">
                  <textarea className="form-control" name="query" value={formData.query} placeholder="Query" rows="3" onChange={handleInputChange}></textarea>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={formData.termsAndConditions} id="termsAndConditions" name="terms_and_conditions" required onChange={handleCheckboxChange} />
                    <label className="text-black form-check-label" htmlFor="termsAndConditions">Accept Terms & Condition</label>
                  </div>
                </div>
                <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                  <button className="px-5 btn know_more" type="submit">SEND</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}