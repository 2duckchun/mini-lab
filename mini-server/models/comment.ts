import Sequelize from "sequelize";

// @ts-ignore
export default class Comment extends Sequelize.Model {
  static init(sequelize: any) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db: any) {
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
}
