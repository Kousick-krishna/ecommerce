import { createContext, useState } from "react"


export const ProductContext = createContext({})

export default function ProductContextProvider({children}){
    const [selectedProducts, setSelectedProducts] = useState([])
    return(
        <>
        <ProductContext.Provider value={{selectedProducts,setSelectedProducts}}>{children}</ProductContext.Provider>
        </>

    )
}