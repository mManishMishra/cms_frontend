import dynamic from "next/dynamic";
import Footer from "./footer";
import Header from "./Header";

const ContactUsPopUp = dynamic(() => import("../components/ContactUsPopUp"), { 
  ssr: false, 
});


const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ContactUsPopUp />
      <Footer />
    </>
  );
};

export default MainLayout;
