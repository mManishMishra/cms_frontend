import dynamic from "next/dynamic";
import { format, isValid, parseISO } from "date-fns";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import React, { Fragment } from "react"; 

// --- CLIENT IMPORTS ---
import LazySection from "./clientHome/LazySection";
import ContactForm from "./clientHome/ContactForm";

// --- SERVER IMPORTS ---
import RowImage from "../components/RowImage";
import Card from "../components/Card";
import VideoCardHome from "../components/VideoCardHome";
import BgImageCard from "../components/BgImageCard";
import RoomOfice from "../components/RoomOfice";
import IconBox from "../components/IconBox";

// --- DYNAMIC IMPORTS ---
const SliderCard = dynamic(() => import("../components/SliderCard"));
const VideoTestimonialSlider = dynamic(() => import("../components/VideoTestimonialSlider"));
const CounterRow = dynamic(() => import("../components/CounterRow"));
const Blogs = dynamic(() => import("../components/Blogs"));

// --- DATA FETCHING WITH FETCH (FIXED) ---
async function getRemainingData() {
  const baseURL = process.env.NODE_ENV === "development" 
      ? process.env.NEXT_PUBLIC_API_DEV_URL 
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  // Helper to fetch with caching
  const fetchData = async (endpoint) => {
      try {
          const res = await fetch(`${baseURL}${endpoint}`, { next: { revalidate: 60 } });
          if (!res.ok) return [];
          const json = await res.json();
          return json; // Adjust based on if your API returns data directly or inside a key
      } catch (e) {
          console.error(`Error fetching ${endpoint}:`, e);
          return [];
      }
  };

  try {
    const [designIdea, h3d_gallery, contentData, blogsData] = await Promise.all([
      fetchData("/cms-parent-child/designer_choice"),
      fetchData("/cms-parent-child/h3d_gallery"),
      fetchData("/cms-content/home_page_content_what_we_are"),
      fetchData("/cms-blog"),
    ]);

    return {
      designIdea: designIdea || [],
      h3d_gallery: h3d_gallery || [],
      content: contentData || [], 
      blogs: Array.isArray(blogsData) ? blogsData.slice(0, 3) : [],
    };
  } catch (err) {
    console.error("Server Fetch Error (Remaining Data):", err);
    return { designIdea: [], h3d_gallery: [], content: [], blogs: [] };
  }
}

const formatDate = (dateString) => {
  const date = dateString ? parseISO(dateString) : null;
  return date && isValid(date) ? format(date, "dd-MM-yyyy") : "Invalid Date";
};

