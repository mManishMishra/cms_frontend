import Image from "next/image";

const BoxIcon = (props) => {
  return (
    <div>
      <div className="boxs">
       <center>
       <Image
          src={props.iconImage}
          width={80}
          height={80}
          alt={props.iconAlt}
          className={props.iconClass}
        />
        <h5 className="icon_heading pt-3">{props.IconBoxHeading}</h5>
        <p className="px-5 icon_desc">{props.IconBoxDescription}</p>
       </center>
      </div>
    </div>
  );
};

export default BoxIcon;
