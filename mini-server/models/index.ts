import { Sequelize } from "sequelize";
import { configInfo } from "../config/config";
import { ConfigMode, SequelizeDBConfig } from "../types/config";
import User from "./user";
import Comment from "./comment";

const env = (process.env.NODE_ENV || "development") as
  | "development"
  | "test"
  | "production";

// config에서 데이터베이스 설정을 불러옴.
// Sequelize 생성자를 이용해 config 연결.
const config = (configInfo as ConfigMode)[env];

export const db: SequelizeDBConfig = {};

const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  config
);

// 시퀄라이즈 초기화
db.sequelize = sequelize;

// 테이블 모델
db.User = User;
db.Comment = Comment;

// 생성한 모델을 sequelize에 연결 후 클래스 생성
User.init(sequelize);
Comment.init(sequelize);

// db 내에 있는 테이블과 관계를 설정할 수 있도록 associate함.
User.associate(db);
Comment.associate(db);
