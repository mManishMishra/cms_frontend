"use client"
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Team = () => {
  // const teamdata = [
  //   {
  //     imgs: "/images/team/mansi-mam.webp",
  //     name: "Senior Interior Designer",
  //     designation: "Senior Interior Designer",
  //     description: `Mansi designs creative and functional spaces, blending aesthetics with practical solutions for diverse projects.
  // `,
  //   },

  //   {
  //     imgs: "/images/team/lalit.webp",
  //     name: "Lalit Mohan",
  //     designation: "Digital Marketing Manager",
  //     description: `Oversees online campaigns, SEO strategies, & content development to enhance brand visibility & engagement.
  //   `,
  //   },
  //   {
  //     imgs: "/images/team/akash.webp",
  //     name: "Akash Gupta",
  //     designation: "Commericial Architect",
  //     description: `Akash focuses on sustainable, innovative designs, transforming spaces into functional works of art.
  //   `,
  //   },
  //   {
  //     imgs: "/images/team/anjeev.webp",
  //     name: "Sanjeev",
  //     designation: "Project Manager",
  //     description: `Sanjeev ensures timely project execution, overseeing all stages from concept to completion with precision.
  //   `,
  //   },
  // ];

  const [teamDataList, setTeamDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = useCallback(async () => {
    try {
        const response = await api.get("/cms-content/team", {
        });
        if (response.data?.length > 0) {
        setTeamDataList(response.data ?? []);
      }
      setLoading(false);
    } catch (err) {
        toast.error(err.message ?? "Failed to fetch team data. Please try again.");
        setLoading(false);
    }
}, []);

useEffect(() => {
    fetchQueries();
}, [fetchQueries]);

  return (
    <div>
      <section className="my-5">
        <div className="container">
          <div className="row">
            <h3 className="pb-4 text-center">Our Teams</h3>
            {teamDataList && teamDataList.slice(0, 4).map((teamItem) => {
              return (
                <div key={teamItem.id} className="col-lg-3 col-md-6 col-12">
                  <div className="card border-0">
                    <div className="imgboxteam">
                      <img
                        src={teamItem?.json_content?.image}
                        alt={teamItem?.json_content?.title ?? defaultAltText}
                        className="team_img"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h6 className="">{teamItem?.json_content?.title ?? "-"}</h6>
                      <p className="team_designation">{teamItem?.json_content?.designation}</p>
                      <p className="team_description">{teamItem?.json_content?.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
};

export default Team;
