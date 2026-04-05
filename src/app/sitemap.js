export default async function sitemap() {
    const siteUrl = "https://hcinterior.in"; 
  
    try {
      const apiBase = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL;
  
      // Fetch SEO Tags, Blogs, AND Custom CMS Pages simultaneously
      const [seoRes, blogRes, cmsPagesRes] = await Promise.all([
        fetch(`${apiBase}/seo-tag?status=active`, { next: { revalidate: 60 } }),
        fetch(`${apiBase}/cms-blog?status=active`, { next: { revalidate: 60 } }),
        fetch(`${apiBase}/cms-pages`, { next: { revalidate: 60 } }) // Fetch CMS pages
      ]);
  
      const allSeoTags = seoRes.ok ? await seoRes.json() : [];
      const allBlogs = blogRes.ok ? await blogRes.json() : [];
      const allCmsPages = cmsPagesRes.ok ? await cmsPagesRes.json() : [];
  
      // 1. Format Main Pages (From Look URLs / SEO Tags)
      const pageRoutes = allSeoTags
        .filter((tag) => {
          const robots = tag.meta_robots?.toLowerCase() || "";
          return !robots.includes("noindex"); 
        })
        .map((tag) => {
          let cleanUrl = tag.page_name || "";
          if (!cleanUrl.startsWith("http")) {
            cleanUrl = `${siteUrl}${cleanUrl.startsWith("/") ? "" : "/"}${cleanUrl}`;
          }
          
          if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
          const isHomePage = cleanUrl === siteUrl;
  
          return {
            url: cleanUrl,
            lastModified: tag.updated_at ? new Date(tag.updated_at) : new Date(),
            changeFrequency: isHomePage ? "weekly" : "monthly",
            priority: isHomePage ? 1.0 : 0.8,
          };
        });
  
      // 2. Format Blog Posts
      const blogRoutes = allBlogs.map((blog) => {
        const slug = blog?.seo_content?.slug || blog?.slug || `blog-detail?id=${blog.id}`;
        let cleanUrl = `${siteUrl}/${slug}`;
        if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
  
        return {
          url: cleanUrl,
          lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.64, 
        };
      });
  
      // 3. Format New Custom CMS Pages
      const cmsPageRoutes = allCmsPages
        .filter((page) => {
          // Only include if the status is explicitly "Published"
          if (page.status !== "Published") return false;
          
          // Ensure the page actually has a slug saved in its SEO settings
          if (!page.seo_content || !page.seo_content.slug) return false;
          
          // Respect the "No Index" rule if the client selected it in the SEO modal
          if (page.seo_content.meta_robots_index === "noindex") return false;
          
          return true;
        })
        .map((page) => {
          let cleanUrl = `${siteUrl}/${page.seo_content.slug}`;
          if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
  
          return {
            url: cleanUrl,
            lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
            changeFrequency: "monthly",
            priority: 0.8, 
          };
        });
  
      // Combine all arrays and automatically remove any duplicates.
      // (If the client accidentally added a page to both the Page Builder and the Look URL tab, it will only show up once).
      const allRoutes = [...pageRoutes, ...blogRoutes, ...cmsPageRoutes];
      const uniqueRoutes = Array.from(new Map(allRoutes.map(item => [item.url, item])).values());
  
      return uniqueRoutes;
  
    } catch (error) {
      console.error("Dynamic Sitemap Generation Error:", error);
      
      // Fallback to prevent crashing if backend is down
      return [
        {
          url: "https://hcinterior.in",
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 1.0,
        },
      ];
    }
  }