import db from "../utils/dbUtil";

export default class CommentModel {
  createComment(data) {
    return db("comment_post")
      .insert(data)
      .then((response) => {
        return response;
      });
  }
 
}
