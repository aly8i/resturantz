import "../styles/globals.css";
import Layout from "../components/Layout";
import store from "../components/redux/store";
import { Provider } from "react-redux";
// import Footer from "../components/Footer";
import { StyledEngineProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider>
      <Provider store={store}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </StyledEngineProvider>
  )
  
}

export default MyApp