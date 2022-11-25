import db from '../utils/dbUtil';

export default class PostModel {
    findUser(data: { email: string, password: string }) {
        return db('user')
            .where('email', data.email)
            .where('password', data.password)
            .then((response) => {
                if (response.length == 0) return null;
                return response[0];
            });
    }
    createNewPost(data: { user_id: number, items: string, title: string, description: string }) {
        return db('post')
            .insert(data)
            .then((response) => {
                return response;
            });
    }


}