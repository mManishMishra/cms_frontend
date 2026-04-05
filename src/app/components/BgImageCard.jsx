import { FaStar } from "react-icons/fa6";
const BgImageCard = ({
  cardLinkTag,
  designerCardBgDiv,
  // imgClass,
  style, 
  titleBgImage,
  descriptionBg,
  ratingBg,
  buttonShareBg,
  buttonCommentBg,
}) => {
  return (
    <>
   <a href={cardLinkTag}>
   {/* 🌟 CMS Fix: Secured background size so it scales perfectly on mobile */}
   <div 
      style={{ 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        ...style 
      }} 
      className={designerCardBgDiv}
    >
      <div>
        <h5>{titleBgImage}</h5>
        <p className="text-white mb-0">{descriptionBg}</p>
      </div>

      <div>
        <p className="mb-0 text-white">
          {/* <FaStar className="pe-1 text-warning" /> */}
          {ratingBg}
        </p>
        <div className="d-flex">
          <a href="" className="pe-3">
            {buttonShareBg}
          </a>
          <a href="">{buttonCommentBg}</a>
        </div>
      </div>
    </div>
   </a>
    </>
  );
};

export default BgImageCard;