import "../../../public/style/style.css";
import Image from "next/image";

const Card = ({
    cardNameALl,
    imgSrc,
    imgClass,
    cardLinkName,
    imgAlt,
    titleCard,
    titleClass,
    spanTitle = null,
    // titleCard = null,
    // titleClass = "",
    descriptionCard,
    buttonTextCard,
    linkCard,
}) => {
    return (
        <div>
            <div className={cardNameALl}>
                <a href={cardLinkName || "#"} style={{ display: 'block' }}>
                    {/* 🌟 CMS Fix: Added style tag for strict aspect-ratio lock and cover fit */}
                    <Image 
                        src={imgSrc || "/placeholder-image.jpg"} 
                        className={imgClass} 
                        alt={imgAlt || "Website Image"} 
                        width={400} 
                        height={300} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        style={{ 
                            objectFit: "cover",  // Prevents stretching
                            width: "100%",       // Responsive width
                            height: "auto",      // Auto scales height
                            aspectRatio: "4/3",  // Locks proportions across devices
                            display: "block"
                        }}
                    />
                </a>
                {/* {imgSrc ? <img src={imgSrc} className="offerimg" alt={imgAlt} decoding="async"  loading="lazy" /> : null} */}
                <div className="px-3 pt-3 card-body">
                    {spanTitle && <span>{spanTitle}</span>}
                    {cardLinkName ? (
                        <a href={cardLinkName} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h5 className={titleClass}>{titleCard}</h5>
                        </a>
                    ) : (
                        <h5 className={titleClass}>{titleCard}</h5>
                    )}
                    {descriptionCard ? <p className="">{descriptionCard}</p> : null}
                    {buttonTextCard ? (
                        <a href={linkCard} className="know_more">
                            {buttonTextCard}
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Card;