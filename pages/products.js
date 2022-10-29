import React from 'react'
import axios from 'axios'


const products = ({products}) => {
  return (
    <div>{products.name}</div>
  )
}

export default products

export const getServerSideProps = async () => {
    
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).catch((err)=>{
        console.log(err);
    });

    return {
        props: {
            products: res.data
        },
      };
}
