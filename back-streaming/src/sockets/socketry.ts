import http from 'http';
const SocketIOFIleUpload = require('socketio-file-upload')

/**
 * TODO:
 * Convert users to a database listing
 * Add and delete in the DB
 * Move between active and inactive connections
 */

type msgDataType = {
    message: string,
    id: string,
}

type Connections = {
    host: boolean;
    hostStreamReady: boolean;
    peerID: string;
    roomID: string;
};

const users: {[socketID: string]: Connections} = {};

const setUpSocketIO = (server: http.Server) => {
    

    const io = require('socket.io')(server, 
        {cors: {
            origin: "*",
        },
        maxHttpBufferSize: 1.5e8, // 15mb
        pingTimeout: 12_000,    // 12 seconds
        pingInterval: 35_000,   // 35 seconds
    });
    
    SocketIOFIleUpload.listen(server)

    io.on('connection', (socket: SocketIO.Socket) => {
        console.log(socket.id, "is backend connected");
        setUpChatting(io, socket);
        setUpRoom(io, socket);

        const siofu = new SocketIOFIleUpload();
        siofu.listen(socket)

        siofu.on('start', (event: any) => {
            console.log(event.file);
        })

    });
    

    return io;
};

const setUpChatting = (io: any, socket: SocketIO.Socket) => {
    socket.on('chat message', (msg: msgDataType) => {
        console.log(msg.message);
        io.emit('chat message', msg);
    });
};
//
const setUpRoom = (io: any, socket: SocketIO.Socket) => {
    
    
    /**
     * Server Step 1: Host/Consumer lets server know of a new connection
     */
    socket.on('join-room', (roomID: string, myPeerID: string, host: boolean) => {
        
        // Host/Consumer socket joins the room.
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('user-connected', roomID, socket.id)
    });

    socket.on('disconnect', (reason: string) => {
       console.log(socket.id, "has disconnected for the following reason: ", reason);
    });

    socket.on('newBlob', (blob: any, roomID: string) => {
        // Initial render means that the blob is null
        console.log("The blob is: ", blob);
        // socket.to(roomID).broadcast.emit('recieveBlob', blob)
    })

};

export {
    setUpSocketIO,
}
// for the refresh // refresh // hh // refresh // refresh
//sssss
