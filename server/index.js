import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./routes/index.js"
import cors from "cors"
import fileUpload from "express-fileupload"

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/api", router)
app.use(fileUpload())
app.use(express.static('images'))

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.log(err))
.then(console.log("Connected to MongoDb"))


app.listen(process.env.PORT, () => {
    console.log("Started on port " + process.env.PORT)
})

