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
      <Footer statics={statics}/>
      {/* <Bottom/> */}
    </>
  );
};

export default Layout;
