// ----------------------- Libraries -----------------------
import React, {useEffect, useState} from 'react';
import * as SocketIO from 'socket.io-client';

// ----------------------- Homemade -----------------------
import { useUserState } from '../../state';
import { BackendComm } from '../file-streaming';
import { disconnectSocket, emitJoinedRoom } from '../SocketSetUp/SocketSetUp';

type ConsumerStreamingProps = {
    roomID: string;
    backendComm: BackendComm;
}

let render = 0;
const globalBuffer = [];

const ConsumerStreaming = ({roomID, backendComm}: ConsumerStreamingProps) => {
    
    console.log("render: ", render);
    render++;

    const { host } = useUserState();
    const [sentBlob, setSentBlob] = useState<Buffer>(null);

    useEffect(() => {
        console.log("%cRender Once", "color: red; font-size:22px;");
        setTimeout(() => {
            emitJoinedRoom(backendComm.mySocket, roomID, false);
        }, 1000)

        // Only add one listener at a time
        backendComm.mySocket.on('recieveBlob', (buffer: Buffer) => {
            console.log("got something", buffer);
            setSentBlob(buffer);
        });

        return () => {
            disconnectSocket(backendComm.mySocket);
            for (let i = 0; i < globalBuffer.length; i++) {
                globalBuffer.pop();
            }
        }

    }, [])

    useEffect(() => {
        console.log("Recieved blob");
        
        if (sentBlob === null) return

        globalBuffer.push(sentBlob);
        console.log("Length of the sent blob: ", globalBuffer.length);

        const sinkVideo = document.getElementById('sinkVideo');
        // const videoToPlay = new Blob([sentBlob], {type: 'video/webm'});

        // @ts-ignore
        // sinkVideo.src = URL.createObjectURL(videoToPlay);

        // const sinkVideoPlay = () => {
            // @ts-ignore
            // sinkVideo.play();
        // }

        // sinkVideo.addEventListener('loadedmetadata', sinkVideoPlay);

        // return () => {
        //     sinkVideo.removeEventListener('loadedmetadata', sinkVideoPlay);
        // }
    }, [sentBlob])

    return (
        <div id="mainDiv">
            <h2>You are looking for a stream to join!</h2>
            <video id="sinkVideo" autoPlay playsInline height={500} width={500}/>
            <div id="videoGrid" style={{display: 'grid', 
                                        gridTemplateColumns: 'repeat(auto-fill, 300px)',
                                        gridAutoRows: '300px'}}></div>
        </div>
    );
};

export default ConsumerStreaming;