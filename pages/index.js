
import Header from "../components/header";
import Product from "../components/product";
import { useEffect, useState,useContext } from "react";
import { ProductContext } from "@/components/productcontext";



export default function Home() {
  const {setSelectedProducts} = useContext(ProductContext);
  const [success,setSuccess] = useState(false)
  const [productsInfo,setProductsInfo] = useState([])
  const [phrase,setPhrase] = useState([])
  useEffect(()=>{
    fetch('./api/products')
    .then(response => response.json())
    .then(json => setProductsInfo(json));
  },[]);
  
  useEffect(() =>{
    if(window.location.href.includes('success')){
      setSelectedProducts([]);
      setSuccess(true);
      }
  },[])

   const categoriesNames =[...new Set(productsInfo.map(p => p.category))]

   let products;
   if(phrase){
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
   }
   else{
    products = productsInfo;
   }
  return (
    <main className="w-full h-full">
  <>
  <div>
            {success && (
                <div className="w-full h-12 bg-green-400 rounded-xl p-3 text-center mt-3 ml-2 mr-2">
                    <h2>Thanks for shopping...</h2>
                </div>
            )}
        </div>
  <div>
    <div className="flex justify-between">
      <input value={phrase} onChange={e=> setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="h-16 w-96 rounded-lg bg-red-100 ml-4 mt-6"/>
      <Header/>
    </div>
    
    {categoriesNames.map(categoryName =>
    <div key={categoryName}>
      {products.find(p => p.category === categoryName) && (
        <div>
         <h1 className="font-bold text-3xl ml-32 capitalize">{categoryName}</h1> 
         <div className="flex overflow-x-scroll">
         {products.filter(p => p.category === categoryName).map(productsInfo =>(
           <div key={productsInfo._id}>
           <Product {...productsInfo}/>
           </div>
  
         ))}
         </div>
         </div>
      )}
    </div>
      
      )}

</div>

  </>
  </main>
  )
}