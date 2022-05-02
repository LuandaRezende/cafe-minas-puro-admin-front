import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../AppContext";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
