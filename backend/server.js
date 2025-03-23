const express = require("express")
const { chats } = require("./data/data");
const { notfound, errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
const color = require("colors")
dotenv.config();
console.log("MongoDB URL:", process.env.MONGO_URL);
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is Running")
})



app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notfound)
app.use(errorHandler)
const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, console.log(`server is running on port ${PORT}`.yellow.bold));

const io = require("socket.io")(server, {
    // it stop the connectio  aftr 60 sec if user didnt reposnd to save the bandwidth
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
})
io.on("connection", (socket) => {
    console.log("connected to socket to io")
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected")
    });


    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room " + room)
    });

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("Stop typing",(room)=>socket.in(room).emit("typing"));
    



    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved)
        })


    })
    socket.off("setup",()=>{
        console.log("user disconnected");
        socket.leave(userData._id);
    });
})