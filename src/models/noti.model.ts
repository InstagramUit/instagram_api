import db from "../utils/dbUtil";

export default class NotiModel {
  getNotificationPost(post_id: number, category: "comment" | "like") {
    let table = category === "comment" ? "comment_post" : "like_post";
    return db("post")
      .select("user.display_name", "user.avatar",'post.id as post_id','post.description', `${table}.created_at`)
      .where("post.id", post_id)
      .join(`${table}`, `${table}.id_post`, "=", "post.id")
      .join("user", "user.id", "=", "post.id_user")
      .orderBy(`${table}.created_at`, "desc")
      .then((response) => {
        if (!response) return [];
        return response;
      });
  }
}
