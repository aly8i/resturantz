import axios from "axios";
import Head from "next/head";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Featured from "../components/Featured";
import PizzaWrapper from "../components/PizzaWrapper";
import styles from "../styles/Home.module.css";
import { addSocial,addID,addToken, resetUser } from "../components/redux/userSlice";
import Arrow from "../components/Arrow";
import { useSession } from "next-auth/react"


export default function Home({ pizzaList,user,loggedIn}) {
  const [googleID,setGoogleID]= useState("");
  const [img,setImg]= useState("");
  const [username,setUsername]= useState("");
  const [fullname,setFullname]= useState("");
  const dispatch = useDispatch();
  const { data: session } = useSession()
  useEffect(() => {
    const updateState = ()=>{
      setImg(session?.user?.image);
      setUsername(session?.user?.name);
      setFullname(session?.user?.name);
      setGoogleID(session?.user?.email);
    }
    const postUser = async()=>{
          const newuser={
            googleID,
            username,
            fullname,
            img
          };
          try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, newuser);
              return res.data._id;
          }catch(err){
            console.log(err);
            try{
              const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/find`, newuser);
                return res.data._id
            }
            catch(err){
              console.log(err);
            }
          }
        }
        
    const getUser = () => {
      if(loggedIn==false){
        if(session){
          updateState();
          postUser().then((id)=>{
            dispatch(addSocial({img,username,fullname}));
            dispatch(addID({id}));
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }else{
        dispatch(addID({id:user?.sub}));
        dispatch(addSocial({img:user?.img,username:user?.username,fullname:user?.username}));
        setUsername(user?.username);
        setImg(user?.img);
        setFullname(user?.fullname);
      }
    }
    getUser();
  }, [session,img]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Resturantz</title>
        <meta name="description" content="Best Food shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaWrapper pizzaList={pizzaList}/>
      <Arrow/>
    </div>
  );
}

export const getServerSideProps = async (context) => {

  var token = context?.req?.cookies?.accessToken||"";
  var loggedIn=true;
  var user = "";
  var products= await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then((res)=>res.data).catch((err)=>{
    console.log(err);
  });

  const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signinwithtoken`,{token:token},{
    withCredentials: true
  }).catch((err)=>{
    if(err?.response?.status>300){
      loggedIn = false;
    }
  });

  if(loggedIn==true)
    user=res?.data
  
  return {
    props: {
      pizzaList: products,
      user : user,
      loggedIn : loggedIn,
    },
  };
  
};