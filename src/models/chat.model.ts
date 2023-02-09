import db from "../utils/dbUtil";

export function getSenderUsers(to_id: number) {
  return db("message")
    .distinct("from_id as id")
    .where("to_id", to_id)
    .then((res) => res);
}
export function getReceiverUsers(from_id: number) {
  return db("message")
    .distinct("to_id as id")
    .where("from_id", from_id)
    .then((res) => res);
}
export function createMessage(data: any) {
  return db("message")
    .insert(data)
    .then((res) => res);
}

export function getMessages(firstUser: number, secondUser: number) {
  return db("message")
    .where(function () {
      this.where("from_id", firstUser).andWhere("to_id", secondUser);
    })
    .orWhere(function () {
      this.where("from_id", secondUser).andWhere("to_id", firstUser);
    })
    .then((res) => res);
}
