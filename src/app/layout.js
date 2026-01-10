import "./globals.css";
import "../../public/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Keep Bootstrap for Admin UI
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Check if you kept the 'store' folder. If you deleted it, remove this import and the <ClientProvider> tag below.
import ClientProvider from "../store/ClientProvider"; 


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* We removed all the Public SEO schemas, Pixels, and Analytics here */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientProvider>
            {children}
        </ClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}