import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import initPeer, { createStream, joinStream } from '../../components/VideoStreaming';
// import { exception } from 'console';

/**
 * TODO:
 * Make it so that they can control the private/public aspect of this stream from here
 * Enable the mic option so people can just stream spotify to each other
 * enable a screen share option so people can just screen share together
 * put the chat into this place 
 * enable the file sharing option
 * enable a video chat feature
 */

// First real hiccup from using nextJS. Requires a disabling of SSR. No Biggie tho
const DynamicStream = dynamic(
    () => import("../../components/Streaming/Streaming"),
    {ssr: false},
);

const Stream = () => {

    return (
        <div>
            <h2>Welcome to the [id] page of stream!</h2>
            <DynamicStream />
        </div>
    );
};



export default Stream;