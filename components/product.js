import Image from 'next/image';
import { useContext } from 'react';
import { ProductContext } from './productcontext';

export default function Product({_id,picture,price}){
    const {setSelectedProducts} = useContext(ProductContext);
    function addProduct(){
        setSelectedProducts(prev => [...prev,_id]);
    }
    return(
        <>
    <div>
        <div>
            <Image className="rounded-3xl ml-10 mt-8" src={picture} width={350} height={350}></Image>
        </div>
        <div className="flex  w-96 rounded-xl ml-5 mt-5">
            <span className="ml-10 mt-3 text-2xl">${price}</span>
            <button onClick={addProduct} className="w-12 ml-56 rounded-lg bg-blue-500">+</button>
        </div>
    </div>
        </>
    )
}