import {Schema, model,models} from "mongoose";

const productSchema = new Schema({
    name:String,
    picture:String,
    category:String,
    price:Number
})

const product = models?.product || model("product",productSchema);

export default product;