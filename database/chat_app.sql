DROP DATABASE chatapp;
CREATE DATABASE chatapp;
USE chatapp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(512),
    display_name VARCHAR(255),
    status ENUM('online', 'offline', 'busy') NOT NULL DEFAULT 'offline'
);

CREATE TABLE chatrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE chatroom_members (
    chatroom_id INT NOT NULL,
    user_id INT NOT NULL,
    joined_at DATETIME NOT NULL,
    PRIMARY KEY (chatroom_id, user_id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_info VARCHAR(1024) NOT NULL,
    sender_id INT NOT NULL,
    chatroom_id INT,
    created_at DATETIME,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id)
);
