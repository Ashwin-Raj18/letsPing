const moment = require('moment-timezone');

function formatMessage (user, text, id, newUser) {
	var india = moment().tz('Asia/Kolkata').format('h:mm a');
	return {
		user,
		text,
		id,
		newUser,
		time    : india
	};
}

module.exports = formatMessage;
