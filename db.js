const Sequelize = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/scaffold';

const seq = new Sequelize(DATABASE_URL, { dialect: 'postgres' });

let db = {};
db.message = seq.import(`${__dirname}/models/message.js`);
db.user = seq.import(`${__dirname}/models/user.js`);
db.sequelize = seq;
db.Sequelize = Sequelize;

module.exports = db;