import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './Join.css';
import wave from '../../assets/wave.svg';
import groupChat from '../../assets/groupChat.svg';
import avatar from '../../assets/avatar.png';

const Join = () => {
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');

	useEffect(() => {
		const inputs = $('.input');
		inputs.each((i, input) => {
			input.addEventListener('focus', addcl);
			input.addEventListener('blur', remcl);
		});
	}, []);

	function addcl () {
		let parent = this.parentNode.parentNode;
		parent.classList.add('focus');
	}

	function remcl () {
		let parent = this.parentNode.parentNode;
		if (this.value === '') {
			parent.classList.remove('focus');
		}
	}

	return (
		<Fragment>
			<div className="join__container">
				<img className="wave" src={wave} alt="wave" />
				<div className="container">
					<div className="join__image">
						<img src={groupChat} alt="group" />
					</div>
					<div className="login-content">
						<form className="join__form">
							<img src={avatar} alt="avatar" />
							<h2 className="title">Welcome</h2>
							<div className="input-div one">
								<div className="i">
									<i className="fas fa-user" />
								</div>
								<div className="div">
									<h5>Username</h5>
									<input
										type="text"
										className="input"
										required
										onChange={(e) => setName(e.target.value)}
										// onFocus={addcl}
										// onBlur={remcl}
									/>
								</div>
							</div>
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-users" />
								</div>
								<div className="join__select_container">
									<select
										name="slct"
										id="slct"
										className="decorated input"
										onChange={(event) => setRoom(event.target.value)}
										value={room}
									>
										<option defaultValue>Select a room</option>
										<option value="Bangalore">Bangalore</option>
										<option value="Mumbai">Mumbai</option>
										<option value="London">London</option>
										<option value="Hongkong">Hongkong</option>
										<option value="Paris">Paris</option>
										<option value="Sydney">Sydney</option>
									</select>
								</div>
							</div>
							<Link
								onClick={(e) => (!name || !room ? e.preventDefault() : null)}
								to={`/chat?name=${name}&room=${room}`}
							>
								<input type="submit" className="join__btn" value="Join" />
							</Link>
						</form>
					</div>
				</div>
				<div className="footer__info">
					<div className="footer__left">
						<p>Created with ❤️ by Ashwin Raj</p>
					</div>
					<div className="footer__right">
						<p>
							Realtime Chat Application{' '}
							<span role="img" aria-label="emoji">
								💬
							</span>
						</p>
						<p>
							Created with React, Express, Node and Socket.IO{' '}
							<span role="img" aria-label="emoji">
								<i className="bx bxl-nodejs bxIcons" />
								<i className="bx bxl-react bxIcons" />
							</span>
						</p>
						<p>
							Try it out right now!{' '}
							<span role="img" aria-label="emoji">
								⬅️
							</span>
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Join;
