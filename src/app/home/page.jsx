import { Suspense } from "react";
import HeroCarousel from "./clientHome/HeroCarousel";
import HomeContent from "./HomeContent"; 

// --- OPTIMIZATION: ISR Configuration ---
export const revalidate = 60; // Regenerate page every 60 seconds

export const metadata = {
  title: "Top Interior Designers In Delhi NCR For Home",
  description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR. Book free consultation today",
  alternates: { canonical: "https://hcinterior.in" },
  openGraph: {
    title: "Top Interior Designers In Delhi NCR For Home",
    description: "Home interior designers in Delhi NCR...",
    url: "https://hcinterior.in",
    siteName: "High Creation Interior",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, 
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "High Creation Interior",
  "url": "https://hcinterior.in",
  "sameAs": [
    "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd",
    "https://www.instagram.com/highcreationinterior/"
  ]
};

// --- HELPER: Native Fetch for Next.js Caching ---
async function getBannerData() {
  try {
    // Determine Base URL directly
    const baseURL = process.env.NODE_ENV === "development" 
      ? process.env.NEXT_PUBLIC_API_DEV_URL 
      : process.env.NEXT_PUBLIC_API_BASE_URL;

    // Use native fetch for better ISR support
    // const res = await fetch(`${baseURL}/cms-content/homepage_banner`, {
    //   next: { revalidate: 60 } 
    // });
    const res = await fetch(`${baseURL}/cms-content/homepage_banner`, {
      cache: "no-store", 
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch banner: ${res.status}`);
    }

    const data = await res.json();
    return data?.json_content || [];
  } catch (err) {
    console.error("Banner Fetch Error:", err);
    return [];
  }
}

export default async function Home() {
  const bannerData = await getBannerData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Hero Carousel */}
      <HeroCarousel bannerData={bannerData} />

      {/* 2. The Rest of the Page */}
      <Suspense fallback={<div className="py-5 text-center">Loading Content...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}