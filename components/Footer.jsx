import Image from "next/image";
import styles from "../styles/Footer.module.css";
import BackgroundSlider from 'react-background-slider'
import axios from "axios";
import { useEffect,useState } from "react";
const Footer = ({statics}) => {
  const [data,setData]=useState(null);
  useEffect(()=>{
    console.log(statics)
    // try{
    // await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
    //   setSliderData(res.data.slider2);
    // }).then(()=>{
    //   console.log(sliderData)
    // });
    // }catch(err){
    //   console.log(err);
    // }
  },[])
  return (
    <div id="footer" className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgimg}>
          {/* <BackgroundSlider images={data} duration={5} transition={2} ></BackgroundSlider> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
