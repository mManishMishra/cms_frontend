const ResidentialCard = (props) => {
  return (
    <div>
     <a href={props.projectCardLink}>
     <div className={props.cardNameResid}>
        <img
          src={props.resiImgUrl}
          alt={props.resiImgAlt}
          className={props.resiImgClass}
        />
        <div className="card-body px-3 pt-3">
          <h5 className={props.residentialTitleClass}>
            {props.residentialTitle}
          </h5>
          <p className={props.residentialClassCss}>
            {props.residentialDescriptiion}
          </p>
          <div className="mt-4 mb-3">
            <a href={props?.residentialButtonUrl ?? ""} className="know_more">
              {props.residentialButton}
            </a>
          </div>
        </div>
      </div>
     </a>
    </div>
  );
};

export default ResidentialCard;
