import { notFound } from "next/navigation";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import ServicesRowLeft from "../components/ServicesRowLeft";
import { defaultAltText } from "@/utils/helper";
import Image from "next/image"; 
import DOMPurify from "isomorphic-dompurify";
// 1. IMPORT LAZYSECTION
import LazySection from "../home/clientHome/LazySection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

const cityUrlMap = {
  "noida": "/interior-designers-in-noida",
  "greater_noida": "/interior-designers-in-greater-noida",
  "delhi": "/interior-designers-in-delhi",
  "gurugram": "/interior-designers-in-gurgaon",
  "faridabad": "/best-interior-designers-in-faridabad",
  "ghaziabad": "/interior-designers-in-ghaziabad",
  "manesar": "/interior-designers-in-manesar",
  "dwarka": "/interior-designers-in-dwarka",
};

async function getCityData(city) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-city/${city}`, {
      next: { revalidate: 60 }, 
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("City Fetch Error:", error);
    return null;
  }
}

// export async function generateMetadata({ searchParams }) {
//   const baseUrl = "https://hcinterior.in";
//   const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";
  
//   let canonicalPath = "/services-detail";
  
//   if (city && city !== 'delhi') {
//     if (cityUrlMap[city]) {
//       canonicalPath = cityUrlMap[city]; 
//     } else {
//       canonicalPath = `/services-detail?city=${city}`;
//     }
//   }

//   const pageData = await getCityData(city);

//   if (!pageData) {
//      return {
//       title: "Services - High Creation Interior",
//       alternates: { canonical: `${baseUrl}/services-detail` },
//     };
//   }

//   return {
//     title: pageData?.seo_content?.meta_title ?? "Interior Design Services",
//     description: pageData?.seo_content?.meta_description ?? "Best Interior Design Services",
//     keywords: pageData?.seo_content?.meta_keywords ?? "",
//     alternates: {
//       canonical: `${baseUrl}${canonicalPath}`,
//     },
//   };
// }

export async function generateMetadata({ searchParams }) {
  const baseUrl = "https://hcinterior.in";
  // Get city from params, default to delhi
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";
  
  // Fetch CMS Data
  const pageData = await getCityData(city);

  // 1. Prioritize canonical URL straight from your CMS API if it exists
  let canonicalUrl = pageData?.page_name || pageData?.seo_content?.page_name || pageData?.seo_content?.canonical_url;

  // 2. If CMS doesn't have it, fallback to your hardcoded map
  if (!canonicalUrl) {
    let canonicalPath = "/services-detail";
    
    // FIX: Removed the "city !== 'delhi'" restriction so Delhi maps correctly
    if (city) {
      if (cityUrlMap[city]) {
        canonicalPath = cityUrlMap[city]; 
      } else {
        canonicalPath = `/services-detail?city=${city}`;
      }
    }
    canonicalUrl = `${baseUrl}${canonicalPath}`;
  }

  // Handle 404/Missing Data case
  if (!pageData) {
     return {
      title: "Services - High Creation Interior",
      alternates: { canonical: canonicalUrl },
    };
  }

  // Return final metadata
  return {
    title: pageData?.seo_content?.meta_title ?? "Interior Design Services",
    description: pageData?.seo_content?.meta_description ?? "Best Interior Design Services",
    keywords: pageData?.seo_content?.meta_keywords ?? "",
    alternates: {
      canonical: canonicalUrl, // Now securely assigns the correct Delhi URL
    },
  };
}

const ServicesDetailPage = async ({ searchParams }) => {
  const city = searchParams?.city && searchParams.city !== "undefined" ? searchParams.city : "delhi";

  const pageData = await getCityData(city);

  if (!pageData) {
    console.error(`Failed to load data for city: ${city}`);
    notFound(); 
  }

  const safeDescription = pageData?.main_description
    ? DOMPurify.sanitize(pageData.main_description)
    : "";

  return (
    <MainLayout>
      <main>
        {/* --- SECTION 1: HERO (Keep Eager for LCP) --- */}
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper services"}
          sectionBgHeading={pageData?.main_title}
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription=""
          secBgDesClass={"text-center bg-transparent"}
        />

        {/* --- SECTION 2: INTRO (Keep Eager) --- */}
        <section className="my-5 mb-0">
          <div className="container">
            <div className="mx-0 row justify-content-center">
              <div className="col-lg-8 text-center">
                <h3>{pageData?.main_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
                
                <div className="pt-0 pt-lg-5 w-100 position-relative">
                   <Image
                      src={pageData?.location_image ?? "/images/services/1-min.png"}
                      alt={pageData?.main_title ?? defaultAltText}
                      width={700}
                      height={500}
                      className="object-fit-contain w-100 h-auto"
                      style={{ maxWidth: "100%", height: "auto" }}
                      priority={true} 
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: SIDE CONTENT (Lazy Load) --- */}
        {/* This is definitely below the fold, so we lazy load it to speed up initial page load */}
        <LazySection placeholderHeight="500px">
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
        </LazySection>
        
        {/* --- SECTION 4: ICONS / WARRANTY (Lazy Load) --- */}
        {/* This is near the footer, so we can safely lazy load it */}
        <LazySection placeholderHeight="300px">
          <section className="pb-3">
              <div className="container">
                <div className="mx-0 row g-4 justify-content-center">
                  <div className="col-lg-10 col-11">
                    <div className="mx-0 row g-4 justify-content-center">
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="interior_inner_card">
                          <div style={{ position: 'relative', height: '150px', width: '100%' }}>
                              <Image
                              src="/images/interior/icon1.png"
                              className="object-fit-contain"
                              fill
                              alt="Warranty Icon"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              />
                          </div>
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
                           <div style={{ position: 'relative', height: '150px', width: '100%' }}>
                              <Image
                              src="/images/interior/icon2.png"
                              className="object-fit-contain"
                              fill
                              alt="Quality Check Icon"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              />
                          </div>
                          <div className="pt-3 text-center card-body">
                            <h4 className="px-4 py-3 text-center card-title card_Services_heading">
                              146 quality checks to give your home the best
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="interior_inner_card">
                          <div style={{ position: 'relative', height: '150px', width: '100%' }}>
                              <Image
                              src="/images/interior/icon3.png"
                              className="object-fit-contain"
                              fill
                              alt="Swift Installation Icon"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              />
                          </div>
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
        </LazySection>
      </main>
    </MainLayout>
  );
};

export default ServicesDetailPage;