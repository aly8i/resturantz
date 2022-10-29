import Image from "next/image";
import styles from "../styles/Footer.module.css";
import BackgroundSlider from 'react-background-slider'
import axios from "axios";
import { useEffect,useState } from "react";
const Footer = () => {
  const [sliderData,setSliderData]=useState(["https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fresturant2.jpg?alt=media&token=c69732b4-fdfa-4ec8-b658-ff390f2fa510"]);
  useEffect(()=>{
    try{
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
      setSliderData(res.data.slider2);
    });
    }catch(err){
      console.log(err);
    }
  },[])
  return (
    <div id="footer" className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgimg}>
          <BackgroundSlider images={sliderData} duration={5} transition={2} >
        </BackgroundSlider>
        </div>
      </div>
    </div>
  );
};

export default Footer;
