import MainLayout from "./layouts/MainLayout";
import Home from "./home/page";
// import BootstrapClient from/ "./common/BootstrapClient";

export const metadata = {
  title: "Top Interior Designers In Delhi NCR For Home",
  description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR.",
  alternates: { canonical: "https://hcinterior.in" },
  openGraph: {
    title: "Top Interior Designers In Delhi NCR For Home",
    description: "Home interior designers in Delhi NCR - Elevate your living space with best interior design company in Noida & Delhi NCR.",
    url: "https://hcinterior.in",
    siteName: "High Creation Interior",
    images: [
      {
        url: "https://hcinterior.in/images/new_hc_logo.png",
        width: 1200,
        height: 630,
        alt: "High Creation Interior Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function App() {
  return (
    <>
     <MainLayout>
      <Home />
     </MainLayout>
    </>
  );
}
