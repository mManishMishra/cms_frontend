"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroCarousel({ bannerData }) {
  const [loadHeavyAssets, setLoadHeavyAssets] = useState(false);
  const banners = bannerData?.slice(0, 3) || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadHeavyAssets(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="position-relative">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {banners.map((banner, index) => {
            const isVideo = banner?.banner_image?.endsWith(".mp4");
            const isFirstSlide = index === 0;

            return (
              <div className={`carousel-item ${isFirstSlide ? "active" : ""}`} key={index}>                
                <div 
                  className="responsive_banner_container"
                  style={{ 
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '192/85', // <--- EXACT RATIO FROM YOUR IMAGE
                    // maxHeight: '85vh',   
                    backgroundColor: '#f0f0f0',
                    // overflow: 'hidden'
                  }}
                >
                  
                  {isVideo ? (
                    <>
                      {loadHeavyAssets && (
                        <video 
                          className="object-fit-cover home_video_banner" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                        >
                          <source src={banner?.banner_image} type="video/mp4" />
                        </video>
                      )}
                      {!loadHeavyAssets && (
                         <div className="d-flex align-items-center justify-content-center h-100 text-white bg-dark">
                            <span className="visually-hidden">Loading Video...</span>
                         </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Image
                        src={banner?.banner_image ?? "/images/home-banner-1.png"}
                        className="d-block carousel_img"
                        alt={banner?.title || "Interior Design"}
                        fill
                        priority={isFirstSlide} 
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                      />
                    </>
                  )}
                  
                  <div className="pt-0 carousel-caption d-md-block" style={{ zIndex: 2 }}>
                    <h6 className="pb-0 mb-0 fw-lighter fs-3 home_subhead">{banner?.top_slogan}</h6>
                    <div className="d-lg-flex">
                      <div>
                        <h3 className="letheading home_banner_heading">{banner?.title ?? ""}</h3>
                        <div className="font_stylish_home">{banner?.sub_title}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" style={{ zIndex: 3 }}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" style={{ zIndex: 3 }}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      <div className="rotate_div container-fluid" style={{ zIndex: 4 }}>
        <div className="sssss ms-auto me-0">
          <a href="/contact" className="know_moress">Enquiry Now</a>
        </div>
      </div>
    </section>
  );
}