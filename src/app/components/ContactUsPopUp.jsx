"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import api from "@/utils/api";
import { buildLeadMetadata, getLeadDeviceType, resolveLeadRule } from "@/utils/leadForms";

const ContactUsPopUp = ({ onModalStateChange }) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const [showModal, setShowModal] = useState(false);
    const [activeRule, setActiveRule] = useState(null);
    const hasTriggered = useRef(false);
    const lastTriggerType = useRef("time");

    // Form state preserved exactly
    const [formData, setFormData] = useState({
        fullName: "",
        contact: "",
        email: "",
        place: "",
        query: "",
        termsAndConditions: false,
    });

    const [submissionError, setSubmissionError] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData((prevData) => ({ ...prevData, termsAndConditions: checked }));
    };

    const handleClose = () => {
        setShowModal(false);
        if (onModalStateChange) onModalStateChange(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.termsAndConditions) {
            setSubmissionError("You must agree to the Terms & Conditions before submitting.");
            return;
        }

        const formRequestData = {
            name: formData.fullName,
            email: formData.email,
            mobile: formData.contact,
            place: formData.place,
            query: formData.query,
            ...buildLeadMetadata({
                pathname,
                leadFormType: "popup",
                rule: activeRule,
                leadFormName: activeRule?.lead_form_name || `Popup Lead Form ${pathname || "/"}`,
                triggerType: lastTriggerType.current || activeRule?.trigger_type || "time",
                ctaText: activeRule?.cta_text || "SEND",
                deviceType: getLeadDeviceType(),
            }),
        };

        try {
            const response = await api.post("/user-queries", formRequestData);
            if (response.status === 201) {
                setSubmissionMessage(activeRule?.success_message || "Form submitted successfully!");
                setFormData({
                    fullName: "",
                    contact: "",
                    email: "",
                    place: "",
                    query: "",
                    termsAndConditions: false,
                });

                setTimeout(() => {
                    handleClose();
                    const redirectUrl = activeRule?.redirect_url || "/thank-you";
                    if (!redirectUrl) {
                        return;
                    }

                    if (/^https?:\/\//i.test(redirectUrl)) {
                        window.location.href = redirectUrl;
                        return;
                    }

                    router.push(redirectUrl);
                }, 400);
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

    // --- Dynamic Popup Rules Engine ---
    useEffect(() => {
        hasTriggered.current = false;
        lastTriggerType.current = "time";
        setShowModal(false);
        setActiveRule(null);
        if (onModalStateChange) onModalStateChange(false);
        let timerId;
        let scrollListener;
        let exitListener;

        // Original 12-second behavior preserved as a fallback
        const applyFallback = () => {
            if (!hasTriggered.current) {
                timerId = setTimeout(() => {
                    if (!hasTriggered.current) {
                        hasTriggered.current = true;
                        lastTriggerType.current = "time";
                        setShowModal(true);
                        if (onModalStateChange) onModalStateChange(true);
                    }
                }, 12000);
            }
        };

        const fetchAndApplyRules = async () => {
            try {
                const ruleToApply = await resolveLeadRule(pathname);

                // If no rule exists, or rule is disabled, fallback or abort
                if (!ruleToApply) {
                    applyFallback();
                    return;
                }
                if (!ruleToApply.is_enabled) return;

                const isMobile = getLeadDeviceType() === "mobile";
                if (isMobile && !ruleToApply.show_mobile) return; 
                if (!isMobile && !ruleToApply.show_desktop) return; 

                setActiveRule(ruleToApply);

                const triggerPopup = (triggerSource = "time") => {
                    if (!hasTriggered.current) {
                        hasTriggered.current = true;
                        lastTriggerType.current = triggerSource;
                        setShowModal(true);
                        if (onModalStateChange) onModalStateChange(true);
                    }
                };

                const triggerType = ruleToApply.trigger_type || 'time';

                // EXCLUSIVE TRIGGER 1: Time Delay
                if (triggerType === 'time') {
                    const delay = (ruleToApply.delay_seconds || 12) * 1000; 
                    timerId = setTimeout(() => triggerPopup('time'), delay);
                } 
                // EXCLUSIVE TRIGGER 2: Scroll Depth
                else if (triggerType === 'scroll') {
                    scrollListener = () => {
                        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                        if (maxScroll <= 0) return; 
                        
                        const scrollPercent = (window.scrollY / maxScroll) * 100;
                        if (scrollPercent >= (ruleToApply.scroll_percentage || 50)) {
                            triggerPopup('scroll');
                            window.removeEventListener("scroll", scrollListener);
                        }
                    };
                    window.addEventListener("scroll", scrollListener);
                } 
                // EXCLUSIVE TRIGGER 3: Exit Intent
                else if (triggerType === 'exit') {
                    if (isMobile) {
                        const delay = (ruleToApply.delay_seconds || 12) * 1000;
                        timerId = setTimeout(() => triggerPopup('exit-mobile-fallback'), delay);
                    } else {
                        exitListener = (e) => {
                            if (e.clientY <= 0) { 
                                triggerPopup('exit');
                                document.removeEventListener("mouseleave", exitListener);
                            }
                        };
                        document.addEventListener("mouseleave", exitListener);
                    }
                }

            } catch (error) {
                console.error("Failed to load popup rules, using fallback.", error);
                applyFallback();
            }
        };

        fetchAndApplyRules();

        return () => {
            if (timerId) clearTimeout(timerId);
            if (scrollListener) window.removeEventListener("scroll", scrollListener);
            if (exitListener) document.removeEventListener("mouseleave", exitListener);
        };
    }, [pathname, onModalStateChange]);

    // Don't render anything if modal is hidden (cleaner DOM)
    if (!showModal) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} // Added semi-transparent bg overlay
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content contact_form contact">
                    <div className="modal-body">
                        <h4 className="mb-3 text-black form_heading d-flex justify-content-between">
                            {/* Dynamic Heading with exact original fallback */}
                            {activeRule?.heading || "Let's Connect"}
                            <i
                                type="button"
                                className="btn-close fs-6"
                                onClick={handleClose}
                                aria-label="Close"
                            ></i>
                        </h4>
                        {/* Dynamic Subheading with exact original fallback */}
                        <p>{activeRule?.sub_heading || "Get Your Dream Home Interior. Let Our experts help you"}</p>
                        
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
                            
                            {/* Form Fields - Exact Original Format */}
                            <div className="mb-3 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Contact No."
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-12">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
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
                                    value={formData.query}
                                    onChange={handleInputChange}
                                    placeholder="Query"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="terms_and_conditions" // Kept exact original name attribute
                                        id="termsAndConditions"
                                        checked={formData.termsAndConditions}
                                        onChange={handleCheckboxChange}
                                        required
                                    />
                                    <label className="text-black form-check-label" htmlFor="termsAndConditions">
                                        Accept Terms & Condition
                                    </label>
                                    {!formData.termsAndConditions && submissionError.includes("agree") && (
                                        <div className="text-danger small">
                                            You must agree before submitting.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                                {/* Button with exact original classes */}
                                <button className="px-5 btn know_more" type="submit">
                                    {activeRule?.cta_text || "SEND"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPopUp;
