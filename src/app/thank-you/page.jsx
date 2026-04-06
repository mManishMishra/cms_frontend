"use client";
import { toast } from "react-toastify";
import BackgroundImageWithHeading from "../components/BackgroundImageWithHeading";
import MainLayout from "../layouts/MainLayout";
import { useCallback, useEffect, useState } from "react";
import api from "@/utils/api";
import Script from "next/script"; // ✅ Import Next.js Script



const Terms = () => {
  const [pageData, setPageData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContentManagerPages = useCallback(async () => {
    try {
      const response = await api.get("/cms-content/term_and_condition", {});
      if (response.data && response.data.json_content) {
        setPageData(response.data?.json_content?.html);
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.message ?? "Failed to fetch data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContentManagerPages();
  }, [fetchContentManagerPages]);

  return (
    <div>
      <head>
        <title>Thank You - High Creation Interior</title>
        <meta
          name="description"
          content="Thank you for contacting High Creation Interior."
        />
      </head>

      {/* ✅ Facebook Pixel Script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '768898314129368');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* ✅ noscript version */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=768898314129368&ev=PageView&noscript=1"
        />
      </noscript>

      <MainLayout>
        <main>
          <section className="privacy my-5">
            <div className="container">
              <div className="text-center row mx-0">
                <h3>
                  <span className="font_stylish" style={{ color: "#ff914d" }}>
                    Thank you
                  </span>
                </h3>

                <h5>
                  Thank you for contacting High Creation Interior, our team will
                  connect with you soon.
                </h5>
                <div className="text-center mt-4">
                  <a href="/" className="know_more px-3">
                    Back To Home
                  </a>
                </div>
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default Terms;
