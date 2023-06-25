import ProductContextProvider from '../components/productcontext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <ProductContextProvider>
       <Component {...pageProps} />
    </ProductContextProvider>
  )

}
