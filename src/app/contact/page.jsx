import MainLayout from "../layouts/MainLayout";
import ContactForm from "./ContactForm";

// --- CONFIGURATION ---
export const revalidate = 60; // Regenerate page every 60 seconds

// --- HELPER: Base URL Logic ---
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
};

// --- HELPER: Fetch SEO Data ---
async function getSeoData() {
  try {
    const baseURL = getBaseUrl();
    const res = await fetch(`${baseURL}/seo-tag`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const allTags = await res.json();

    // Match the specific page URL for Contact
    if (Array.isArray(allTags)) {
      return allTags.find(
        (tag) =>
          tag.page_name === "https://hcinterior.in/contact" ||
          tag.page_name?.endsWith("/contact")
      );
    }
    return null;
  } catch (err) {
    console.error("SEO Fetch Error:", err);
    return null;
  }
}

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata() {
  const seoData = await getSeoData();

  const defaultTitle = "Book Free Consultation With High Creation Interior Noida";
  const defaultDesc =
    "Make a call on +91 7070701373 for top notch interior designing services in Noida. Address : H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301";
  const defaultCanonical = "https://hcinterior.in/contact";

  return {
    title: seoData?.title || defaultTitle,
    description: seoData?.meta_description || defaultDesc,
    alternates: {
      canonical: seoData?.page_name || defaultCanonical,
    },
    openGraph: {
      title: seoData?.title || defaultTitle,
      description: seoData?.meta_description || defaultDesc,
      url: seoData?.page_name || defaultCanonical,
      type: "website",
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default function Contact() {
  return (
    <MainLayout>
      <main>
        <section className="contact_wrapper banner_contact">
          <div className="container">
            <div className="row mx-0">
              <div className="py-5 col-lg-8 d-flex align-item-center">
                <div className="pe-lg-5">
                  <h1 className="mt-4 text-white">Contact Us</h1>
                  <p className="text-white">
                    For inquiries regarding Any interior design service or expert{" "}
                    <br />
                    advice please reach out to us using the following contact{" "}
                    <br />
                    information
                  </p>
                  <p className="text-white">
                    Email Id :{" "}
                    <a href="mailto:info@hcinterior.in" className="text-white">
                      info@hcinterior.in{" "}
                    </a>
                    ,
                    <a href="mailto:care@hcinterior.in" className="text-white">
                      {" "}
                      care@hcinterior.in
                    </a>
                  </p>
                  <p className="text-white">
                    For Inquiry :{" "}
                    <a href="tel:7070701373" className="text-white">
                      +91 7070701373
                    </a>
                  </p>
                  <p className="text-white">
                    Customer care :{" "}
                    <a href="tel:1800-1200-532" className="text-white">
                      1800-1200-532
                    </a>
                  </p>

                  <h6 className="fw-bolder">Branch Office</h6>
                  <p className="text-white">
                    H101, LGF, Sector-63, Noida, <br />
                    Uttar Pradesh- 201301
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                {/* Client Component for Form Logic */}
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="container my-5 map">
          <div className="row mx-0">
            <div className="col-lg-6">
              <h2 className="pb-4">Explore us on Map</h2>
              
              <h5>Branch Office</h5>
              <p>
                <b>H101, LGF, Sector-63, Noida, Uttar Pradesh- 201301</b>
              </p>
              <p>
                <b>H-56, 1st Floor, Sector-63, Noida, Uttar Pradesh- 201301</b>
              </p>
              <p>
                <b>
                  4th Floor, Jmd Galleria Mall, Unit Nos. 402, Sector-47 & 48,
                  Sohna - Gurgaon Rd, Gurugram, Haryana 122001
                </b>
              </p>
              <p>
                <b>
                  DDC Arcade, 1st Floor, Plot No 1 Main, Sector 48 Road, Badshahpur Sohna Rd, Opposite Vipul Business Park, Gurugram, Haryana 122018
                </b>
              </p>
              <p>
                <b>
                  1st Floor, Plot No 24, near old Faridabad Metro Station,
                  Sector 20A, Faridabad, Haryana 121002
                </b>
              </p>

              <h5 className="pt-2">Workshop</h5>
              <p>
                <b>
                  Plot No-3, Sorkha Village , Sector-115, Noida, Uttar Pradesh-
                  201301
                </b>
              </p>
            </div>
            <div className="col-lg-6">
              <div className="">
                <div className="rounded map">
                  {/* Restored the original Iframe */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.086690960129!2d77.3736059745727!3d28.62716378432606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce935de2f5987%3A0x4333ffee08ad5270!2sHigh%20Creation%20Interior%20-%20Best%20Home%20And%20Office%20Interior%20Designer%20In%20Noida!5e0!3m2!1sen!2sin!4v1727021310878!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <hr />
    </MainLayout>
  );
}