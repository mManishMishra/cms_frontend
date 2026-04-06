// import "../../../../public/style/style.css";
import { FaStar } from "react-icons/fa";
const ProductCard = (props) => {
  return (
    <div>
      <section className="Product_wrapper">
        <div className={props.cardName}>
          <div className={props.prodctImgBg} style={props?.productImg ? {backgroundImage: `url(${props?.productImg})`} : {}}>
            <div>
              <p className="text-white mb-1 product_text">
                {props.descriptionBg}
              </p>
              <p className="mb-0 text-white product_text">
                <FaStar className="text-warning pe-1" />
                {props.ratingBg}
              </p>
            </div>
          </div>
          <div className="card-body px-3 pt-3">
            <h5 className={props.productTitleClass}>{props.productTitle}</h5>
            <div className="">
              <span className="fw-bolder">{props.firstKey} : </span>
              {props.firstValue}
            </div>
            <span className="fw-bolder">{props.secondKey} : </span>
            {props.secondValue}
            <div className="mt-3 mb-3">
              <a href="" className="know_more">
                {props.productButton}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
