import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Bottom from'./Bottom';
// import MobileNavMenu from "./MobileNavMenu";
const Layout = ({ children,statics }) => {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <MobileNavMenu/> */}
      <Footer sliderData={statics?.slider2}/>
      {/* <Bottom/> */}
    </>
  );
};

export default Layout;
