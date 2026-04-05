"use client"
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";

const BlogDetail = () => {
  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const slug = path.split('/').pop();
    const blogId = new URLSearchParams(window.location.search).get("id") ?? null;
    const fetchContentManagerPages = async () => {
      try {
        const endpoint = blogId ? `/cms-blog/${blogId}` : `/cms-blog/blog-slug/${slug}`;
        const response = await api.get(endpoint, {});

        if (response.data) {
          setBlogDetails(response.data);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message ?? "Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchContentManagerPages();
  }, []);

  return (
    <div>
      <head>
        <title>{blogDetails?.seo_content?.meta_title ?? "My page title"}</title>
        <meta name="description" content={blogDetails?.seo_content?.meta_description ?? "Default description"} />
        <meta name="keywords" content={blogDetails?.seo_content?.meta_keywords ?? "Default keywords"} />
        <link rel="canonical" href={blogDetails?.seo_content?.canonical_url} />
        {blogDetails?.seo_content?.custom_code &&
          (<script dangerouslySetInnerHTML={{ __html: blogDetails?.seo_content?.custom_code ?? "" }}></script>
          )}
      </head>
      {/* {blogDetails?.seo_content?.custom_code && (
        <div
          dangerouslySetInnerHTML={{
            __html: blogDetails.seo_content.custom_code,
          }}
        />
      )} */}
      <MainLayout>
        <main>
          <div className="blog_deatil">
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-10">
                  <h2 className="pb-3">
                    {blogDetails?.title }
                  </h2>
                  <div className="blog-img">
                    {blogDetails?.image && (
                      <img
                        src={blogDetails?.image}
                        className="image_blog"
                        alt={blogDetails?.title ?? defaultAltText}
                      />
                    )}
                  </div>
                  <div className="details py-4">
                  <p dangerouslySetInnerHTML={{ __html: blogDetails?.description }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default BlogDetail;
