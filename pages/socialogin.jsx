import styles from "../styles/SocialLogin.module.css";
import Google from "../public/img/google.png";
// import Facebook from "../img/facebook.png";
import { signIn } from "next-auth/react"
import Github from "../public/img/github.png";
import Terms from "../components/Terms";
import PhoneNumberPopup from "../components/PhoneNumberPopup";
import {useState} from 'react';
import { motion } from "framer-motion";
import Flip from 'react-reveal/Flip'


const SocialLogin = () => {
  const [close,setClose] = useState(true);
  const handleSignIn = (method)=>{
    signIn(method,{callbackUrl:`${process.env.NEXT_PUBLIC_BASE_URL}`});
  }

  return (
    <div>
      {!close&&<PhoneNumberPopup setClose={setClose}/>}
      <h1 className={styles.loginTitle}>Choose a Login Method</h1>
      <div className={styles.login}>
        <div className={styles.wrapper}>
          <div className={styles.up}>
          <Flip right>
            <motion.div className={`${styles.loginButton} ${styles.google}`} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={()=>handleSignIn('google')}>
              <img src={Google} alt="" className="icon" />
              Google
            </motion.div>
          </Flip>
            {/* <div className="loginButton facebook" onClick={facebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div> */}
            <Flip up>
              <motion.div className={`${styles.loginButton} ${styles.github}`} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
                <img src={Github} alt="" className="icon" />
                Github
              </motion.div>
            </Flip>
            <Flip left>
              <motion.div className={`${styles.loginButton} ${styles.phone}`} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={()=>setClose(false)}>
                <img src={Github} alt="" className="icon" />
                Phonenumber
              </motion.div>
            </Flip>
          </div>
          <div className={styles.down}>
            <Terms/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;