import Image from "next/image";
import styles from "../styles/Footer.module.css";
import BackgroundSlider from 'react-background-slider'
import axios from "axios";
import { useEffect,useState } from "react";
const Footer = () => {
  const [data,setData]=useState([
    "/img/featured.png"
  ]);
  useEffect(()=>{
    try{
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
      setData(res.data.slider2);
    });
    }catch(err){
      console.log(err);
    }
  },[])
  return (
    <div id="footer" className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgimg}>
          {/* <h1 style={{color:"white"}}>{data[2]}</h1> */}
          <BackgroundSlider
  images={data}
  duration={10} transition={2} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
