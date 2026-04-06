import { format } from "date-fns"; 
import api from "@/utils/api";
import MainLayout from "../layouts/MainLayout";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import Blogs from "../components/Blogs";
import { defaultAltText } from "@/utils/helper";

// --- FIX: Dynamic Metadata for Pagination ---
export async function generateMetadata({ searchParams }) {
  const page = searchParams?.page || "1";
  // Self-referencing canonical tag
  const canonicalUrl = page === "1" 
    ? "https://hcinterior.in/blog" 
    : `https://hcinterior.in/blog?page=${page}`;

  return {
    title: "Latest News And Updates",
    description: "Latest News & Updates From High Creation Interior In Noida. Discover interior design blogs.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Converted to Server Component
const Blog = async ({ searchParams }) => {
  const page = searchParams?.page || "1";
  let blogs = [];
  let error = null;

  try {
    const response = await api.get(`/cms-blog`, {
      params: { page }
    });
    if (response.status === 200) {
      blogs = response.data;
    }
  } catch (err) {
    error = "Failed to load Blogs. Please try again.";
    console.error(err);
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd-MM-yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <MainLayout>
      <main>
        <BackgroundImageWithHeading
          sectionBgImages={"contact_wrapper services"}
          sectionBgHeading="Blog"
          secBgHeadingClass="sec_bgheading_lass"
          sectionBgDescription=""
          secBgDesClass={"text-center bg-transparent"}
        />
        <div className="container my-5">
          <div className="row g-5 mx-0">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {blogs?.map((design, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-12">
                <Blogs
                  blogCard={"blog_card_main border-0"}
                  imgSrcBlog={design?.image ?? "/images/Blog/blo_img1.webp"}
                  blogImglink={`/${
                    design?.seo_content?.slug ??
                    "blog-detail?id=" + design?.id
                  }`}
                  blogImgALt={design?.title ?? defaultAltText}
                  blogClassImg={"w-100 object-fit-cover blog_imgs"}
                  blogdate={formatDate(design?.published_on)}
                  blogTitle={design?.title}
                  blogDescription={design?.description}
                  buttonBlog="Continue Reading"
                  blogBtnHref={`/${
                    design?.seo_content?.slug ??
                    "blog-detail?id=" + design?.id
                  }`}
                  writer_name={design?.writer_name}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <hr />
    </MainLayout>
  );
};

export default Blog;