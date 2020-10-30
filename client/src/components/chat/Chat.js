import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';

let socket;

const Chat = ({ location }) => {
	const ENDPOINT = 'localhost:5000';
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');
	const [ users, setUsers ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);

	useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);
			setRoom(room);
			setName(name);

			socket = io(ENDPOINT);
			socket.emit('join', { name, room }, () => {});

			return () => {
				socket.emit('disconnect');
				socket.off();
			};
		},
		[ ENDPOINT, location.search ]
	);
	useEffect(
		() => {
			socket.on('message', (message) => {
				setMessages([ ...messages, message ]);
			});
		},
		[ messages ]
	);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
