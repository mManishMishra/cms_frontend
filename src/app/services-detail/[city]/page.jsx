import BackgroundImageWithHeading from "../../components/BackgroundImageWithHeading";
import MainLayout from "../../layouts/MainLayout";
import ServicesRowLeft from "../../components/ServicesRowLeft";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
import { getCanonicalUrl, getRobotsDirectives } from "@/utils/seoHelpers";
import { notFound } from "next/navigation";

// --- GSC FIX: ISR (Update content every hour) ---
export const revalidate = 3600; 

// --- GSC FIX: Generate Metadata for correct Indexing & Canonical ---
export async function generateMetadata({ params }) {
  const city = params.city;
  try {
    const response = await api.get(`cms-city/${city}`);
    const data = response.data;

    if (!data) {
      return {
        title: "Service Not Found",
        robots: { index: false, follow: true },
      };
    }

    const canonicalUrl = getCanonicalUrl({
      canonicalUrl: data?.seo_content?.canonical_url,
      fallbackPath: `/services-detail/${city}`,
    });

    return {
      title: data?.seo_content?.meta_title || `${city} Interior Design Services`,
      description: data?.seo_content?.meta_description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: getRobotsDirectives(data?.seo_content),
      openGraph: {
        title: data?.main_title,
        description: data?.main_description?.substring(0, 160),
        images: [data?.location_image || "/images/services/1-min.png"],
      },
    };
  } catch (error) {
    return {
      title: "Error",
      robots: { index: false, follow: true },
    };
  }
}

// Helper to fetch data on Server
async function getCityData(city) {
  try {
    const response = await api.get(`cms-city/${city}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching city data: ", error);
    return null;
  }
}

// --- GSC FIX: Converted to Server Component ---
export default async function ServicesDetail({ params }) {
  const city = params.city;
  const pageData = await getCityData(city);

  // If API returns no data, return a REAL 404. 
  // This fixes "Soft 404" errors in GSC.
  if (!pageData) {
    notFound();
  }

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
              <div className="col-lg-8">
                <center>
                  <h3>{pageData?.main_title}</h3>
                  <div
                    className="team_description"
                    dangerouslySetInnerHTML={{
                      __html: pageData?.main_description,
                    }}
                  />

                  <div>
                    <img
                      src={
                        pageData?.location_image ??
                        "/images/services/1-min.png"
                      }
                      height={500}
                      width={700}
                      alt={pageData?.main_title ?? defaultAltText}
                      className="pt-0 pt-lg-5 w-100 object-fit-contain"
                    decoding="async"  loading="lazy" />
                  </div>
                </center>
              </div>
            </div>
          </div>
        </section>
        <ServicesRowLeft
          column1="col-lg-6"
          ServicesImgUrl={
            pageData?.side_image ?? "/images/services/2-min.png"
          }
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
              <div className="col-10">
                <div className="mx-0 row g-4 justify-content-center">
                  {/* Static Cards */}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="interior_inner_card">
                      <img
                        src="/images/interior/icon1.png"
                        className="w-100 object-fit-contain"
                        height={150}
                        alt="Warranty Icon"
                      decoding="async"  loading="lazy" />
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
                        alt="Quality Check Icon"
                      decoding="async"  loading="lazy" />
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
                        alt="Installation Icon"
                      decoding="async"  loading="lazy" />
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
      <hr />
    </MainLayout>
  );
}
