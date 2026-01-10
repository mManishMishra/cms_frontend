const ServicesRightRow = (props) => {
  return (
    <div>
      <section className={props.sectionServices}>
        <div className="container">
          <div className="row mx-0 g-4">
            <div className={props.colum1}>
              <img
                src={props.ServicesImgUrlRight}
                className={props.servicesImgClass}
                alt={props.servicesImgAltRight}
              />
            </div>
            <div className={props.colum2}>
              <div className="text-end">
                <h3>{props.ServicesHeadingRight}</h3>
                <div className={props.descrClass} dangerouslySetInnerHTML={{ __html: props.ServicesDescriptionRight }} />
                {props?.textBtnServicesRight &&
                  <div className="mt-5">
                    <a href={props?.linkBtnServices} className="know_more px-3 px-lg-5">
                      {props.textBtnServicesRight}
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesRightRow;
