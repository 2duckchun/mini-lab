import { Options } from "sequelize";

export type ConfigMode = {
  development: Options;
  test: Options;
  production: Options;
};

export type SequelizeDBConfig = {
  [key: string]: any;
};
