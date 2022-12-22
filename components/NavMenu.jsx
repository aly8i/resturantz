import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LiquorIcon from '@mui/icons-material/Liquor';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import styles from "../styles/NavMenu.module.css";
import { Link as ScrollLink } from "react-scroll" ;
import { useDispatch } from "react-redux";
import { updateQuery } from "./redux/filterSlice";
import { useRouter } from "next/router";

function NavMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleFilter = (query) =>{
    router.push({pathname:'/'},undefined,{ scroll: false });
    dispatch(updateQuery({query}));
  }
  const handleHome = ()=>{
    handleFilter("");
    router.push({pathname:'/'},undefined,{ scroll: false });
  }
  return (
    <>
      <div className={styles.container}>
      <ScrollLink to="pizzawrapper" spy={true} smooth={true} offset={-100} duration={500}>
          <ul className={styles.ul}>
              <li className={styles.li} onClick={()=>handleFilter("burger")}>
                <span>
                  <div className={styles.title}>Burgers</div>
                </span>
                <LunchDiningIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter("pizza")}>
                  <span>
                    <div className={styles.title}>Pizzas</div>
                  </span>
                  <LocalPizzaIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter("drink")}>
                    <span>
                      <div className={styles.title}>Drinks</div>
                    </span>
                    <LiquorIcon className={styles.icon}/>
              </li>   
              <li className={styles.li} onClick={()=>handleHome()}>
                  <>
                    <span>
                      <div className={styles.title}>Home</div>
                    </span>
                    <HomeIcon className={styles.icon}/>
                  </>
              </li>
              <li className={styles.li} onClick={()=>handleFilter("grill")}>
                  <span>
                    <div className={styles.title}>Grills</div>
                  </span>
                  <KebabDiningIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter("meal")}>
                    <span>
                      <div className={styles.title}>Meals</div>
                    </span>
                    < FastfoodIcon className={styles.icon}/>
                </li>
              <li className={styles.li} onClick={()=>handleFilter("dish")}>
                <span>
                  <div className={styles.title}>Dishes</div>
                </span>
                <DinnerDiningIcon className={styles.icon}/>
              </li>
          </ul>
        </ScrollLink>
      </div>
    </>
  )
}

export default NavMenu