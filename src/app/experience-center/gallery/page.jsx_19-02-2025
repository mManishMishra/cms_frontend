"use client";
import GalleryDetail from "../../components/GalleryDetail";
import MainLayout from "../../layouts/MainLayout";
import { useHasMounted } from "@/utils/useHasMounted";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
const ResidentialProjectsGallery = () => {
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentManagerPages = async () => {
      const galleryId = new URLSearchParams(window.location.search).get("id") ?? null;
      try {
        const response = await api.get(`/cms-parent-child/by-id/${galleryId}`, {});

        if (response.data) {
          setGalleryData(response.data);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message ?? "Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchContentManagerPages();
  }, []);


  return (
    <div>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="row g-4 mx-0">
              <h4 className="ps-3 mt-3">{galleryData?.child_content?.title ?? "Ready to go Gallery"}</h4>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[0]?.image ?? "/images/detail-img/1.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[1]?.image ?? "/images/detail-img/6.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[2]?.image ?? "/images/detail-img/3.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img2"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[3]?.image ?? "/images/detail-img/4.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[4]?.image ?? "/images/detail-img/5.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl={galleryData?.child_images?.[5]?.image ?? "/images/detail-img/6.webp"}
                  imgGalAlt={defaultAltText}
                  imgGalImgClass="w-100 detail_gal_img2"
                />
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>

    
    </div>
  );
};

export default ResidentialProjectsGallery;
