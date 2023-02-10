import { getMessages, getReceiverUsers, getSenderUsers } from "../models/chat.model";
import UserModel from "../models/user.model";

const userModel = new UserModel()

export async function getInfoMessages(idUser:number){
  let senderUser: any = await getSenderUsers(idUser);
  senderUser =
    Array.isArray(senderUser) && senderUser.length > 0
      ? senderUser.map((element) => element.id)
      : [];

  let receiverUsers: any = await getReceiverUsers(idUser);
  receiverUsers =
    Array.isArray(receiverUsers) && receiverUsers.length > 0
      ? receiverUsers.map((element) => element.id)
      : [];
  // console.log({id:user_id,senderUser,receiverUsers})

  const chatUsers = Object.assign(senderUser,receiverUsers)

  let infoChatUsers = []
  await Promise.all(
    chatUsers.map(async(user_id:any)=>{
      const infoUser = await userModel.findUserById(user_id)
      const infoChat = await getMessages(user_id,idUser)
      infoChatUsers.push({
        user:{
          ...infoUser
        },
        message:infoChat
      })
    })
  );
  return infoChatUsers
}
