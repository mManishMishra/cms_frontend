import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import { Metadata } from "next";
import PortfolioCard from "../components/PortfolioCard";
import MainLayout from "../layouts/MainLayout";
export const metadata = {
  title: "Home Interior Gallery - High Creation Interior",
  description:
    "Check out our latest home interior gallery. Explore different ideas here.",
};
const Gallery = () => {
  return (
    <div>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="Gallery"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
        </main>
        <section className="my-5">
          <div className="container">
            <div className="row g-4 mx-0">
              <h3 className="pb-4">Get a glimpse of Our gallery</h3>
              <div className="col-lg-6">
                <PortfolioCard
                  portCard="gallery_card"
                  portfolioImgBg="gallery_bg_img bg_gal_1"
                  portfolioTitle="Home Interior"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-6">
                <PortfolioCard
                  portCard="gallery_card"
                  portfolioImgBg="gallery_bg_img bg_gal_2"
                  portfolioTitle="Videos"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-6">
                <PortfolioCard
                  portCard="gallery_card"
                  portfolioImgBg="gallery_bg_img bg_gal_3"
                  portfolioTitle="Awards Gallery"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-6">
                <PortfolioCard
                  portCard="gallery_card"
                  portfolioImgBg="gallery_bg_img bg_gal_4"
                  portfolioTitle="Team' Gallery"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
            </div>
          </div>
        </section>
        <hr />
      </MainLayout>
    </div>
  );
};

export default Gallery;
