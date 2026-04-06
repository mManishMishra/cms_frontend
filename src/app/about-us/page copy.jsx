"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";

import BackgroundImageRow from "../components/BackgroundImageRow";
import MainLayout from "../layouts/MainLayout";

  const metadata = {
  title: "About Us | End To End Interior Design - High Creation Interior",
  description:
    "High Creation Interior delivering top notch interior design services in Noida & Delhi NCR | 8+ Years of experience | 1000+ Projects Done",
};

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    top_title: "",
    top_description: "",
    mid_sub_title: "",
    mid_sub_description: "",
    mid_image: "",
  });

  // Fetch API Data
  const fetchAboutUsContent = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/about_us");

      if (response.data && response.data.json_content) {
        setFormData({
          top_title: response.data.json_content.top_title || "",
          top_description: response.data.json_content.top_description || "",
          mid_sub_title: response.data.json_content.mid_sub_title || "",
          mid_sub_description: response.data.json_content.mid_sub_description || "",
          mid_image: response.data.json_content.mid_image || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load About Us data. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutUsContent();
  }, [fetchAboutUsContent]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
    <head>
    <title>About Us | End To End Interior Design - High Creation Interior	</title>
    <meta
      name="description"
      content="High Creation Interior delivering top notch interior design services in Noida & Delhi NCR | 8+ Years of experience | 1000+ Projects Done	"
    />
   <link rel="canonical" href="https://hcinterior.in/about-us" />	
  </head>
    <MainLayout>
      <main>
        {/* Background Section */}
        <BackgroundImageRow
          sectionBgImages="contact_wrapper about_us_banner"
          sectionBgHeading="About Us"
          secBgHeadingClass="sec_bgheading_lass about_mob"
          sectionBgDescription="Get A Place Designed Exactly How You Wished"
          secBgDesClass="text-center bg-transparent text-white"
        />

        {/* About High Creation Section */}
        <section className="my-5 container">
          <div className="row mx-0">
            <center>
              <h2 className="pb-4 wallpaperHeading">{formData.top_title}</h2>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <img
                    src={formData.mid_image}
                    className="w-100"
                    alt="About High Creation"
                  />
                </div>
              </div>
              <p className="px-lg-5 pt-4 team_description">{formData.top_description}</p>
            </center>
          </div>
        </section>

        {/* What Makes Us Best Section */}
        <section className="whatmakes_wrapper">
          <div className="container">
            <div className="row mx-0">
              <div className="col-lg-7 d-flex align-items-center">
                <div>
                  <h3>{formData.mid_sub_title}</h3>
                  <p className="team_description text-white pe-lg-5">
                  <p><span class="font_stylish text-white">Interior designing Company?</span></p>
                    {formData.mid_sub_description}
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <img
                  src="/images/about/Whatmakes.png"
                  className="w-100"
                  alt="What makes us best"
                />
              </div>
            </div>
          </div>
        </section>

        <hr />
      </main>
    </MainLayout>
    </>
  );
};

export default AboutUs;
