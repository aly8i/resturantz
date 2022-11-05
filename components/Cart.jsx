import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { resetCart } from "./redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import { motion } from "framer-motion";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Zoom from 'react-reveal/Zoom';

const Cart=()=> {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error,setError]=useState(null);

  const createOrder = async (data) => {
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, data);
      if (res.status === 201) {
        dispatch(resetCart());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validate = () =>{
    if(cart.total == 0){
      setError("Your cart is empty !  Please add some items .")
    }else{
      setOpen(true);
    }
  }

  return (
  <>
      {
        cart.total==0?(
          <Zoom>
            <div className={styles.emptyContainer}>
              <div className={styles.emptyWrapper}>
                <div className={styles.chat}>
                  <ChatBubbleIcon className={styles.bubbleIcon}/>
                  <p className={styles.message}>I&apos;mempty</p>
                </div>
                <ShoppingCartIcon className={styles.cartIcon}/>
                <Link href="/" passHref>
                  <motion.div className={styles.backBtn} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
                    <ArrowBackIcon className={styles.arrow}/>
                  </motion.div>
                </Link>
              </div>
            </div>
          </Zoom>
        ):(
          <>
          <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      fill
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <motion.button
                className={styles.payButton}
                onClick={() => setCash(true)}
                whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}
              >
                CASH ON DELIVERY
              </motion.button>
            </div>
          ) : (
            <motion.div className={styles.button} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={() => validate()} >CHECKOUT NOW!</motion.div>
          )}
        </div>
      </div>
      {cash && <OrderDetail createOrder={createOrder} />}
    </div>
    {error&&<Alert onClose={() => {setError(null)}} severity="error">
        {error}
      </Alert>}
</>
        )
      }
  </>
  );
};

export default Cart;
