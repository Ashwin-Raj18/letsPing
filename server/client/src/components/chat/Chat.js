import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import './Chat.css';
import ChatHeader from './chatHeader/ChatHeader';
let socket;

const Chat = ({ location }) => {
	const ENDPOINT = window.location.origin;

	//const [ name, setName ] = useState('');
	const [ userId, setUserId ] = useState('');
	const [ room, setRoom ] = useState('');
	const [ usersInRoom, setUsersInRoom ] = useState([]);
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);
	useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);
			setRoom(room);
			//setName(name);

			socket = io(ENDPOINT);
			socket.emit('join', { name, room }, () => {});

			return () => {
				socket.emit('disconnect');
				socket.off();
			};
		},
		[ ENDPOINT, location.search ]
	);
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [ ...messages, message ]);
			if (message.newUser) {
				setUserId(message.id);
			}
		});
		socket.on('roomData', ({ users }) => {
			setUsersInRoom(users);
		});
		socket.on('redirect', (destination) => {
			window.location.href = destination;
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	return (
		<div className="chat-container">
			<ChatHeader room={room} />
			<main className="chat-main">
				<InfoBar usersInRoom={usersInRoom} />
				<Messages messages={messages} userId={userId} />
			</main>
			<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
		</div>
	);
};

export default Chat;
