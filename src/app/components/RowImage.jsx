import Image from "next/image";

const RowImage = (props) => {
  const imageColLg = Number(props.imageColLg ?? 12);
  const imageColXl = Number(props.imageColXl ?? imageColLg);
  const imageColMd = Number(props.imageColMd ?? 12);
  const imageCol = Number(props.imageCol ?? 12);

  return (
    <div className="container">
      <div className="row mx-0">
        <div
          className={`col-lg-${imageColLg} col-xl-${imageColXl} col-md-${imageColMd} col-${imageCol}`}
        >
          <Image
            src={props.ImgAbout}
            className={`responsive-media ${props.ImgAboutClass || ""}`}
            alt={props.imgAlt}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </div>
        <div
          className={`d-flex align-items-center col-lg-${12 - imageColLg} col-md-${12 - imageColMd} col-${12 - imageCol}`}
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
