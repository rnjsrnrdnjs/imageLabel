const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
//const User = require('./user');
const List = require("./list");
const Label = require("./label");
const Select = require("./select");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.List = List;
db.Label = Label;
db.Select = Select;

List.init(sequelize);
Label.init(sequelize);
Select.init(sequelize);

List.associate(db);
Label.associate(db);
Select.associate(db);

module.exports = db;
