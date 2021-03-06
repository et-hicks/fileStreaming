// ----------------------- Libraries -----------------------
import { emit } from 'node:process';
import React, {useEffect, useState} from 'react';
// import Peer from 'peerjs';
import * as SocketIO from 'socket.io-client';
// ----------------------- Custom Functions -----------------------
import { useUserState } from '../../state'; 
import { emitBlob, emitJoinedRoom, disconnectSocket, uploadData } from '../SocketSetUp/SocketSetUp';
import { backendURL } from '../Constants';
import { BackendComm } from '../file-streaming';

/**
 * TODO:
 * Enable host to hot-change the file
 */

type HostStreamingProps = {
    roomID: string;
    backendComm: BackendComm;
}

let count = 0;
const time = 5_500;

const createBlob = (stream: MediaStream, time: number): Promise<Blob> => {
    
    // console.log("createBlob called");

    const recorder = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=vp9'});
    // console.log("error here");
    recorder.start();

    setTimeout(() => {
        recorder.requestData();
        // console.log("third time is the charm");
        recorder.stop();
    }, time)

    return new Promise((resolve, _) => {    
        
        recorder.addEventListener('dataavailable', (event) => {
            // console.log("Error occurs here when there is a recording");
            const blob = event.data;
            resolve(blob);
        });

        recorder.addEventListener('error', (event) => {
            console.log("%cSOMETHING FUCKED UP DOG", "color: red;font-size:22px;", event);
        });
    });
};

let renders = 0;
const fetchingURL: string = `${backendURL}/videoPart`;

const HostStreaming = ({roomID, backendComm}: HostStreamingProps) => {

    renders++;
    console.log("%cRender", "color:blue;", renders);
    


    const { host } = useUserState();
    
    const [vidSrc, setVidSrc] = useState("");
    const [streamOut, setStreamOut] = useState<MediaStream>();
    const [blobToSend, setBlobToSend] = useState<Blob>(null);



    const hostFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // UNUSED
        event.preventDefault();
    };

    const videoPreview = (event) => {
        const videoFile = event.target.files[0];

        console.log(videoFile.size);

        if (!videoFile) return;

        setVidSrc(URL.createObjectURL(videoFile));
    };

    useEffect(() => {

        setTimeout(() => {
            emitJoinedRoom(backendComm.mySocket, roomID, true)
        }, 1000)

        backendComm.mySocket.on('user-connected', (roomID: string, socketID: string) => {
            console.log("%cThe user has connected", 'color:blue;', roomID, socketID);
        })

        return () => {
            disconnectSocket(backendComm.mySocket);
        }
    }, [])


    useEffect(() => {
        console.log("%cVIDEO SOURCE", "color:red;font-size:20px");
        const srcVideo = document.getElementById('normalVideo'); 

        if (srcVideo === null) return;
    
            console.log("srcVideo must not be null: ", srcVideo);
    
            const setSinkSrc = () => {
                let stream;
                const fps = 0; // Setting to zero means frames captured when requestFrame() is called.
    
                // @ts-ignore
                stream = srcVideo.captureStream(fps);
    
                setStreamOut(stream.clone());
            };
    
            srcVideo.addEventListener('loadedmetadata', setSinkSrc);

            return () => {
                srcVideo.removeEventListener('loadedmetadata', setSinkSrc);
            }
    }, [vidSrc]);

    useEffect(() => {

        // console.log("%cStream out", "color:red;font-size:20px");

        // what if I reduce the interval time while keeping the same recording time?
        // Does that allow for smoother transitions for the client?
        const createBlobInterval = setInterval(() => {
            if (streamOut === null || streamOut === undefined) return
            createBlob(streamOut, time).then((blob: Blob) => {
                console.log(blob);
                setBlobToSend(blob);
            });
        }, time + 1);

        return () => {
            clearInterval(createBlobInterval);
        }

    }, [streamOut]);

    useEffect(() => {

        // Does not work because socketIO File Upload does not work
        // const file: File = new File([blobToSend], 'blobby.webm', {type: 'video/webm;codecs=vp9'})
        // uploadData(backendComm.instance, file);

        // Does not work because socket just keeps getting disconnected over and over
        emitBlob(backendComm.mySocket, blobToSend, roomID);

        // let fd = new FormData();
        // fd.append('partName', `part_${renders}`);
        
        // if (blobToSend !== null) {
        //     fd.append('streamImage', blobToSend, `part_${renders}`);
        // }

        // // Packets are dropped 
        // fetch(fetchingURL, {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     body: fd
        // }).then((response) => {
        //     console.log(response);
        // }).then(data => {
        //     console.log(data);
        // });

        // Packets aren't posted to storage like they need to be
        // if (blobToSend !== null) uploadBlob(blobToSend, `/dummyBlobs/part_${renders}`);

    }, [blobToSend]);

    const videoButton = (
        <div>
            {vidSrc && <video controls id="normalVideo" height={500} width={500} >
                        <source type="video/mp4" src={vidSrc}/>
                    </video>}
            <video id='sinkVideo' autoPlay playsInline height={250} width={250} muted/>
            <form onSubmit={hostFormSubmit}>
                <label htmlFor="UserStreamMedia">Pick the file you want to stream</label>
                <input type="file" id="UserStreamMedia" accept="video/mp4" onChange={videoPreview} />

                {/* <button type="submit">Create a new stream!</button> */}
            </form>
        </div>
    );
    
    
    return (
        <div id="mainDiv">
            {videoButton}
        </div>
    );
};

export default HostStreaming;