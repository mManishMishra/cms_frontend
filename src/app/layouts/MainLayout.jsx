import Footer from "./footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
