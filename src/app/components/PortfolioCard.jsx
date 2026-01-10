const PortfolioCard = (props) => {
  return (
    <div>
      <section className="">
        <a href={props.cardDetailLink}>
          <div className={props.portCard}>
            <div
              className={props.portfolioImgBg}
              style={
                props?.portfolioImg
                  ? { backgroundImage: `url(${props?.portfolioImg})` }
                  : {}
              }
            >
              {/* <a href={props.cardDetailLink}>
            </a> */}
              <div>
                {props.portfolioTitle ? (
                  <h4 className="text-white mb-0">{props.portfolioTitle}</h4>
                ) : null}
                <p className={props.portfolioClassCss}>
                  {props.portfolioDescription}
                </p>
                {/* {props.firstKey ? (
                <p className="text-white mb-0 team_description">
                  <span className="fw-bolder">{props.firstKey} : </span>
                  {props.firstValue}
                </p>
              ) : null}
              {props.secondValue ? (
              <p className="text-white mb-0 team_description">
                  <span className="fw-bolder">{props.secondKey} : </span>
                  {props.secondValue}
                </p>
              ) : null} */}
              </div>
              <div className="text-end">
                {/* {props.textBtnCard ? (
                <a href="" className={textBtnCardClass}>
                  {props.textBtnCard}
                </a>
              ) : null} */}
              </div>
            </div>
          </div>
        </a>
      </section>
    </div>
  );
};

export default PortfolioCard;
