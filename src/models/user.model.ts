import db from "../utils/dbUtil";
import config from "../config";
import mysql from "mysql2/promise";

let pool = mysql.createPool(config.db);
export default class UserModel {
  findUser(email: string) {
    return db("user")
      .where("email", email)
      .then((response) => {
        if (response.length == 0) return null;
        return response[0];
      });
  }
  findUserById(id: any) {
    return db("user")
      .select("display_name", "avatar", "id")
      .where("id", id)
      .then((response) => {
        if (response.length == 0) return null;
        return response[0];
      });
  }
  checkExistUser(email: string) {
    return db("user")
      .where("email", email)
      .then((response) => {
        if (response.length == 0) return null;
        return response[0];
      });
  }
  createNewUser(data: object) {
    return db("user")
      .insert(data)
      .then((response) => {
        return response;
      });
  }
  updateInfoUser(user_id: number, data: object) {
    return db("user")
      .where("id", user_id)
      .update(data)
      .then((response) => {
        return response;
      });
  }
  getUsers() {
    return db("user")
      .select("id", "email", "display_name", "avatar")
      .then((response) => {
        return response;
      });
  }
  getSuggestUser(user_id: number) {
    return db("user")
      .select("id", "email", "display_name", "avatar")
      .where("id", user_id)
      .then((response) => {
        if (!response) return null;
        return response;
      });
  }
}
