import { notFound } from "next/navigation";
import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import DOMPurify from "isomorphic-dompurify";

export async function generateMetadata({ params }) {
  const baseUrl = "https://hcinterior.in";
  const slug = params.blog;
  const canonicalUrl = `${baseUrl}/${slug}`;
  try {
    const response = await api.get(`/cms-blog/blog-slug/${slug}`);
    const blogDetails = response.data;
    const metaTitle = blogDetails?.seo_content?.meta_title ?? "My Page Title";
    return {
      title: blogDetails?.seo_content?.meta_title ?? "My Page Title",
      description: blogDetails?.seo_content?.meta_description ?? "Default description",
      keywords: blogDetails?.seo_content?.meta_keywords ?? "Default keywords",
       
      alternates: {
        canonical: canonicalUrl,
      },
      other: {
        title: metaTitle,
      },
    };
  } catch (error) {
    return { title: "Page Not Found" };
  }
}

const BlogDetail = async ({ params }) => {
  const slug = params.blog;
  try {
    const response = await api.get(`/cms-blog/blog-slug/${slug}`);
    const blogDetails = response.data;
  
    return (
      <MainLayout>
        <main>
          <div className="blog_detail">
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-10">
                  <h2 className="pb-3">{blogDetails?.title}</h2>
                  <div className="blog-img">
                    {blogDetails?.image && (
                      <img
                        src={blogDetails.image}
                        className="image_blog"
                        alt={blogDetails.title}
                      />
                    )}
                  </div>
                  <div className="details py-4">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails.description) }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </main>
      </MainLayout>
    );
  } catch (error) {
    notFound(); // Redirects to 404 page
  }
};

export default BlogDetail;
