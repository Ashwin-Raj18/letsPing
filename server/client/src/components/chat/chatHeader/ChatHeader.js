import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Spin as Hamburger } from 'hamburger-react';
import './ChatHeader.css';
import letsPing from '../../../assets/avatar.png';

const ChatHeader = ({ room }) => {
	const [ isOpen, setOpen ] = useState(false);
	return (
		<header className="chat-header">
			<div className="hamberger__container">
				<Hamburger
					toggled={isOpen}
					toggle={setOpen}
					onToggle={(toggled) => {
						if (toggled) {
							//open a menu
							$('.chat-sidebar').toggleClass('show');
						} else {
							// close a menu
							$('.chat-sidebar').toggleClass('show');
						}
					}}
				/>
			</div>
			<div className="header__img__container">
				<img className="header__img" src={letsPing} alt="img" />
			</div>
			<h2>{room}</h2>
			<a href="/" className="btn">
				Leave Room
			</a>
		</header>
	);
};

export default ChatHeader;
