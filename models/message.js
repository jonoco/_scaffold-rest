module.exports = function(sequelize, DataTypes) {
	const Message = sequelize.define('message', {
		text: DataTypes.STRING,
		sentAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	});

	return Message;
}