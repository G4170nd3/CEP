import React from 'react'

async function handleOtp(event) {
    // code to check when lenght of entered otp is equal to 5, then automatically submit to check if the entered otp is correct or not
    if(event.target.value.length==5){
        var val = event.target.value;

        try {
            const {data} = await axios.post("/api/checker",{
                otpVal: val,
                vemail: userData.email
            })
            console.log(data);
        } catch (error){
            throw error;
        }

        //checkOtp(parseInt(event.target.value));
        event.target.value = "";
    }
}

export default handleOtp