import mongoose from "mongoose";
// import User from "../../model/user/index.js";
import User from "../../model/user/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


//Add User


const adduser =  (req, res) => {

  const {email,password} = req.body;
      bcrypt.hash(password, 10,async function(err,hash){
        if(err) return res.send({err})
          const user = await User.findOne({email})
        if(user) return res.send({messege :"already exist"})
       const todo = User.create({
       email,
         password:hash
       });
       res.status(201).json({
         message: "user added to database successfully",
         
       });
     })
  
  };
const getuser  = async (req, res) => {
 const {email,password} = req.body;
   
 const user = await User.findOne({email})
 if(!user) return   res.send({message: "Invalid email"})
  const token = jwt.sign(email,process.env.JWT_SEC)
 if(!token) return res.send({message:"Invalid token" })


  const check = await bcrypt.compare(password, user.password);

  if(!check) return res.send({message:"Invalid Password" })

 res.send({
  user,
  token
 })
}

  //get all user
 const getalluser = async (req,res)=>{

    const user = await User.find({})

    res.status(200).json(
        user)
    
 }
 // get data by ID

 const getuserbyid = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "Not a valid ID" });
    }

    const data = await User.findById(id)
    if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }
     res.status(200).json(data)
 }

 // delete user
 const deleteuser = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "Not a valid ID" });
    }

    const data = await User.findOneAndDelete({_id: id})
    if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }
     res.status(200).json({
        message:"user delete",
        data
     })
 }

 // edit user
 const edituser = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "Not a valid ID" });
    }

    const data = await User.findOneAndUpdate(
        {_id: id},
        { ...req.body },
        { new: true } 
  
    )
    if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }
     res.status(200).json({
        message:"user edited",
        data
     })
 }



  export {adduser,getuser,getuserbyid,deleteuser,edituser,getalluser}