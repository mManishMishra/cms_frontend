import { IoIosCall } from "react-icons/io";
import Toggle from "../components/Toggle";
import Image from "next/image";
// import "../globals.css";

const Header = () => {
  return (
    <>
      <div className="hedaer_wrapper fixed-top">
        <div className="px-3 container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <nav className="navbar navbar-expand-lg p-0 ">
              <div className="container-fluid">
                <a className="navbar-brand me-lg-3 me-0" href="/" aria-label="Home">
                  <Image
                    src="/images/new_hc_logo.png"
                    width={90}
                    height={90}
                    alt="High Creation Interior Logo"
                    className="p-2"
                    priority
                  />
                </a>
                <button
                  className="navbar-toggler d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="m-auto mb-2 text-center navbar-nav mb-lg-0 ms-0">
                    
                    {/* Design Ideas */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Design Ideas
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/design-idea/">
                            Design Gallery
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/product/">
                            Product
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/* Portfolio */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Portfolio
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="/residential-projects/"
                          >
                            Residential Projects
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/luxury-projects/">
                            Luxury Projects
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/* Experience Center */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                       Experience Center
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/experience-center/">
                          Experience Center Noida
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/experience-center-gurugram/">
                          Experience Center Gurugram
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/experience-center-faridabad/">
                          Experience Center Faridabad
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/* Exclusive Design */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Exclusive Design
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="/ready-togo-design/"
                          >
                            Ready To Go Design
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/wallpaper/">
                            Wallpapers
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/spacesaving-furniture/"
                          >
                            {" "}
                            Space-Saving Furniture
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/sustainable-furniture/"
                          >
                            Sustainable Furniture
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/furniture/">
                            Furniture
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/* --- SERVICES DROPDOWN (MOVED HERE) --- */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Services
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-noida">
                            Interior Designers In Noida
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-ghaziabad">
                            Interior Designers in Ghaziabad
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-greater-noida">
                            Interior Designers in Greater Noida
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-delhi">
                            Interior Designers in Delhi
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-dwarka">
                            Interior Designers in Dwarka
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-faridabad">
                            Interior Designers in Faridabad
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-gurgaon">
                            Interior Designers in Gurugram
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/interior-designers-in-manesar">
                            Interior Designers In Manesar
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item" href="/interior-designer-in-sohna-gurgaon">
                            Interior Designers in Sohna
                          </a>
                        </li>
                      </ul>
                    </li>

                    {/* Contact Us */}
                    <li className="nav_item">
                      <a
                        className="nav-link"
                        aria-current="page"
                        href="/contact/"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="py-2">
                      {/* Empty li placeholder */}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div>
              <a href="/estimator-for-home" className="get_btn">
                Get Estimate <IoIosCall className="callicon" />
              </a>
            </div>
            <div>
              <Toggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;