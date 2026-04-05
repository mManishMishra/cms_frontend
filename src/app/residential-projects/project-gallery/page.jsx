import api from "@/utils/api";
import GalleryClient from "./GalleryClient";
import { notFound } from "next/navigation";

// Force dynamic rendering because we rely on searchParams (e.g. ?id=123)
export const dynamic = "force-dynamic";

// --- SEO FIX: Generate Metadata on the Server ---
export async function generateMetadata({ searchParams }) {
  const id = searchParams?.id;
  
  if (!id) return { title: "Residential Gallery" };

  try {
    const response = await api.get(`/portfolio-project/${id}`);
    const data = response.data;
    
    return {
      title: data?.title || "Residential Gallery",
      description: data?.title ? `View our ${data.title} project gallery.` : "Residential interior design project.",
      alternates: {
        // CRITICAL FIX: This tells Google this ID is a unique page
        canonical: `/residential-projects/project-gallery?id=${id}`,
      },
    };
  } catch (error) {
    return {
      title: "Residential Gallery",
      robots: "noindex", // Don't index if the project doesn't exist
    };
  }
}

// --- SERVER COMPONENT ---
export default async function ResidentialProjectsGallery({ searchParams }) {
  const id = searchParams?.id;

  if (!id) {
    // Ideally redirect or show 404 if no ID
    return notFound();
  }

  let portfolioData = null;

  try {
    // Fetch data on the server (Faster than Client-Side)
    const response = await api.get(`/portfolio-project/${id}`);
    portfolioData = response.data;
  } catch (err) {
    console.error("Gallery Fetch Error:", err);
    // You can choose to throw notFound() here if you want strict 404s
  }

  // Pass the data to the Client Component
  return <GalleryClient portfolioData={portfolioData} />;
}