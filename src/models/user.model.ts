import db from '../utils/dbUtil';
import config from '../config';
import mysql from 'mysql2/promise';


let pool = mysql.createPool(config.db);
export default class UserModel {
    findByEmail(email: string) {
        return db('user')
            .where('email', email)
            .then((response) => {
                if (response.length == 0) return null;
                return response[0];
            });
    }
    updateUser(entity, id) {
        return db('user')
            .where('id', id)
            .update(entity)
            .then((response) => {
                return response;
            });
    }
    addUser(data) {
        return db('user')
            .insert(data)
            .then((response) => {
                return response[0];
            });
    }
    addNewComment(nameTable, data){
        return db(nameTable)
            .insert(data)   
            .then((response) => {
                return response[0];
            });
    }
    
    insertNewLessonUser(idUser: number, IdCourse: number, idItem: string) {
        let sql = `INSERT INTO learn (id_user, id_course, id_item) VALUES (${idUser}, ${IdCourse}, '${idItem}')`;
        return pool.query(sql);
    }
    async getDataTable(arrColumn = null, table, arrQuery = null, option = null) {
        let formatArrCol = arrColumn ? arrColumn.filter(Boolean) : null
        let formatArrQuery = arrQuery ? arrQuery.filter(Boolean) : null

        let list = formatArrCol ? formatArrCol.join(',') : '*'
        let query = formatArrQuery ? 'WHERE ' + formatArrQuery.join(' AND ') : ''

        let sql = `SELECT ${list} FROM ${table} ${query} ${option || ''}`;


        const [results, fields]: any = await pool.query(sql);
        if (!results || results.length == 0)
            return [];
        return results;
    }
    async getDataTableDistinct(arrColumn = null, table, arrQuery = null, option = null) {
        let formatArrCol = arrColumn ? arrColumn.filter(Boolean) : null
        let formatArrQuery = arrQuery ? arrQuery.filter(Boolean) : null

        let list = formatArrCol ? formatArrCol.join(',') : '*'
        let query = formatArrQuery ? 'WHERE ' + formatArrQuery.join(' AND ') : ''

        let sql = `SELECT DISTINCT  ${list} FROM ${table} ${query} ${option || ''}`;
        // console.log(sql);

        const [results, fields]: any = await pool.query(sql);
        if (!results || results.length == 0)
            return [];
        return results;
    }
    async updateNewLessonUser(idUser: number, IdCourse: number, idItem: string) {
        let sql = `UPDATE learn SET id_item = '${idItem}' WHERE id_user = ${idUser} AND id_course = ${IdCourse}`;

        const [results, fields]: any = await pool.query(sql);
        if (!results || results.length == 0)
            return [];
        return results;
    }
    
}