import React, { Fragment } from 'react';
import onlineIcon from '../../assets/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({ room, usersInRoom }) => (
	<Fragment>
		<div className="chat-sidebar">
			<h3>
				<i className="fas fa-users" /> Users
			</h3>
			<ul id="users">
				{usersInRoom.map((user) => (
					<Fragment key={user.id}>
						<li>
							{user.name}
							<img alt="Online Icon" src={onlineIcon} />
						</li>
					</Fragment>
				))}
			</ul>
		</div>
	</Fragment>
);

export default InfoBar;
