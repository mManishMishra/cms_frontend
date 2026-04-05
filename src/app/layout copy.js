// Remove 'use client' here to keep it a server component
import AddBootstrap from "./common/AdBoostrap";
import "./globals.css";
import "../../public/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientProvider from "../store/ClientProvider";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"
        />
{/* 
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify( 
      {
        "@context": "https://schema.org/",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where do you provide services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide our interior design services across the NCR (National Capital Region) and surrounding areas. Our team is equipped to handle projects in Noida, Delhi, Gurgaon, Faridabad , Ghaziabad, Greater Noida and other nearby locations. Additionally, we are expanding to other cities, so we can also accommodate projects in select regions. Whether it’s a residential, commercial, or luxury project, we are dedicated to delivering exceptional design solutions wherever you are located. Let us know your location, and we’ll be happy to discuss how we can assist with your project!"
            }
          },
          {
            "@type": "Question",
            "name": "How much time will you take to provide the final quotation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The time it takes to provide a quotation depends on the scope and complexity of your project. Typically, we can provide an initial quotation within 1 to 2 business days after our site visit or initial consultation. During this time, we assess your requirements, space, and design preferences to ensure that the quotation is accurate and tailored to your needs. For larger or more complex projects, it may take a bit longer, but we will always keep you informed throughout the process. Rest assured, we aim to provide a detailed and transparent quotation as quickly as possible."
            }
          },
          {
            "@type": "Question",
            "name": "Can you work within my budget?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! We are committed to delivering high-quality interior design solutions that align with your budget. Our team works closely with you to understand your financial parameters and priorities, ensuring that we create a design that meets your vision while staying within your budget. We offer a range of options for materials, finishes, and design elements to accommodate different price points, and we strive to find the most cost-effective solutions without compromising on quality or style. Let us know your budget, and we'll tailor the design to fit your needs."
            }
          },
          {
            "@type": "Question",
            "name": "What services do you offer for luxury home interior design?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a comprehensive range of high-end interior design services dedicated to crafting luxurious, personalized, and sophisticated living spaces. Our expertise includes custom design, where we develop tailored concepts that reflect your unique style and lifestyle, ensuring an exclusive luxury experience. Thoughtful space planning and layout optimization enhance functionality while maintaining an elegant aesthetic. We provide bespoke furniture, crafting custom pieces that perfectly complement your space, along with a curated selection of premium materials such as marble, granite, fine wood, and luxurious textiles. Our lighting design solutions incorporate high-end fixtures and smart systems to enhance ambiance and functionality. Additionally, we curate art and décor, selecting exquisite pieces that elevate the elegance of your home. Our renovation and remodeling services transform existing spaces into modern, opulent environments, while our smart home integration seamlessly incorporates the latest automation technologies for effortless control of lighting, security, climate, and entertainment. With meticulous project management, we ensure seamless execution and timely completion, paying attention to every detail. Our goal is to create a luxurious, comfortable, and unique home environment that enhances your lifestyle and offers an unparalleled sense of elegance and tranquility. Let us bring your vision to life!"
            }
          },
          {
            "@type": "Question",
            "name": "What types of materials do you use in interior design?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In our interior design projects, we utilize a diverse selection of high-quality materials, carefully chosen to meet both aesthetic and functional requirements. Wood is a staple for furniture, flooring, and accents, offering a timeless and natural appeal, while marble and granite bring luxury and durability to countertops, flooring, and wall finishes. Glass is frequently used for windows, partitions, and decorative elements, creating a sleek and modern look. Metals such as steel, brass, and copper add sophistication and strength to fixtures, hardware, and accent pieces. We incorporate high-quality textiles for upholstery, curtains, cushions, and rugs, ensuring both style and comfort. Ceramic and porcelain tiles provide versatile design options for walls, floors, and backsplashes, while synthetic materials, including engineered woods, laminates, and faux finishes, offer cost-effective yet stylish alternatives. Additionally, natural stones like slate and limestone contribute to stunning flooring and wall features, delivering a rustic or contemporary aesthetic. Every material is meticulously selected to align with your design vision, durability needs, and maintenance preferences, achieving the perfect blend of elegance and practicality."
            }
          },
          {
            "@type": "Question",
            "name": "How do I get started with an interior design project?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starting your interior design project is a simple and seamless process. We begin with an initial consultation where we discuss your needs, preferences, and overall vision, gathering essential details about the project scope, budget, and timeline. Based on this discussion, we create a design brief that outlines key objectives, preferred styles, materials, and any specific requirements. Our team then develops initial design concepts, presenting layout ideas, color schemes, furniture selections, and materials for your feedback. Once the concept is approved, we refine and finalize the design, incorporating any requested changes and providing detailed plans or 3D renderings if needed. With the design set, we move into the execution phase, handling material procurement, project management, and installation to ensure a flawless transformation. Upon completion, we review the space with you to ensure it meets your expectations. Throughout the entire process, we provide expert guidance to make your experience smooth and enjoyable. Let’s get in touch and bring your vision to life!"
            }
          }
        ]
      }
    ),
  }}
/> */}
 

  {/* Organization Schema Markup */}
  {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "High Creation Interior",
              "url": "https://hcinterior.in",
              "logo": "https://hcinterior.in/images/new_hc_logo.png",
              "sameAs": [
                "https://www.instagram.com/highcreationinterior/",
                "https://www.linkedin.com/company/high-creation-interior-projects-private-limited/",
                "https://www.facebook.com/HighCreationInteriorProjectsPvtLtd/",
                "https://www.youtube.com/@HIGHCREATIONINTERIOR/",
                "https://in.pinterest.com/highcreation41/"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "1800-1200-532",
                  "contactType": "customer service",
                  "email": "info@hcinterior.in",
                  "contactOption": "TollFree",
                  "areaServed": "IN",
                  "availableLanguage": "en"
                }
              ]
            }),
          }}
        />  */}
        

 {/* Google Tag Manager */}
 <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PRVJK9N');`,
          }}
        ></script>
        <meta
          name="google-site-verification"
          content="k0iGFVO_noqQ7H1uUsJXGeReQ5YhgKjfOOgoKkSsrAw"
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '768898314129368');
          fbq('track', 'PageView');`,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=651426977052497&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MJZK1MXG9E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MJZK1MXG9E');`,
          }}
        ></script>

        {/* Taboola Pixel Code */}
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window._tfa = window._tfa || [];
          window._tfa.push({notify: 'event', name: 'page_view', id: 1679477});
          !function (t, f, a, x) {
             if (!document.getElementById(x)) {
                t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
             }
          }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/unip/1679477/tfa.js',
          'tb_tfa_script');`,
          }}
        ></script> */}
       
      </head>
      <body suppressHydrationWarning={false}>
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
        <Script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></Script>
        <AddBootstrap />
        <ClientProvider>{children}</ClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

// <AddBootstrap />
