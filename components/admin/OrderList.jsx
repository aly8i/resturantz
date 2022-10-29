import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import OrderDatatable from "./OrderDatatable"

const OrderList = ({orders,deliverys,token}) => {
  return (
    <div className={styles.list}>
      <Sidebar/>
      <div className={styles.listContainer}>
        <OrderDatatable token={token} orders={orders} deliverys={deliverys}/>
      </div>
    </div>
  )
}

export default OrderList