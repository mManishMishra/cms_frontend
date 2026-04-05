export async function getPageSEO(pageUrlIdentifier) {
    try {
      const baseURL = process.env.NODE_ENV === "development" 
        ? process.env.NEXT_PUBLIC_API_DEV_URL 
        : process.env.NEXT_PUBLIC_API_BASE_URL;
  
      const res = await fetch(`${baseURL}/seo-tag?status=active`, { cache: "no-store" });
  
      if (res.ok) {
        const allSeoTags = await res.json();
        
        // Find the specific tag for the requested page
        const pageSeo = allSeoTags.find(tag => 
          tag.page_name === pageUrlIdentifier || 
          tag.page_name === `${pageUrlIdentifier}/` ||
          tag.page_name.includes(pageUrlIdentifier) // flexible matching
        );
  
        if (pageSeo) {
          const robotsString = pageSeo.meta_robots?.toLowerCase() || "";
          const shouldIndex = robotsString.includes('index') && !robotsString.includes('noindex');
          const shouldFollow = robotsString.includes('follow') && !robotsString.includes('nofollow');
  
          let cleanCanonical = pageUrlIdentifier;
          if (pageSeo.meta_can_tag) {
              if (pageSeo.meta_can_tag.includes("href=")) {
                  const match = pageSeo.meta_can_tag.match(/href=[“"']([^"“']+)["”']/);
                  if (match) cleanCanonical = match[1];
              } else {
                  cleanCanonical = pageSeo.meta_can_tag; 
              }
          }
  
          return {
            title: pageSeo.title,
            description: pageSeo.meta_description,
            alternates: { canonical: cleanCanonical },
            robots: { index: shouldIndex, follow: shouldFollow },
            openGraph: {
              title: pageSeo.title,
              description: pageSeo.meta_description,
              url: cleanCanonical,
              images: pageSeo.og_image ? [{ url: pageSeo.og_image }] : [],
            },
          };
        }
      }
    } catch (err) {
      console.error(`SEO Fetch Error for ${pageUrlIdentifier}:`, err);
    }
  
    // Global Fallback if no CMS entry is found
    return {
      title: "High Creation Interior | Best Interior Designers",
      description: "Elevate your living space with the best interior design company in Noida & Delhi NCR.",
    };
  }