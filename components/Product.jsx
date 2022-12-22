import styles from "../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addProduct } from "../components/redux/cartSlice";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';

const Product = ({ product }) => {
  const user = useSelector((state) => state.user);
  const [price, setPrice] = useState(product.prices[0]==0?product.prices[1]==0?product.prices[2]:product.prices[1]:product.prices[0]);
  const [size, setSize] = useState(product.prices[0]==0?product.prices[1]==0?2:1:0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const decrementFn = ()=>{
    if(quantity==1) return;
    const temp = quantity - 1;
    setQuantity(temp);
  }
  const incrementFn = () =>{
    const temp = quantity + 1;
    setQuantity(temp);
  }
  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };
  const handleChange = (e, o) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(o.price);
      setExtras((prev) => [...prev, o]);
    } else {
      changePrice(-o.price);
      setExtras(extras.filter((extra) => extra._id !== o._id));
    }
  };
  const handleClick = () => {
    if(user.username=='Guest'){
      router.push('/socialogin');
      return;
    }
    let sizee;
    if(size==0){
      sizee="s";
    }else if (size==1){
      sizee="m"
    }else{
      sizee="l"
    }
    dispatch(addProduct({...product, extras, price,size:sizee, quantity}));
  };

  return (
    

    <div className={styles.container}>
      <Roll left>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.img} object-fit="contain" fill alt="" />
        </div>
      </div>
    </Roll>
    <Zoom bottom>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {
            product.prices[0]==0?(<></>):(
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} className={styles.size} onClick={() => handleSize(0)}>
              <Image src="/img/size.png" fill alt="" />
              <span className={styles.number}>Small</span>
            </motion.div>
            )
          }
          {
            product.prices[1]==0?(<></>):(
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} className={styles.size} onClick={() => handleSize(1)}>
                <Image src="/img/size.png" fill alt="" />
                <span className={styles.number}>Medium</span>
              </motion.div>
            )
          }
          {
            product.prices[2]==0?(<></>):(
              <motion.div className={styles.size} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2}} onClick={() => handleSize(2)}>
                <Image src="/img/size.png" fill alt="" />
                <span className={styles.number}>Large</span>
              </motion.div>
            )
          }
          
          
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {product.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <FormControlLabel
                control={<Switch className={styles.che}  id={option.text} onChange={(e) => handleChange(e, option)} color="warning" />}
                label={option.text}
              />
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <div className={styles.quantityCon}>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} onClick={()=>decrementFn()}>
              <RemoveCircleIcon className={styles.subQ}/>
            </motion.div>
            <div className={styles.quantity}>
              <p>{quantity}</p>
            </div>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} className={styles.addQ} onClick={()=>incrementFn()}> 
              <AddCircleIcon/> 
            </motion.div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleClick}>
            Add to Cart
          </motion.button>
        </div>
      </div>
      </Zoom>
    </div>
    
    
  );
};

export default Product;
