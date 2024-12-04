    import express from "express"
import { adduser, deleteuser, getuser, getuserbyid ,edituser,getalluser} from "../controllers/user/user.js"
import tokenverify from "../config/tokenverify.js"


    const router = express.Router()

    router.post("/user", adduser)
    router.post("/users", getuser)
    router.get("/users",tokenverify, getalluser)
    router.get("/user/:id",getuserbyid )
    router.delete("/user/:id",deleteuser )
    router.put("/user/:id",edituser )


    export default router