const express = require("express")
const {protect} = require("../middleware/authMiddleware")
const router = express.Router();
const {accessChat,fetchChats,createdGroupChat,renameGroup,addToGroup,removeFromGroup} = require("../controllers/chatControllers")


router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createdGroupChat);
router.route("/rename").put(protect,renameGroup)
router.route("/remove").put(protect,removeFromGroup);
router.route("/add").put(protect,addToGroup);
// router.route("/check").get(protect,CheckGroupChatAlreadyExist)


module.exports=router;