"use client";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import BackgroundImageRow from "../components/BackgroundImageRow";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const Designidea = () => {
  const [designIdea, setDesignIdea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchDesignIdea = async () => {
      try {
        const response = await api.get("/cms-parent-child/award_gallery");
        setDesignIdea(response.data);
      } catch (err) {
        console.error("Error fetching design idea:", err);
        setError("Failed to load design ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignIdea();
  }, []);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await api.get("/content-manager/slug/award-gallery");
        setSeoData(response.data);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    fetchSeoData();
  }, []);

  // Sort records by ID in descending order (newest first)
  const sortedDesignIdea = [...designIdea].sort((a, b) => b.id - a.id);

  // Get the 8 oldest records
  const staticRecords = sortedDesignIdea.slice(-8); // Last 8 records (oldest)

  // Get the latest records (excluding the last 8)
  const latestRecords = sortedDesignIdea.slice(0, -8); // Everything except last 8
 console.log('latestRecords',latestRecords);
  return (
    <div>
      <head>
        <title>{seoData?.title ?? "High Creation Interior - Interior Design Gallery"}</title>
        <meta name="title" content={seoData?.metaTitle ?? "High Creation Interior - Interior Design Gallery"} />
        <meta
          name="description"
          content={seoData?.metaDescription ?? "Explore Interior Design gallery designed by Top interior designers at High Creation Interior."}
        />
        <meta
          name="keywords"
          content={seoData?.metaKeywords ?? "design idea, living room interior, living room design, living room decor"}
        />
      </head>
      <MainLayout>
        <main>
          <BackgroundImageRow
            sectionBgImages={"contact_wrapper design_gallery_banner"}
            sectionBgHeading="Design Gallery"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Explore our curated collection of stunning designs that reflect creativity, craftsmanship, and attention to detail. Each project tells a story — brought to life with passion and precision."
            secBgDesClass="secbgbesclass"
          />

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center alert alert-danger">{error}</div>
          ) : (
            <section className="container my-5">
              
                {/* Check if static records exist */}
                {staticRecords.length > 0 ? (
              <div className="row mx-0">
                    <div className="col-lg-7">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[0]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg1"}
                        portfolioImg={staticRecords[0]?.child_content?.image}
                        portfolioTitle={staticRecords[0]?.child_content?.title}
                      />
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[1]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg2"}
                        portfolioImg={staticRecords[1]?.child_content?.image}
                        portfolioTitle={staticRecords[1]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-5">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[2]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg3"}
                        portfolioImg={staticRecords[2]?.child_content?.image}
                        portfolioTitle={staticRecords[2]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-12">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[3]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg4"}
                        portfolioImg={staticRecords[3]?.child_content?.image}
                        portfolioTitle={staticRecords[3]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-9">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[4]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg5"}
                        portfolioImg={staticRecords[4]?.child_content?.image}
                        portfolioTitle={staticRecords[4]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-3">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[5]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg6"}
                        portfolioImg={staticRecords[5]?.child_content?.image}
                        portfolioTitle={staticRecords[5]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-6">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[6]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg7"}
                        portfolioImg={staticRecords[6]?.child_content?.image}
                        portfolioTitle={staticRecords[6]?.child_content?.title}
                      />
                    </div>
                    <div className="col-lg-6">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${staticRecords[7]?.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={"portfolioimgall desig_gal_bg8"}
                        portfolioImg={staticRecords[7]?.child_content?.image}
                        portfolioTitle={staticRecords[7]?.child_content?.title}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
             
             <div className="row mx-0">
                  {latestRecords.map((item) => (
                    <div key={item.id} className="col-lg-6">
                      <PortfolioCard
                        cardDetailLink={`/design-idea/gallery?id=${item.id}`}
                        portCard={"card_portfolio portfolio_1"}
                        portfolioImgBg={`portfolioimgall desig_gal_bg8`}
                        portfolioImg={item.child_content?.image}
                        portfolioTitle={item.child_content?.title}
                      />
                    </div>
                  ))}
                </div>
            </section>
          )}
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default Designidea;
