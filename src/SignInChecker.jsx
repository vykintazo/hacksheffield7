import { useSigninCheck } from "reactfire";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default () => {
   
    const navigateTo = useNavigate();
    const { status, data: signInCheckResult } = useSigninCheck();

    useEffect(() => {
        if (status === "success" && !signInCheckResult?.signedIn) {
            navigateTo("/auth");
        } else if (status === "success" && signInCheckResult?.signedIn) {
            navigateTo("/initial-form");
        }
    }, [signInCheckResult?.signedIn]);

    return <></>
}