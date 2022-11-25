import db from '../utils/dbUtil';
import config from '../config';
import mysql from 'mysql2/promise';


let pool = mysql.createPool(config.db);
export default class UserModel {
    findUser(data: { email: string, password: string }) {
        return db('user')
            .where('email', data.email)
            .where('password', data.password)
            .then((response) => {
                if (response.length == 0) return null;
                return response[0];
            });
    }
    findUserById(id) {
        return db('user')
            .where('id', id)
            .then((response) => {
                if (response.length == 0) return null;
                return response;
            });
    }
    checkExistUser(email: string) {
        return db('user')
            .where('email', email)
            .then((response) => {
                if (response.length == 0) return null;
                return response[0];
            });
    }
    createNewUser(data: object) {
        return db('user')
            .insert(data)
            .then((response) => {
                return response;
            });
    }
    updateInfoUser(user_name: string, data: object) {
        return db('user')
            .where('user_name', user_name)
            .update(data)
            .then((response) => {
                return response;
            });
    }

}