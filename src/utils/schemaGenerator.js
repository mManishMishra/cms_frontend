// src/utils/schemaGenerator.js

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hcinterior.in";

/**
 * Generates Base Organization Schema
 */
// Change these two functions in src/utils/schemaGenerator.js
export const generateOrganizationSchema = (settings) => {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "High Creation Interior",
        "url": BASE_URL,
        "logo": `${BASE_URL}/images/new_hc_logo.png`,
        "sameAs": [
            settings?.facebook_url || "https://www.facebook.com/highcreationinterior/",
            settings?.instagram_url || "https://www.instagram.com/highcreationinterior/"
        ].filter(Boolean) // removes empty strings
    };
};

export const generateLocalBusinessSchema = (settings) => {
    return {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness", 
        "name": "High Creation Interior",
        "image": `${BASE_URL}/images/new_hc_logo.png`,
        "@id": BASE_URL,
        "url": BASE_URL,
        "telephone": settings?.phone || "+91-8527750562", 
        "address": {
            "@type": "PostalAddress",
            "streetAddress": settings?.address || "Noida", 
            "addressCountry": "IN"
        }
    };
};

/**
 * Generates Local Business Schema
 */

/**
 * Generates Dynamic Breadcrumb Schema
 */
export const generateBreadcrumbSchema = (slug, title) => {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": title || "Page",
                "item": `${BASE_URL}/${slug}`
            }
        ]
    };
};

/**
 * Generates Automated FAQ Schema based on CMS Data
 */
// export const generateFAQSchema = (faqsArray) => {
//     if (!faqsArray || faqsArray.length === 0) return null;

//     const faqItems = faqsArray.map(faq => ({
//         "@type": "Question",
//         "name": faq.question,
//         "acceptedAnswer": {
//             "@type": "Answer",
//             "text": faq.answer
//         }
//     }));

//     return {
//         "@context": "https://schema.org",
//         "@type": "FAQPage",
//         "mainEntity": faqItems
//     };
// };

/**
 * Generates Automated FAQ Schema based on CMS Data
 */
export const generateFAQSchema = (faqsArray) => {
    if (!faqsArray || faqsArray.length === 0) return null;

    const faqItems = faqsArray.map(faq => ({
        "@type": "Question",
        // Map to the actual data structure used in the page
        "name": faq?.json_content?.title || faq?.question || "FAQ",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq?.json_content?.description || faq?.answer || ""
        }
    }));

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems
    };
};