const Sequelize = require("sequelize");

module.exports = class Select extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        select: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Select",
        tableName: "selects",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Select.belongsTo(db.Label);
  }
};
