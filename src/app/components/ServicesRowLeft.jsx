const ServicesRowLeft = (props) => {
  return (
    <div>
      <section className="">
        <div className="container">
          <div className="row py-5 mx-0 g-4">
            <div className={props.column1}>
              <div className="">
                <h3>{props.ServicesHeading}</h3>
                <p className="team_description" dangerouslySetInnerHTML={{ __html: props.ServicesDescription }} />
                {props?.textBtnServices &&
                  <div className="mt-5">
                    <a href={props?.linkBtnServices} className="know_more px-3 px-lg-5">
                      {props.textBtnServices}
                    </a>
                  </div>
                }
              </div>
            </div>
            <div className={props.column2}>
              <img
                src={props.ServicesImgUrl}
                className={props.servicesImgClass}
                alt={props.servicesImgAlt}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesRowLeft;
