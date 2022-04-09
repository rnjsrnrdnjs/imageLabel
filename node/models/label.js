const Sequelize = require("sequelize");

module.exports = class Label extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        select: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
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
