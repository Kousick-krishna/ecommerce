import { ProductContext } from "@/components/productcontext"
import { useContext, useEffect, useState } from "react"

export default function success(){
    const {setSelectedPrducts} = useContext(ProductContext);
    const [success,setSuccess] = useState(false)
        useEffect(() =>{
        if(window.location.href.includes('success')){
            setSelectedPrducts([]);
            setSuccess(true);
        }
    },[])
    return(
        <>
        <div>
            {success && (
                <div>
                    <h2>Thanks for shopping...</h2>
                </div>
            )}
        </div>
        
        </>
    )
}