"use client";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import BackgroundImageRow from "../components/BackgroundImageRow";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import api from "@/utils/api";
import { toast } from "react-toastify";

const RealTimePortfolio = (props) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/cms-reallife-portfolio");
        setPortfolio(response.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError(err.message ?? "Failed to load portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await api.get(
          `/content-manager/slug/reallife-portfolio`
        );
        setSeoData(response.data);
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <div>
      <head>
        <title>{seoData?.title ?? "Real Time 3d Design for your Home"}</title>
        <meta name="title" content={seoData?.metaTitle ?? "Real Life 3D"} />
        <meta
          name="description"
          content={
            seoData?.metaDescription ??
            "Experience real-time 3D design for your home, bringing your vision to life with interactive, detailed visuals for a perfect space transformation."
          }
        />
        <meta
          name="keywords"
          content={
            seoData?.metaKeywords ??
            "design idea, living room interior, living room design, living room decor, modular TV units, wall art, wall designs"
          }
        />
      </head>
      <MainLayout>
        <main>
          <BackgroundImageRow
            sectionBgImages={"contact_wrapper portfolio"}
            sectionBgHeading="Real Life 3D"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription="Explore a curated selection of premium living room interior
             designs and décor ideas at High Creation.
             We offer customizable, functional, and stylish solutions to
             elevate your living space. From modular TV
             units to wall art and innovative wall designs, find all the
             inspiration you need to transform your living
             room. Start browsing today to discover designs that perfectly
             reflect your personal style"
            secBgDesClass="secbgbesclass"
          />

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center alert alert-danger">{error}</div>
          ) : (
            <section className="container my-5">
              <div className="row mx-0">
                <div className="col-lg-7">
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg1"}
                    portfolioImg={portfolio[0]?.image}
                    portfolioTitle={portfolio && portfolio[0]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[0]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[0]?.room_dimension}
                  />
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg2"}
                    portfolioImg={portfolio[1]?.image}
                    portfolioTitle={portfolio && portfolio[1]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[1]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[1]?.room_dimension}
                  />
                </div>
                <div className="col-lg-5">
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg3"}
                    portfolioImg={portfolio[2]?.image}
                    portfolioTitle={portfolio && portfolio[2]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[2]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[2]?.room_dimension}
                  />
                </div>
                <div className="col-lg-12">
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg4"}
                    portfolioImg={portfolio[3]?.image}
                    portfolioTitle={portfolio && portfolio[3]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[3]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[3]?.room_dimension}
                  />
                </div>
                <div className="col-lg-9">
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg5"}
                    portfolioImg={portfolio[4]?.image}
                    portfolioTitle={portfolio && portfolio[4]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[4]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[4]?.room_dimension}
                  />
                </div>
                <div className="col-lg-3">
                  <PortfolioCard
                    cardDetailLink="/gallery-inner"
                    portCard={"card_portfolio portfolio_1"}
                    portfolioImgBg={"portfolioimgall portfoliobg6"}
                    portfolioImg={portfolio[5]?.image}
                    portfolioTitle={portfolio && portfolio[5]?.title}
                    portfolioDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, neque!"
                    portfolioClassCss="text-white w-75 mb-0 my-2 team_designation"
                    // firstKey="Style"
                    // firstValue={portfolio&&portfolio[5]?.style}
                    // secondKey="Room Dimension"
                    // secondValue={portfolio&&portfolio[5]?.room_dimension}
                  />
                </div>
              </div>
            </section>
          )}
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default RealTimePortfolio;
