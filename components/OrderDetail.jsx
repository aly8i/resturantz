import { useState,useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import styles from "../styles/OrderDetail.module.css";
import Map from '../components/Map';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';

const OrderDetail = ({ createOrder }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const [name, setName] = useState(user.fullname||"");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber||"");
  const [address, setAddress] = useState(user.address||"");
  const [customerID,setCustomerID] = useState(null);
  const [total,setTotal]=useState(null);
  const [products,setProducts] = useState([]);
  const [lng, setLng] = useState(35.4776);
  const [lat, setLat] = useState(33.8956);
  const [error,setError] = useState(null);
  let array = [];
  const temp = 1;
  const handleClick = () => {
    if(validate()==true){
      const location = {
        lat: lat,
        lng: lng
      }
      createOrder({ name, total, products,location,customerID,phoneNumber,address });
    }
  };
  useEffect(() => {
    array=[];
    setCustomerID(user.id);
    setTotal(cart.total);
    cart.products.map((product)=>{
      let extras = [];
      product.extras.map((extra)=>{
          extras.push(extra.text);
      })
      array.push({product: `${product._id}`,size: `${product.size}`,price: `${product.price}`,amount: `${product.quantity}`,extras: `${extras}`});
    });
    setProducts([...array]);
  },[temp]);
  const validate = () =>{
    setError(null);
    if(name == "" || name == null || phoneNumber == "" || phoneNumber == null || address == "" || address == null){
      setError("Please fill up all your order's details !");
      return false;
    }else{
      return true;
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
          <div className={styles.item}>
            <TextField
          id="outlined-name"
          label="Full Name"
          error
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </div>
          <div className={styles.item}>
          <TextField
          error
          id="outlined-name"
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
          </div>
          <div className={styles.item}>
            <TextField
            error
            id="outlined-multiline-static"
            label="Address"
            value={address}
            multiline
            rows={4}
            onChange={(e) => setAddress(e.target.value)}
          />
          </div>
          <div className={styles.item}>
            <div className={styles.map}>
              <Map lng={lng} lat={lat} setLng={setLng} setLat={setLat}/>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleClick}>
            Order
          </motion.button>
          {error&&<Alert onClose={() => {setError(null)}} severity="error">
        {error}
      </Alert>}
        </div>
        
      </div>
      
    </>
  );
};

export default OrderDetail;
