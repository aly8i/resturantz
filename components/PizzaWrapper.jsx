import React from 'react';
import PizzaCard from "./PizzaCard";
import styles from "../styles/PizzaList.module.css";
import { useSelector } from "react-redux";

function PizzaWrapper({pizzaList}) {
const filter = useSelector((state) => state.filter);
  return (
      <div className={styles.wrapper} id="pizzawrapper">
          {pizzaList?.filter(pizza => pizza?.category?.includes(filter.query)).map((pizza,id) => (
            <PizzaCard key={pizza._id} pizza={pizza} id={id} />
          ))}
      </div>
  )
}

export default PizzaWrapper