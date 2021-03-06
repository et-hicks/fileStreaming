import React from 'react';
import Meta from '../components/Meta';

const PublicStreams = () => {
    return (
        <div>
            <Meta title="Public Streams" />
            This is for public streams! Browse, and be merry!
        </div>
    );
};

/**
 * TODO: server side props
 * 
 * get, say, 50 most popular streams
 * 
 * create a way to search (and thus access DB)
 * 
 * create a way to sort by new time
 */

export default PublicStreams;