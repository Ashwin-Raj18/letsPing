import React, { useEffect } from 'react';

import Message from './message/Message';
import './Messages.css';

const Messages = ({ messages, userId }) => {
	const chats = document.querySelector('.chat-messages');
	useEffect(
		() => {
			if (chats) {
				chats.scrollTop = chats.scrollHeight;
			}
		},
		[ messages, chats ]
	);

	return (
		<div className="chat-messages">
			{messages.map((message, i) => (
				<Message key={i} message={message} userId={userId} />
			))}
		</div>
	);
};

export default Messages;
