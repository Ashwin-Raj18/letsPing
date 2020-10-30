const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const PORT = process.env.PORT || 5000;

app.use(router);

//socket.io impl
io.on('connect', (socket) => {
	console.log('we have new connection');

	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) return callback(error);

		socket.join(user.room);
		socket.emit('message', {
			user : 'admin',
			text : `${user.name}, welcome to ${user.room}`
		});
		//send to all in room except sender
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name} has joined!` });
		// send all in room including sender
		io
			.to(user.room)
			.emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(PORT, () => {
	console.log(`server has started on port ${PORT}`);
});
