import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { customAlphabet } from 'nanoid';

import { useRouter } from 'next/router';
import { useUserState } from '../../state';
import { backendURL } from '../Constants';
/**
 * TODO:
 * 
 * private for now will have the host manually admit people to watch the stream.
 * 
 * convert this to formik when its time to style, but for now this should be just fine
 * description should have hashtags highlighted
 * categories should be fetched from the database, and then presented as options for people to choose from
 * control video upload quality
 * allow for audio streaming, not just video
 * Do some tracking
 */

const alphabet: string = 'abcdefghijklmnopqrstuvwxyz1234567890'

const addDash = (str: string): string => {
    return str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6, str.length)
}

const createDayPath = (): string => {
    const d = new Date();

    const year = '2021';
    const monthNum = d.getUTCMonth() + 1;
    let month = `${monthNum}`;
    const dayNum = d.getUTCDate();
    let day = `${dayNum}`;

    if (monthNum < 10) {
        month = `0${month}`
    }

    if (dayNum < 10) {
        day = `0${day}`
    }

    const filePath = `${year}/${month}/${day}`
    return filePath;
}

const CreateForm = ({fetchingURL}: CreateFormProps) => {

    const router = useRouter();
    const nanoid = customAlphabet(alphabet, 10);

    const { userName, setUserName, setHost} = useUserState();

    const [privateChecked, setPrivateChecked] = useState(false);
    const [chatEnabled, setChatEnabled] = useState(true);
    const [imgSrc, setImgSrc] = useState("");
    const [typedUserName, setTypedUserName] = useState<string>(userName);
    const [imageFileName, setImageFileName] = useState<string>();
    const [imageBlob, setImageBlob] = useState<Blob>();

    console.log('fetchingURL: ', fetchingURL);

    const createStream = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const yourName: string = event.target['yourName'].value;
        const streamName: string = event.target['streamName'].value;
        const description: string = event.target['description'].value;
        const streamID: string = addDash(nanoid());

        const filePathDay = createDayPath();
        /**
         * TODO: create a new stream on the backend 
         */
        
        let fd = new FormData();
        fd.append('userName', yourName);
        fd.append('streamName', streamName);
        fd.append('streamID', streamID);
        fd.append('streamDate', filePathDay);
        fd.append('streamDescription', description);
        fd.append('private', privateChecked.toString());
        fd.append('chatEnabled', chatEnabled.toString());
        
        if (imageFileName) {
            fd.append('streamImage', imageBlob, imageFileName);
        }

        setUserName(typedUserName);
        setHost(true);
        
        fetch(fetchingURL, {
            method: 'POST',
            mode: 'no-cors',
            body: fd
        }).then((response) => {
            console.log(response);
        }).then(data => {
            router.push(`/s/${streamID}`);
        });
    }

    const imagePreview = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const fileName = file.name;
        const regex = /(?<=\.)[^.]*$/;
        const MIMEType = `image/${fileName.match(regex)[0]}`;

        setImgSrc(URL.createObjectURL(file));
        const imgBlob = new Blob([file], {type: MIMEType});
        setImageBlob(imgBlob);
        setImageFileName(fileName);
    }

    return (
        <div>
            <form onSubmit={createStream} >
                <br />
                <label htmlFor="streamName">Stream Name:&nbsp;</label>
                <input id="streamName" type="text" placeholder="Stream name" required />

                <br />
                <label htmlFor="yourName">Your Name:&nbsp;</label>
                <input id="yourName" type="text" placeholder="Your name" required value={typedUserName} onChange={(e) => {setTypedUserName(e.target.value)}}/>

                <br />
                <label htmlFor="streamImage">Image for your stream:&nbsp;</label>
                <input type="file" id="streamImage" accept="image/png, image/jpeg, image/jpg" onChange={imagePreview}/>
                {imgSrc && <img src={imgSrc} height={150} width={150}/>}

                {/* <br />
                <label htmlFor="streamVideo">File to stream</label>
                <input type="file" id="streamVideo" accept="video/webm, video/mp4" onChange={videoPreview} required/>
                {vidSrc && <ReactPlayer url={vidSrc} width={200} height={200} controls={true} />} */}

                <br />
                <label htmlFor="description"></label>
                <textarea
                    id="description"
                    placeholder="Write a description for the file you're streaming"
                    rows={5}
                    cols={75}
                />

                <br />
                <input type="radio" id="private" onClick={() => {setPrivateChecked(!privateChecked)}} checked={privateChecked} onChange={() => {console.log(privateChecked);}}/>
                <label htmlFor="private">Private?</label>
                
                <br />
                <input type="radio" id="enableChat" onClick={() => {setChatEnabled(!chatEnabled)}} checked={chatEnabled} onChange={() => {console.log(chatEnabled);}}/>
                <label htmlFor="enableChat">Enable a chat on the stream?</label>
                
                <br />
                <button type="submit">Create a new stream!</button>
            </form>
        </div>
    );
};

CreateForm.defaultProps = {
    fetchingURL: `${backendURL}/streamCreation`
};

type CreateFormProps = {
    fetchingURL: string;
}

export default CreateForm;