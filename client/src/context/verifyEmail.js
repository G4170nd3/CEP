import React from 'react';

async function verifyEmail(){

    try{
        const {data} = await axios.post("/api/verifier",{
            vemail: userData.email
        })
        console.log("finally", data);
        //if returns anything then stored in data.
    } catch (error) {
        throw error;
    }
}

export default verifyEmail