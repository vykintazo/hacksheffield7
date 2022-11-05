import {FormControl, FormHelperText, FormLabel, TextField} from "@mui/material";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export default function FormField(
    {value, error, label, formControl, onChange, isEvent = true, component: Component=TextField, customLabel, ...rest}
) {

    const handleChange = (value) => { 
        onChange((prev) => ({ ...prev, [label]: isEvent ? value.target.value : value }))
      }



    return formControl ? (
        <FormControl fullWidth error={error ? error[label]?.length > 0 : undefined}>
            <FormLabel>{capitalize(customLabel || label)}</FormLabel>
            <Component
                label={capitalize(customLabel || label)}
                value={value[label]}
                onChange={handleChange}
                {...rest}
            />
            <FormHelperText>{(error && error[label]?.length > 0) ? error[label]?.join(", ") : ""}</FormHelperText>
        </FormControl>
    ) : (
        <Component
            label={capitalize(customLabel || label)}
            value={value[label]}
            onChange={handleChange}
            error={error ? error[label]?.length > 0 : undefined}
            helperText={(error && error[label]?.length > 0) ? error[label]?.join(", ") : undefined}
            {...rest}
        />
    )
}