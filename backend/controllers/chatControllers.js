const expressAsyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("userId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat.id }).populate(
                "users",
                "-password"
            );

            res.status(200).send(FullChat);
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        const results = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email"
        });

        res.status(200).send(results);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const createdGroupChat = expressAsyncHandler(async (req, res) => {
    const { name, users } = req.body;
    if (!name || !users) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    var userArray = JSON.parse(users);

    if (userArray.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    userArray.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: userArray,
            isGroupChat: true,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(400);
        throw new Error("Chat not found");
    } else {
        res.json(updatedChat);
    }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const addedUser = await Chat.findByIdAndUpdate(
        chatId, {
            $push: { users: userId },
        }, {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!addedUser) {
        res.status(400);
        throw new Error("Chat not found");
    } else {
        res.json(addedUser);
    }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removedUser = await Chat.findByIdAndUpdate(
        chatId, {
            $pull: { users: userId },
        }, {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removedUser) {
        res.status(400);
        throw new Error("Chat not found");
    } else {
        res.json(removedUser);
    }
});

module.exports = { accessChat, fetchChats, createdGroupChat, renameGroup, addToGroup, removeFromGroup };