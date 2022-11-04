import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect,useState } from "react";
const Order = ({ order }) => {
  const [status,setStatus] = useState(order.status);
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  useEffect(()=>{
    setStatus(order.status);
  },[order])
  return (
    <div className={styles.container}>
      <div className={styles.up}>
        <div className={styles.row}>
          <div className={styles.item}>
            <h5 className={styles.header}>order ID</h5>
            <span className={styles.id}>{order._id}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Phone Number</h5>
            <span className={styles.id}>{order.phoneNumber}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Location</h5>
            <span className={`${styles.cellWithStatus} ${styles.active}`}>{order.location.lat}</span><span className={`${styles.cellWithStatus} ${styles.passive}`}>{order.location.lng}</span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Total</h5>
            <span className={styles.total}><b>${order.total}</b></span>
          </div>
          <div className={styles.item}>
            <h5 className={styles.header}>Address</h5>
            <span className={styles.address}>{order.address}</span>
          </div>
        </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.row}>
              <div className={`${styles.thead} ${styles.red}`}><b>Product</b></div>
              <div className={`${styles.tbig} ${styles.red}`}><b>Extras</b></div>
              <div className={`${styles.tsmall} ${styles.red}`}><b>Size</b></div>
              <div className={`${styles.tsmall} ${styles.red}`}><b>Unit Price</b></div>
              <div className={`${styles.tsmall} ${styles.red}`}><b>Amount</b></div>
              <div className={`${styles.tsmall} ${styles.red}`}><b>Total Price</b></div>
          </div>
          
            {order.products.map((p,i)=>(
              i%2==0?
              (
                <div key ={i} className={styles.row}>
                  <div className={`${styles.thead} ${styles.white}`}>{p.product.title}</div>
                  <div className={`${styles.tbig} ${styles.white}`}>
                    {p.extras}
                  </div>
                  <div className={`${styles.tsmall} ${styles.white}`}>{p.size}</div>
                  <div className={`${styles.tsmall} ${styles.white}`}>{p.price}</div>
                  <div className={`${styles.tsmall} ${styles.white}`}>{p.amount}</div>
                  <div className={`${styles.tsmall} ${styles.white}`}>{p.amount*p.price}</div>
                </div>
               ):(
                  <div key ={i} className={styles.row}>
                    <div className={`${styles.thead} ${styles.red}`}>{p.product.title}</div>
                    <div className={`${styles.tbig} ${styles.red}`}>{p.extras}</div>
                    <div className={`${styles.tsmall} ${styles.red}`}>{p.size}</div>
                    <div className={`${styles.tsmall} ${styles.red}`}>{p.price}</div>
                    <div className={`${styles.tsmall} ${styles.red}`}>{p.amount}</div>
                    <div className={`${styles.tsmall} ${styles.red}`}>{p.amount*p.price}</div>
                  </div>
                )
            
            ))}
        </div>
        
        <div className={styles.down}>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Pending</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};
export default Order;
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};


