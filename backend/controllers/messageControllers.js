const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel"); // Ensure Chat model is imported

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        // Populate sender, chat, and users in chat
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(400).json({ message: "Failed to send message" });
    }
});

const allMessages= asyncHandler(async(req,res)=>{
    try{
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat");
        res.json(messages)
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})




module.exports = { sendMessage,allMessages };
