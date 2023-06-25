import Link from 'next/link';
import { useContext } from 'react';
import { ProductContext } from './productcontext';


export default function Header(){
    const {selectedProducts} = useContext(ProductContext);
    return(
        <>
        <header>
            <div className='align-end'>
            <button className="w-18 h-10 bg-red-100 rounded-lg lg:mr-20 mt-5 md:mr-20"><Link className="p-5 mt-6" href={'/'}>Home</Link></button>
            <button className="w-18 h-10 bg-red-100 rounded-lg lg:mr-10 mt-5 md:mr-10"><Link className="p-5 mt-6" href={'/checkout'}><span>Cart {selectedProducts.length}</span></Link></button>
            </div>
        </header>
        </>
    )
}