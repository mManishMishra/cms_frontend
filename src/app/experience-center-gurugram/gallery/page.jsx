import api from "@/utils/api";
import GalleryClient from "./GalleryClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// --- SEO FIX ---
export async function generateMetadata({ searchParams }) {
  const id = searchParams?.id;
  if (!id) return { title: "Gurugram Experience Center" };

  try {
    const response = await api.get(`/cms-parent-child/by-id/${id}`);
    const data = response.data;
    const title = data?.child_content?.title || "Gurugram Gallery";
    
    return {
      title: title,
      description: `Explore our ${title} at High Creation Interior Gurugram.`,
      alternates: {
        canonical: `/experience-center-gurugram/gallery?id=${id}`,
      },
    };
  } catch (error) {
    return { title: "Gurugram Experience Center", robots: "noindex" };
  }
}

// --- SERVER COMPONENT ---
export default async function GurugramGalleryPage({ searchParams }) {
  const id = searchParams?.id;
  if (!id) return notFound();

  let galleryData = null;
  try {
    const response = await api.get(`/cms-parent-child/by-id/${id}`);
    galleryData = response.data;
  } catch (err) {
    if (err.response?.status === 404) return notFound();
  }

  if (!galleryData) return notFound();

  return <GalleryClient galleryData={galleryData} />;
}