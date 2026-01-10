"use client"
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const TeamGallery = () => {
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
  //   {
  //     imgs: "/images/team/dinesh.webp",
  //     name: "Dinesh Bansal",
  //     designation: "Finance Head",
  //     description: `Manages company financial planning, analysis, & reporting, ensuring optimal financial health & strategic growth.
  //   `,
  //   },
  //   {
  //     imgs: "/images/team/ashish.webp",
  //     name: "Ashish Pal",
  //     designation: "Senior Marketing Manager",
  //     description: `Leads marketing strategies, oversees campaigns, & drives brand growth through targeted digital and offline channels
  //     `,
  //   },
  //   {
  //     imgs: "/images/team/abhishelk.webp",
  //     name: "Abishek Rao Bhati",
  //     designation: "Project Manager",
  //     description: `Oversees project execution, manages timelines, resources, 7 ensures successful delivery within budget & scop
  //     `,
  //   },
  //   {
  //     imgs: "/images/team/mansi-mam.webp",
  //     name: "Mansi Gupta",
  //     designation: "CMO",
  //     description: `Lorem ipsum dolor sit amet, consectetur
  //     adipiscing elit. Mauris fringilla, risus
  //     eget porta ultrices, felis ligula viverra
  //     `,
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
          <img src="images/teams.jpeg" className="img-thumbnail"/> 
          {/* <div className="row">
     
            {teamDataList&&teamDataList?.map((teamItem, index) => {
              return (
                <>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="card border-0">
                      <div className="imgboxteam">
                        <img src={teamItem?.json_content?.image} alt={teamItem?.json_content?.title ?? defaultAltText} className="team_img" />
                      </div>
                      <div className="card-body text-center">
                        <h6 className="">{teamItem?.json_content?.title ?? "-"}</h6>
                        <p className="team_designation">{teamItem?.json_content?.designation ?? "-"}</p>
                        <p className="team_description">{teamItem?.json_content?.description}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div> */}
        </div>
      </section>
      <hr />
    </div>
  );
};

export default TeamGallery;
