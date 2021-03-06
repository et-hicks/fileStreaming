import React from 'react';
import Meta from '../components/Meta';
import JoinForm from '../components/JoinStreamComp/JoinForm';
import { useRouter } from 'next/router';

const JoinStream = () => {
    const router = useRouter();
    const { id } = router.query;

    const roomID = Array.isArray(id) ? id[0] : id;
    
    return (
        <div>
            <Meta title="Join a stream" />
            This is where you will join any stream link you're given
            <JoinForm streamID={roomID} />
        </div>
    );
};



export default JoinStream;

/**
 * TODO:
 * 
 * create form to join a stream.
 * 
 * create a form to input the name the person is using
 */