import React from 'react';

const ServicesRowLeft = (props) => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-xl-10">
            
            {/* clearfix ensures the floating elements don't break the container */}
            <div className="clearfix">
              
              {/* IMAGE FLOATED LEFT */}
              {/* It takes up a max of 500px width. Text will flow to its right, and wrap under it! */}
              <div className="float-lg-start me-lg-5 mb-4 mb-lg-3 position-relative" style={{ width: "100%", maxWidth: "500px" }}>
                {/* Premium Accent Square behind the image */}
                <div className="position-absolute bg-light d-none d-lg-block" style={{ top: '-15px', left: '-15px', right: '15px', bottom: '15px', zIndex: 0 }}></div>
                <img
                  src={props.ServicesImgUrl}
                  alt={props.servicesImgAlt || "Interior Design Project"}
                  className={`position-relative responsive-media shadow-sm object-fit-cover ${props.servicesImgClass || ''}`}
                  style={{ aspectRatio: "5 / 4", zIndex: 1, borderRadius: "2px" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* TEXT CONTENT (Flows naturally) */}
              <div>
                <h2 className="display-6 fw-bold text-dark mb-4" style={{ letterSpacing: "-0.5px" }}>
                  {props.ServicesHeading}
                </h2>
                
                <div 
                  className="text-secondary fs-5" 
                  style={{ lineHeight: "1.9", fontWeight: "300" }}
                  dangerouslySetInnerHTML={{ __html: props.ServicesDescription }} 
                />
                
                {props?.textBtnServices && (
                  <div className="mt-5 clear-fix pb-3">
                    {/* Architectural Studio Button Style (Sharp edges, uppercase) */}
                    <a 
                      href={props?.linkBtnServices || "#"} 
                      className="btn btn-outline-dark rounded-0 border-2 px-5 py-3 text-uppercase fw-bold"
                      style={{ letterSpacing: "2px", fontSize: "13px" }}
                    >
                      {props.textBtnServices}
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

export default ServicesRowLeft;
