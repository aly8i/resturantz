import React from 'react'
import styles from '../styles/Try.module.css'
import { useState } from 'react';
import Search from "../components/Search"

const Page = () => {
    const [searchVal,setSearchVal] = useState("");
  return (
    <div className={styles.container}>
        <Search set={setSearchVal} val={searchVal}/>

        {searchVal}
    </div>
  )
}

export default Page