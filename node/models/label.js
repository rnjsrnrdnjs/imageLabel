const Sequelize = require("sequelize");

module.exports = class Label extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Label",
        tableName: "labels",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Label.belongsTo(db.List);
  }
};
