import styles from "../../styles/adminNew.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "../Progress";
import { useRouter } from "next/router";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import Alert from '@mui/material/Alert';


const NewProduct = ({token}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);
    const [progress,setProgress]= useState(0);
    const[loading,setLoading] = useState(false);
    const [category,setCategory]= useState("");
    const router = useRouter();
    const [error,setError] = useState(null);
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
    const res1={}
    
    try{
      const res11 = await server.post("api/products", pay);
      res1=res11;
  }catch(err){
    if(err.response.status>=300){
      router.push("/");
    }
  }
    return res1;
  }
  const validate = () =>{
    if(file==null){
      setError("Please add a product Image.")
      return false;
    }else if(title==""){
      setError("Please add a title.")
      return false;
    }else if(desc==""){
      setError("Please add a description.")
      return false;
    }else if(prices.length==0){
      setError("Please add prices.")
      return false;
    }else if(category==""){
      setError("Please add a category.")
      return false;
    }else{
      return true;
    }
  }
  const handleSave = async()=>{
    const validated = validate();
    if(!validated) return;
    setLoading(true);
    const img = await uploadFiles(file);
    const payload = {title,desc,prices,extraOptions,category,img};
    try{
      postProduct(payload);
      setLoading(false);
      router.push("/admin/products");
    }catch(err){
      console.log(err);
    }  
  }
    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
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
                onChange={(e) => setTitle(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                color="error"
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
              />
              </div>
              <div className={styles.sFormInput}>
              <FormControl color="error" sx={{ minWidth: 210 }}>
                  <InputLabel >Category</InputLabel>
                    <Select
                      id="outlined-name"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                      renderValue={(value) => `${value}`}
                      color="error"
                    >
                      <MenuItem color="error" value={'pizza'}>pizza</MenuItem>
                      <MenuItem color="error" value={'burger'}>burger</MenuItem>
                      <MenuItem color="error" value={'dish'}>dish</MenuItem>
                      <MenuItem color="error" value={'meal'}>meal</MenuItem>
                      <MenuItem  color="error" value={'drink'}>drink</MenuItem>
                    </Select>
              </FormControl>
              <div className={styles.priceInput}>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 1"
                    color="error"
                    onChange={(e) => changePrice(e, 0)}
                  />
                  </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 2"
                    color="error"
                    onChange={(e) => changePrice(e, 1)}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 3"
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
                  {extraOptions.map((option) => (
                    <span key={option.text} className={styles.extraItem}>
                      {option.text}
                    </span>
                  ))}
                </div>
              </div>
              {loading?(<Progress className={styles.progress}/>):<button onClick={handleSave}>Save</button>}
            </div>
          </div>
        </div>
        {error&&<Alert onClose={() => {setError(null)}} severity="error">
        {error}
      </Alert>}
      </div>

    </div>
  );
};

export default NewProduct;