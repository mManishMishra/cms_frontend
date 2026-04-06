import GalleryDetail from "../../components/GalleryDetail";
import MainLayout from "../../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";
const BASE_URL = "https://hcinterior.in";

// --- SERVER SIDE DATA FETCHING ---
async function getGalleryData(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/cms-parent-child/by-id/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return null;
  }
}

// --- SEO METADATA (Canonical Fix) ---
export async function generateMetadata({ searchParams }) {
  const id = searchParams?.id;
  const canonicalUrl = id 
    ? `${BASE_URL}/design-idea/gallery?id=${id}` 
    : `${BASE_URL}/design-idea/gallery`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// --- SERVER COMPONENT ---
const ResidentialProjectsGallery = async ({ searchParams }) => {
  const id = searchParams?.id;
  
  // If no ID is present, we can't show specific gallery data
  if (!id) return notFound();

  const galleryData = await getGalleryData(id);

  // If API returns null/empty
  if (!galleryData) return notFound();

  const images = galleryData?.child_images ?? [];
  const staticImages = images.slice(0, 6);
  const extraImages = images.slice(6);
  const title = galleryData?.child_content?.title ?? "Design Idea Gallery";

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="row g-4 mx-0">
            <h4 className="ps-3 mt-3">{title}</h4>
            
            {/* Static Fields for First 6 Images */}
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={staticImages[0]?.image ?? "/images/detail-img/1.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images} 
              /> 
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={staticImages[1]?.image ?? "/images/detail-img/6.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-12">
              <GalleryDetail
                imgGalUrl={staticImages[2]?.image ?? "/images/detail-img/3.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img2"
                images={images}
              />
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={staticImages[3]?.image ?? "/images/detail-img/4.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={staticImages[4]?.image ?? "/images/detail-img/5.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-12">
              <GalleryDetail
                imgGalUrl={staticImages[5]?.image ?? "/images/detail-img/6.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img2"
                images={images}
              />
            </div>

            {/* Dynamic Loop for Extra Images */}
            {extraImages.length > 0 &&
              extraImages.map((image, index) => (
                <div key={index} className="col-lg-6">
                  <GalleryDetail
                    imgGalUrl={image.image}
                    imgGalAlt={defaultAltText}
                    imgGalImgClass="w-100 detail_gal_img"
                    images={extraImages} 
                  />
                </div>
              ))}
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
};
 
export default ResidentialProjectsGallery;