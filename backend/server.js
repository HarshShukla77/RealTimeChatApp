const express = require("express")
const {chats} = require("./data/data");
const  { notfound,errorHandler }= require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
const color =require("colors")
dotenv.config();
console.log("MongoDB URL:", process.env.MONGO_URL);
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes =  require("./routes/chatRoutes")
connectDB();
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is Running")
})



app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notfound)
app.use(errorHandler)
const PORT = process.env.PORT || 6000;
app.listen(PORT,console.log(`server is running on port ${PORT}`.yellow.bold));
