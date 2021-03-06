// ----------------------- Libraries -----------------------
import React from 'react';

// ----------------------- Homemade -----------------------
import Meta from '../components/Meta';
import Chat from '../components/Chatting/Chat';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';


const About = () => {

    // const clientSocket = io(backendURL);


    return (
        <div>
            <Meta title='About'/>

            {/* <Chat clientSocket={clientSocket} clientID={nanoid(9)}/> */}
            This is the about page!
        </div>
    );
};



export default About;