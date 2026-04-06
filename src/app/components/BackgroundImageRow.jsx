const BackgroundImageRow = (props) => {
  return (
    <div>
      <section className={props.sectionBgImages}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-6">
                  <h1 className={props.secBgHeadingClass}>
                    {props.sectionBgHeading}
                  </h1>
                </div>
                <div className="col-lg-6">
                  <p className={props.secBgDesClass}>
                    {props.sectionBgDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackgroundImageRow;
