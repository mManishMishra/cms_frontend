import React from "react";

const RoomOfice = (props) => {
  return (
    <div>
      <div className={props.cardRoomOffice}>
        <span className={props.badge_circle}>
          <img src={props.arrowIcon} alt={props.altArrow} width={props.width}  fetchpriority="high"
  loading="eager"
  data-no-lazy="1" />
        </span>
        <img
          src={props.imageRoom_Office}
          className={props.roomImg}
          alt={props.altImage}
          fetchPriority="high"
          loading="eager"
          data-no-lazy="1"
        />
        <div className={props.cardBody}>
          <h5 className="">{props.cardTitle}</h5>
          <p className="text-white me-5 pe-5">{props.cardText}</p>
          <div className="text-end mt-3 mt-lg-5 mb-2">
            <a className={props.btnClass} href={props.btnLink}>
              {props.btnText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOfice;
