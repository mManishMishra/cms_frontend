import FisrtKeySendKey from "../components/FisrtKeySendKey";
import HomeInterior from "../components/HomeInterior";
import MainLayout from "../layouts/MainLayout";
const page = () => {
  return (
    <div>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="text-center mb-5">
              <h1 className="wallpaperHeading">Home Interior Gallery</h1>
              <p className="px-lg-5 team_description">
                Explore a curated selection of premium living room interior
                designs and décor ideas at High Creation. We offer customizable,
                functional, and stylish solutions to elevate your living space.
                From modular TV units to wall art and innovative wall designs,
                find all the inspiration you need to transform your living room.
                Start browsing today to discover designs that perfectly reflect
                your personal style.
              </p>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row g-4">
                <FisrtKeySendKey
                  nameTitle="Living Room"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue=" 14x12 feet"
                />
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/2.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/3.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
              </div>
              <div className="row g-4">
                <FisrtKeySendKey
                  nameTitle="Bed Rooms"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue=" 14x12 feet"
                />
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
                    homeInterImg="/images/home-interior-gallery/bedroom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
                   homeInterImg="/images/home-interior-gallery/bedroom/2.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
                   homeInterImg="/images/home-interior-gallery/bedroom/3.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
              </div>
              <div className="row g-4">
                <FisrtKeySendKey
                  nameTitle="Kids Room"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue=" 14x12 feet"
                />
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/kidsroom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/kidsroom/2.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/kidsroom/3.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
              </div>
              <div className="row g-4">
                <FisrtKeySendKey
                  nameTitle="Bathroom"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue=" 14x12 feet"
                />
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/bathroom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/bathroom/2.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/bathroom/3.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
              </div>
              <div className="row g-4">
                <FisrtKeySendKey
                  nameTitle="Kitchen"
                  firstKey="Style"
                  firstValue="Contemporary"
                  secondKey="Room Dimension"
                  secondValue=" 14x12 feet"
                />
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
                <div className="col-lg-4">
                  <HomeInterior
                    nameCard="card_portfolio"
               homeInterImg="/images/home-interior-gallery/LivingRoom/1.jpg"
                    homeInterAlt="ss"
                    homeInterClass="interior_img"
                  />
                </div>
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default page;
