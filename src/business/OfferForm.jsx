import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { DateTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { addDays, startOfDay } from 'date-fns';
import { object, string, number, date } from 'yup';
import validate from '../utils/validate.js';
import FormField from '../components/FormField.jsx';

const commonStyles = {
  width: "100%"
}

const initialValue = {
  type: "",
  category: "",
  startDate: new Date(),
  endDate: startOfDay(addDays(new Date(), 1)),
  discount: -10,
  availability: 10,
  description: ""
}

const categories = [
  'Cat1',
  'cat2',
  'cat3'
]

const types = [
  "Discount",
  "Description"
]


let userSchema = object({
  type: string().required(),
  category: string().required(),
  startDate: date(),
  endDate: date(),
  discount: number().required(),
  availability: number().required(),
  description: string().required()

});

let userSchemaDescription = object({
  type: string().required(),
  description: string().required()

});



export default function OfferForm() {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(initialValue);

  const [errors, setErrors] = useState(
    {}
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue(initialValue)
    setOpen(false);
  };



  const handleAdd = async () => {
    console.log(value)
    const errs = await validate(userSchema, value);
    
    console.log(errs);
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      handleClose()
    } else if (value.type === "description") {
      const errsDescription = await validate(userSchemaDescription, value);
      setErrors(errsDescription)
      if (Object.keys(errsDescription).length === 0) {
        handleClose()
      }
    }
  }
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Offer</DialogTitle>
        <DialogContent>
          <Grid container sx={{ my: 1 }} spacing={2}>
            <Grid item xs={12}>
              <FormField
                select
                error={errors}
                sx={commonStyles}
                id="demo-simple-select"
                label="type"
                value={value}
                onChange={setValue}
              >
                {types.map((type, i) => <MenuItem key={i} value={type.toLowerCase()}>{type}</MenuItem>)}
              </FormField>

            </Grid>

            {value.type === "discount" && (<>
            <Grid item xs={12}>

              <FormField
                select
                error={errors}
                sx={commonStyles}
                id="demo-simple-select"
                label="category"
                value={value}
                onChange={setValue}
              >

                {categories.map((cat, i) => <MenuItem key={i} value={cat.toLowerCase()}>{cat}</MenuItem>)}
              </FormField>

            </Grid>

            <Grid item xs={6}>
              <FormField
                component={DateTimePicker}
                error={errors}
                label="start"
                renderInput={(params) => <TextField sx={commonStyles} {...params} />}
                value={value}
                onChange={setValue}
                isEvent={false}

              />
            </Grid>

            <Grid item xs={6}>
              <FormField
                component={DateTimePicker}
                error={errors}
                label="end"
                renderInput={(params) => <TextField sx={commonStyles} {...params} />}
                value={value}
                onChange={setValue}
                isEvent={false}
              />
            </Grid>

            <Grid item xs={6}>
              <FormField
                sx={commonStyles}
                error={errors}
                autoFocus
                margin="dense"
                id="name"
                label="discount"
                type="number"
                fullWidth
                variant="standard"
                value={value}
                onChange={setValue}
                InputProps={{
                  endAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                helperText="Incorrect entry."
              />
            </Grid>

            <Grid item xs={6}>
              <FormField
                sx={commonStyles}
                error={errors}
                autoFocus
                margin="dense"
                id="name"
                label="availability"
                type="number"
                fullWidth
                variant="standard"
                value={value}
                onChange={setValue}
              />
            </Grid>
            </>)}     

            <Grid item xs={12}>
              <FormField
                sx={commonStyles}
                error={errors}
                id="name"
                label="description"
                type="text"
                fullWidth
                value={value}
                onChange={setValue}
              />
            </Grid>

          </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}