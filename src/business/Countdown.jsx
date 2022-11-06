import React, {useState, useEffect} from "react";


export default function Countdown( {targetDate} ) {

    // const countDownDate = new Date(targetDate).getTime();

    // const [countDown, setCountDown] = useState(
    //     countDownDate - targetDate
    //   );

    useEffect(() => {
    const interval = setInterval(() => {
        // setCountDown();
        console.log(targetDate);
    }, 1000);
    return () => clearInterval(interval);
    }, []);



    // const [expiryTime, setExpiryTime] = useState(targetDate);
    
    


    // useEffect(() => {
    //     console.log(targetDate);
    //   }), [targetDate];

    

    return (
        <>
        <div>Something</div>
        </>
    );
}