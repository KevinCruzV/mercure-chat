import axios from "axios";
export default function useBackendMsg() {
    return function (topicName, contenu, emailId, chatId) {
        return axios.post(`http://localhost:1234/post-message`, {
            body: new URLSearchParams({
                contenu: contenu,
                email: emailId,
                chat_id: chatId
            })
        })
            .then(res => res.data)
    }
}