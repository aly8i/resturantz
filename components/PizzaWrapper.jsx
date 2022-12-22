import React from 'react';
import PizzaCard from "./PizzaCard";
import styles from "../styles/PizzaList.module.css";
import { useSelector } from "react-redux";
import * as Scroll from 'react-scroll';
import { useEffect } from 'react';
function PizzaWrapper({pizzaList}) {
  const filter = useSelector((state) => state.filter);

  useEffect(()=>{
    if(filter.query!=""){
      let scroller = Scroll.scroller;
      scroller.scrollTo('pizzawrapper', {
        duration: 500,
        spy: true,
        smooth: true,
        offset: -100,
      })
    }
},[])

  return (
      <div className={styles.wrapper} id="pizzawrapper">
          {pizzaList?.filter(pizza => pizza?.category?.includes(filter.query)).map((pizza,id) => (
            <PizzaCard key={pizza._id} pizza={pizza} id={id} />
          ))}
      </div>
  )
}

export default PizzaWrapper