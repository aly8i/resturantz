import styles from "../../styles/adminStatics.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "../Progress";
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from "framer-motion";
const Statics = ({data,token}) => {
    const [files1, setFiles1] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [slider1, setSlider1] = useState(data.slider1);
    const [slider2, setSlider2] = useState(data.slider2);
    const [location,setLocation]= useState(data.location);
    const [phonenumber1,setPhonenumber1]= useState(data.phonenumber1);
    const [phonenumber2,setPhonenumber2]= useState(data.phonenumber2);
    const [facebook,setFacebook]= useState(data.facebook);
    const [whatsapp,setWhatsapp]= useState(data.whatsapp);
    const [linkedin,setLinkedin]= useState(data.linkedin);
    const [twitter,setTwitter]= useState(data.twitter);
    const [gmail,setGmail]= useState(data.gmail);
    const [instagram,setInstagram]= useState(data.instagram);
    const [github,setGithub]= useState(data.github);
    const[loading,setLoading] = useState(false);
    const router = useRouter();
    const server = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      headers: {'Content-Type':'application/json'},
      withCredentials: true
    });
    server.interceptors.request.use(
      async function (config) {
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
    const postData = async (pay) => {
      setLoading(true);
      const res1={}
    try{
      const res11 = await server.put("api/static/", pay);
      res1=res11;
  }catch(err){
    if(err.response.status>=300){
      router.push("/");
    }
  }
    return res1;
  }
    const handleSave = ()=>{
        setLoading(true);
        var url = "";
        var cs1 = true;
        var cs2 = true;
        let s1 = [];
        let s2 = [];
        const promise1 = new Promise(async(resolve, reject) => {
          if(files1.length!=0){
            files1.map(async(file, i) => {
              
                const promise2 = new Promise(async(resolve, reject) => {
                  url = await uploadFiles(file);
                  resolve(url);
                });
                promise2.then((url)=>{
                  s1.push(url);
                }).then(()=>{
                  if(i+1==files1.length){
                    resolve('finished');
                  }
                })
              
          });
        }else{
          resolve('skipped1');
          cs1=false;
        }
        });
        
        promise1.then((res)=>{
          if(res=='finished'||res=='skipped1'){
            const promise3 = new Promise(async(resolve, reject) => {
              if(files2.length!=0){
              files2.map(async(file, i) => {

                      const promise4 = new Promise(async(resolve, reject) => {
                        url = await uploadFiles(file);
                        resolve(url);
                      });
                      promise4.then((url)=>{
                        s2.push(url);
                      }).then(()=>{
                        if(i+1==files2.length){
                          resolve('finished');
                        }
                      })
                })
              }else{
                resolve('skipped2');
                cs2=false;
              }
              });
            
              promise3.then((res)=>{
                if(res=='finished'|| res=='skipped2'){
                  if(cs1==true&&cs2==true){
                    const payload = {name,description,slider1:s1,slider2:s2,location,phonenumber1,phonenumber2,facebook,whatsapp,twitter,gmail,instagram,github,linkedin};
                    try{
                      postData(payload);
                      setLoading(false);
                      router.push("/");
                    }catch(err){
                      console.log(err);
                    }  
                  }else if(cs1==true&&cs2==false){
                    const payload = {name,description,slider1:s1,slider2,location,phonenumber1,phonenumber2,facebook,whatsapp,twitter,gmail,instagram,github,linkedin};
                    try{
                      postData(payload);
                      setLoading(false);
                      router.push("/");
                    }catch(err){
                      console.log(err);
                    }  
                  }else if(cs1==false&&cs2==true){
                    const payload = {name,description,slider1,slider2:s2,location,phonenumber1,phonenumber2,facebook,whatsapp,twitter,gmail,instagram,github,linkedin};
                    try{
                      postData(payload);
                      setLoading(false);
                      router.push("/");
                    }catch(err){
                      console.log(err);
                    }  
                  }else{
                    const payload = {name,description,slider1,slider2,location,phonenumber1,phonenumber2,facebook,whatsapp,twitter,gmail,instagram,github,linkedin};
                    try{
                      postData(payload);
                      setLoading(false);
                      router.push("/");
                    }catch(err){
                      console.log(err);
                    }  
                  }
                }
              })
            }
        })

    }
      function uploadFiles (file){
        if(!file) return;
        return new Promise(resolve =>{
          const storageRef = ref(storage, `/statics/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on("state_changed",(snapshot) =>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
          }, (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(urlz => {
              resolve(urlz);
            }
            )
          }
          );
        })
      };
      const handleClear = (slider)=>{
        if(slider=='slider1'){
          setSlider1([]);
          setFiles1([]);
        }else{
          setSlider2([]);
          setFiles2([]);
        }
      }
      const handleFile1 = (val) => {
        setFiles1((prev) => [...prev, val]);
      };
      const handleFile2 = (val) => {
        setFiles2((prev) => [...prev, val]);
      };
  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Your Website Statics</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.up}>
            <div className={styles.slider}>
              <div className={styles.text}>
                  <label htmlFor="file1">
                      Slider 1: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                      type="file"
                      id="file1"
                      onChange={(e) => handleFile1(e.target.files[0])}
                      style={{ display: "none" }}
                  />
              </div>
              <div className={styles.images}>
                {files1[0]?(
                  files1.map((file,i)=>(<motion.img  key={i} whileHover={{ scale: 1.2}} src={URL.createObjectURL(file)} alt=""/>))
                ):(
                  slider1.map((slide,i)=>(<motion.img key={i} whileHover={{ scale: 1.2}} src={slide} alt=""/>))
                )}
              </div>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} className={styles.x} onClick={()=>handleClear("slider1")}>
                {files1[0]?(<CancelIcon className={styles.xIcon}/>):(slider1[0]?(<CancelIcon className={styles.xIcon}/>):(<></>))}
              </motion.div>
            </div>
            <div className={styles.slider}>
              <div className={styles.text}>
                  <label htmlFor="file2">
                      Slider 2: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                      type="file"
                      id="file2"
                      onChange={(e) => handleFile2(e.target.files[0])}
                      style={{ display: "none" }}
                  />
              </div>
              <div className={styles.images}>
                {files2[0]?(
                  files2.map((file,i)=>(<motion.img key={i} whileHover={{ scale: 1.2}} src={URL.createObjectURL(file)} alt=""/>))
                ):(
                  slider2.map((slide,i)=>(<motion.img key={i} whileHover={{ scale: 1.2}} src={slide} alt=""/>))
                )}
              </div>

              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} className={styles.x} onClick={()=>handleClear("slider2")}>
                {files2[0]?(<CancelIcon className={styles.xIcon}/>):(slider2[0]?(<CancelIcon className={styles.xIcon}/>):(<></>))}
              </motion.div>
            </div>
          </div>
          <div className={styles.down}>
            <div className={styles.form}>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                value={description}
                multiline
                color="error"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Location"
                value={location}
                color="error"
                onChange={(e) => setLocation(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Phonenumber 1"
                value={phonenumber1}
                color="error"
                onChange={(e) => setPhonenumber1(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Phonenumber 2"
                value={phonenumber2}
                color="error"
                onChange={(e) => setPhonenumber2(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Github"
                value={github}
                color="error"
                onChange={(e) => setGithub(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Facebook"
                value={facebook}
                color="error"
                onChange={(e) => setFacebook(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Gmail"
                value={gmail}
                color="error"
                onChange={(e) => setGmail(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Twitter"
                value={twitter}
                color="error"
                onChange={(e) => setTwitter(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Instagram"
                value={instagram}
                color="error"
                onChange={(e) => setInstagram(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Linkedin"
                value={linkedin}
                color="error"
                onChange={(e) => setLinkedin(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Whatsapp"
                value={whatsapp}
                color="error"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} onClick={handleSave}>Save</motion.button>
              </div>
              
              {loading?(<Progress className={styles.progress}/>):null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;