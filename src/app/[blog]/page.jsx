import MainLayout from "../layouts/MainLayout";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";
import Image from "next/image"; 
import { headers } from "next/headers"; 

// Import react-icons
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
  FaUserCircle,
  FaCalendarAlt
} from "react-icons/fa";

// Import our automated schema generators
import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema, 
  generateBreadcrumbSchema, 
  generateFAQSchema 
} from "@/utils/schemaGenerator";
import { getCanonicalUrl, getRobotsDirectives } from "@/utils/seoHelpers";

// Force Next.js to treat this as a highly dynamic route
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

/**
 * 🔒 Slug Guard
 * Blocks bots, invalid URLs, and legacy junk
 */
const isValidSlug = (slug) => {
  if (!slug) return false;
  if (slug === "undefined" || slug === "null") return false;
  if (slug.includes(".")) return false; // blocks .env, .git, etc
  return true;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidev.hcinterior.in";

/**
 * --- HELPER: Safely check if a page/blog is marked as Draft ---
 */
const isDraftStatus = (data) => {
  if (!data) return true;
  // If no status is found, assume it's NOT a draft.
  if (data.status === undefined || data.status === null) return false; 
  
  const status = String(data.status).toLowerCase().trim();
  return status === "draft" || status === "inactive" || status === "0";
};

/**
 * --- HELPER: Fetch for Blogs ---
 */
async function getBlogData(slug) {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`${API_BASE_URL}/cms-blog/blog-slug/${slug}?t=${timestamp}`, {
      cache: "no-store", 
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    
    if (!res.ok) return null;
    let data = await res.json();
    
    if (!data || data.success === false) return null;

    if (Array.isArray(data)) {
        if (data.length === 0) return null;
        data = data[0]; 
    }
    
    return data;
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return null;
  }
}

/**
 * --- HELPER: Fetch for Custom CMS Pages ---
 */
async function getCmsPageData(slug) {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`${API_BASE_URL}/cms-pages/slug/${slug}?t=${timestamp}`, {
      cache: "no-store", 
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    
    if (!res.ok) return null;
    let data = await res.json();
    
    if (!data || data.success === false) return null;

    if (Array.isArray(data)) {
        if (data.length === 0) return null;
        data = data[0]; 
    }
    
    return data;
  } catch (error) {
    console.error("CMS Page Fetch Error:", error);
    return null;
  }
}

/**
 * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
 */
export async function generateMetadata({ params }) {
  headers();

  const slug = params.blog;

  if (!isValidSlug(slug)) {
    return { title: "Not Found", robots: { index: false, follow: true } };
  }

  let data = await getBlogData(slug);
  
  if (!data) {
    data = await getCmsPageData(slug);
  }

  // 🛑 DRAFT PROTECTION
  if (!data || isDraftStatus(data)) {
    return { title: "Not Found", robots: { index: false, follow: true } };
  }

  const robots = getRobotsDirectives(data?.seo_content);
  const canonicalUrl = getCanonicalUrl({
    canonicalUrl: data?.seo_content?.canonical_url,
    fallbackPath: `/${slug}`,
  });

  return {
    title:
      data?.seo_content?.meta_title ??
      data?.title ??
      "HC Interior",
    description:
      data?.seo_content?.meta_description ?? "",
    keywords:
      data?.seo_content?.meta_keywords ?? "",
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
  };
}

/**
 * HELPER: Safely parse JSON arrays coming from the database
 */
const parseJsonSafe = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

/**
 * ✅ DYNAMIC ROOT PAGE (SERVER COMPONENT)
 */
const DynamicRootPage = async ({ params }) => {
  headers();

  const slug = params.blog;

  if (!isValidSlug(slug)) {
    notFound();
  }

  // 1. Determine Data and Page Type
  let pageData = await getBlogData(slug);
  let pageType = "blog";

  if (!pageData) {
    pageData = await getCmsPageData(slug);
    pageType = "cms-page";
  }

  // 2. 🛑 DRAFT PROTECTION
  if (!pageData || isDraftStatus(pageData)) {
    notFound();
  }

  // 3. Safely parse our dynamic arrays for CMS pages
  let faqs = [];
  let accordions = [];
  let contentBlocks = [];

  if (pageType === "cms-page") {
    faqs = parseJsonSafe(pageData.faqs);
    accordions = parseJsonSafe(pageData.accordions);
    contentBlocks = parseJsonSafe(pageData.content_blocks);
  }

  // 🌟 NEW: Fetch Global Settings from Backend
  let siteSettings = null;
  try {
    const timestamp = new Date().getTime();
    const setRes = await fetch(`${API_BASE_URL}/site-settings`, { 
        cache: "no-store",
        headers: { 'Cache-Control': 'no-cache' }
    });
    if (setRes.ok) {
        const rawSettings = await setRes.json();
        // Fallback to extract correctly whether it returns an array or object
        siteSettings = Array.isArray(rawSettings) ? rawSettings[0] : rawSettings;
    }
  } catch (e) { 
      console.error("Settings fetch failed", e); 
  }

  // 🌟 UPDATE: Pass settings into generators
  const orgSchema = generateOrganizationSchema(siteSettings);
  const localBizSchema = generateLocalBusinessSchema(siteSettings);
  const breadcrumbSchema = generateBreadcrumbSchema(slug, pageData.title);
  const hasCustomFaqSchema =
    typeof pageData?.seo_content?.custom_code === "string" &&
    /FAQPage/i.test(pageData.seo_content.custom_code);
  const faqSchema =
    faqs.length > 0 && !hasCustomFaqSchema ? generateFAQSchema(faqs) : null;

  return (
    <MainLayout>
      
      {/* =========================================
          🌟 AUTOMATED SCHEMA INJECTION
      ========================================= */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* ✅ Controlled JSON-LD injection (Custom from CMS SEO Modal) */}
      {pageData?.seo_content?.custom_code && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageData.seo_content.custom_code,
          }}
        />
      )}

      {/* ✅ INJECTED STYLES FOR SOCIAL MEDIA ICONS */}
      <style dangerouslySetInnerHTML={{__html: `
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #f1f5f9;
          color: #475569;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-btn:hover {
          transform: translateY(-4px);
        }
        .social-btn.fb:hover { background-color: #1877F2; color: white; box-shadow: 0 6px 12px rgba(24, 119, 242, 0.3); }
        .social-btn.ig:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white; box-shadow: 0 6px 12px rgba(214, 36, 159, 0.3); }
        .social-btn.tw:hover { background-color: #000000; color: white; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); }
        .social-btn.in:hover { background-color: #0A66C2; color: white; box-shadow: 0 6px 12px rgba(10, 102, 194, 0.3); }
        .social-btn.pi:hover { background-color: #E60023; color: white; box-shadow: 0 6px 12px rgba(230, 0, 35, 0.3); }
        .social-btn.yt:hover { background-color: #FF0000; color: white; box-shadow: 0 6px 12px rgba(255, 0, 0, 0.3); }
      `}} />

      <main>
        {/* =========================================
            UI FOR BLOG POSTS
        ========================================= */}
        {pageType === "blog" && (
          <div className="blog_detail">
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-10">
                  <h1 className="pb-3">{pageData.title}</h1>

                  {pageData.image && (
                    <div className="position-relative w-100 mb-4" style={{ minHeight: '300px' }}>
                      <Image
                        src={pageData.image}
                        alt={pageData.image_alt || pageData.title || defaultAltText}
                        width={1200}
                        height={600}
                        className="w-100 h-auto object-fit-cover rounded"
                        priority={true} 
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  )}

                  <div className="details py-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pageData.description, 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            UI FOR CUSTOM CMS PAGES
        ========================================= */}
        {pageType === "cms-page" && (
          <div className="custom_page_detail">
            <div className="container">
              <div className="row my-5 justify-content-center mx-0">
                <div className="col-lg-12">
                  
                  {/* 🌟 1. PAGE TITLE */}
                  <h1 className="mb-4 fw-bold">{pageData.title}</h1>

                  {/* 🌟 AUTHOR, DATE & DYNAMIC SOCIAL LINKS */}
                  {pageData.show_author_date && (
                      <div className="author-date-social-block d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-4">
                          
                          {/* Left Side: Author and Date */}
                          <div className="text-muted fst-italic fs-6 mb-3 mb-md-0 d-flex align-items-center">
                              <FaUserCircle className="me-2" size={18} />
                              {pageData.writer_name ? `By ${pageData.writer_name}` : "By Author"} 
                              <span className="mx-3">•</span> 
                              <FaCalendarAlt className="me-2" size={16} />
                              {new Date(pageData.created_at || Date.now()).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                              })}
                          </div>

                          {/* Right Side: Dynamic Social Media Icons with Branded Styling */}
                          <div className="social-links d-flex gap-2">
                              {siteSettings?.facebook_url && (
                                  <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="social-btn fb" aria-label="Facebook">
                                      <FaFacebookF size={18} />
                                  </a>
                              )}
                              {siteSettings?.instagram_url && (
                                  <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="social-btn ig" aria-label="Instagram">
                                      <FaInstagram size={18} />
                                  </a>
                              )}
                              {siteSettings?.twitter_url && (
                                  <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="social-btn tw" aria-label="X (Twitter)">
                                      <FaTwitter size={18} />
                                  </a>
                              )}
                              {siteSettings?.linkedin_url && (
                                  <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-btn in" aria-label="LinkedIn">
                                      <FaLinkedin size={18} />
                                  </a>
                              )}
                              {siteSettings?.pinterest_url && (
                                  <a href={siteSettings.pinterest_url} target="_blank" rel="noopener noreferrer" className="social-btn pi" aria-label="Pinterest">
                                      <FaPinterest size={18} />
                                  </a>
                              )}
                              {siteSettings?.youtube_url && (
                                  <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer" className="social-btn yt" aria-label="YouTube">
                                      <FaYoutube size={18} />
                                  </a>
                              )}
                          </div>

                      </div>
                  )}

                  {/* 🌟 2. MAIN CKEDITOR CONTENT */}
                  <div className="details py-4">
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
                  </div>

                  {/* 🌟 3. CONTENT BLOCKS */}
                  {contentBlocks.length > 0 && (
                    <div className="content-blocks-section mt-5">
                      {contentBlocks.map((block, idx) => (
                        <div key={idx} className="mb-4 p-4 border rounded bg-light shadow-sm">
                          
                          {/* Testimonial Block */}
                          {block.type === 'testimonial' && (
                            <blockquote className="blockquote text-center mb-0">
                              <p className="mb-3 fs-5 font-italic">
                                &quot;{block.data.review}&quot;
                              </p>
                              <footer className="blockquote-footer mt-0 fs-6">
                                {block.data.client_name} <cite title="Source Title">{block.data.designation}</cite>
                              </footer>
                            </blockquote>
                          )}

                          {/* Service Row Block */}
                          {block.type === 'service_row' && (
                            <div className="row align-items-center">
                              <div className={block.data.reverse_layout ? 'col-md-6 order-md-2' : 'col-md-6'}>
                                <h3 className="fw-bold mb-3">{block.data.heading}</h3>
                                <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>{block.data.description}</p>
                              </div>
                              <div className={block.data.reverse_layout ? 'col-md-6 order-md-1 text-center' : 'col-md-6 text-center'}>
                                {block.data.image_url && (
                                  <img 
                                    src={block.data.image_url} 
                                    alt={block.data.image_alt || block.data.heading || defaultAltText} 
                                    className="img-fluid rounded shadow" 
                                    style={{ maxHeight: '350px', objectFit: 'cover' }} 
                                  decoding="async"  loading="lazy" />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Counter Block */}
                          {block.type === 'counter' && (
                            <div className="text-center p-4">
                              <h2 className="text-primary fw-bold display-4 mb-2">{block.data.number}</h2>
                              <p className="fw-semibold text-uppercase text-secondary mb-0 tracking-wider">{block.data.label}</p>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  )}

                  {/* 🌟 4. ACCORDIONS */}
                  {accordions.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-4 fw-bold">Additional Information</h3>
                      <div className="accordion" id={`accordion-info-${pageData.id}`}>
                        {accordions.map((acc, index) => (
                          <div className="accordion-item mb-3 border rounded shadow-sm" key={`acc-${index}`}>
                            <h2 className="accordion-header" id={`acc-heading${index}`}>
                              <button 
                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#acc-collapse${index}`} 
                                aria-expanded={index === 0 ? "true" : "false"} 
                                aria-controls={`acc-collapse${index}`}
                                style={{ backgroundColor: '#f8f9fa' }}
                              >
                                {acc.title}
                              </button>
                            </h2>
                            <div 
                              id={`acc-collapse${index}`} 
                              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                              aria-labelledby={`acc-heading${index}`} 
                              data-bs-parent={`#accordion-info-${pageData.id}`}
                            >
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>
                                {acc.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🌟 5. FREQUENTLY ASKED QUESTIONS */}
                  {faqs.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
                      <div className="accordion" id={`accordion-faq-${pageData.id}`}>
                        {faqs.map((faq, index) => (
                          <div className="accordion-item mb-3 border rounded shadow-sm" key={`faq-${index}`}>
                            <h2 className="accordion-header" id={`faq-heading${index}`}>
                              <button 
                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold`} 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#faq-collapse${index}`} 
                                aria-expanded={index === 0 ? "true" : "false"} 
                                aria-controls={`faq-collapse${index}`}
                                style={{ backgroundColor: '#f8f9fa' }}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div 
                              id={`faq-collapse${index}`} 
                              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                              aria-labelledby={`faq-heading${index}`} 
                              data-bs-parent={`#accordion-faq-${pageData.id}`}
                            >
                              <div className="accordion-body text-muted" style={{ whiteSpace: 'pre-line' }}>
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}
        
        <hr />
      </main>
    </MainLayout>
  );
};

export default DynamicRootPage;
