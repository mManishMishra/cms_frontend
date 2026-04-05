import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import BackgroundImageRow from "../components/BackgroundImageRow";
const Portfolio = () => {
  return (
    <div>
        <head>
            <title>portfolio</title>
        </head>
      <MainLayout>
        <main>
        <BackgroundImageRow
            sectionBgImages={"contact_wrapper portfolio"}
            sectionBgHeading="Portfolio"
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
          {/* <section className="contact_wrapper portfolio">
            <div className="container">
              <div className="row g-3">
                <h2 className="">Portfolio</h2>
                <p className="text-white">
                  Explore a curated selection of premium living room interior
                  designs and décor ideas at High Creation. <br />
                  We offer customizable, functional, and stylish solutions to
                  elevate your living space. From modular TV <br />
                  units to wall art and innovative wall designs, find all the
                  inspiration you need to transform your living <br />
                  room. Start browsing today to discover designs that perfectly
                  reflect your personal style
                </p>
              </div>
            </div>
          </section> */}

          <section className="container my-5">
            <div className="row">
              <div className="col-lg-7">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg1"}
                  portfolioTitle="Bed room"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg2"}
                  portfolioTitle="Dinning"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-5">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg3"}
                  portfolioTitle="Kitchen"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
                </div>
                  <div className="col-lg-12">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg4"}
                  portfolioTitle="Living Room"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-9">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg5"}
                  portfolioTitle="Bathroom"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
              <div className="col-lg-3">
                <PortfolioCard
                  portCard={"card_portfolio portfolio_1"}
                  portfolioImgBg={"portfolioimgall portfoliobg6"}
                  portfolioTitle="Washroom"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue="14x12 feet"
                />
              </div>
            </div>
            
            <nav aria-label="Page navigation example mt-5">
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

          </section>
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default Portfolio;
