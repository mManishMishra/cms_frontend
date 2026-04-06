// Use client is optional, but good if you add interactivity later
import Link from "next/link";
import MainLayout from "./layouts/MainLayout";

export const metadata = {
  title: "Page Not Found - High Creation Interior",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <MainLayout>
      <div 
        className="container d-flex flex-column justify-content-center align-items-center text-center" 
        style={{ minHeight: "60vh", padding: "50px 15px" }}
      >
        <h1 
          className="display-1 fw-bold" 
          style={{ color: "#ff914d", fontSize: "6rem" }}
        >
          404
        </h1>
        <h2 className="mb-3 text-dark fw-bold">Oops! Page Not Found</h2>
        <p className="mb-5 text-muted" style={{ maxWidth: "500px" }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="know_more px-4 py-2 text-decoration-none"
        >
          Go Back to Homepage
        </Link>
      </div>
    </MainLayout>
  );
}