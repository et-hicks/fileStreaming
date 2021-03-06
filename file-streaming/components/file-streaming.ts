import * as SocketIO from 'socket.io-client';


export type BackendComm = {
    mySocket: SocketIO.Socket;
    instance: any;
}