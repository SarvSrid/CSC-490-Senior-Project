import {authenticateUser} from "@/utils/serverAuth";
import ChatbotClient from "@/app/user/chatbot/ChatbotClient";

export default async function chatbot() {
  // Authenticate user on server
  const authResult = await authenticateUser();
  console.log("Auth Result:", authResult);

  return <ChatbotClient userData={authResult.userData}/>;
}