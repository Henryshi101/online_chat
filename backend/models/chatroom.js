// models/chatroom.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chatroom = sequelize.define('Chatroom', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'chatrooms'
});

module.exports = {
  Chatroom
};
