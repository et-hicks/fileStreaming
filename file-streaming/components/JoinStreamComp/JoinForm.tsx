import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserState } from '../../state';

/**
 * TODO:
 * Regex to ensure that the stream is in the expected form
 * if the streamID is defined, preload the image from firebase
 * style the image effectively
 * 
 */


const JoinForm = ({ streamID }: JoinFormProps) => {
    const { userName, setUserName, setHost } = useUserState();

    const [sid, setSID] = useState(streamID);
    const [typedUserName, setTypedUserName] = useState(userName)
    const router = useRouter();

    useEffect(() => {
        if (streamID) {
            setSID(streamID);
        }
    }, [streamID]);

    

    const JoinStream = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const yourName = event.target['yourName'].value;
        const streamID = event.target['streamID'].value;

        console.log("Stream Name event:\t", yourName);
        console.log("Your Name event:\t", streamID);
        setUserName(typedUserName);
        setHost(false);

        /**
         * if found in the database, do this. 
         * Otherwise report it as not found.
         */
        
        router.push(`/s/${streamID}`);

    }
    
    return (
        <div>
            <form onSubmit={JoinStream}>
                <br />
                <label htmlFor="yourName">Your Name:&nbsp;</label>
                <input id="yourName" type="text" placeholder="Your name" required value={typedUserName} onChange={(e) => {setTypedUserName(e.target.value)}}/>

                <br />
                <label htmlFor="streamID">Stream ID:&nbsp;</label>
                <input id="streamID" type="text" placeholder="***-***-****" value={sid} required onChange={(e) => {setSID(e.target.value)}}/>
                
                <br />
                <button type="submit">Join a new stream!</button>
            </form>
        </div>
    );
};

type JoinFormProps = {
    streamID: string;
}

JoinForm.defaultProps = {
    streamID: '',
}

export default JoinForm;