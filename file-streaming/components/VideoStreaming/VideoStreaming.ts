import Peer from 'peerjs';

const initPeer = (streamID: string): Peer => {
    const peer: Peer = new Peer(streamID, {
        debug: 3,
        config: {'iceServers': [
            { urls: 'stun:stun.l.google.com:19302?transport=tcp' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302?transport=tcp' },
            { urls: 'stun:stun.voiparound.com?transport=tcp' },
            { urls: 'stun:stun.voiparound.com' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302?transport=tcp' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302?transport=tcp' },
            { urls: 'stun:stun.ekiga.net' },
            { urls: 'stun:stun.ideasip.com' },
            { urls: 'stun:stun.schlund.de' },
            { urls: 'stun:stun.xten.com' },
            { urls: 'stun:stun.ekiga.net?transport=tcp' },
            { urls: 'stun:stun.ideasip.com?transport=tcp' },
            { urls: 'stun:stun.schlund.de?transport=tcp' },
            { urls: 'stun:stun.xten.com?transport=tcp' },
            {
                urls: 'turn:54.175.92.144:443?transport=tcp',
                username: 'voiceuser',
                credential: 'thereddkingreallydoesfollow88u',
            },
            {
            urls: 'turn:54.175.92.144:443',
            username: 'voiceuser',
            credential: 'thereddkingreallydoesfollow88u',
            },
            // // Not known from varty
            // {urls: 'stun:stun.nextcloud.com:443'},
            // {urls: 'stun:relay.webwormhole.io'},
            // {urls: 'stun:relay.webwormhole.io?transport=tcp'}, // I got no idea if appending transport=tcp is a good idea
            // {urls: 'stun:stun.stunprotocol.org:3478'},
            // {urls: 'stun:stun.stunprotocol.org:3478?transport=tcp'},
            // {urls: 'stun:stun:124.64.206.224:8800'},
        ]}
    });

    peer.on('open', (id: string) => {
        console.log("MYFILE. Awaiting connections to: ", id);
    });

    peer.on('connection', (dc: Peer.DataConnection) => {
        console.log('MYFILE. Connection established to: ',  dc.peer);
    });

    peer.on('close', () => {
        console.log('MYFILE. Connection to', streamID, " is destroyed and now closed");
    });

    peer.on('disconnected', () => {
        if (peer.destroyed) {
            console.log("MYFILE: ", streamID, " peer is destroyed. No reconnection possible");
            return;
        }
        console.log("MYFILE: ", streamID, " has disconnected. Attempting to reconnect");
        peer.reconnect();
    });

    peer.on('error', (err) => {
        console.log(err.type, "MYFILE. The following error has occured: ", err);
    });

    // const mediaConnection: Peer.MediaConnection = peer.call(streamID, );

    return peer;
};

// Unless this takes in a ref to a media object, this is no longer a good thing
// const createStream = (peer: Peer, mediaStream: MediaStream) => {
//     peer.on('call', (call: Peer.MediaConnection) => {
//         call.answer(mediaStream);
//     });
// };

const joinStream = (myPeer: Peer, otherID: string, metaData?: any): Peer.MediaConnection => {
    // Joining a stream should just get the data from the other people,
    // and doesn't need any data from me (prolly??)

    const dummyMediaStream: MediaStream = new MediaStream();

    const myMediaConnection = myPeer.call(otherID, dummyMediaStream, {
        metadata: metaData
    });

    myMediaConnection.on('error', (err) => {
        console.log("MYFILE: The Following Error has occured: ", err);
        myPeer.destroy();
    });
    
    return myMediaConnection;
};

const destroyStream = (peer: Peer) => {
    console.log("Destroying peer with id: ", peer.id);
    peer.disconnect();
    peer.destroy();
};

export default initPeer;

export {
    // createStream,
    destroyStream,
    joinStream,
};