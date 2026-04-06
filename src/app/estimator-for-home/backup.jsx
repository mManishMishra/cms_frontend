"use client";
import MainLayout from "../layouts/MainLayout";
import { useState, useRef } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import TooltipComponent from "../components/TooltipComponent";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const StoreUrl = "http://hc-admin.shivankgautam.com/estimater";
// const LoginUrl = "http://hc-admin.shivankgautam.com/estimater";


const Estimater = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [living, setLiving] = useState(0);
    const [kitchen, setKitchen] = useState(0);
    const [home, setHome] = useState("");
    const [movableFurniture, setMovableFurniture] = useState(0);
    const [selectedBHK, setSelectedBHK] = useState("");
    const [formData, setFormData] = useState({
        home: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        query: "",
    });
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]); // Store 4 OTP inputs
    const otpRefs = useRef([]);
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [submissionError, setSubmissionError] = useState("");


    const handleNext = () => {
        let message = "";

        if (step === 1 && !(home && selectedBHK)) {
            message = "Please select a home type and home size before proceeding.";
        } else if (step === 2) {
            // Add validation for bedrooms, bathrooms, package, and movable furniture
            const selectedPackage = document.querySelector('input[name="package"]:checked');
            const movable = document.querySelector('input[name="movable"]:checked');

            if (bedrooms === 0 || bathrooms === 0) {
                message = "Please ensure at least one bedroom and one bathroom are selected.";
            } else if (!movable) {
                message = "Please select whether you have movable furniture.";
            } else if (!selectedPackage) {
                message = "Please select a package before proceeding.";
            }
        } else if (step === 3) {
            const { firstName, lastName, mobile, email } = formData;
            if (!firstName || !lastName || !mobile || !email) {
                message = "Please fill in all required fields.";
            } else if (!/^\d{10}$/.test(mobile)) {
                message = "Please enter a valid 10-digit mobile number.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                message = "Please enter a valid email address.";
            }
        }

        if (message) {
            setWarningMessage(message);
            setShowWarning(true);
        } else {
            setStep((prevStep) => prevStep + 1);
            setWarningMessage("");
        }
    };



    const handlePrevious = () => setStep((prevStep) => prevStep - 1);

    const handleHomeSelect = (type) => {
        setHome(type);
        setSelectedBHK("");
    };

    const handleBHKSelect = (bhk) => {
        setSelectedBHK(bhk);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddBedroom = () => setBedrooms(bedrooms + 1);
    const handleRemoveBedroom = () => setBedrooms(bedrooms > 0 ? bedrooms - 1 : 0);

    const handleAddBathroom = () => setBathrooms(bathrooms + 1);
    const handleRemoveBathroom = () => setBathrooms(bathrooms > 0 ? bathrooms - 1 : 0);

    const handleAddLiving = () => setLiving(living + 1);
    const handleRemoveLiving = () => setLiving(living > 0 ? living - 1 : 0);

    const handleAddKitchen = () => setKitchen(kitchen + 1);
    const handleRemoveKitchen = () => setKitchen(kitchen > 0 ? kitchen - 1 : 0);

    const handleOtpChange = (index, value) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value) {
                if (index < otpRefs.current.length - 1) {
                    otpRefs.current[index + 1].focus();
                }
            } else {
                if (index > 0) {
                    otpRefs.current[index - 1].focus();
                }
            }
        }
    };

    const handleSubmit = async () => {
        const { firstName, lastName, mobile, email, query } = formData;

        // Validate form fields before submission
        if (!firstName || !lastName || !mobile || !email || !query) {
            setWarningMessage("Please fill in all the fields before submitting.");
            setShowWarning(true);
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            setWarningMessage("Please enter a valid 10-digit mobile number.");
            setShowWarning(true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setWarningMessage("Please enter a valid email address.");
            setShowWarning(true);
            return;
        }

        const payload = {
            bedrooms,
            bathrooms,
            living,
            kitchen,
            home,
            selectedBHK,
            ...formData,
        };

        console.log("Payload being sent:", payload);

        try {
            const response = await axios.post(StoreUrl, payload);
            if (response.status === 201) {
                // Show success message
                setSubmissionMessage("Form submitted successfully!");

                // Clear all fields and reset to step 1
                resetForm();
            }
        } catch (error) {
            setSubmissionError("Error submitting the form. Please try again.");
        } finally {
            clearMessages(); // Clear messages after submission attempt
        }
    };


    const resetForm = () => {
        setBedrooms(0);
        setBathrooms(0);
        setLiving(0);
        setKitchen(0);
        setHome("");
        setSelectedBHK("");
        setFormData({
            home: "",
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            query: "",
        });
        setOtp(["", "", "", ""]);
        setStep(1);
        setOtpSent(false); // Optional: Reset OTP state if needed
    };

    const clearMessages = () => {
        setTimeout(() => {
            setSubmissionMessage("");
            setSubmissionError("");
        }, 5000); // Clear messages after 5 seconds
    };

    return (
        <div>
            <MainLayout>

                {otpSent ? (
                    <section className="container p-5 my-5 card fill_your_deatil">
                        <div className="text-center">
                            <p>Enter OTP sent to your mobile number:</p>
                            <div className="container w-50 d-flex justify-content-center">
                                {otp.map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="mx-1 text-center form-control otp-input"
                                        maxLength={1}
                                        value={otp[index]}
                                        onChange={(e) =>
                                            handleOtpChange(index, e.target.value)
                                        }
                                        ref={(el) => (otpRefs.current[index] = el)}
                                    />
                                ))}
                            </div>
                            <div className="my-4 text-center">
                                <button className="know_more" onClick={handleSubmit}>
                                    Submit OTP
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <main>
                        {warningMessage && (
                            <div className="text-center alert alert-warning alert-dismissible fade show" role="alert">
                                {warningMessage}
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setWarningMessage(null)}></button>
                            </div>
                        )}
                        {submissionMessage && (
                            <div className="text-center alert alert-success alert-dismissible fade show" role="alert">
                                {submissionMessage}
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSubmissionMessage(null)}></button>
                            </div>
                        )}
                        {submissionError && (
                            <div className="text-center alert alert-danger alert-dismissible fade show" role="alert">
                                {submissionError}
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSubmissionError(null)}></button>
                            </div>
                        )}

                        {step === 1 && (
                            <>
                                <section className="container my-5">
                                    <div className="row">
                                        <h3 className="pb-4 text-center">
                                            Choose Your <span className="font_stylish">Home</span>
                                        </h3>

                                        <div className="col-lg-4">
                                            <div
                                                className={`card card_check_bhk ${home === "apartment" ? "selected" : ""}`}
                                                onClick={() => handleHomeSelect("apartment")}
                                            >
                                                <div>
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="home"
                                                        id="apartments"
                                                        value="apartment"
                                                        checked={home === "apartment"}
                                                        onChange={() => handleHomeSelect("apartment")} // Added onChange handler
                                                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                                                    />
                                                </div>
                                                <img
                                                    src="/images/apartmen.jpeg"
                                                    className="w-100 object-fit-contain"
                                                    height={160}
                                                    alt="Apartment"
                                                />
                                                <h5 className="pt-3 text-center">Apartments</h5>
                                                <div className="m-auto my-3 text-center">
                                                    {["1bhk", "2bhk", "3bhk", "4bhk"].map((bhk) => (
                                                        <div className="form-check form-check-inline" key={bhk}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="apartment-bhk"
                                                                value={"apartment" + bhk}
                                                                id={"apartment" + bhk}
                                                                checked={selectedBHK === bhk && home === "apartment"}
                                                                onChange={() => handleBHKSelect(bhk)} // Added onChange handler
                                                            />
                                                            <label className="form-check-label" htmlFor={"apartment" + bhk}>{bhk.toUpperCase()}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div
                                                className={`card card_check_bhk ${home === "villa" ? "selected" : ""}`}
                                                onClick={() => handleHomeSelect("villa")}
                                            >
                                                <div>
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="home"
                                                        id="villas"
                                                        value="villa"
                                                        checked={home === "villa"}
                                                        onChange={() => handleHomeSelect("villa")} // Added onChange handler
                                                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                                                    />
                                                </div>
                                                <img
                                                    src="/images/vill.jpeg"
                                                    className="w-100 object-fit-contain"
                                                    height={160}
                                                    alt="Villa"
                                                />
                                                <h5 className="pt-3 text-center">Villa</h5>
                                                <div className="m-auto my-3 text-center">
                                                    {["1bhk", "2bhk", "3bhk", "4bhk"].map((bhk) => (
                                                        <div className="form-check form-check-inline" key={bhk}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="villa-bhk"
                                                                value={"villa" + bhk}
                                                                id={"villa" + bhk}
                                                                checked={selectedBHK === bhk && home === "villa"}
                                                                onChange={() => handleBHKSelect(bhk)} // Added onChange handler
                                                            />
                                                            <label className="form-check-label" htmlFor={"villa" + bhk}>{bhk.toUpperCase()}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div
                                                className={`card card_check_bhk ${home === "flat" ? "selected" : ""}`}
                                                onClick={() => handleHomeSelect("flat")}
                                            >
                                                <div>
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="home"
                                                        id="flats"
                                                        value="flat"
                                                        checked={home === "flat"}
                                                        onChange={() => handleHomeSelect("flat")} // Added onChange handler
                                                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                                                    />
                                                </div>
                                                <img
                                                    src="/images/vill.jpeg"
                                                    className="w-100 object-fit-contain"
                                                    height={160}
                                                    alt="flat"
                                                />
                                                <h5 className="pt-3 text-center">Flat</h5>
                                                <div className="m-auto my-3 text-center">
                                                    {["1bhk", "2bhk", "3bhk", "4bhk"].map((bhk) => (
                                                        <div className="form-check form-check-inline" key={bhk}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="flat-bhk"
                                                                value={"flat" + bhk}
                                                                id={"flat" + bhk}
                                                                checked={selectedBHK === bhk && home === "flat"}
                                                                onChange={() => handleBHKSelect(bhk)} // Added onChange handler
                                                            />
                                                            <label className="form-check-label" htmlFor={"flat" + bhk}>{bhk.toUpperCase()}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {step === 2 && (
                            <section className="package">
                                <h3 className="my-4 text-center">
                                    Number of <span className="font_stylish">Rooms?</span>
                                </h3>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <RoomCounter
                                            title="Bedroom"
                                            count={bedrooms}
                                            onAdd={handleAddBedroom}
                                            onRemove={handleRemoveBedroom}
                                        />
                                        <RoomCounter
                                            title="Bathroom"
                                            count={bathrooms}
                                            onAdd={handleAddBathroom}
                                            onRemove={handleRemoveBathroom}
                                        />
                                        <RoomCounter
                                            title="Living"
                                            count={living}
                                            onAdd={handleAddLiving}
                                            onRemove={handleRemoveLiving}
                                        />
                                        <RoomCounter
                                            title="Kitchen"
                                            count={kitchen}
                                            onAdd={handleAddKitchen}
                                            onRemove={handleRemoveKitchen}
                                        />

                                    <div className="col-lg-2">
                                        <div className="box_yesno">
                                            <div>
                                                <h6>Movable Furniture</h6>
                                            </div>
                                            <div className="m-auto mt-4 text-center">
                                                <div className="form-check form-check-inline ">
                                                    <input
                                                        className="mt-2 form-check-input"
                                                        type="radio"
                                                        id="yes"
                                                        name="movable"
                                                        value="yes"
                                                    />
                                                    <label
                                                        className="form-check-label fw-bolder fs-5"
                                                        htmlFor="yes"
                                                    >
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="mt-2 form-check-input"
                                                        type="radio"
                                                        id="no"
                                                        name="movable"
                                                        value="no"
                                                    />
                                                    <label
                                                        className="form-check-label fw-bolder fs-5"
                                                        htmlFor="no"
                                                    >
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="select_packege">
                                    <div className="container">
                                        <div className="pb-5 row">
                                            <h3 className="pb-5 my-5 mb-5 text-center">
                                                Select <span className="font_stylish">Packages</span>
                                            </h3>
                                            <div className="col-lg-4">
                                                <div className="form-check d-flex align-items-center">
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="package"
                                                        id="classic"
                                                    />
                                                    <div className="d-flex align-items-center ps-2">
                                                        <label
                                                            className="form-check-label label_toooltiip"
                                                            htmlFor="classic"
                                                        >
                                                            Classic Home
                                                        </label>
                                                        <TooltipComponent
                                                            info="Discover a comprehensive range of essential home interior solutions tailored to meet all your needs seamlessly."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-check d-flex align-items-center">
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="package"
                                                        id="elite"
                                                    />
                                                    <div className="d-flex align-items-center ps-2">
                                                        <label
                                                            className="form-check-label label_toooltiip"
                                                            htmlFor="elite"
                                                        >
                                                            Elite Residence
                                                        </label>
                                                        <TooltipComponent
                                                            info="Discover a comprehensive range of essential home interior solutions tailored to meet all your needs seamlessly."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="form-check d-flex align-items-center">
                                                    <input
                                                        className="form-check-input big_check"
                                                        type="radio"
                                                        name="package"
                                                        id="highEnd"
                                                    />
                                                    <div className="d-flex align-items-center ps-2">
                                                        <label
                                                            className="form-check-label label_toooltiip"
                                                            htmlFor="highEnd"
                                                        >
                                                            High-End Home
                                                        </label>

                                                        <TooltipComponent
                                                            info="Discover a comprehensive range of essential home interior solutions tailored to meet all your needs seamlessly."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {step === 3 && (
                            <section className="container p-5 my-5 card fill_your_deatil">
                                <h3 className="pb-3 text-center">Fill Your Details</h3>
                                <form className="row">
                                    {["firstName", "lastName", "mobile", "email", "query"].map((field) => (
                                        <div className="mb-3 col-md-6" key={field}>
                                            <input
                                                type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
                                                className="form-control"
                                                name={field}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                pattern={field === "mobile" ? "[0-9]{10}" : undefined}
                                                maxLength={field === "mobile" ? 10 : undefined}
                                                required
                                            />
                                        </div>
                                    ))}
                                </form>
                                <div className="my-4 text-center">
                                    <button className="know_more" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </section>
                        )}

                        <div className="p-5 mx-5 mt-4 d-flex justify-content-between">
                            {step > 1 && (
                                <button className="know_more ms-5 me-auto" onClick={handlePrevious}>
                                    <IoIosArrowBack /> Previous
                                </button>
                            )}
                            {step < 3 && (
                                <button className="know_more ms-auto me-5" onClick={handleNext}>
                                    Next <IoIosArrowForward />
                                </button>
                            )}
                        </div>
                    </main>
                )}

            </MainLayout>
        </div>
    );
};

const RoomCounter = ({ title, count, onAdd, onRemove }) => (
    <div className="col-lg-2">
        <div className="bg-white shadow w-75 rounded-3">
            <div className="d-flex justify-content-between align-items-center">
                <button onClick={onRemove} className="border-0 plusminus">
                    <CiCircleMinus color={'#a9a9a9'} />
                </button>
                <h4>{count}</h4>
                <button onClick={onAdd} className="border-0 plusminus">
                <CiCirclePlus color={'#a9a9a9'} />
                </button>
            </div>
        </div>
        <h4 className="bedroomtext">{title}</h4>
    </div>
);

export default Estimater;
