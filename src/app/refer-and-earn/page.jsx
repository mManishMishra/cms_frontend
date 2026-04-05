import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import BoxIcon from "../components/BoxIcon";
export const metadata = {
  title: "Refer & Earn - High Creation Interior",
  description:
    "Refer & Earn - High Creation Interior",
};
const ReferEarn = () => {
  return (
    <div>
       <head>
        <title>Refer & Earn - High Creation Interior	 </title>
        <meta
          name="description"
          content="Refer & Earn - High Creation Interior	"
        />
        <link rel="canonical" href="https://hcinterior.in/refer-and-earn" />	
      </head>
      <MainLayout>
        <BackgroundImageWithHeading
          sectionBgImages={"  refer-and-earn refer_and_earn_banner  "}
          sectionBgHeading="Refer & Earn"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Get all the information you need"
          secBgDesClass={"text-center text-white"}
        />
        <section className="privacy my-5">
          <div className="container">
            <div className="text-center">
              <h2>High Creation Interior</h2>
              <h3>
                <span className="font_stylish" style={{ color: "#ff914d" }}>
                  Refer & Earn
                </span>
              </h3>
              <div className="row g-4 py-4 mx-0">
                <div className="col-12 col-lg-4 col-md-4">
                  <BoxIcon
                    iconImage="/images/referral.svg"
                    iconAlt=""
                    iconWidth=""
                    IconBoxHeading="Refer Your Friends"
                    IconBoxDescription="Refer your friend and unlock amazing rewards!"
                  />
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <BoxIcon
                    iconImage="/images/book.svg"
                    iconAlt=""
                    iconWidth=""
                    IconBoxHeading="They Book With Us"
                    IconBoxDescription="When your friend books with us, both of you enjoy exclusive benefits."
                  />
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <BoxIcon
                    iconImage="/images/reward.svg"
                    iconAlt=""
                    iconWidth=""
                    IconBoxHeading="And Get Exciting Rewards"
                    IconBoxDescription="Earn exciting rewards together and make unforgettable memories!"
                  />
                </div>
               
              </div>

              <div className="pt-4 table">
             <div className="row justify-content-center mx-0">
                <div className="col-lg-10">
                <div className="row justify-content-center">
                  <div className="col-lg-5 pe-lg-0">
                  <div
  className="bg-image"
  style={{
    backgroundImage: "url('/images/refer-and-earn.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  }}
></div>
                  </div>
                  <div className="col-lg-7 ps-lg-0">
                    <div className="refer_form " style={{
    
  
  }}>
                      <h4 className="text-black form_heading mb-3">
                        Refer and Earn
                      </h4>
                      <form className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            placeholder="Your Friend's Name"
                            required=""
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom05"
                            placeholder="Your Friend's Number"
                            required=""
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="validationCustom03"
                            placeholder="Your Friend's Email"
                            required=""
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <select
                            className="form-select form-control"
                            aria-label="Default select example"
                            defaultValue=""
                          >
                            <option value="" hidden>
                              Place
                            </option>
                            <option value="1">Noida</option>
                            <option value="2">New delhi</option>
                            <option value="3">Agra</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            placeholder="Other Place"
                            required=""
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom06"
                            placeholder="your Phone No."
                            required=""
                          />
                        </div>

                        <div className="col-12 mt-3 d-flex m-auto justify-content-center">
                          <button
                            className="btn know_more px-5 py-2"
                            type="submit"
                          >
                            Submit Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                </div>
             </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
      </MainLayout>
    </div>
  );
};

export default ReferEarn;
