import styles from "../../styles/adminNew.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "../Progress";
const EditProduct = ({product,token}) => {
    const [file, setFile] = useState(null);
    const [img,setImg] = useState(product.img)
    const [title, setTitle] = useState(product.title);
    const [desc, setDesc] = useState(product.desc);
    const [prices, setPrices] = useState(product.prices);
    const [pr0,setPr0]= useState(prices[0]);
    const [pr1,setPr1]= useState(prices[1]);
    const [pr2,setPr2]= useState(prices[2]);
    const [extraOptions, setExtraOptions] = useState(product.extraOptions);
    const [extra, setExtra] = useState(null);
    const [progress,setProgress]= useState(0);
    const[loading,setLoading] = useState(false);
    const [category,setCategory]= useState(product.category);
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
    const postProduct = async (pay) => {
      setLoading(true);
      const res1={}
    try{
      const res11 = await server.put(`api/products/${product._id}/`, pay);
      res1=res11;
  }catch(err){
    if(err.response.status>=300){
      router.push("/");
    }
  }
    return res1;
  }
    const handleSave = async()=>{
        setLoading(true);
        const img="";
        if(file!=null){
            img = await uploadFiles(file);
        }else{
            img = product.img;
        }
        
        const payload = {title,desc,prices,extraOptions,category,img};
        try{
        postProduct(payload);
        setLoading(false);
        router.push("/admin/products");
        }catch(err){
        console.log(err);
        }  
    }
    const handleOption = (index) => {
        const removedExtra = extraOptions.splice(index,1);
        setExtraOptions(extraOptions.filter((option) =>(option!==removedExtra[0])));
    };
    const changePrice = (e, index) => {
        const currentPrices = prices;
        const input = parseInt(e.target.value);
        currentPrices[index] = input;
        setPrices(currentPrices);
        setPrices(prices);
        if(index==0){setPr0(e.target.value)}
        if(index==1){setPr1(e.target.value)}
        if(index==2){setPr2(e.target.value)}
      };
    
      const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
      };
    
      const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
      };
     
      function uploadFiles (file){
        if(!file) return;
        return new Promise(resolve =>{
          const storageRef = ref(storage, `/pizzas/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on("state_changed",(snapshot) =>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
            setProgress(prog);
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
  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Add New Product</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : product.img ? product.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                value={desc}
                multiline
                color="error"
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
              />
              </div>
              <div className={styles.sFormInput}>
              <TextField
                id="outlined-name"
                label="Category"
                value={category}
                color="error"
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className={styles.priceInput}>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 1"
                    color="error"
                    value={pr0}
                    onChange={(e) => changePrice(e, 0)}
                  />
                  </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 2"
                    value={pr1}
                    color="error"
                    onChange={(e) => changePrice(e, 1)}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 3"
                    value={pr2}
                    color="error"
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Ex.Name"
                    color="error"
                    name="text"
                    onChange={handleExtraInput}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Ex.Price"
                    name="price"
                    color="error"
                    onChange={handleExtraInput}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <button className={styles.extraBtn} onClick={handleExtra}>Add</button>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.extraItems}>
                {extraOptions.map((option,i) => (
                  <span key={i+option.text} onClick={()=>handleOption(i)} className={styles.extraItem}>
                    {option.text}
                  </span>
                ))}
                </div>
              </div>
              <button onClick={handleSave}>Save</button>
              {loading?(<Progress className={styles.progress}/>):null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;