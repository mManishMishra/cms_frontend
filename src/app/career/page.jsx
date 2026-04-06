import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import BoxIcon from "../components/BoxIcon";
import { FaArrowRightLong } from "react-icons/fa6";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch Active Jobs ---
async function getJobPostList() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/manage-job/active`, {
      // cache handled by page revalidate
    });

    if (!res.ok) {
      console.error(`Failed to fetch jobs: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Job Fetch Error:", err);
    return [];
  }
}

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    // Match the specific page URL for Career
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/career" ||
          tag.page_name?.endsWith("/career")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "Career - High Creation Interior";
  const defaultDesc =
    "Know about careers in High Creation Interior Noida. High Creation Interior opens doors for professional growth and development in Interior Designing.";
  const defaultCanonical = "https://hcinterior.in/career";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function Career() {
  const jobPostList = await getJobPostList();

  return (
    <MainLayout>
      <main>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper career_page_banner"}
          sectionBgHeading="Career"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription=""
          secBgDesClass={"text-center bg-transparent"}
        />
        <section className="my-5">
          <div className="container">
            <div className="row g-4 justify-content-center mx-0">
              <center>
                <h3 className="pb-4">
                  Where passion for design meets innovation.
                </h3>
                <p className="team_description px-lg-5">
                  Where passion for design meets innovation, we create spaces that
                  inspire and elevate. By blending creativity with the latest
                  technology, we craft personalized interiors that are both
                  beautiful and functional. Our team is dedicated to pushing
                  boundaries, offering cutting-edge solutions that transform ideas
                  into reality. With every project, we strive to deliver designs
                  that not only captivate but also enhance the way you live and
                  work.
                </p>
              </center>
              <div className="col-lg-10">
                <div className="row g-4 mx-0">
                  <div className="col-lg-4 col-md-4 col-12">
                    <BoxIcon
                      iconImage="/images/career/icon/growth.png"
                      iconAlt="Growth Opportunities"
                      iconClass="object-fit-contain"
                      IconBoxHeading="Growth Opportunities & Career Development"
                      IconBoxDescription="We offer continuous learning, skill enhancement, and clear career pathways—empowering every team member to grow, evolve, and achieve their fullest professional potential with us."
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <BoxIcon
                      iconImage="/images/career/icon/work_culture.png"
                      iconAlt="Work Culture"
                      iconClass="object-fit-contain"
                      IconBoxHeading="Work Culture & Team Environment"
                      IconBoxDescription="We foster a collaborative, supportive, and inclusive work culture where every voice matters, ideas thrive, and teamwork drives growth, innovation, and shared success."
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <BoxIcon
                      iconImage="/images/career/icon/employee_success.png"
                      iconAlt="Employee Success"
                      iconClass="object-fit-contain"
                      IconBoxHeading="Employee Success Stories"
                      IconBoxDescription="Employee Success Stories highlight inspiring journeys of growth, dedication, and achievement—showcasing how our people evolve, thrive, and make a lasting impact within our organization."
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-12"></div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <BoxIcon
                      iconImage="/images/career/icon/learning.png"
                      iconAlt="Learning"
                      iconClass="object-fit-contain"
                      IconBoxHeading="Learning & Skill Enhancement Programs"
                      IconBoxDescription="We empower our team with continuous learning, hands-on training, workshops, and skill development programs to foster growth, innovation, and professional excellence at every level."
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <BoxIcon
                      iconImage="/images/career/icon/award.png"
                      iconAlt="Recognition"
                      iconClass="object-fit-contain"
                      IconBoxHeading="Recognition & Rewards"
                      IconBoxDescription="We celebrate dedication and excellence through performance rewards, appreciation programs, and recognition that motivates our team to grow, thrive, and feel truly valued every day."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="pb-5">
          <div className="container">
            <div className="row justify-content-center mx-0">
              <div className="col-lg-10">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Job Posting</th>
                        <th>Experience</th>
                        <th>No of Opening</th>
                        <th>Location</th>
                        <th>Posted On</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobPostList && jobPostList.length > 0 ? (
                        jobPostList.map((job, index) => (
                          <tr key={index}>
                            <td>{job?.title ?? "-"}</td>
                            <td>{job?.experience_required ?? "-"}</td>
                            <td>{job?.job_opening ?? "-"}</td>
                            <td>{job?.location ?? "-"}</td>
                            <td>
                              {job?.created_at ? new Date(job.created_at).toLocaleDateString("en-GB") : "-"}
                            </td>
                            <td>
                              <Link
                                href={`/career/career-form?jobId=${job.id}`}
                                className="text-muted"
                              >
                                <FaArrowRightLong className="fs-4" />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No active job openings at the moment.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="pt-5" />
      </main>
    </MainLayout>
  );
}