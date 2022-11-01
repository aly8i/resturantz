import axios from "axios";
import Head from "next/head";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Featured from "../components/Featured";
import PizzaWrapper from "../components/PizzaWrapper";
import styles from "../styles/Home.module.css";
import { addSocial,addID,addToken, resetUser } from "../components/redux/userSlice";
import Arrow from "../components/Arrow";


export default function Home({ pizzaList,user,loggedIn}) {
  const [token,setToken]= useState("");
  const [googleID,setGoogleID]= useState("");
  const [img,setImg]= useState("");
  const [username,setUsername]= useState("");
  const [fullname,setFullname]= useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = () => {
      if(loggedIn==false && user != {}){
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/success`, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }

        // credentials: "include",
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Credentials": true,
        //   "Access-Control-Allow-Origin": "*"
        // }
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setImg(resObject.user.photos[0].value);
          setUsername(resObject.user.displayName);
          setFullname(resObject.user.displayName);
          setGoogleID(resObject.user.id);
          setToken(resObject.token)
        }).then(async()=>{
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
        })
        .then((id)=>{
          dispatch(addSocial({img,username,fullname}));
          dispatch(addID({id}));
          dispatch(addToken({token}));
        })
        .catch((err) => {
          console.log(err);
        });
      }else if(loggedIn==false && user == {}) {
          dispatch(resetUser());
      }else{
        dispatch(addID({id:user.sub}));
        dispatch(addSocial({img:user.img,username:user.username,fullname:user.username}));
        setUsername(user.username);
        setImg(user.img);
        setFullname(user.fullname);
      }
      }
      
    getUser();
  }, [img,username,fullname]);
  return (
    <div className={styles.container}>
      <Head>
        <title>HFC Resturant</title>
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

  var token = context.req.cookies.accessToken;
  var loggedIn=true;
  var user = {}

  const products = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).catch((err)=>{
    console.log(err);
  });

  const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signinwithtoken`,{token:token},{
    withCredentials: true
  }).catch((err)=>{
    if(err.response.status>300){
      loggedIn = false;
    }
  });

  if(loggedIn==true)
    user=res.data
  
  return {
    props: {
      pizzaList: products.data,
      user : user,
      loggedIn : loggedIn,
    },
  };
  
};