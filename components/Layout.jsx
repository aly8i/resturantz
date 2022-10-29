import Footer from "./Footer";
import Navbar from "./Navbar";
import Bottom from'./Bottom';
import MobileNavMenu from "./MobileNavMenu";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <MobileNavMenu/> */}
      <Footer />
      <Bottom/>
    </>
  );
};

export default Layout;
