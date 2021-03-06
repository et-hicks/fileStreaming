// ----------------------- Libraries -----------------------
import React, {useEffect, useState} from 'react';
import chatStyles from '../../styles/Chat.module.css';
import * as SocketIO from 'socket.io-client';

/**
 * TODO:
 * style the chat so its not overbearing
 * figure out why its so slow
 * 
 */

type msgDataType = {
    message: string,
    id: string,
}

type ChatPropsType = {
    clientSocket: SocketIO.Socket;
    clientID: string;
};

const Chat = ({clientSocket, clientID}: ChatPropsType) => {

    const [msgList, setMsgList] = useState([]);
    const [chat, setChat] = useState("");

    useEffect(() => {
        return () => {
            clientSocket.disconnect();
        }
    }, []);

    const newChat = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const msg: string = event.target['message'].value;
        if (!msg) {
            return;
        }

        // We know message is defined
        clientSocket.emit('chat message', messageCreator(msg, clientID));
        setChat("");
        const newMessage = (<li key={msgList.length}>{msg}</li>);
        setMsgList([...msgList, newMessage]);
    }

    const messageCreator = (message: string, id: string): msgDataType => {
        return {message: message, id: id}
    }

    const chatting = (e: React.ChangeEvent<HTMLInputElement>) => {
        // For limiting the length of a chat message to whatever we want
        // Also, maybe include future post processing to the message??
        const msg: string = e.target.value;
        if (msg.length < 200) {
            setChat(msg)
        } else {
            return;
        }
        return;
    }

    clientSocket.on('chat message', (msg: msgDataType) => {
        if (msg.id == clientID) {
            return;
        }
        const newMessage = (<li key={msgList.length}>{msg.message}</li>);
        setMsgList([...msgList, newMessage]);
    })

    return (
        <div className={chatStyles.mainChat}>
            <ul id="messages" className={chatStyles.messagesChat}>
                {msgList}
            </ul>
            <form id="form" onSubmit={newChat} className={chatStyles.formChat}>
                <input id="message" autoComplete="off" 
                className={chatStyles.inputChat} 
                value={chat} 
                onChange={chatting}/>
                    <button>Send</button>
            </form>
        </div>
    );
};


export default Chat;