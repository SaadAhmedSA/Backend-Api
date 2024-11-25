import mongoose from "mongoose";
import Todos from "../models/todomodel.js";

// add todo

const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "title or description required",
    });
    return;
  }

  const todo = Todos.create({
    title,
    description,
  });
  res.status(201).json({
    message: "user added to database successfully",
    data : req.body
  });
};

// get all todo'
const gettodos = async (req, res) => {

      const data = await Todos.find({});
      res.status(200).json(data);
    
      ;
    
  };

  //gettodobyID
const getTodoById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: "Not a valid ID" });
  }
      const todo = await Todos.findById(id);
      if (!todo) {
        return res.status(404).json({
          message: "Todo not found",
        });
      }
      res.status(200).json({
        data: todo,
      });
   
      
    }
  ;


// delete todo
const deletetodo = async (req,res)=>{
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ error: "Not valid id" });
  }
    const todo = await Todos.findOneAndDelete({ _id: id });
    if(!todo){
      return res.status(404).json({error:"No todo found"})
    }
    res.status(200).json({
      message:"deleted",
      todo
    })

}

const edittodo = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Not a valid Id' });
  }

  
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: id },   
      { ...req.body },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: 'Todo not found' });
    }

    res.send({ message: 'Todo updated', todo: updatedTodo });
  
};

export { addTodo ,gettodos,getTodoById,deletetodo,edittodo};