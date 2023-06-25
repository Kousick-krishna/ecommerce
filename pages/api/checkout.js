import { initMongoose } from "@/lib/mongoose";
import product from "@/models/product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Order from "@/models/Order";

export default async function handler(req,res){
    await initMongoose()

    if(req.method !== 'POST'){
        res.json("It should be a post method");
        return;
    }

    const {email,name,address} = req.body;
    const productIds = req.body.products.split(',');
    const uniqIds = [...new Set(productIds)];
    const products = await product.find({_id: {$in:uniqIds}}).exec();

    let line_items=[]
    for(let productId of uniqIds){
        const quantity = productIds.filter(_id => _id === productId)?.length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity : quantity,
            price_data: {
                currency: 'USD',
                product_data:  {name:product?.name},
                unit_amount: product.price * 100 ,
            }
        });
    }

    const order = await Order.create({
        products:line_items,
        paid:0,
        name: name,
        email:email,
        address:address
    })
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata :{orderId:order._id.toString()}
      });
      res.redirect(303, session.url);
    
    
}