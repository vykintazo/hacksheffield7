import { Box, Button, DialogActions, MenuItem, Stack, TextField, Typography } from "@mui/material"
import FormField from "../components/FormField.jsx";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import validate from "../utils/validate.js";
import { useSigninCheck, useFirestore, useFirestoreDocData } from "reactfire";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import geocode from "../utils/geocode.js";
import {categoryConfig} from "../categoryConfig.js";

const initialValue = {
    businessName: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: ""
}

const types = Object.keys(categoryConfig);

let userSchema = object({
    businessName: string().required(),
    type: string().required(),
    addressLine1: string().required(),
    city: string().required(),
    postcode: string().required()
});

export default () => {
    const [value, setValue] = useState(initialValue);

    const [errors, setErrors] = useState(
        {}
    );

    const handleSubmit = async () => {
        setErrors({})
        const errs = await validate(userSchema, value)
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            handleUpload();
        }
    }

    const db = useFirestore();
    const { data: signInCheckResult } = useSigninCheck();

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const navigateTo = useNavigate();
    useEffect(() => {
        response?.data?.userRole === "customer" && navigateTo("/customer");
        response?.data?.business !== undefined && navigateTo("/business");
    }, [response?.data]);


    const handleUpload = async () => {
        const address = `${value.addressLine1}, ${value.addressLine2}, ${value.city}, ${value.postcode}`;
        const coords = await geocode(address);

        if (coords === null) {
            setErrors({
                addressLine1: ["Address not found"],
                addressLine2: ["Address not found"],
                city: ["Address not found"],
                postcode: ["Address not found"]
            });
            return;
        }

        await updateDoc(doc(db, "users", signInCheckResult?.user?.uid), {
            business: {
                name: value.businessName,
                type: value.type,
                location: coords
            }
        });

        navigateTo("/business");
    }

    return (
        <Stack
            sx={{
                width: 'clamp(300px, 60vw, 500px)',
            }}
            spacing={2}
        >
            <Typography textAlign="center" component="h1" variant="h4">
                Business details:
            </Typography>
            <FormField
                required
                error={errors}
                id="outlined-required"
                label="businessName"
                customLabel="Business Name"
                value={value}
                onChange={setValue}
            />
            <FormField
                required
                select
                error={errors}
                id="outlined-required"
                label="type"
                value={value}
                onChange={setValue}
            >

                {types.map((type, i) => <MenuItem key={i} value={type.toLowerCase()}>{type}</MenuItem>)}
            </FormField>


            <FormField
                required
                error={errors}
                id="outlined-required"
                label="addressLine1"
                customLabel="Address Line 1"
                value={value}
                onChange={setValue}
            />

            <FormField
                required
                error={errors}
                id="outlined-required"
                label="addressLine2"
                customLabel="Address Line 2"
                value={value}
                onChange={setValue}
            />

            <FormField
                required
                error={errors}
                id="outlined-required"
                label="city"
                customLabel="City"
                value={value}
                onChange={setValue}
            />

            <FormField
                required
                error={errors}
                id="outlined-required"
                label="postcode"
                CustomLabel="Postcode"
                value={value}
                onChange={setValue}
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Stack >

    );
}
