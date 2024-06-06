import {SaveButton} from 'react-admin';
import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ReviewSaveButton = () => {
    const notify = () => toast('Submitted!');
    return <SaveButton label="Submit" onClick={notify}/>
};
