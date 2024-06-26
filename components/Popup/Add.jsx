import styles from "../../styles/Add.module.css";
import { useState } from "react";
import axios from "axios";
import {storage} from "../../Firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import Progress from "../Progress";
const Add = ({closeit}) => {
      const [file, setFile] = useState(null);
      const [title, setTitle] = useState("");
      const [desc, setDesc] = useState("");
      const [prices, setPrices] = useState([]);
      const [extraOptions, setExtraOptions] = useState([]);
      const [extra, setExtra] = useState(null);
      const [progress,setProgress]= useState(0);
      const[loading,setLoading] = useState(false);
      const [category,setCategory]= useState("");
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
          const handleCreate = async () => {
            setLoading(true);
            const img = await uploadFiles(file);
              const newProduct = {
                title,
                desc,
                img,
                prices,
                extraOptions,
                category
              };
              
            try {
              await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, newProduct);
              closeit();
            } catch (err) {
              console.log(err);
            }
          };
    return (
      <div className={styles.container}>
          <div className={styles.wrapper}>
            <span onClick={closeit} className={styles.close}>
              X
            </span>
            <h1>Add a new Pizza</h1>
            <div className={styles.item}>
              <label className={styles.label}>Choose an image</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Category</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Desc</label>
              <textarea
                rows={4}
                type="text"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Prices</label>
              <div className={styles.priceContainer}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Small"
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Medium"
                  onChange={(e) => changePrice(e, 1)}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Large"
                  onChange={(e) => changePrice(e, 2)}
                />
              </div>
            </div>
            <div className={styles.item}>
              <label className={styles.label}>Extra</label>
              <div className={styles.extra}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="text"
                  placeholder="Item"
                  name="text"
                  onChange={handleExtraInput}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleExtraInput}
                />
                
                <button className={styles.extraButton} onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className={styles.extraItems}>
                {extraOptions.map((option) => (
                  <span key={option.text} className={styles.extraItem}>
                    {option.text}
                  </span>
                ))}
              </div>
            </div>
            {loading?(<Progress className={styles.progress}/>):null}
            <button className={styles.addButton} onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
    )
  };
  export default Add;