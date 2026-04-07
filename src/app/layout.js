// Remove 'use client' here to keep it a server component
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/style/style.css";
import "./globals.css";
import ClientProvider from "../store/ClientProvider";
import Script from "next/script";
import { Great_Vibes, Poppins, Outfit } from "next/font/google";
import dynamic from "next/dynamic";
import AddBootstrap from "./common/AdBoostrap";

const LazyToast = dynamic(() => import("./common/LazyToast"), {
  ssr: false,
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-great-vibes',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500','600', '700', '800'],
  variable: '--font-poppins',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://hcinterior.in'),
  title: "High Creation Interior | Best Interior Designers in Delhi NCR",
  description: "High Creation Interior offers the best interior design services in Delhi NCR. Transform your space with our expert designers.",
  keywords: "interior designers, interior decorators, best interior designers in Delhi, home interior, office interior",
  openGraph: {
    title: "High Creation Interior | Best Interior Designers in Delhi NCR",
    description: "High Creation Interior offers the best interior design services in Delhi NCR.",
    url: "https://hcinterior.in",
    siteName: "High Creation Interior",
    images: [
      {
        url: "/images/new_hc_logo.png",
        width: 800,
        height: 600,
        alt: "High Creation Interior Logo"
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "High Creation Interior",
    description: "Best Interior Designers in Delhi NCR",
    images: ["/images/new_hc_logo.png"],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'k0iGFVO_noqQ7H1uUsJXGeReQ5YhgKjfOOgoKkSsrAw',
  },
};

// Note: For Next.js 14+, Viewport is a separate export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Important for accessibility
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Google Tag Manager - Keep afterInteractive for early tracking (needed for analytics) */}
        <Script 
          id="gtm" 
          strategy="afterInteractive"
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PRVJK9N');`}
        </Script>

        {/* Meta Pixel Code - Loaded lazily to avoid blocking initial render */}
        <Script id="fb-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          fbq('init', '768898314129368');
          
          fbq('track', 'PageView', {
            value: 1.00,
            currency: 'INR'
          });`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="Facebook"
            src="https://www.facebook.com/tr?id=768898314129368&ev=PageView&cd[value]=1.00&cd[currency]=INR&noscript=1"
          decoding="async"  loading="lazy" />
        </noscript>

        {/* Google Analytics - Loaded lazily to avoid blocking initial render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MJZK1MXG9E"
          strategy="lazyOnload"
        />
        <Script id="ga" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MJZK1MXG9E');`}
        </Script>

        {/* FAQ schema is emitted per-page now to avoid duplicate FAQPage markup */}
        {false && (
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Where do you provide services?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide our interior design services across the NCR (National Capital Region) and surrounding areas. Our team is equipped to handle projects in Noida, Delhi, Gurgaon, Faridabad , Ghaziabad, Greater Noida and other nearby locations. Additionally, we are expanding to other cities, so we can also accommodate projects in select regions. Whether it's a residential, commercial, or luxury project, we are dedicated to delivering exceptional design solutions wherever you are located. Let us know your location, and we'll be happy to discuss how we can assist with your project!"
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
                  "text": "Starting your interior design project is a simple and seamless process. We begin with an initial consultation where we discuss your needs, preferences, and overall vision, gathering essential details about the project scope, budget, and timeline. Based on this discussion, we create a design brief that outlines key objectives, preferred styles, materials, and any specific requirements. Our team then develops initial design concepts, presenting layout ideas, color schemes, furniture selections, and materials for your feedback. Once the concept is approved, we refine and finalize the design, incorporating any requested changes and providing detailed plans or 3D renderings if needed. With the design set, we move into the execution phase, handling material procurement, project management, and installation to ensure a flawless transformation. Upon completion, we review the space with you to ensure it meets your expectations. Throughout the entire process, we provide expert guidance to make your experience smooth and enjoyable. Let's get in touch and bring your vision to life!"
                }
              }
            ]
          })}
        </Script>
        )}

        {/* Organization Schema - JSON-LD for SEO */}
        <script
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
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={false} className={`${greatVibes.variable} ${poppins.variable} ${outfit.variable}`}>
        <AddBootstrap />
        <ClientProvider>{children}</ClientProvider>
        <LazyToast />
      </body>
    </html>
  );
}