"use client"
import RowImage from "../components/RowImage";
import ProductCard from "../components/ProductCard";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const imageBaseUrl = "https://high.creation.dev.api.crudbyte.com/uploads/";


const Product = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [seoData, setSeoData] = useState({});

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        designerName: "",
        termsAccepted: false,
      });

      const [submissionError, setSubmissionError] = useState("");
      const [submissionMessage, setSubmissionMessage] = useState("");
      const [fieldErrors, setFieldErrors] = useState({
        fullName: false,
        phoneNumber: false,
        email: false,
        designerName: false,
        termsAccepted: false,
      });

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const response = await api.get("/cms-product");
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message ?? "Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchSeoData = async () => {
          try {
            const response = await api.get(`/content-manager/slug/product`);
            setSeoData(response.data);
          } catch (err) {
            console.error("Error fetching SEO data:", err);
          }
        };
    
        fetchSeoData();
      }, []);

      // Handle input change for text fields
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      // Handle checkbox change
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
      };

      // Validate form fields
      const validateForm = () => {
        const errors = {
          fullName: formData.fullName === "",
          phoneNumber: formData.phoneNumber === "",
          email: formData.email === "",
          designerName: formData.designerName === "",
          termsAccepted: !formData.termsAccepted,
        };

        setFieldErrors(errors);

        // Return true if no errors
        return !Object.values(errors).some((error) => error === true);
      };

      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
          setSubmissionError("Please fill in all required fields and accept the terms.");
          return;
        }

        try {
          // Send POST request to save form data
          const response = await api.post("/product-form", formData);

          // Handle success response
          if (response.status === 201) {
            setSubmissionMessage("Form submitted successfully!");
            setFormData({
              fullName: "",
              phoneNumber: "",
              email: "",
              designerName: "",
              termsAccepted: false,
            });
          } else {
            setSubmissionError("Failed to submit form. Please try again.");
          }
        } catch (error) {
          setSubmissionError("Error submitting form. Please try again.");
        } finally {
          // Clear error messages after 5 seconds
          setTimeout(() => {
            setSubmissionError("");
            setSubmissionMessage("");
          }, 5000);
        }
      };

    return (
        <div>
            <head>
                <title>{seoData?.title ?? "Product"}</title>
                <meta name="title" content={seoData?.metaTitle ?? "Product"} />
                <meta name="description" content={seoData?.metaDescription ?? "Explore a curated selection of premium living room interior designs and décor ideas at High Creation."} />
                <meta name="keywords" content={seoData?.metaKeywords ?? "design idea, living room interior, living room design, living room decor, modular TV units, wall art, wall designs"} />
            </head>
           
            <MainLayout>
                <main className="my-5">
                    <RowImage
                        imageColLg="4"
                        imageColXl="4"
                        imageColMd="4"
                        imageCol="12"
                        ImgAbout="/images/fastTrack_Slide1.webp"
                        ImgAboutClass={"w-100 pe-4"}
                        imgAlt="product"
                        titleHeading="Living Room Interior Designs"
                        subHeading=""
                        description="Explore a curated selection of premium living room interior designs and décor ideas at High Creation. We offer customizable, functional, and stylish
solutions to elevate your living space. From modular TV units to wall art and innovative wall designs, find all the inspiration you need to transform
your living room. Start browsing today to discover designs that perfectly reflect your personal style."
                    />
                     {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center alert alert-danger">{error}</div>
            ) : (
                    <div className="container">
                        <div className="mx-0 row g-4">
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg1"}
                                    productImg={`${imageBaseUrl}${products&&products[0].image}`}
                                    descriptionBg={products&&products[0].description}
                                    ratingBg={`${products&&products[0].rating}(${products&&products[0].rating_count})`}
                                    productTitle={products&&products[0].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[0].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[0].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg2"}
                                    productImg={`${imageBaseUrl}${products&&products[1].image}`}
                                    descriptionBg={products&&products[1].description}
                                    ratingBg={`${products&&products[1].rating}(${products&&products[1].rating_count})`}
                                    productTitle={products&&products[1].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[1].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[1].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg3"}
                                    productImg={`${imageBaseUrl}${products&&products[2].image}`}
                                    descriptionBg={products&&products[2].description}
                                    ratingBg={`${products&&products[2].rating}(${products&&products[2].rating_count})`}
                                    productTitle={products&&products[2].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[2].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[2].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg4"}
                                    productImg={`${imageBaseUrl}${products&&products[3].image}`}
                                    ratingBg={`${products&&products[3].rating}(${products&&products[3].rating_count})`}
                                    productTitle={products&&products[3].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style "
                                    firstValue={products&&products[3].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[3].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg5"}
                                    productImg={`${imageBaseUrl}${products&&products[4].image}`}
                                    descriptionBg={products&&products[4].description}
                                    ratingBg={`${products&&products[4].rating}(${products&&products[4].rating_count})`}
                                    productTitle={products&&products[4].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[4].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[4].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg6"}
                                    productImg={`${imageBaseUrl}${products&&products[5].image}`}
                                    descriptionBg={products&&products[5].description}
                                    ratingBg={`${products&&products[5].rating}(${products&&products[5].rating_count})`}
                                    productTitle={products&&products[5].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[5].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[5].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg7"}
                                    productImg={`${imageBaseUrl}${products&&products[6].image}`}
                                    descriptionBg={products&&products[6].description}
                                    ratingBg={`${products&&products[6].rating}(${products&&products[6].rating_count})`}
                                    productTitle={products&&products[6].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style "
                                    firstValue={products&&products[6].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[6].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg8"}
                                    productImg={`${imageBaseUrl}${products&&products[7].image}`}
                                    descriptionBg={products&&products[7].description}
                                    ratingBg={`${products&&products[7].rating}(${products&&products[7].rating_count})`}
                                    productTitle={products&&products[7].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[7].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[7].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg9"}
                                    productImg={`${imageBaseUrl}${products&&products[8].image}`}
                                    descriptionBg={products&&products[8].description}
                                    ratingBg={`${products&&products[8].rating}(${products&&products[8].rating_count})`}
                                    productTitle={products&&products[8].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[8].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[8].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                        </div>
                    </div>
            )}

                    <section className="form_background">
                        <div className="container">
                            <div className="row">
                                <h3 className="text-white">Styles to Suit Every Budget</h3>
                                <p className="text-white">
                                    Get Your Dream house today. Let Our experts help you.
                                </p>
                                            {submissionError && (
                                                <div className="text-center alert alert-danger">{submissionError}</div>
                                            )}
                                            {submissionMessage && (
                                                <div className="text-center alert alert-success">{submissionMessage}</div>
                                            )}
                                <div className="col-lg-5">
                                    <div className="">
                                        {/* <form className="row">
                                            <div className="mb-3 col-md-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom01"
                                                    placeholder="Full Name"
                                                    required=""
                                                />
                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected>Phone No.</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>

                                            <div className="mb-3 col-md-8">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="validationCustom03"
                                                    placeholder="Email"
                                                    required=""
                                                />
                                            </div>

                                            <div className="mb-3 col-md-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom01"
                                                    placeholder="Designer Name"
                                                    required=""
                                                />
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="invalidCheck"
                                                        required=""
                                                    />
                                                    <label
                                                        className="text-white form-check-label"
                                                        htmlFor="invalidCheck "
                                                    >
                                                        By submitting this form, you agree to the{" "}
                                                        <a href="" className="text-warning">
                                                            privacy policy
                                                        </a>{" "}
                                                        &{" "}
                                                        <a href="" className="text-warning">
                                                            terms and conditions
                                                        </a>
                                                    </label>
                                                    <div className="text-white invalid-feedback">
                                                        You must agree before submitting.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                                                <button className="btn know_more w-100" type="submit">
                                                    SEND
                                                </button>
                                            </div>
                                        </form> */}
                                        <form onSubmit={handleSubmit} className="row">
                                            <div className="mb-3 col-md-12">
                                                <input
                                                    type="text"
                                                    className={`form-control ${fieldErrors.fullName ? "is-invalid" : ""}`}
                                                    placeholder="Full Name"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {fieldErrors.fullName && (
                                                    <div className="invalid-feedback">Please enter your full name.</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control ${fieldErrors.phoneNumber ? "is-invalid" : ""}`}
                                                    placeholder="Phone No."
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {fieldErrors.phoneNumber && (
                                                    <div className="invalid-feedback">Please enter your phone number.</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-8">
                                                <input
                                                    type="email"
                                                    className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {fieldErrors.email && (
                                                    <div className="invalid-feedback">Please enter a valid email address.</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-12">
                                                <input
                                                    type="text"
                                                    className={`form-control ${fieldErrors.designerName ? "is-invalid" : ""}`}
                                                    placeholder="Designer Name"
                                                    name="designerName"
                                                    value={formData.designerName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {fieldErrors.designerName && (
                                                    <div className="invalid-feedback">Please enter the designer&apos;s name.</div>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className={`form-check-input ${fieldErrors.termsAccepted ? "is-invalid" : ""}`}
                                                        type="checkbox"
                                                        name="termsAccepted"
                                                        checked={formData.termsAccepted}
                                                        onChange={handleCheckboxChange}
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="invalidCheck">
                                                        By submitting this form, you agree to the{" "}
                                                        <a href="" className="text-warning">privacy policy</a> &{" "}
                                                        <a href="" className="text-warning">terms and conditions</a>.
                                                    </label>
                                                    {fieldErrors.termsAccepted && (
                                                        <div className="invalid-feedback">You must agree before submitting.</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="m-auto mt-3 col-12 d-flex justify-content-center">
                                                <button className="know_more w-100" type="submit">
                                                    SEND
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center alert alert-danger">{error}</div>
            ) : (
                    <div className="container my-5">
                        <div className="mx-0 row g-4">
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg10"}
                                    productImg={`${imageBaseUrl}${products&&products[9].image}`}
                                    descriptionBg={products&&products[9].description}
                                    ratingBg={`${products&&products[9].rating}(${products&&products[9].rating_count})`}
                                    productTitle={products&&products[9].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[9].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[9].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg11"}
                                    productImg={`${imageBaseUrl}${products&&products[10].image}`}
                                    descriptionBg={products&&products[10].description}
                                    ratingBg={`${products&&products[10].rating}(${products&&products[10].rating_count})`}
                                    productTitle={products&&products[10].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[10].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[10].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg12"}
                                    productImg={`${imageBaseUrl}${products&&products[11].image}`}
                                    descriptionBg={products&&products[11].description}
                                    ratingBg={`${products&&products[11].rating}(${products&&products[11].rating_count})`}
                                    productTitle={products&&products[11].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[11].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[11].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg13"}
                                    productImg={`${imageBaseUrl}${products&&products[12].image}`}
                                    descriptionBg={products&&products[12].description}
                                    ratingBg={`${products&&products[12].rating}(${products&&products[12].rating_count})`}
                                    productTitle={products&&products[12].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style "
                                    firstValue={products&&products[12].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[12].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg14"}
                                    productImg={`${imageBaseUrl}${products&&products[13].image}`}
                                    descriptionBg={products&&products[13].description}
                                    ratingBg={`${products&&products[13].rating}(${products&&products[13].rating_count})`}
                                    productTitle={products&&products[13].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[13].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[13].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg15"}
                                    productImg={`${imageBaseUrl}${products&&products[14].image}`}
                                    descriptionBg={products&&products[14].description}
                                    ratingBg={`${products&&products[14].rating}(${products&&products[14].rating_count})`}
                                    productTitle={products&&products[14].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[14].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[14].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg16"}
                                    productImg={`${imageBaseUrl}${products&&products[15].image}`}
                                    descriptionBg={products&&products[15].description}
                                    ratingBg={`${products&&products[15].rating}(${products&&products[15].rating_count})`}
                                    productTitle={products&&products[15].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style "
                                    firstValue={products&&products[15].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[15].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg17"}
                                    productImg={`${imageBaseUrl}${products&&products[16].image}`}
                                    descriptionBg={products&&products[16].description}
                                    ratingBg={`${products&&products[16].rating}(${products&&products[16].rating_count})`}
                                    productTitle={products&&products[16].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[16].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[16].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <ProductCard
                                    cardName="card_product"
                                    prodctImgBg={"product_img product_img_bg18"}
                                    productImg={`${imageBaseUrl}${products&&products[17].image}`}
                                    descriptionBg={products&&products[17].description}
                                    ratingBg={`${products&&products[17].rating}(${products&&products[17].rating_count})`}
                                    productTitle={products&&products[17].title}
                                    productTitleClass="product_heading"
                                    firstKey="Style"
                                    firstValue={products&&products[17].style}
                                    secondKey="Room Dimension"
                                    secondValue={products&&products[17].room_dimension}
                                    productButton="View Design"
                                />
                            </div>
                        </div>
                        <nav aria-label="Page navigation example mt-4">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link">Previous</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
            )}
                    <hr className="mt-5" />
                </main>
            </MainLayout>
        </div>
    );
};

export default Product;
