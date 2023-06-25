import Header from "@/components/header";
import  { ProductContext } from "@/components/productcontext";
import { useContext, useEffect, useState } from "react";

export default function checkout(){
    const [productInfos,setProductInfos] = useState([])
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [address,setAddress] = useState();
    const {selectedProducts,setSelectedProducts} = useContext(ProductContext);
    useEffect(() =>{
        const uniqueIds = [...new Set(selectedProducts)]
        fetch('/api/products?ids='+uniqueIds.join(','))
         .then(response => response.json())
         .then(json => setProductInfos(json))
    },[selectedProducts]);

    function add(_id){
        setSelectedProducts(prev => [...prev,_id])
    }

    function less(_id){
        const pos = selectedProducts.indexOf(_id);
        if(pos !== -1){
            setSelectedProducts(prev =>{
                return prev.filter((value,index) => index !== pos);
            });
        }
    }

    const delivery = 5;
    let subtotal = 0;
    if(selectedProducts?.length){
        for(let _id of selectedProducts){
              const price = productInfos.find(p => p._id === _id)?.price || 0;
              subtotal += price;
        }
    }
    const total = subtotal + delivery;
    return(
        <>
        <Header/>
        {!productInfos.length && (
            <div>No items in Cart</div>
        )}
        {productInfos.length && productInfos.map(productInfo =>{
            
            const amount = selectedProducts.filter(id => id === productInfo._id).length
            if(amount === 0) return;
            return(
            <div>
                <div className="flex p-5 gap-3">
                    <img src={productInfo.picture} className="w-44 rounded-lg"/>
                    {productInfo.name}
                </div>
                <div className="flex">
                <div className="grow">
                    ${productInfo.price}
                </div>
                <div>
                    <button onClick={() => less(productInfo._id)} className="border border-green-400 px-5 w-4 rounded-md">-</button>
                    <span className="p-4">
                        {selectedProducts.filter(id => id === productInfo._id).length}
                    </span>
                    <button onClick={() => add(productInfo._id)} className="border border-green-400 px-5 w-4 rounded-md">+</button>
                </div>
                </div>
            </div>
        )}) } 
        <form action="/api/checkout" method="POST">
        <div className="p-3">
            <input className="w-full h-10 border border-green-300 p-3 m-3" name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter your name..."/><br/>   
            <input className="w-full h-10 border border-green-300 p-3 m-3" name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your Email..."/><br/>
            <input className="w-full h-10 border border-green-300 p-3 m-3" name="address" value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="Enter your Address..."/>
        </div> 
        <div>
            <div>
                <div className="flex">
                <h3 className="grow">subtotal:</h3>
                <h3>${subtotal}</h3>    
                </div>    
            </div>   
            <div>
                <div className="flex">
                <h3 className="grow">Delivery:</h3>
                <h3>${delivery}</h3>    
                </div>    
            </div> 
            <div>
                <div className="flex">
                <h3 className="grow">Total:</h3>
                <h3>${total}</h3>    
                </div>    
            </div>  
        </div> 
        <div>
        
        <input type="hidden" name="products" value={selectedProducts.join(',')}/>
        <button className="w-full h-12 bg-emerald-400 text-white rounded-xl">pay ${total}</button>    
       
        </div> 
        </form>  
        
        </>
    )
}