"use client";
import GalleryDetail from "../../components/GalleryDetail";
import MainLayout from "../../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";

export default function GalleryClient({ portfolioData }) {
  const images = portfolioData?.child_images ?? [];

  return (
    <MainLayout>
      <main>
        <section className="container my-5">
          <div className="row g-4 mx-0">
            <h4 className="ps-3 mt-3">{portfolioData?.title ?? "Luxury Projects Gallery"}</h4>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[0]?.image ?? "/images/detail-img/1.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[1]?.image ?? "/images/detail-img/6.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-12">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[2]?.image ?? "/images/detail-img/3.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img2"
                images={images}
              />
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[3]?.image ?? "/images/detail-img/4.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-6">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[4]?.image ?? "/images/detail-img/5.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img"
                images={images}
              />
            </div>
            <div className="col-lg-12">
              <GalleryDetail
                imgGalUrl={portfolioData?.child_images?.[5]?.image ?? "/images/detail-img/6.webp"}
                imgGalAlt={defaultAltText}
                imgGalImgClass="w-100 detail_gal_img2"
                images={images}
              />
            </div>
          </div>
        </section>
        <hr />
      </main>
    </MainLayout>
  );
}