import Sidebar from "./Sidebar";
import styles from "../../styles/adminHome.module.scss";
import Widget from "./Widget";
import Featured from "./Featured";
import Chart from "../chart/Chart"; 

const Home = ({users,orders,products}) => {
  const calcEarnings = ()=>{
    let total = 0;
    orders.map((order)=>{
      total=total+order.total;
    })
    return total;
  }
  return (  
  <div className={styles.home}>
    <Sidebar />
    <div className={styles.homeContainer}>
      <div className={styles.widgets}>
        <Widget type="user" amount={users.length}/>
        <Widget type="order" amount={orders.length}/>
        <Widget type="earning" amount={calcEarnings()}/>
        <Widget type="product" amount={products.length}/>
      </div>
      <div className={styles.charts}>
        <Featured orders={orders}/>
        <Chart className={styles.chart} title="Last 6 Months (Revenue)" orders={orders} type="revenue" aspect={2 / 1} />
      </div>
    </div>
  </div>
  );
};

export default Home;
