// ----------------------- Libraries -----------------------
import React, { useState, useRef, useEffect } from 'react';
import Peer from 'peerjs';
import { useRouter } from 'next/router';
import * as SocketIO from 'socket.io-client';

// ----------------------- Homemade -----------------------
import { useUserState } from '../../state';
import HostStreaming from './HostStreaming';
import ConsumerStreaming from './ConsumerStreaming';
import { initSocket } from '../SocketSetUp/SocketSetUp';
import { backendURL } from '../Constants';
import { BackendComm } from '../file-streaming';

/**
 * TODO:
 * Make it so that they can control the private/public aspect of this stream from here
 * Enable the mic option so people can just stream spotify to each other
 * enable a screen share option so people can just screen share together
 * put the chat into this place 
 * enable the file sharing option
 * enable a video chat feature
 */

const Stream = () => {

    // console.log("\n\n\nStreaming re-render");

    const [backendSetUp, setBackendSetUp] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query; // router.query can return a string array. We just want the first value
    const { userName, host, myUID } = useUserState();

    const roomID = Array.isArray(id) ? id[0] : id;


    let backendComm: BackendComm;

    if ( !userName ) {
        router.push(`/join?id=${roomID}`);
        return null;
    } else {
        backendComm = initSocket(backendURL, roomID);
    }


    return (
        <div>
            <h1>Hello to room {roomID}</h1>
            <h2>Username is {userName} </h2>
            <p>
                Your room is all set up! Send the link out to friends to watch
                your video or listen to your audio together. 
            </p>
            {host ? 
                <HostStreaming roomID={roomID} backendComm={backendComm}/> 
                : <ConsumerStreaming roomID={roomID} backendComm={backendComm}/>}
        </div>
    );
};



export default Stream;