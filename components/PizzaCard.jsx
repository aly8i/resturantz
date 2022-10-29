import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Flip from 'react-reveal/Flip';

const PizzaCard = ({ pizza,id }) => {
  return (
    <Flip left delay={300+id*300}>
    <Link href={`/product/${pizza._id}`} passHref>
      <motion.div className={styles.container} whileTap={{ scale: 0.8 }}>
        <Image className={styles.image} src={pizza.img} alt={pizza.title} width="250" height="250" />
        <h1 className={styles.title}>{pizza.title}</h1>
        <div className={styles.price}>
          <p className={styles.unit}>$</p><p>{pizza.prices[0]==0?pizza.prices[1]==0?pizza.prices[2]:pizza.prices[1]:pizza.prices[0]}</p><p className={styles.unit}>.00</p>
        </div>
        <p className={styles.desc}>{pizza.desc}</p>      
      </motion.div>
      </Link>
    </Flip>
  );
};

export default PizzaCard;
