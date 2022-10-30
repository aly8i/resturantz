import axios from "axios";
import { useEffect,useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Bottom from'./Bottom';
import MobileNavMenu from "./MobileNavMenu";
const Layout = ({ children}) => {
  const [statics,setStatics] = useState({});
  useEffect(()=>{
    const fetch = async () =>{
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
        setStatics(res.data);
      })
    }
    fetch();  
  },[])

  return (
    <>
      <Navbar />
      {children}
      <MobileNavMenu/>
      <Footer statics={statics}/>
      <Bottom/>
    </>
  );
};

export default Layout;
