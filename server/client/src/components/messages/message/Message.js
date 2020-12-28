import React from 'react';

import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({ message: { text, user, id, newUser, time }, userId }) => {
	let isSentByCurrentUser = false;

	//const trimmedName = name.trim().toLowerCase();

	if (userId === id && !newUser) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className="message__container">
			<div className="message floatRight">
				<p className="meta">
					You
					<span>{time}</span>
				</p>
				<p className="text">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	) : (
		<div className="message__container">
			<div className="message floatLeft">
				<p className="meta">
					{user}
					<span>{time}</span>
				</p>
				<p className="text">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	);
};

export default Message;