export default async function HomeContent() {
  const { designIdea, h3d_gallery, content, blogs } = await getRemainingData();

  // Sort Descending (Newest First)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);
  
  // FIX: Take the First 5 (Newest)
  // const staticRecords = sortedDesignIdea.slice(0, 5); 
  const staticRecords = sortedDesignIdea.slice(-5);

  const workProcessConfig = [
    {
      id: 1, contentIdx: 20, number: "01",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0", boxClass: "box1",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2",
    },
    {
      id: 2, contentIdx: 19, number: "02",
      col1Class: "col-lg-2 col-md-3 col-6 ps-lg-3 pe-0", boxClass: "box_2",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box2_data",
    },
    {
      id: 3, contentIdx: 18, number: "03",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3", boxClass: "box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0", dataBoxClass: "box3_data",
    },
    {
      id: 4, contentIdx: 17, number: "04",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box4 box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box4_data",
    },
    {
      id: 5, contentIdx: 16, number: "05",
      col1Class: "col-lg-2 col-md-3 col-6 pe-0 ps-lg-3 mt-lg-3", boxClass: "box5 box_3",
      col2Class: "col-lg-2 col-md-3 col-6 ps-0 mt-lg-3", dataBoxClass: "box5_data",
    },
  ];

  return (
    <>
      {/* 2. About Us */}
      <section className="mt-2 mb-5 mt-lg-5 about_wrapper">
        <RowImage
          imageColLg="6" imageColXl="6" imageColMd="6" imageCol="12"
          ImgAbout={content[2]?.json_content?.image}
          ImgAboutClass={"aboout_img object-fit-contain w-100"}
          imgAlt="About High Creation"
          titleHeading={content[2]?.json_content?.title}
          subHeading={content[2]?.json_content?.description}
          subHeadingClass="font_stylish ps-3"
          description={content[2]?.json_content?.designation}
          textAboutBtn="READ MORE"
          btnLink="/about-us"
          textAboutBtnCLass="read_morebtn"
        />
      </section>

      {/* 3. Explore What We Offer */}
      <div className="my-5 oofer_card">
          <div className="container">
            <div className="mx-0 row g-4">
              <h2 className="pb-3 font_about"><span className="font_stylish">Explore</span> What we Offer</h2>
              {[23, 24, 22, 21].map((index) => (
                <div className="col-lg-3 col-md-6 col-12" key={index}>
                  <Card 
                    cardNameALl="cardoffer" 
                    imgSrc={content[index]?.json_content?.image} 
                    imgAlt={"room"} 
                    imgClass={"offerimg"} 
                    titleCard={content[index]?.json_content?.title} 
                    descriptionCard={content[index]?.json_content?.description} 
                    buttonTextCard={"Know More"} 
                    linkCard={content[index]?.json_content?.designation} 
                  />
                </div>
              ))}
              <div className="mt-5 text-end">
                <a href="/what-we-offer" className="pe-2 know_more fs-6">View More <MdKeyboardArrowRight className="fs-4" /> </a>
              </div>
            </div>
          </div>
        </div>

      {/* 4. The Way We Work */}
      <div className="way_wework">
          <div className="container">
            <h3 className="text-center font_about">The Way <span className="font_stylish">We Work</span></h3>
            <div className="mx-0 row justify-content-center g-lg-0">
              {workProcessConfig.map((step) => (
                <Fragment key={step.id}>
                  <div className={step.col1Class}>
                    <div className={step.boxClass}>
                      <h3 className="box_heading">{step.number}</h3>
                    </div>
                  </div>
                  <div className={step.col2Class}>
                    <div className={step.dataBoxClass}>
                      <div className="px-3 px-lg-4 py-4">
                        {content[step.contentIdx]?.json_content?.image && (
                          <Image 
                            src={content[step.contentIdx]?.json_content?.image} 
                            width={60} 
                            height={60} 
                            alt="icon" 
                            style={{ height: 'auto' }}
                          />
                        )}
                        <h4 className="py-2 text-white">{content[step.contentIdx]?.json_content?.title}</h4>
                        <p className="box_para">{content[step.contentIdx]?.json_content?.description}</p>
                        <div className="text-lg-center">
                          <a className="know_mores" href={content[step.contentIdx]?.json_content?.designation}>Know More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

      {/* 5. Video Section */}
      <LazySection placeholderHeight="500px">
        <div className="container my-5 video">
          <div className="row mx-0">
            <h3 className="pb-2 text-center"><span className="font_stylish">{content[0]?.json_content?.title}</span></h3>
            <p className="pb-4 text-center">{content[0]?.json_content?.description}</p>
            <div className="col-lg-12 col-md-6 col-12">
              <VideoCardHome videoUrl={content[0]?.json_content?.designation} imageUrl={content[0]?.json_content?.image} />
            </div>
          </div>
        </div>
      </LazySection>

      {/* Design Idea */}
      <LazySection placeholderHeight="700px">
        <div className="pt-5 my-5 designidea" style={{ backgroundImage: `url(${content[1]?.json_content?.image})` }}>
          <div className="container">
            <div className="mx-0 row ">
              <h2 className="pb-5 text-center font_about">{content[1]?.json_content?.title} <span className="font_stylish">{content[1]?.json_content?.description}</span></h2>
              <div className="mb-5 col-lg-6 col-md-6 col-12 mb-lg-0">
                <RoomOfice cardRoomOffice={"card card_room border-0"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[15]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[15]?.json_content?.title} cardText={content[15]?.json_content?.description} btnText="Know More " btnLink={content[15]?.json_content?.designation} btnClass={"btn_knowmoreblack"} />
              </div>
              <div className="col-lg-6 col-md-6 col-12 mt-4 mt-lg-0">
                <RoomOfice cardRoomOffice={"card card_room border-0"} badge_circle="badge_circleblack" arrowIcon="images/arrow_icon.png" altArrow="arrow" width="80" imageRoom_Office={content[14]?.json_content?.image} roomImg="residential_imgs" altImage="room" cardBody="card_body office_card_body" cardTitle={content[14]?.json_content?.title} cardText={content[14]?.json_content?.description} btnText="Know More " btnLink={content[14]?.json_content?.designation} btnClass={"btn_knowmoreblack"} />
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Ready To Go */}
      <LazySection placeholderHeight="400px">
        <section className="my-5">
          <div className="container">
            <div className="mx-0 row position-relative">
              <span className="font_stylish ss ms-lg-5">Ready ToGo Designs</span>
              <h3 className="text-center font_about with_heading w-auto">with Our Exclusive Design Choices</h3>
            </div>
            <SliderCard />
          </div>
        </section>
      </LazySection>

      {/* Designer Choice */}
      <LazySection placeholderHeight="800px">
        <div className="my-5 bgsectionroom">
          <div className="container ">
            <div className="row position-relative mx-0">
              <span className="pb-0 mb-0 font_stylish d-grid ms-lg-5 designer">Designer&apos;s Choice:</span>
              <h3 className="pb-4 w-auto font_about excluisive_home_heading">Exclusive Design Specials</h3>
            </div>
            <div className="mt-4 row g-4 mx-0">
              {staticRecords.map((record, i) => (
                <div className={`col-lg-${i === 0 || i === 3 ? '5' : i === 4 ? '12' : '7'} col-md-6 col-12`} key={record.id}>
                  <BgImageCard style={{ backgroundImage: `url(${record?.child_content?.image})` }} cardLinkTag={`/designer-choice/gallery?id=${record?.id}`} designerCardBgDiv={"designercard designercardimg1"} titleBgImage={record?.child_content?.title} descriptionBg={record?.child_content?.description} />
                </div>
              ))}
              <div className="col-lg-12 text-right">
                <div className="button_text"><a href="/designer-choice" className="know_more">Know More</a></div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Celebrating Excellence */}
      <LazySection placeholderHeight="300px">
        <div className="my-5 celebereting">
          <div className="container">
            <div className="mx-0 row">
              <h3 className="text-center"><span className="font_stylish">Celebrating Excellence:</span></h3>
              <CounterRow 
                ImgCounter={content[13]?.json_content?.image} 
                ImgCounterClass="w-100" 
                imgAltCounter={content[13]?.json_content?.title} 
                divClassCounter="text-end" 
                counterStart="0" 
                counterEnd={content[12]?.json_content?.title} 
                counterDuration="5" 
                counterSuffix="" 
                counterStart2="0" 
                counterEnd2={content[11]?.json_content?.title} 
                counterDuration2="5" 
                counterSuffix2="" 
                counterStart3="0" 
                counterEnd3={content[10]?.json_content?.title} 
                counterDuration3="5" 
                counterSuffix3="" 
                counterStart4="0" 
                counterEnd4={content[9]?.json_content?.title} 
                counterDuration4="5" 
                er="" 
                descriptionCounter={content[13]?.json_content?.description} 
                textAboutBtnCounter="View Our Projects" 
                btnLink="/residential-projects" 
                textAboutBtnCLass="know_more me-lg-4" 
                textAboutBtnCounter2="All Services" 
                textAboutBtnCLass2="btn_services" 
                btnLink2={content[13]?.json_content?.designation} 
              />
            </div>
          </div>
        </div>
      </LazySection>

      {/* Gallery */}
      <LazySection placeholderHeight="600px">
        <div className="savedesign">
          <div className="container">
            <div className="mx-0 row g-4 justify-content-center ">
              <div className="mb-5 position-relative">
                <div><h3 className="mb-0"><span className="font_stylish">{content[8]?.json_content?.title}</span></h3></div>
                <h3 className="pb-0 pb-lg-4 font_about mt-0 designs_lets">{content[8]?.json_content?.description}</h3>
              </div>
              {h3d_gallery.map((hd_gallery, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <Card 
                    cardLinkName={`/design-idea/gallery?id=${hd_gallery?.id}`} 
                    cardNameALl="cardoffer" 
                    imgSrc={hd_gallery.child_content?.image} 
                    imgAlt={"room"} 
                    imgClass={"bhkimg"} 
                    titleCard={hd_gallery.child_content.title} 
                    titleClass="text-center mb-0 pb-0" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LazySection>

      {/* Let Transform */}
      <LazySection placeholderHeight="400px">
        <section className="mb-5 lettransformbg" style={{ backgroundImage: `url(${content[7]?.json_content?.image})` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-3"><Image src="/images/home_Icon.png" width={150} height={150} alt="home-icon" /></div>
              <div className="col-lg-10 col-md-9 col-9">
                <div className="pt-3 text-end">
                  <h3 className="text-white letheading">{content[7]?.json_content?.title}</h3>
                  <p className="text-white">{content[7]?.json_content?.description}</p>
                  <a href={content[7]?.json_content?.designation} className="know_more">Know More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Blogs */}
      <LazySection placeholderHeight="500px">
        <div className="my-5 blogs_wrapper">
          <div className="container">
            <div className="row g-2 g-lg-4 justify-content-center mx-1">
              <h3 className="pb-2 pb-lg-4 text-center font_about">Blogs</h3>
              {blogs.map((blog, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <Blogs 
                    blogCard="blog_cards" 
                    imgSrcBlog={blog?.image || "/images/default.jpg"} 
                    blogImglink={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} 
                    blogImgALt={blog?.title || "Blog Image"} 
                    blogClassImg="card-img-top rounded-4 object-fit-cover" 
                    blogdate={blog?.published_on ? formatDate(blog.published_on) : "Date not available"} 
                    blogTitle={blog?.title || "Untitled Blog"} 
                    blogDescription={blog?.description || "No description available"} 
                    buttonBlog="Continue Reading" 
                    blogBtnHref={`/${blog?.seo_content?.slug || `blog-detail?id=${blog?.id}`}`} 
                    writer_name={blog?.writer_name || "High Creation"} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LazySection>

      <hr />
      
      {/* Testimonials */}
      <LazySection placeholderHeight="400px">
        <section className="my-5">
          <h3 className="text-center font_stylish">What People Say</h3>
          <VideoTestimonialSlider />
        </section>
      </LazySection>
      
      <hr />
      
      {/* Icon Box */}
      <LazySection placeholderHeight="300px">
        <section className="container-fluid my-5 iconbox">
          <div className="row justify-content-center mx-0">
            <div className="col-lg-11">
              <div className="row justify-content-center align-items-center g-4">
                <div className="col-12 col-md-6 col-lg-4"><IconBox iconUrl={content[6]?.json_content?.image} iconAlt="checkicon" iconWidth="70" iconDescription={content[6]?.json_content?.description} descr="descriptionClass" /></div>
                <div className="col-12 col-md-6 col-lg-4"><IconBox iconUrl={content[5]?.json_content?.image} iconAlt="checkicon" iconWidth="70" iconDescription={content[5]?.json_content?.description} descr="descriptionClass" /></div>
                <div className="col-12 col-md-6 col-lg-4"><IconBox iconUrl={content[4]?.json_content?.image} iconAlt="checkicon" iconWidth="70" iconDescription={content[4]?.json_content?.description} descr="descriptionClass" /></div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
      
      <hr />

      {/* Contact Form */}
      <LazySection placeholderHeight="600px">
         <ContactForm mapSrc={content[3]?.json_content?.description} />
      </LazySection>

      <hr />
    </>
  );
}