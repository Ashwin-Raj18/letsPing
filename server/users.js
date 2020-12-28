const users = [];

const addUser = ({ id, name, room }) => {
	const existingUser = users.find((user) => user.room === room && user.id === id);
	if (existingUser) {
		return { error: 'user already exists in room' };
	}
	const user = { name, room, id };
	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		//[0]to return spliced user
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
