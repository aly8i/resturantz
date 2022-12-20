import dynamic from 'next/dynamic';
import axios from "axios";
const OrderList = dynamic(
  () => import("../../../components/admin/OrderList"),
  {ssr: false}
)
const page = ({orders,deliverys,token}) => {
  return (
      <OrderList orders={orders} deliverys={deliverys} token={token}/>
    );
};

export default page;

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken||"";
  var res1=[];
  var res2=[];
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );
try{
  const res11 = await server.get("api/orders/find/all");
  res1=res11
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
try{
  const res22 = await server.get("api/delivery");
  res2=res22
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
  return {
    props: {
      orders: res1.data.reverse(),
      deliverys: res2.data,
      token: accessToken,
    },
  };
};