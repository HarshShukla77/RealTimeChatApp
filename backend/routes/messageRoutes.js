const express = require("express")
const {protect} = require("../middleware/authMiddleware")
const {sendMessage,allMessages} = require("../controllers/messageControllers")
const router = express.Router();


router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessages)
router.route

module.exports= router