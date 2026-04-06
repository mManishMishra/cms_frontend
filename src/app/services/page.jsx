import MainLayout from "../layouts/MainLayout";
import BackgroundImageRow from "../components/BackgroundImageRow";
import ServicesLeftOriginal from "../components/ServicesLeftOriginal"; // Updated import
import ServicesRightRow from "../components/ServicesRightRow";
import { defaultAltText } from "@/utils/helper";
import ServicesRightOriginal from "../components/ServicesRightOriginal";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Services Data ---
async function getServiceData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/cms-city`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch services: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Services Fetch Error:", err);
    return [];
  }
}

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    // Match the specific page URL for Services
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/services" ||
          tag.page_name?.endsWith("/services")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "Our Taganting Site Services Page";
  const defaultDesc = "Our Taganting Site Services Page";
  const defaultCanonical = "https://hcinterior.in/services";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function Services() {
  // Fetch data
  const rawPageDataList = await getServiceData();

  // --- CLIENT REQUEST: SORTING LOGIC START ---
  // Define the strict order requested by the client
  const desiredOrder = [
    "noida",
    "ghaziabad",
    "greater noida",
    "delhi",
    "dwarka",
    "faridabad",
    "gurugram",
    "manesar"
  ];

  // Create a copy and sort the list based on city_type matches
  let pageDataList = [];
  if (rawPageDataList && Array.isArray(rawPageDataList)) {
    pageDataList = [...rawPageDataList].sort((a, b) => {
      const cityA = (a.city_type || "").toLowerCase().trim();
      const cityB = (b.city_type || "").toLowerCase().trim();

      const indexA = desiredOrder.indexOf(cityA);
      const indexB = desiredOrder.indexOf(cityB);

      // If both cities are in the desired list, sort by their index
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only A is in the list, it comes first
      if (indexA !== -1) return -1;
      
      // If only B is in the list, it comes first
      if (indexB !== -1) return 1;

      // If neither are in the list, keep original API order
      return 0;
    });
  }
  // --- CLIENT REQUEST: SORTING LOGIC END ---

  // Fallback images from your original code to ensure visual consistency if API images are missing
  const fallbackImages = [
    "/images/services/1-min.png",
    "/images/services/2-min.png",
    "/images/services/3-min.png",
    "/images/services/4-min.png",
    "/images/services/5-min.png",
    "/images/services/6-min.png",
    "/images/services/8-min.png", 
    "/images/services/7-min.png",
  ];

  return (
    <MainLayout>
      <main>
        <BackgroundImageRow
          sectionBgImages={"sectionbg services"}
          sectionBgHeading="Services"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription="Explore a curated selection of premium living room interior designs and décor ideas at High Creation. We offer customizable, functional, and stylish solutions to elevate your living space. From modular TV units to wall art and innovative wall designs, find all the inspiration you need to transform your living room. Start browsing today to discover designs that perfectly reflect your personal style."
          secBgDesClass="secbgbesclass"
        />

        {pageDataList && pageDataList.length > 0 ? (
          pageDataList.map((service, index) => {
            const fallbackImg =
              fallbackImages[index] ||
              fallbackImages[index % fallbackImages.length];

            // --- URL ROUTING LOGIC ---
            const cityValue = service?.city_type?.toLowerCase().trim() || "";
            let citySlug = cityValue.replace(/[\s_]+/g, '-');
            
            // Redirect Gurugram to Gurgaon
            if (citySlug === "gurugram") {
              citySlug = "gurgaon";
            }
            
            const targetLink = `/interior-designers-in-${citySlug}`;

            // Render Left Row for Even indices (0, 2, 4...)
            if (index % 2 === 0) {
              return (
                <ServicesLeftOriginal
                  key={service.id || index}
                  column1={"col-lg-6 d-flex align-items-center"}
                  ServicesImgUrl={service?.location_image ?? fallbackImg}
                  servicesImgAlt={service?.main_title ?? defaultAltText}
                  servicesImgClass="services_img"
                  column2={"col-lg-6"}
                  ServicesHeading={service?.main_title ?? ""}
                  ServicesDescription={service?.main_description ?? ""}
                  textBtnServices="Read More"
                  linkBtnServices={targetLink}
                />
              );
            } 
            // Render Right Row for Odd indices (1, 3, 5...)
            else {
              return (
                <ServicesRightOriginal
                  key={service.id || index}
                  sectionServices={"services_sec_wrapper1"}
                  colum1="col-lg-6"
                  ServicesImgUrlRight={service?.location_image ?? fallbackImg}
                  servicesImgAltRight={service?.main_title ?? defaultAltText}
                  servicesImgClass="services_img"
                  colum2={"col-lg-6 align-items-center d-flex"}
                  ServicesHeadingRight={service?.main_title ?? ""}
                  ServicesDescriptionRight={service?.main_description ?? ""}
                  descrClass={"team_description"}
                  textBtnServicesRight="Read More"
                  linkBtnServices={targetLink}
                />
              );
            }
          })
        ) : (
          <div className="text-center my-5">
            <p>Loading services...</p>
          </div>
        )}
      </main>
    </MainLayout>
  );
}