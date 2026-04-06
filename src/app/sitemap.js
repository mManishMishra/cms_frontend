import {
  SITE_URL,
  getCanonicalUrl,
  getSitemapChangeFrequency,
  getSitemapPriority,
  shouldIncludeInSitemap,
} from "@/utils/seoHelpers";

const CITY_ROUTE_FALLBACKS = {
  noida: "/services-detail/noida",
  greater_noida: "/services-detail/greater_noida",
  delhi: "/services-detail/delhi",
  gurugram: "/services-detail/gurugram",
  faridabad: "/services-detail/faridabad",
  ghaziabad: "/services-detail/ghaziabad",
  manesar: "/services-detail/manesar",
  dwarka: "/services-detail/dwarka",
};

function buildSitemapEntry({
  seoData = {},
  fallbackPath = "",
  lastModified,
  defaultChangeFrequency = "monthly",
  defaultPriority = 0.8,
}) {
  const url = getCanonicalUrl({
    canonicalUrl: seoData?.canonical_url,
    metaCanonicalTag: seoData?.meta_can_tag,
    fallbackPath,
    siteUrl: SITE_URL,
  });

  if (!url) {
    return null;
  }

  return {
    url,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: getSitemapChangeFrequency(
      seoData?.sitemap_change_frequency,
      defaultChangeFrequency
    ),
    priority: getSitemapPriority(seoData?.sitemap_priority, defaultPriority),
  };
}

export default async function sitemap() {
  try {
    const apiBase =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL;

    const [seoRes, blogRes, cmsPagesRes, cmsCityRes] = await Promise.all([
      fetch(`${apiBase}/seo-tag?status=active`, { next: { revalidate: 60 } }),
      fetch(`${apiBase}/cms-blog`, { next: { revalidate: 60 } }),
      fetch(`${apiBase}/cms-pages`, { next: { revalidate: 60 } }),
      fetch(`${apiBase}/cms-city`, { next: { revalidate: 60 } }),
    ]);

    const allSeoTags = seoRes.ok ? await seoRes.json() : [];
    const allBlogs = blogRes.ok ? await blogRes.json() : [];
    const allCmsPages = cmsPagesRes.ok ? await cmsPagesRes.json() : [];
    const allCmsCities = cmsCityRes.ok ? await cmsCityRes.json() : [];

    const pageRoutes = allSeoTags
      .filter(
        (tag) => tag?.status === "active" && shouldIncludeInSitemap(tag)
      )
      .map((tag) =>
        buildSitemapEntry({
          seoData: tag,
          fallbackPath: tag.page_name || "/",
          lastModified: tag.updated_at,
          defaultChangeFrequency:
            tag.page_name === "/" || tag.page_name === SITE_URL
              ? "weekly"
              : "monthly",
          defaultPriority:
            tag.page_name === "/" || tag.page_name === SITE_URL ? 1 : 0.8,
        })
      );

    const blogRoutes = allBlogs
      .filter(
        (blog) =>
          blog?.status === "Published" &&
          shouldIncludeInSitemap(blog?.seo_content) &&
          (blog?.seo_content?.canonical_url || blog?.seo_content?.slug)
      )
      .map((blog) =>
        buildSitemapEntry({
          seoData: blog?.seo_content || {},
          fallbackPath: `/${blog?.seo_content?.slug || `blog-detail?id=${blog.id}`}`,
          lastModified: blog.updated_at,
          defaultChangeFrequency: "weekly",
          defaultPriority: 0.64,
        })
      );

    const cmsPageRoutes = allCmsPages
      .filter(
        (page) =>
          page?.status === "Published" &&
          shouldIncludeInSitemap(page?.seo_content) &&
          (page?.seo_content?.canonical_url || page?.seo_content?.slug)
      )
      .map((page) =>
        buildSitemapEntry({
          seoData: page?.seo_content || {},
          fallbackPath: `/${page?.seo_content?.slug || ""}`,
          lastModified: page.updated_at,
          defaultChangeFrequency: "monthly",
          defaultPriority: 0.8,
        })
      );

    const cmsCityRoutes = allCmsCities
      .filter(
        (city) =>
          shouldIncludeInSitemap(city?.seo_content) &&
          (city?.seo_content?.canonical_url || city?.city_type)
      )
      .map((city) =>
        buildSitemapEntry({
          seoData: city?.seo_content || {},
          fallbackPath:
            CITY_ROUTE_FALLBACKS[city?.city_type] ||
            `/services-detail/${city?.city_type || ""}`,
          lastModified: city.updated_at,
          defaultChangeFrequency: "monthly",
          defaultPriority: 0.7,
        })
      );

    const allRoutes = [
      ...pageRoutes,
      ...blogRoutes,
      ...cmsPageRoutes,
      ...cmsCityRoutes,
    ].filter(Boolean);

    return Array.from(new Map(allRoutes.map((item) => [item.url, item])).values());
  } catch (error) {
    console.error("Dynamic Sitemap Generation Error:", error);

    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
