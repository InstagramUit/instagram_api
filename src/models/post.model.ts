import db from '../utils/dbUtil';

export default class PostModel {
    createNewPost(data: { id_user: number, items: string, description: string }) {
        return db('post')
            .insert(data)
            .then((response) => {
                return response;
            });
    }
    getPost(user_id:number){
        return db('post')
        .where('id_user',user_id)
        .then(response=>{
            if(!response) return [];
            return response
        })
    }
    findComments(id_post: number) {
        return db('comment_post')
            .select('id_user', 'content', 'number_liked', 'user.display_name', 'user.avatar', 'comment_post.created_at')
            .where('comment_post.id_post', id_post)
            .join('user', 'user.id', '=', 'comment_post.id_user')
            .orderBy('comment_post.created_at', 'desc')
            .then((response) => {
                if (!response)
                    return [];
                return response;
            });
    }
    findLikes(id_post: number) {
        return db('like_post')
            .select('like_post.id', 'id_post', 'id_user')
            .where('id_post', id_post)
            .then((response) => {
                if (!response)
                    return [];
                return response;
            });
    }
    setLikePost(id_user: number, id_post: number, isLike: boolean) {
        if (isLike) {
            return db('like_post')
                .insert({
                    id_post,
                    id_user,
                })
                .then(response => {
                    return response
                })
        } else {
            return db('like_post')
                .where('id_post', id_post)
                .where('id_user', id_user)
                .del()
        }
    }

}