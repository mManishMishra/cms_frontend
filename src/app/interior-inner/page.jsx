import Image from "next/image";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import ServicesRowLeft from "../components/ServicesRowLeft";
const Inner = () => {
  return (
    <div>
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading="Interior Design In Delhi"
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />
          <section className="my-5">
            <div className="container">
              <div className="mx-0 row justify-content-center">
                <div className="col-lg-8">
                  <center>
                    <h3>Interior Designers in Delhi</h3>
                    <p className="team_description">
                      re you looking for best interior designers in Delhi NCR
                      for home ? Contact High Creation Interior today offering
                      end to end home interior solutions for your style &
                      budget. When it comes to transforming living spaces into
                      stunning works of art, Known for their expertise in
                      merging contemporary trends with classic elements, these
                      designers create interiors that exude elegance and
                      sophistication. Creativity and desire are something that
                      has always driven us towards it, and this is something
                      that keeps us to stand apart from other companies. High
                      Creation Interior is the perfect choice to transform your
                      cemented wall structure into the dream house you have been
                      planning for so long. Delhi is home to a vibrant community
                      of luxury interior designers who specialize in crafting
                      bespoke interiors that reflect their clients’ unique
                      styles Our great philosophy drives our company to contour
                      what is in your mind and deliver dreams via a strong
                      backbone of planning and implementing the plan. Elevate
                      your home space with top residential interior designers in
                      Delhi.
                    </p>
                    <div className="mt-4">
                      <a href="" className="know_more px-lg-5">
                        Know More
                      </a>
                    </div>
                    <div>
                      <Image
                        src="/images/services/1-min.png"
                        height={500}
                        width={700}
                        alt="delhi"
                        className="pt-5 w-100 object-fit-contain"
                      />
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </section>
          <ServicesRowLeft
          column1="col-lg-6"
            ServicesImgUrl="/images/interior/interior-img.jpg"
            servicesImgAlt="services-1"
            servicesImgClass="interior_img2 mt-5 mt-lg-0"
            column2="col-lg-6"
            ServicesHeading="Expert Home Interior Designers For Every Budget In Delhi"
            ServicesDescription="Our interior designers in Delhi work with you keeping in mind your
requirements and budget.
High creation interior, luxury interior designers in Delhi, redefine elegance &
style. We provide affordable interior design services in Delhi"
            textBtnServices="Read More"
          />
          <section>
            <div className="container">
              <div className="mx-0 row g-4">
                <div className="col-lg-4">
                  <div className="interior_inner_card">
                    <img
                      src="/images/interior/icon1.png"
                      className="w-100 object-fit-contain"
                      height={150}
                      alt="team"
                    />
                    <div className="pt-3 text-center card-body">
                      <h4 className="px-4 py-3 text-center card-title">
                        India&apos;s only full home warranty* up to 10-yrs for
                        products & services
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="interior_inner_card">
                    <img
                      src="/images/interior/icon2.png"
                      className="w-100 object-fit-contain"
                      height={150}
                      alt="team"
                    />
                    <div className="pt-3 text-center card-body">
                      <h4 className="px-4 py-3 text-center card-title">
                        146 quality checks to give your home the best
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="interior_inner_card">
                    <img
                      src="/images/interior/icon3.png"
                      className="w-100 object-fit-contain"
                      height={150}
                      alt="team"
                    />
                    <div className="pt-3 text-center card-body">
                      <h4 className="px-4 py-3 text-center card-title">
                        45-day installation swift kitchens, wardrobes & storage
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  );
};

export default Inner;
