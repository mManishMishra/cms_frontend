import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const AuthFooter = () => {
    return (
        <>
            <div className="footer_wrapper">
                <div className="container">
                    <div className="py-5 row justify-content-center">
                        <div className="col-lg-10">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 ps-lg-5">
                                    <div>
                                        <a href="/"> <Image
                                            src="/images/Hc-Logo.jpeg"
                                            alt="hero image"
                                            className=""
                                            width={150}
                                            height={150}
                                        /></a>
                                    </div>
                                    <div className="my-3 d-flex">
                                        <a href="" className="text-black">
                                            <FaFacebookF className="social_icon" />
                                        </a>
                                        <a href="" className="text-black">
                                            <FaInstagram className="social_icon" />
                                        </a>
                                        <a href="" className="text-black">
                                            <FaLinkedin className="social_icon" />
                                        </a>
                                        <a href="" className="text-black">
                                            <FaTwitter className="social_icon" />
                                        </a>
                                    </div>
                                    <h4 className="footer_heading">Download App On Mobile:</h4>
                                    <div className="d-flex">
                                        <img
                                            src="/images/gpay.PNG"
                                            className="me-3"
                                            alt="google-playstore"
                                        />
                                        <img src="/images/apple.PNG" alt="ois-store" />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <h4 className="footer_heading">Navigation</h4>
                                    <ul className="list-unstyled ps-0">
                                        <li className="footer_li">
                                            <a href="/design-idea/" className="text-black">
                                                Design Ideas
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/portfolio/" className="text-black">
                                                Porfolio
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/experience/" className="text-black">
                                                Experience Center
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/reallife-portfolio/" className="text-black">
                                                Real Time 3D
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/exclusive-design/" className="text-black">
                                                Exclusive Design
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/contact/" className="text-black">
                                                Contact
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/privacy-policy/" className="text-black">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/term-and-condition" className="text-black">
                                                Terms & Conditions
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/faq/" className="text-black">
                                                Faqs
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/contact/" className="text-black">
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6 ps-lg-5">
                                    <h4 className="footer_heading">Quick Links </h4>
                                    <ul className="list-unstyled ps-0">
                                        <li className="footer_li">
                                            <a href="/furniture/" className="text-black">
                                                Furniture
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/wallpaper/" className="text-black">
                                                Wallpaper
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/career/" className="text-black">
                                                Career
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/how-its-works/" className="text-black">
                                                How Its Works
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/gallery/" className="text-black">
                                                Gallery
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/services/" className="text-black">
                                                Services
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/team/" className="text-black">
                                                Team
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/videos/" className="text-black">
                                                Videos
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/project/" className="text-black">
                                                Project
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/product/" className="text-black">
                                                Product
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <h4 className="footer_heading">Interior</h4>
                                    <ul className="list-unstyled">
                                        <li className="footer_li">
                                            <a href="/about-us/" className="text-black">
                                                About Us
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/corporate/" className="text-black">
                                                Corporate
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/residential/" className="text-black">
                                                Residential
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/home-interior/" className="text-black">
                                                Interior Gallery
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/interior-inner/" className="text-black">
                                                Interior Details
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/blog/" className="text-black">
                                                Blog
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="/awards/" className="text-black">
                                                Awards
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="" className="text-black">
                                                Real Time 3D
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="" className="text-black">
                                                Exclusive Design
                                            </a>
                                        </li>
                                        <li className="footer_li">
                                            <a href="" className="text-black">
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_copyright">
                <p className="text-end team_description">
                    Designed By
                    <a href="" className="text-black">
                        {" "}
                        Lead panther
                    </a>
                </p>
            </div>
        </>
    );
};

export default AuthFooter;
