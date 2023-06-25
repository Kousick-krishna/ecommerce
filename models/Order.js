const { Schema,models,model } = require("mongoose");

const OrderSchema = new Schema({
    products:Object,
    paid:{
        type:Number,
        defaultValue:0
    },
    name:String,
    email:String,
    address:String
})

const Order = models?.Order || model('Order', OrderSchema);

export default Order;