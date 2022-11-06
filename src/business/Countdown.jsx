import React, {useState, useEffect} from "react";
import { format } from "date-fns";


export default function Countdown( {targetDate} ) {

    const [countDown, setCountDown] = useState(
        targetDate - new Date()
      );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(targetDate - new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDown]);


    const getDays = (countDown) => {
        return Math.floor(countDown / (1000 * 60 * 60 * 24));
    };

    const getHours = (countDown) => {
        return Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    };

    const getMinutes = (countDown) => {
        return Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    };

    const getSeconds = (countDown) => {
        return Math.floor((countDown % (1000 * 60)) / 1000);
    };

    return (
        <> {`${getDays(countDown)}d ${getHours(countDown)}h ${getMinutes(countDown)}m ${getSeconds(countDown)}s `}</>
    );
}