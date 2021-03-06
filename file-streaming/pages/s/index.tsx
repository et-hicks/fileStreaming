import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';



const BADGATEWAY = props => {
    
    /**
     * Function for whenever the person accidentally navigates to the 
     * /s/ page without putting in any arguments, just redirect them to the 
     * join stream page :)
     */ 
    


    const router = useRouter();

    

    useEffect(() => {
        router.push('/join');
    }, [])
    
    return (
        <div>
            You should not be seeing this
        </div>
    );
};


export default BADGATEWAY;