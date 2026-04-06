"use client";
import GalleryDetail from "../components/GalleryDetail";
import MainLayout from "../layouts/MainLayout";
const page = () => {
  return (
    <div>
      <MainLayout>
        <main>
          <section className="container my-5">
            <div className="row g-4 mx-0">
              <h4 className="ps-3 mt-3">Master Bedroom
              Interior Designs Ideas</h4>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/1.webp"
                  imgGalAlt="room"
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/6.webp"
                  imgGalAlt="room"
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/3.webp"
                  imgGalAlt="room"
                  imgGalImgClass="w-100 detail_gal_img2"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/4.webp"
                  imgGalAlt="room"
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-6">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/5.webp"
                  imgGalAlt="room"
                  imgGalImgClass="w-100 detail_gal_img"
                />
              </div>
              <div className="col-lg-12">
                <GalleryDetail
                  imgGalUrl="/images/detail-img/6.webp"
                  imgGalAlt="room"
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

export default page;
