import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
const Cart = dynamic(
  () => import('../components/Cart'),
  {ssr: false}
)
const Cartt = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    if(user.username=='Guest'){
      router.push('/socialogin');
    }
  },[])
  return (
    <Cart/>
  )
}

export default Cartt