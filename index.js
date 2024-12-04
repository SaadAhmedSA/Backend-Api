import express from "express"
import mongoos from "./src/Database/Index.js"
import router from "./src/routes/userroute.js"
import cors from "cors"

const port = 3000 
const app = express()


app.use(cors())
app.use(express.json())

mongoos()
  .then(() =>  console.log("DB connected")
  
  )
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api",router)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})