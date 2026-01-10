const HomeInterior = (props) => {
  return (
    <div>
      <div className={props.nameCard}>
        <img
          src={props.homeInterImg}
          alt={props.homeInterAlt}
          className={props.homeInterClass}
        />
      </div>
    </div>
  );
};

export default HomeInterior;
