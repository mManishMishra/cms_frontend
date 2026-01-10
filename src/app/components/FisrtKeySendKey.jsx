const FisrtKeySendKey = (props) => {
  return (
    <div>
      <div className="pb-2 mt-5">
        <h4 className="mb-0 interiorhead">{props.nameTitle}</h4>
        <p className="mb-0 team_description">
          <span className="fw-bolder">{props.firstKey} : </span>
          {props.firstValue}
        </p>
      <p className="mb-0 team_description">
      <span className="fw-bolder team_description">{props.secondKey} : </span>
      {props.secondValue}
      </p>
      </div>
    </div>
  );
};

export default FisrtKeySendKey;
