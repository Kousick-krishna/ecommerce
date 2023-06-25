import {initMongoose} from "../../lib/mongoose";
import product from "../../models/product";

export default async function handle(req,res){
     await initMongoose();
     const {ids} = req.query;
     if(ids){
          const idsArray = ids.split(',');
          res.json(
              await product.find({
                    '_id':{$in:idsArray}
               }).exec()
          );
     }
     else{
     res.json( await product.find().exec());
     }
    
}