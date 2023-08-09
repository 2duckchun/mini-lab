import Sequelize, { Sequelize as SequelizeType } from "sequelize";
import { SequelizeDBConfig } from "../types/config";

export type UserDomain = {
  id: string;
  loginId: string;
  password: string;
  email: string;
  nickname: string;
};

// @ts-ignore
export default class User extends Sequelize.Model {
  static init(sequelize: SequelizeType) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        loginId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            isEmail: true,
          },
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db: SequelizeDBConfig) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}
