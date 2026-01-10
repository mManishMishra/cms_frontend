import Image from "next/image";

const RowImage = (props) => {
  return (
    <div className="container">
      <div className="row mx-0">
        <div
          className={
            "col-lg-" +
            props.imageColLg +
            " col-xl-" +
            props.imageColXl +
            " col-md-" +
            props.imageColMd +
            " col-" +
            props.imageCol
          }
        >
          <Image
            src={props.ImgAbout}
            className={props.ImgAboutClass}
            alt={props.imgAlt}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
        <div
          className={
            +"d-flex align-items-center col-lg-" +
            (12 - props.imageColLg) +
            " col-md-" +
            (12 - props.imageColMd) +
            " col" +
            (12 - props.imageCol)
          }
        >
          <div className={props.divclass}>
            <h3 className="">
              {props.titleHeading}
              <span className={props.subHeadingClass}>{props.subHeading}</span>
            </h3>
            <p>{props.description}</p>
            {props.textAboutBtn ? (
              <a className={props.textAboutBtnCLass} href={props.btnLink}>
                {props.textAboutBtn}
              </a>
            ) : null}
            {props.textAboutBtn2 ? (
              <a className={props.textAboutBtnCLass2}>
                {props.textAboutBtn2}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowImage;
