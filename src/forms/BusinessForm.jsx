import { Box, Button, DialogActions, MenuItem, Stack, TextField } from "@mui/material"
import FormField from "../components/FormField.jsx";
import { useState } from "react";
import { object, string } from "yup";
import validate from "../utils/validate.js";


const initialValue = {
    name: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: ""
}

const types = [
    "Type1",
    "Type2",
    "Type3"
]

let userSchema = object({
    name: string().required(),
    type: string().required(),
    addressLine1: string().required(),
    addressLine2: string().required(),
    city: string().required(),
    postcode: string().required()
});

export default () => {
    const [value, setValue] = useState(initialValue);

    const [errors, setErrors] = useState(
        {}
    );

    const handleSubmit = async () => {
        console.log(value)

        setErrors({})
        const errs = await validate(userSchema, value)
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            console.log(value)
        }
    }

    return (
        <Stack
            sx={{
                width: '25ch',
            }}
            spacing={2}
 >
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
            <Button onClick={handleSubmit}>Submit</Button>
        </Stack >

    );
}
