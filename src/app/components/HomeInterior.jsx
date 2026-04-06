const HomeInterior = (props) => {
  return (
    <div>
      <div className={props.nameCard}>
        <img
          src={props.homeInterImg}
          alt={props.homeInterAlt}
          className={`responsive-media ${props.homeInterClass || ""}`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default HomeInterior;
