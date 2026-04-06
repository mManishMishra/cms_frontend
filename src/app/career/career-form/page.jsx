"use client";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import BackgroundImageWithHeading from "../../components/BackgroundImageWithHeading";

import api from "@/utils/api";
import { toast } from "react-toastify";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    your_job_title: "",
    resume: null,
  });


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobId = new URLSearchParams(window.location.search).get("jobId") ?? null;

    const formDataToSend = new FormData();
    formDataToSend.append("job_id", jobId);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("your_job_title", formData.your_job_title);
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    try {
      // Send POST request to save form data
      const response = await api.post(`/job-application`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      // Handle success response
      if (response.status === 201) {
        toast.success("Form submitted successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          your_job_title: "",
          resume: null,
        });

      } else {
        toast.error("Error submitting form. Please try again.");
      }
    } catch (error) {
      toast.error(error.message ?? "Error submitting form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <head>
        <title>
        Career form - High Creation Interior

        </title>
      </head>
      <MainLayout>
        <main>
       

          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper   career_form_banner"}
            sectionBgHeading="Career Form"
            secBgHeadingClass="sec_bgheading_lass" 
            sectionBgDescription=""
            secBgDesClass={"text-center text-white"}
          />

          <section className="container my-5 map">
            <div className="row mx-0 g-3">
              <div className="col-lg-5 d-flex align-items-center">
                <div className="pe-lg-5">
                  <h2 className="pb-4"> High Creation Interior Team</h2>
                  <p>
                    Can’t find something suitable, but eager to work with us?
                    Write to us at info@hcinterior.in and we’ll try to make it
                    happen.
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact_form contact">
                  <h4 className="mb-4 text-black form_heading">Apply Now</h4>
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-6">
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
                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Contact No."
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="your_job_title"
                        placeholder="Job Position"
                        value={formData.your_job_title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3 col-md-12">
                      {/* <input
                        type="text"
                        className="form-control"
                        name="place"
                        value=""
                        onChange=""
                        placeholder="Place"
                        required
                      /> */}
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          className="form-control me-2 w-75"
                          id="inputGroupFile02"
                          placeholder="Resumne"
                          name="resume"
                          accept="application/pdf"
                          onChange={handleInputChange}
                        />
                        <label
                          className="input-group-text rounded-5 mt-3 mt-lg-0"
                          for="inputGroupFile02"
                        >
                          Upload your resume
                        </label>
                      </div>
                    </div>

                    {/* <div className="mb-3 col-md-12">
                      <textarea
                        className="form-control"
                        name="query"
                        placeholder="Query"
                        rows="3"
                        value=""
                        onChange=""
                      ></textarea>
                    </div> */}

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="invalidCheck"
                          value=""
                          onChange=""
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <hr />
      </MainLayout>
    </div>
  );
};

export default Contact;
