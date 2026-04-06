import api from "@/utils/api";
import GalleryClient from "./GalleryClient";
import { notFound } from "next/navigation";

// Force dynamic because we use searchParams (?id=...)
export const dynamic = "force-dynamic";

// --- 1. SEO FIX: Generate Metadata on Server ---
export async function generateMetadata({ searchParams }) {
  const galleryId = searchParams?.id;

  if (!galleryId) return { title: "Experience Center Gallery" };

  try {
    // Note: Using the specific API endpoint you provided
    const response = await api.get(`/cms-parent-child/by-id/${galleryId}`);
    const data = response.data;
    const title = data?.child_content?.title || "Experience Center Gallery";

    return {
      title: title,
      description: `View the ${title} gallery at High Creation Interior.`,
      alternates: {
        // CRITICAL FIX: Explicitly tells Google "This ID is the unique page"
        canonical: `/experience-center/gallery?id=${galleryId}`,
      },
      openGraph: {
        title: title,
        images: [data?.child_images?.[0]?.image || "/images/new_hc_logo.png"],
      },
    };
  } catch (error) {
    return {
      title: "Experience Center Gallery",
      robots: "noindex", // Don't index broken pages
    };
  }
}

// --- 2. SERVER COMPONENT ---
export default async function ExperienceCenterGalleryPage({ searchParams }) {
  const galleryId = searchParams?.id;

  if (!galleryId) {
    return notFound();
  }

  let galleryData = null;

  try {
    // Fetch data on the server (Faster & SEO Friendly)
    const response = await api.get(`/cms-parent-child/by-id/${galleryId}`);
    galleryData = response.data;
  } catch (err) {
    console.error("Experience Gallery Fetch Error:", err);
    // If API fails, we can either show 404 or a fallback. 
    // Usually 404 is better for SEO if content is missing.
    if (err.response?.status === 404) return notFound();
  }

  if (!galleryData) return notFound();

  // Pass data to Client Component for rendering
  return <GalleryClient galleryData={galleryData} />;
}