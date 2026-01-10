
const How = (props) => {
  return (
    <div>
      <section className="">
        <div className="container">
          <div className="row py-5">
            <div className={props.colum1}>
              <div className="">
                <h3>{props.ServicesHeading}</h3>
                <p className="team_description">{props.ServicesDescription}</p>
                <div className="mt-5">
                  <a href="" className="know_more px-3 px-lg-5">
                    {props.textBtnServices}
                  </a>
                </div>
              </div>
            </div>
            {/* <div className={props.colum2}>
              <img
                src={props.ServicesImgUrl}
                className="services_img"
                alt={props.servicesImgAlt}
              />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default How
