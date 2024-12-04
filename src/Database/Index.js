import mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const url = `${process.env.DB_URI}`
const mongoos = async ()=>{

    
  await  mongoose.connect(url);
}

export default mongoos