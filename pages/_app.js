import '../styles/globals.css'
import Layout from "../components/Layout";
import store from "../components/redux/store";
import { Provider } from "react-redux";
// import Footer from "../components/Footer";
// import { StyledEngineProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps, statics }) {
  return (
    <Provider store={store}>
      <Layout statics={statics}>
        <Component {...pageProps} />
        {/* <Footer /> */}
      </Layout>
    </Provider>
  )
  
}

export default MyApp

export const getServerSideProps = async (context) => {
  const statics = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static`).catch((err)=>{
    console.log(err);
  });
  return {
    props: {
        statics: statics.data
    },
  };
}