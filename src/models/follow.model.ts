import db from '../utils/dbUtil';

export default class FollowModel {
    createFollow(user_id: number, following_user_id: number) {
        return db('follow')
            .insert({
                id_user: user_id,
                id_user_following: following_user_id
            })
            .then((response) => {
                return response;
            });
    }
    deleteFollow(user_id: number, following_user_id: number) {
        return db('follow')
            .where('id_user', user_id)
            .where('id_user_following', following_user_id)
            .del()
    }
    findFollower(user_id: number) {
        return db('follow')
            .select('display_name', 'avatar', 'user.id as user_id')
            .join('user', 'user.id', '=', 'id_user_following')
            .where('id_user_following', user_id)
            .then((response) => {
                if (!response)
                    return []
                return response;
            });
    }
    findFollowing(user_id: number) {
        return db('follow')
            .select('display_name', 'avatar', 'user.id')
            .join('user', 'user.id', '=', 'follow.id_user')
            .where('id_user', user_id)
            .then((response) => {
                if (!response)
                    return []
                return response;
            });
    }
    findPostsFollowing(user_id: number) {
        return db('follow')
            .select('follow.id_user_following as id_user', 'avatar', 'display_name', 'description', 'items', 'post.id as id','post.created_at')
            .where('follow.id_user', user_id)
            .join('post', 'follow.id_user_following', '=', 'post.id_user')
            .join('user', 'follow.id_user_following', '=', 'user.id')
            .orderBy('post.created_at', 'desc')
            .then((response) => {
                if (!response)
                    return []
                return response;
            });
    }
}