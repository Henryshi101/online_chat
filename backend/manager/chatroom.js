const { Chatroom } = require('../models/chatroom');
const { Message } = require('../models/message');

const createChatroom = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const chatroom = await Chatroom.create({ name, created_by: userId });
    //await ChatroomMember.create({ chatroom_id: chatroom.id, user_id: userId, joined_at: new Date() });

    res.status(201).json({ message: 'Chatroom created successfully', chatroom });
  } catch (error) {
    console.log('Create chatroom error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.findAll();
    res.status(200).json({ chatrooms });
  } catch (error) {
    console.log('Get chatrooms error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteChatroom = async (req, res) => {
  const chatroomId = req.params.id;

  try {
    await Chatroom.destroy({ where: { id: chatroomId } });
    res.status(200).json({ message: 'Chatroom deleted successfully' });
  } catch (error) {
    console.log('Delete chatroom error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getMessages = async (req, res) => {
  const chatroomId = req.params.chatroomId;

  try {
    const messages = await Message.findAll({ where: { chatroom_id: chatroomId } });
    res.status(200).json({ messages });
  } catch (error) {
    console.log('Get messages error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const createMessage = async (req, res) => {
  const { message_info, sender_id, chatroom_id } = req.body;

  try {
    const message = await Message.create({ message_info, sender_id, chatroom_id, created_at: new Date() });
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    console.log('Create message error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  createChatroom,
  getChatrooms,
  deleteChatroom,
  getMessages,
  createMessage
};
