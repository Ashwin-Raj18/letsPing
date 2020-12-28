import React from 'react';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
	<div className="chat-form-container">
		<form id="chat-form">
			<input
				id="msg"
				type="text"
				placeholder="Enter Message"
				required
				autoComplete="off"
				value={message}
				onChange={({ target: { value } }) => setMessage(value)}
				onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
			/>
			<button className="btn" onClick={(e) => sendMessage(e)}>
				<i className="fa fa-paper-plane" aria-hidden="true" />
				Send
			</button>
		</form>
	</div>
);

export default Input;
