import { dbconfig } from "./dbconfig";
import mysql from "mysql2";

export const connection = mysql.createConnection(dbconfig.dev);
