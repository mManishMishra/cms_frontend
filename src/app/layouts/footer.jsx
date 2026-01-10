"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import api from "@/utils/api";
import { useEffect, useState } from "react";

const Footer = () => {

 const [footerlink, setData] = useState([]);
    useEffect(() => {
      const fetchfooterlink = async () => {
        try {
          const response = await api.get("/footer-link");
          setData(response.data);
        } catch (err) {
          console.error("Error fetching SEO data:", err);
        }
      };
  
      fetchfooterlink();
    }, []);

    console.log('FooterLink', footerlink);
  return (
    <>
      <div className="mt-4 ms-auto me-0" style={{ position: "fixed", top: "65%", right: "0", transform: "translateY(-50%)", zIndex: "9999" }}>
        <a
          href="https://api.whatsapp.com/send?phone=919560277787"
          className=""
          title="WhatsApp"
          aria-label="Chat with us on WhatsApp"
        >
          <div>
            <img src="/images/Whatsapp-icon.png" width={40} alt=""  fetchpriority="high"
  loading="eager"
  data-no-lazy="1" />
          </div>
        </a>
      </div>
      <div className="footer_wrapper pb-0 position-relative">
        <div className="container">
          <div className="py-5 pb-0 mx-0 row justify-content-center">
            <div className="col-lg-10">
              <div className="row justify-content-lg-center g-4">
                <div className="col-lg-4 ps-lg-5 col-md-5 col-6">
                  <div>
                    <a href="/">
                      {" "}
                      <img
                       src="/images/new_hc_logo.png"
                        alt="High Creation Interior Logo"
                        className=""
                        width={150}
                        height={150}
                        fetchpriority="high"
                        loading="eager"
                        data-no-lazy="1"
                      />
                    </a>
                  </div>
                  <div className="pt-3">
                    <h6>EMAIL US</h6>
                    <a href="mailto:Info@hcinterior.in" className="text_mail">
                      Info@hcinterior.in
                    </a>
                  </div>
                  <div>
                    <h6 className="pt-3">FOR QUERY</h6>
                    <p className="mb-0">
                      <a href="callto:+19810506301" className="text_mail">
                        +91 9810506301
                      </a>
                    </p>
                    <a href="callto:+19810503881" className="text_mail">
                      +91 9810503881
                    </a>
                  </div>
                  {/* <h4 className="footer_heading">Download App On Mobile:</h4>
                  <div className="pb-4 d-fle pb-lg-0">
                    <img
                      src="/images/gpay.PNG"
                      className="me-3"
                      alt="google-playstore"
                    />
                    <img src="/images/apple.PNG" alt="ois-store" />
                  </div> */}
                </div>
                <div className="col-lg-2 col-md-3 col-6">
                  <h4 className="footer_heading">High creation</h4>
                  <ul className="list-unstyled ps-0">
                    <li className="footer_li">
                      <a href="/about-us/" className="text-black">
                        About Us
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/services/" className="text-black">
                      Service area 
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/how-its-works/" className="text-black">
                        How Its Works
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/team/" className="text-black">
                        Team
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/career/" className="text-black">
                        Career
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/contact/" className="text-black">
                        Contact Us
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/refer-and-earn/" className="text-black">
                        Refer And Earn
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/faq/" className="text-black">
                        FAQ
                      </a>
                    </li>
                    <li className="footer_li">
                      <a href="/blog" className="text-black">
                        Blogs
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 ps-lg-4 col-md-3 col-6">
                  <h4 className="footer_heading">Gallery</h4>
                  <ul className="list-unstyled ps-0">
                   
                  {footerlink.map((query, index) => (
  <li key={index} className="footer_li"> {/* Add key here */}
    <a href={query.web_url} className="text-black">
      {query.title}
    </a>
  </li>
))}
                     
                  </ul>
                </div>
                <div className="col-lg-3 col-md-12 col-6">
                  <h4 className="footer_heading">Branch Office</h4>
                  <ul className="list-unstyled">
                    <li className="footer_li pb-2">
                      <span
                        href="#"
                        className="text-black"
                      >
                        H101, LGF, Sector-63, Noida, Uttar Pradesh- 201301
                      </span>
                    </li>
                    <li className="footer_li pb-2">
                      <span
                        href="#"
                        className="text-black"
                      >
                        H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301
                      </span>
                    </li>
                    {/* <li className="footer_li pb-2">
                      <a
                        href="/https://maps.app.goo.gl/fgvUV2sVYxd3uPct9/"
                        className="text-black"
                      >
                        17, Vikas Vihar, Mohanpuri, Meerut, Uttar Pradesh-
                        250001
                      </a>
                    </li> */}
                    <li className="footer_li pb-2">
                      <span
                        href="#"
                        className="text-black"
                      >
                        4th Floor, Jmd Galleria Mall, Unit Nos. 402, Sector-47 & 48, Sohna - Gurgaon Rd, Gurugram, Haryana 122001
                      </span>
                    </li>
                    <h6>Workshop</h6>
                    <li className="footer_li pb-2">
                      <span
                        href="#"
                        className="text-black"
                      >
                        Plot No-3, Sorkha Village , Sector-115, Noida, Uttar
                        Pradesh- 201301
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="footer_copyright pt-0 mt-0 px-3 px-lg-0 position-relative">
            {/* <div className="container"> */}
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <ul className="list-unstyled d-flex mb-0">
                  <li className="footer_li pe-3 border-end">
                    <a href="/privacy-policy/" className="text-black">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="footer_li pe-3 border-start ps-3">
                    <a href="/term-and-condition/" className="text-black">
                      Terms & Condition
                    </a>
                  </li>
                  <li className="footer_li pe-3 border-start ps-3">
                    <a href="/cancelletion-policy/" className="text-black">
                      Cancellation Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-0 team_description text-center pt-2 pt-lg-0">
                  All Rights Reserved ©2024 High Creation Interior Projects
                  Private Limited
                </p>
              </div>
              <div className="m-auto m-lg-0 text-center">
                <div className="my-3 d-flex m-auto text-center">
                  <a
                    href="https://www.facebook.com/HighCreationInteriorProjectsPvtLtd"
                    className="text-black"
                  >
                    <FaFacebookF className="social_icon" />
                  </a>
                  <a
                    href="https://www.instagram.com/highcreationinterior/"
                    className="text-black"
                  >
                    <FaInstagram className="social_icon" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/high-creation-interior-projects-private-limited/"
                    className="text-black"
                  >
                    <FaLinkedin className="social_icon" />
                  </a>
                  <a
                    href="https://x.com/HC_Interior?mx=2"
                    className="text-black"
                  >
                    <FaTwitter className="social_icon" />
                  </a>
                </div>
              </div>
            </div>
            <hr />

            <p className="text-lg-end text-center team_description">
              Designed By
              <a href="#" className="text-black">
                {" "}
             HC Interior
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
