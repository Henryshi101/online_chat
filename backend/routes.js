const express = require('express');
const { register, login } = require('./manager/auth');
const { createChatroom, getChatrooms, deleteChatroom } = require('./manager/chatroom');
const { getMessages, createMessage } = require('./manager/chatroom');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/chatrooms', createChatroom);
router.get('/getChatrooms', getChatrooms);
router.delete('/chatrooms/:id', deleteChatroom);

// Get chatroom messages
router.get('/chatrooms/:chatroomId/getMessages', getMessages);
// Post a new message in chatroom
router.post('/chatrooms/:chatroomId/createMessage', createMessage);

module.exports = router;
