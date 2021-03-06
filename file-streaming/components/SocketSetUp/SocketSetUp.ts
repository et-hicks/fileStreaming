import * as SocketIO from 'socket.io-client';
// const ss = require('socket.io-stream');
// import { ss } from 'socket.io-stream';
const SocketIOFIleUpload = require('socketio-file-upload');

type BackendComm = {
    mySocket: SocketIO.Socket;
    instance: any;
}

const initSocket = (backendURL: string, roomID: string): BackendComm => {
    
    const mySocket = SocketIO.io(backendURL, {
        autoConnect: true,
        timeout: 25_000});
    
    const instance = new SocketIOFIleUpload(mySocket);

    mySocket.on('disconnect', (reason: string) => {
        switch (reason) {
            case 'ping timeout': {
                mySocket.open();
                break;
            }
            default:
                console.log("disconnect reason: ", reason);
        }
    })

    return {mySocket, instance};
}

const emitBlob = (mySocket: SocketIO.Socket, blob: Blob, roomID: string) => {
    mySocket.emit('newBlob', blob, roomID);
}



const emitJoinedRoom = (mySocket: SocketIO.Socket, roomID: string, host: boolean) => {
    mySocket.emit('join-room', roomID, mySocket.id, host);
}

const disconnectSocket = (mySocket: SocketIO.Socket) => {
    mySocket.disconnect();
}

const uploadData = (instance: any, file: File) => {
    console.log('inside of uploadData');
    instance.submitFiles(file);
}

export {
    initSocket,
    emitBlob, 
    emitJoinedRoom,
    disconnectSocket,
    uploadData
}
