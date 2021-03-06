import React from 'react';
import Meta from '../components/Meta';
import CreateForm from '../components/CreateStreamComp/CreateForm';

const CreateStream = () => {
    return (
        <div>
            <Meta title="Create a Stream" />
            <h3>This is for creating a new stream! Create, and show off to friends!</h3>
            <CreateForm />
        </div>
    );
};



export default CreateStream;