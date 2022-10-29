import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from "next/link";
import Tada from 'react-reveal/Tada'
import { motion } from "framer-motion";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const logout = () => {
    window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, "_self");
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
          <PhoneIcon className={styles.phone}/>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>03564248</div>
        </div>
      </div>
      <div className={styles.item}>
        <NavMenu/>
      </div>
      <div className={styles.item}>
        {user.id?<Link href={`/user/${user.id}`} passHref>
          <motion.div whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}} className={styles.profilewrapper}>
          {user.username!="Guest"?<Image className={styles.avatar} src={user.img} alt="user" width={30} height={30} />:<AccountCircleIcon className={styles.avatar}/>}
          </motion.div>
        </Link>:
          <div className={styles.profilewrapper}>
          {user.username!="Guest"?<Image className={styles.avatar} src={user.img} alt="user" width={30} height={30} />:<Link href="/socialogin" passHref><AccountCircleIcon className={styles.avatar}/></Link>}
          </div>
        }
          <Link href={`/user/${user.id}`} passHref><motion.div className={styles.username} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>{user.username!="Guest"?user.username:""}</motion.div></Link>
          {user.username=="Guest"?(
          <Link href="/socialogin" passHref>
            <motion.div className={styles.logout} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>
              Login
            </motion.div>
          </Link>):(<motion.div className={styles.logout} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}} onClick={logout}>
            Logout
          </motion.div>)
          }
          
      </div>
      <Tada>
        <Link href="/cart" passHref>
          <motion.div className={styles.item} whileHover={{ scale: 1.1}}
    whileTap={{ scale: 0.8}}>
            <div className={styles.cart}>
              <div className={styles.profilewrapper}><Image src="/img/cart.png" alt="" width={30} height={30} /></div>
              <div className={styles.counter}>{quantity}</div>
            </div>
          </motion.div>
        </Link>
      </Tada>
    </div>
  );
};

export default Navbar;
