"use client";
import CountUp from "react-countup";
const CounterNumber = (props) => {
  return (
    <div>
      <CountUp
        className="fs-2 fw-bolder counter_number"
        start={props.counterStart3}
        end={props.counterEnd3}
        duration={props.counterDuration3}
        suffix={props.counterSuffix3}
      />
      <p className="team_designation mb-0">{props.description1}</p>
      <p className="team_designation mb-0">{props.description2}</p>
    </div>
  );
};

export default CounterNumber;
