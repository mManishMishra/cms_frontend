import Image from "next/image";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import ServicesRowLeft from "../components/ServicesRowLeft";
import { defaultAltText } from "@/utils/helper";
import api from "@/utils/api";
import DOMPurify from "isomorphic-dompurify";

export async function generateMetadata({ searchParams }) {
  const baseUrl = "https://hcinterior.in";
  const city = searchParams?.city || "delhi"; // Get city from query string or default to "delhi"
  const canonicalUrl = `${baseUrl}/interior-designers-in-${city}`;

  try {
    const response = await api.get(`cms-city/${city}`);
    const metaresult = response.data;

    const metaTitle = metaresult?.seo_content?.meta_title ?? "My Page Title";

    return {
      title: metaTitle,
      description: metaresult?.seo_content?.meta_description ?? "Default description",
      keywords: metaresult?.seo_content?.meta_keywords ?? "Default keywords",
      alternates: {
        canonical: canonicalUrl,
      },
      other: {
        title: metaTitle,
      },
    };
  } catch (error) {
    return {
      title: "Page Not Found",
      alternates: {
        canonical: `${baseUrl}/not-found`,
      },
    };
  }
}

const ServicesDetailPage = async ({ searchParams }) => {
  // const city = params.city || "delhi";
  const city = searchParams?.city || "delhi"; // Get city from query string or default to "delhi"

  try {
    const response = await api.get(`cms-city/${city}`);
    const pageData = response.data;

    const safeDescription = pageData?.main_description
      ? DOMPurify.sanitize(pageData.main_description)
      : "";

    return (
      <MainLayout>
        <main>
          <BackgroundImageWithHeading
            sectionBgImages={"contact_wrapper services"}
            sectionBgHeading={pageData?.main_title}
            secBgHeadingClass="sec_bgheading_lass"
            sectionBgDescription=""
            secBgDesClass={"text-center bg-transparent"}
          />

          <section className="my-5 mb-0">
            <div className="container">
              <div className="mx-0 row justify-content-center">
                <div className="col-lg-8 text-center">
                  <h3>{pageData?.main_title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: safeDescription }} />
                  <div>
                    <img
                      src={pageData?.location_image ?? "/images/services/1-min.png"}
                      height={500}
                      width={700}
                      alt={pageData?.main_title ?? defaultAltText}
                      className="pt-0 pt-lg-5 w-100 object-fit-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ServicesRowLeft
            column1="col-lg-6"
            ServicesImgUrl={pageData?.side_image ?? "/images/services/2-min.png"}
            servicesImgAlt={pageData?.side_title ?? defaultAltText}
            servicesImgClass="interior_img2 mt-5 mt-lg-0"
            column2="col-lg-6"
            ServicesHeading={pageData?.side_title}
            ServicesDescription={pageData?.side_description}
            textBtnServices="Get a free consultation"
            linkBtnServices="/contact"
          />
            <section className="pb-3">
            <div className="container">
              <div className="mx-0 row g-4 justify-content-center">
                <div className="col-lg-10 col-11">
                  <div className="mx-0 row g-4 justify-content-center">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon1.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            India&apos;s only full home warranty* up to 10-yrs
                            for products & services
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon2.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            146 quality checks to give your home the best
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="interior_inner_card">
                        <img
                          src="/images/interior/icon3.png"
                          className="w-100 object-fit-contain"
                          height={150}
                          alt="team"
                        />
                        <div className="pt-3 text-center card-body">
                          <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                            45-day installation swift kitchens, wardrobes &
                            storage
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </MainLayout>
    );
  } catch (error) {
    notFound(); // Shows 404 page
  }
};

export default ServicesDetailPage;
