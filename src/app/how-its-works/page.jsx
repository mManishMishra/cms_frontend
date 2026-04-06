import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import ServicesRightOriginal from "../components/ServicesRightOriginal";
import ServicesLeftOriginal from "../components/ServicesLeftOriginal";
import MainLayout from "../layouts/MainLayout";
// import ServicesRightOriginal from "../components/ServicesRightOriginal";
export const metadata = {
  title: "How High Creation Interior Work",
  description: "How High Creation Interior Works For Residential Projects. Want to know more about work contact us today.",
};
const HowItsWork = () => {
  
  return (
    <div>
       <head>
        <title>
        We make home interiors a breeze!	
        </title>
        <meta
          name="description"
          content="We make home interiors a breeze!	"
        />
        <link rel="canonical" href="https://hcinterior.in/how-its-works" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="We make home interiors a breeze!"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
          <div id="one">
          <ServicesLeftOriginal
          
            column2={
              "col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center"
            }
            ServicesImgUrl="/images/how-it-work/1.png"
            servicesImgAlt="designer"
            servicesImgClass="how_itwork_img"
            column1={"col-lg-8 col-md-8 col-12 d-flex align-items-center"}
            ServicesHeading="Consultation & Requirement Gathering-"
            ServicesDescription="Your comfort is our priority. We offer online consultations, offline discussions, or in-person meetings — choose what works best for you.
Choose the mode that suits your comfort and schedule.
Our team ensures a smooth and personalized experience at every step.
We understand your needs and bring your vision to life.
Get the first design cut of your dream interior to visualize your space better."
            
          />
          </div>

          <div id="two">
          <ServicesRightOriginal
            sectionServices={"services_sec_wrapper2"}
            colum1={
              "col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center"
            }
            ServicesImgUrlRight="/images/how-it-work/2.png"
            servicesImgAltRight="planning"
            servicesImgClass="how_itwork_img"
            colum2={"col-lg-8 col-md-8 col-12 align-items-center  "}
            ServicesHeadingRight="Site Visit & Measurement-"
            ServicesDescriptionRight="Our team conducts a site visit to understand the space and layout.
Accurate measurements are taken to ensure a perfect fit for your design.
This step helps us plan every detail with precision and efficiency.
It also allows us to identify any on-site challenges in advance. A well-measured space is the foundation of flawless interior execution."
            descrClass={"team_description text-white"}
            
          />
           </div>

           <div id="three">
          <ServicesLeftOriginal
            column2={
              "col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center"
            }
            ServicesImgUrl="/images/how-it-work/3.png"
            servicesImgAlt="designer"
            servicesImgClass="how_itwork_img"
            column1={"col-lg-8 col-md-8 col-12 d-flex align-items-center"}
            ServicesHeading="Design Presentation & Finalization-"
            ServicesDescription="We begin by presenting carefully curated design concepts tailored to your preferences.
Detailed layouts, 3D visuals, and material selections are shared for better clarity.
Your feedback is taken into consideration to refine and finalize the design.
Every element is discussed thoroughly to ensure it aligns with your vision.
Final approval is taken before moving ahead with execution.
"
            
          />
              </div>


              <div id="four">
          <ServicesRightOriginal
            sectionServices={"services_sec_wrapper2"}
            colum1={
              "col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center"
            }
            ServicesImgUrlRight="/images/how-it-work/10.png"
            servicesImgAltRight="planning"
            servicesImgClass="how_itwork_img"
            colum2={"col-lg-8 col-md-8 col-12  "}
            ServicesHeadingRight="Quotation & Agreement-"
            ServicesDescriptionRight="
A detailed quotation will be provided outlining all costs and services.
It ensures complete transparency in pricing with no hidden charges.
Once the quotation is approved, an agreement will be shared for mutual clarity.
The agreement will cover scope of work, timelines, payment terms, and warranties.
This helps ensure smooth execution and builds trust throughout the project.
"
            descrClass={"team_description text-white"}
            
          />


</div>

<div id="five">
          <ServicesLeftOriginal
            column2={
              "col-lg-4 col-md-4 col-12 d-flex align-items-center justify-content-center"
            }
            ServicesImgUrl="/images/how-it-work/5.png"
            servicesImgAlt="designer"
            servicesImgClass="how_itwork_img"
            column1={"col-lg-8 col-md-8 col-12 d-flex align-items-end"}
            ServicesHeading="Execution & Handover"
            ServicesDescription="Our expert team ensures smooth and timely project execution as per the approved design. Quality checks are conducted at every stage to maintain high standards. Regular updates are shared to keep you informed throughout the process. Final inspection is done to ensure everything is perfect before handover. Your dream space is handed over, ready for you to move in and enjoy."
            
          />
          </div>
           
         
          
          <hr></hr>
        </main>
      </MainLayout>
    </div>
  );
};

export default HowItsWork;
