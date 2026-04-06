"use client";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import api from "@/utils/api";
const Toggle = () => {
  const [lookMenu, setLookMenu] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Added setLoading state

  // Function to open the sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    // ✅ Correct function name
    const fetchLookMenu = async () => {
      try {
        const response =  await api.get("/look-menu");
        setLookMenu(response.data); // ✅ Set data properly
        console.log("Error fetching design idea:", setLookMenu(response.data));
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLookMenu(); // ✅ Call function properly
  }, []);
  return (
    <div>
      {/* Button to open sidebar */}
      <button className="btn border-none d-block" onClick={openSidebar}>
        <FaBars className="fs-3 mt-1" />
      </button>

      {/* Sidebar */}
      <div
        id="mySidebar"
        style={{
          width: isOpen ? "100%" : "0", // Control width based on state
          display: isOpen ? "block" : "none", // Control display based on state
          position: "fixed",
          top: 0,
          left: 0,
          // backgroundColor: "#171717;",
          overflowX: "hidden",
          height: "100%",
          transition: "0.5s",
          zIndex: 1000,
        }}
      >
        <div className="d-flex justify-content-between container-fluid px-lg-5">
          <div className="logo ">
            <a href="/" className="d-block d-lg-none">
              <img
                src="/images/iconsHC.png"
                className="bg-white mt-3"
                width={90}
                height={90}
                alt="hc-logo"
              />
            </a>
          </div>
          <div className="close">
            {/* <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={closeSidebar}
            >
              <IoCloseCircleOutline className="" />
            </a> */}
            <button
              type="button"
              className="closebtn"
              onClick={closeSidebar}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
              }}
              aria-label="Close sidebar"
            >
              <IoCloseCircleOutline className="" />
            </button>
          </div>
        </div>
        <div style={{ padding: "10px", color: "white" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="offcanvas_heading text-white">
                  High Creation Interior
                </h2>
                <p className="offcanvas_description">
                  If you are looking out for a beautiful home that fits in your
                  budget, Yes! You are at the right place, we will make your
                  dream home come true!!
                </p>
              </div>
              <div className="col-lg-6 ">
                <div className="row g-5">
                  <div className="col-6 col-lg-6 col-md-6 d-block d-lg-none">
                    <h4 className="my-2 pb-2">Design Ideas</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li">
                        <a href="/design-idea/" className="offcanvas_anchor">
                          Design Gallery
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/product/" className="offcanvas_anchor">
                          Products
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-lg-6 col-md-6 d-block d-lg-none">
                    <h4 className="my-2 pb-2">Portfolio</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li">
                        <a
                          href="/residential-projects/"
                          className="offcanvas_anchor"
                        >
                          Residential Projects
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/luxury-projects/"
                          className="offcanvas_anchor"
                        >
                          luxury Projects
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-lg-6 col-md-6 d-block d-lg-none">
                    <h4 className="my-2 pb-2">Exclusive Design</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li">
                        <a href="/furniture/" className="offcanvas_anchor">
                          Furniture
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/ready-togo-design/"
                          className="offcanvas_anchor"
                        >
                          Ready To Go Design
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/sustainable-furniture/"
                          className="offcanvas_anchor"
                        >
                          Sustainable Furniture
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/spacesaving-furniture/"
                          className="offcanvas_anchor"
                        >
                          Space-Saving Furniture
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/wallpaper/" className="offcanvas_anchor">
                          Wallpapers
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-lg-6 col-md-6">
                    <h4 className="my-2 pb-2">High Creation</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li d-block d-lg-none">
                        <a
                          href="/experience-center/"
                          className="offcanvas_anchor"
                        >
                          Experience Center
                        </a>
                      </li>
                      <li className="footer_li d-block d-lg-none">
                        <a
                          href="/reallife-portfolio/"
                          className="offcanvas_anchor"
                        >
                          Real Time 3D
                        </a>
                      </li>

                      <li className="footer_li">
                        <a href="/about-us/" className="offcanvas_anchor">
                          About Us
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/how-its-works/" className="offcanvas_anchor">
                          How It Works
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/services/" className="offcanvas_anchor">
                          Services
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/team/" className="offcanvas_anchor">
                          Team
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/contact/" className="offcanvas_anchor">
                          Contact Us
                        </a>
                      </li>
                      <li className="footer_li">
                        <a href="/blog/" className="offcanvas_anchor">
                          Blogs
                        </a>
                      </li>

                      <li className="footer_li">
                        <a href="/awards/" className="offcanvas_anchor">
                          Awards Gallery
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6 col-lg-6 col-md-6">
                    <h4 className="my-2 pb-2">Looks</h4>
                    <ul className="list-unstyled mb-0">

                    {lookMenu.map((item) => (
                  <li key={item.id} className="footer_li">
                    <a
                      href={item.web_url}
                      className="offcanvas_anchor"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
                     

                      
                    </ul>
                  </div>
                  {/* <div className="col-6 col-lg-6 col-md-6">
                    <h4 className="my-2 pb-2">Gallery</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li">
                        <a href="/gallery/" className="offcanvas_anchor">
                          Home Interior Gallery
                        </a>
                      </li>
                     
                      <li className="footer_li">
                        <a href="/team/" className="offcanvas_anchor">
                          Team&apos;s Gallery
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div className="col-12 col-lg-6 col-md-6">
                    <h4 className="my-2 pb-2">Cities</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-noida"
                          className="offcanvas_anchor"
                        >
                          Interior Designers In Noida
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-ghaziabad"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Ghaziabad
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-greater-noida"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Greater Noida
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-delhi"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Delhi
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-dwarka"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Dwarka
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/best-interior-designers-in-faridabad"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Faridabad
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-gurgaon"
                          className="offcanvas_anchor"
                        >
                          Interior Designers in Gurugram
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designers-in-manesar"
                          className="offcanvas_anchor"
                        >
                          Interior Designers In Manesar
                        </a>
                      </li>
                      <li className="footer_li">
                        <a
                          href="/interior-designer-in-sohna-gurgaon"
                          className="offcanvas_anchor"
                        >
                          Interior Designers In Sohna
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;