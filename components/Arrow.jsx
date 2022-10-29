
import React from 'react';
import styles from"../styles/Arrow.module.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useScrollBy } from "react-use-window-scroll";
// import {Link as ScrollLink} from "react-scroll";
// import { useState,useEffect } from 'react';
// import { CompressOutlined } from '@mui/icons-material';
function Arrow() {
    // const scrollBy = useScrollBy();
    // const [yOffset,setYOffset] = useState(null);
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const handleScroll = () => {
    //   const position = window.pageYOffset;
    //   setScrollPosition(position);
    // };
    // useEffect(() => {
    //   window.addEventListener("scroll", handleScroll);
    //   return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //   };
    // }, []);
    // const handleScrollLink = () =>{
        //  if(scrollPosition>=1600){
        //   return("featured");
        // }
        // else if(scrollPosition>=1260){
        //   return("bottom");
        // }
        // else if(scrollPosition>=850){
        //   return("footer");
        // }
        // else if(scrollPosition>=670){
        //   return("pizzawrapper");
        // }
        // else if(scrollPosition>=0){
        //   return("description");
        // }
    //     if(scrollPosition>1520){
    //       return("featured");
    //     }
    //     else if(scrollPosition>1090){
    //       return("bottom");
    //     }
    //     else if(scrollPosition>670){
    //       return("footer");
    //     }
        
    //     else  {
    //       return("pizzawrapper");
    //     }

    // }
  return (
    <div className={styles.container}>
      {/* <ScrollLink to={handleScrollLink()} spy={true} smooth={true} offset={-100} duration={500}> */}
        <ExpandMoreIcon className={styles.bounce}
        //  onClick={() => scrollBy({ top: 600, left: 0, behavior: "smooth" })}
        />
      {/* </ScrollLink> */}
    </div>
  )
}

export default Arrow