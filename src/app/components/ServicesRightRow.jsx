import React from 'react';

const ServicesRightRow = (props) => {
  return (
    <section className={`py-5 ${props.sectionServices || 'bg-light'}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-xl-10">
            
            <div className="clearfix">
              
              {/* IMAGE FLOATED RIGHT */}
              {/* Floated to the end (right). Text stays left, then wraps under! */}
              <div className="float-lg-end ms-lg-5 mb-4 mb-lg-3 position-relative" style={{ width: "100%", maxWidth: "500px" }}>
                {/* Premium Accent Square */}
                <div className="position-absolute bg-white d-none d-lg-block shadow-sm" style={{ top: '15px', right: '-15px', left: '15px', bottom: '-15px', zIndex: 0 }}></div>
                <img
                  src={props.ServicesImgUrlRight}
                  alt={props.servicesImgAltRight || "Premium Interior Design"}
                  className={`position-relative responsive-media shadow-sm object-fit-cover ${props.servicesImgClass || ''}`}
                  style={{ aspectRatio: "5 / 4", zIndex: 1, borderRadius: "2px" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* TEXT CONTENT (Flows naturally) */}
              <div>
                <h2 className="display-6 fw-bold text-dark mb-4" style={{ letterSpacing: "-0.5px" }}>
                  {props.ServicesHeadingRight}
                </h2>
                
                <div 
                  className={`text-secondary fs-5 ${props.descrClass || ''}`} 
                  style={{ lineHeight: "1.9", fontWeight: "300" }}
                  dangerouslySetInnerHTML={{ __html: props.ServicesDescriptionRight }} 
                />
                
                {props?.textBtnServicesRight && (
                  <div className="mt-5 clear-fix pb-3">
                    {/* Architectural Studio Button Style */}
                    <a 
                      href={props?.linkBtnServices || "#"} 
                      className="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold"
                      style={{ letterSpacing: "2px", fontSize: "13px" }}
                    >
                      {props.textBtnServicesRight}
                    </a>
                  </div>
                )}
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesRightRow;
