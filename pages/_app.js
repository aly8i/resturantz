import Layout from "../components/Layout";
import "../styles/globals.css";
import store from "../components/redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from '@mui/material/styles';


function MyApp({ Component, pageProps }) {

  return (
    <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </StyledEngineProvider>
    
  );
}

export default MyApp;
