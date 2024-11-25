import express from "express";
import { addTodo, getTodoById, gettodos ,deletetodo,edittodo} from "../controllers/todocontroller.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todos",gettodos)
router.get("/todo/:id",getTodoById)
router.delete("/todo/:id",deletetodo)
router.put("/todo/:id",edittodo)

export default router;