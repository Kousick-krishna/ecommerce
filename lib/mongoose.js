import {mongoose} from 'mongoose';

export async function initMongoose(){
  mongoose.connect(process.env.MONGODB_URI);
}