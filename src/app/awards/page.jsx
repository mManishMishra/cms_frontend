import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
export const metadata = {
  title: "Design Excellence Award - High Creation Interior",
  description:
    "Explore our Awards Gallery showcasing innovative interior designs by High Creation. Discover our award-winning projects that blend creativity, style, and functionality for stunning space",
};
const Awards = () => {
  return (
    <div>
        <head>
        <title>Design Excellence Award - High Creation Interior		</title>
        <meta
          name="description"
          content="Explore our Awards Gallery showcasing innovative interior designs by High Creation. Discover our award-winning projects that blend creativity, style, and functionality for stunning space.	"
        />
          <link rel="canonical" href="https://hcinterior.in/awards" />	
      </head>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="Awards Gallery"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
          <section className="container my-5">
            <div className="row mx-0">
              <div className="col-lg-7">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall award1"}
                />
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall award2"}
                />
              </div>
              <div className="col-lg-5">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg3"}
                />
              </div>
              <div className="col-lg-12">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall award4"}
                />
              </div>
              <div className="col-lg-9">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall award5"}
                />
              </div>
              <div className="col-lg-3">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg6"}
                />
              </div>
            </div>
          </section>
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default Awards;
