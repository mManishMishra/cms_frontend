"use client";

import CountUp from "react-countup";
import Image from "next/image";

const CounterRow = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row mx-0">
          {/* Left Column: Image */}
          <div className="col-lg-6">
            {props.ImgCounter && (
              <Image
                src={props.ImgCounter}
                className={props.ImgCounterClass}
                alt={props.imgAltCounter || "Celebrating Excellence"}
                width={600}
                height={400}
                priority={true} // Optimization: Load early as it is likely above/near fold
                style={{ height: "auto", width: "100%" }}
              />
            )}
          </div>

          {/* Right Column: Content & Counters */}
          <div className="col-lg-6 px-0">
            <div className={props.divClassCounter}>
              <h3 className="font_about">
                {props.titleHeadingCounter}
                <span className={props.subHeadingClassCounter}>
                  {props.subHeadingCounter}
                </span>
              </h3>

              <div className="d-flex row justify-content-end pb-3 pt-3 mt-3 pt-lg-5">
                <CounterBlock
                  end={props.counterEnd}
                  duration={props.counterDuration}
                  suffix={props.counterSuffix}
                  label={`Renovations\nAccomplished`}
                />

                <CounterBlock
                  end={props.counterEnd2}
                  duration={props.counterDuration2}
                  suffix={props.counterSuffix2}
                  label={`Delighted\nCustomers`}
                />

                <CounterBlock
                  end={props.counterEnd3}
                  duration={props.counterDuration3}
                  suffix={props.counterSuffix3}
                  label={`Staff`}
                />

                <CounterBlock
                  end={props.counterEnd4}
                  duration={props.counterDuration4}
                  suffix={props.counterSuffix4}
                  label={`Years of\nProficiency`}
                />
              </div>

              <p className="team_description text-start">{props.descriptionCounter}</p>

              <div className="mt-3 mt-lg-5 d-flex justify-content-end">
                {props.btnLink && (
                  <a className={props.textAboutBtnCLass} href={props.btnLink}>
                    {props.textAboutBtnCounter}
                  </a>
                )}

                {props.btnLink2 && (
                  <a className={props.textAboutBtnCLass2} href={props.btnLink2}>
                    {props.textAboutBtnCounter2}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- OPTIMIZED SAFE COUNTER BLOCK ---------------- */

const CounterBlock = ({ end, duration, suffix, label }) => {
  let safeEnd = 0;

  try {
    if (end !== undefined && end !== null) {
      // FIX: Handle strings with special chars like "150+" or "1,000"
      // 1. Convert to string to be safe
      // 2. Remove commas (e.g., "1,000" -> "1000")
      // 3. Use parseInt instead of Number() so "150+" becomes 150 instead of NaN
      const sanitized = String(end).replace(/,/g, '');
      const parsed = parseInt(sanitized, 10);
      
      if (!isNaN(parsed)) {
        safeEnd = parsed;
      }
    }
  } catch (error) {
    console.warn("Counter parsing error:", error);
    safeEnd = 0;
  }

  return (
    <div className="pe-4 col-lg-3 col-md-3 col-6">
      <CountUp
        className="fs-2 fw-bolder counter_number"
        start={0}
        end={safeEnd}
        duration={Number(duration) || 2.5}
        suffix={suffix || ""}
        enableScrollSpy={true} // Performance: Only start animation when in viewport
        scrollSpyOnce={true}   // Performance: Run animation only once
      />
      <p className="team_designation">
        {/* Safely split label by newline for styling */}
        {label && label.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default CounterRow;