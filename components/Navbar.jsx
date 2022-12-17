import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from "next/link";
import Tada from 'react-reveal/Tada'
import { motion } from "framer-motion";
import NavMenu from "./NavMenu";
import { signOut } from "next-auth/react"
import { useDispatch } from "react-redux";
import { addSocial,addID,resetUser } from "../components/redux/userSlice";
import { useSession } from "next-auth/react"
import axios from 'axios';
import { useEffect } from "react";
const Navbar = () => {
  const { data: session } = useSession()
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = async() => {
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`).then((res)=>{
      signOut(); 
    });
  };

  const postUser = async(u)=>{
    const newuser={
      googleID:u.email,
      username:u.name,
      fullname:u.name,
      img:u.image
    };
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, newuser);
        return res.data;
    }catch(err){
      console.log("You have an account")
      try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/find`, newuser);
          return res.data
      }
      catch(err){
        console.log("An error occured")
      }
    }
  }
  const loginWithToken = async() => {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signinwithtoken`,{},{
      withCredentials: true
    }).then((res)=>{
        dispatch(addID({id:res.data.sub}));
        dispatch(addSocial({img:res.data.img,username:res.data.username,fullname:res.data.username}));
    }).catch((err)=>{
      console.log("You are not authenticated");
      if(session){
        postUser(session.user).then((data)=>{
          dispatch(addSocial({img:session.user.image,username:session.user.name,fullname:session.user.name}));
          dispatch(addID({id:data._id,address:data.address,phonenumber:data.phonenumber}));
        })
        .catch((err) => {
          console.log("failed to post user");
        });
      }else{
        console.log("you are not logged in");
        dispatch(resetUser());
      }
    });
  }
  useEffect(()=>{
    loginWithToken().catch((err)=>{
        console.log(err);
      });
    
  },[session])
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
        {user.id?(<Link href={`/user/${user.id}`} passHref>
          <motion.div whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}} className={styles.profilewrapper}>
          {user.username!="Guest"?<Image className={styles.avatar} src={user.img} alt="user" width={30} height={30} />:<AccountCircleIcon className={styles.avatar}/>}
          </motion.div>
        </Link>):(
          <div className={styles.profilewrapper}>
          {user.username!="Guest"?<Image className={styles.avatar} src={user.img} alt="user" width={30} height={30} />:<Link href="/socialogin" passHref><AccountCircleIcon className={styles.avatar}/></Link>}
          </div>)
        }
          <Link href={`/user/${user.id}`} passHref><motion.div className={styles.username} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>{user.username!="Guest"?user.username:""}</motion.div></Link>
          {user.username=="Guest"?(
          <Link href="/socialogin" passHref>
            <motion.div className={styles.logout} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>
              Login
            </motion.div>
          </Link>):(<motion.div className={styles.logout} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}} onClick={()=>logout()}>
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
