import '../styles/globals.css'
import Layout from "../components/Layout";
import store from "../components/redux/store";
import { Provider } from "react-redux";
// import { StyledEngineProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </Provider>
  )
  
}

export default MyApp
