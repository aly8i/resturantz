import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import ProductDatatable from "./ProductDatatable"

const ProductList = ({products,token}) => {
  return (
    <div className={styles.list}>
      <Sidebar/>
      <div className={styles.listContainer}>
        <ProductDatatable token={token} products={products}/>
      </div>
    </div>
  )
}

export default ProductList