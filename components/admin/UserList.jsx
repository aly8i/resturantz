import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import UserDatatable from "./UserDatatable"

const UserList = ({users,token}) => {
  return (
    <div className={styles.list}>
      <Sidebar/>
      <div className={styles.listContainer}>
        <UserDatatable users={users} token={token}/>
      </div>
    </div>
  )
}

export default UserList