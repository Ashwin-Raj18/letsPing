const formatMessage = require('./messages');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.use(router);

io.on('connect', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit(
			'message',
			formatMessage(
				'Admin',
				`${user.name}, welcome to room ${user.room}.`,
				socket.id,
				true
			)
		);
		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage('Admin', `${user.name} has joined!`, socket.id, false)
			);

		io
			.to(user.room)
			.emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.name, message, socket.id, false));

		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io
				.to(user.room)
				.emit(
					'message',
					formatMessage('Admin', `${user.name} has left.`, socket.id, false)
				);
			io
				.to(user.room)
				.emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		}
		var destination = 'lets-ping.tk';
		socket.emit('redirect', destination);
	});
});
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
