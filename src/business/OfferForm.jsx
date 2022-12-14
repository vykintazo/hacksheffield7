import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import React from 'react';
import { DateTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { addDays, startOfDay } from 'date-fns';
import { object, string, number, date } from 'yup';
import validate from '../utils/validate.js';
import FormField from '../components/FormField.jsx';
import { collection, addDoc } from "firebase/firestore";
import { useSigninCheck, useFirestore, useFirestoreDocData, useFirebaseApp } from "reactfire";

const commonStyles = {
  width: "100%"
}

const initialValue = {
  type: "discount",
  offerName: "",
  category: "",
  start: new Date(),
  end: startOfDay(addDays(new Date(), 1)),
  discount: 10,
  //availability: 10,
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



export default function OfferForm({ open, onClose }) {


  const [value, setValue] = useState(initialValue);

  const [errors, setErrors] = useState(
    {}
  );

  let userSchema = object({
    type: string().required(),
    offerName: string().required(),
    category: string().required(),
    start: date(),
    end: date(),
    discount: number().required(),
    //availability: number().required(),
    description: string().required()

  });

  let userSchemaDescription = object({
    type: string().required(),
    offerName: string().required(),
    category: string().required(),
    start: date(),
    end: date(),
    description: string().required()
  });

  const handleClose = () => {
    setValue(initialValue)
    setErrors({})
    onClose()
  }


  const handleAdd = async () => {
    console.log(value)
    setErrors({})
    const errs = await validate(value.type === "description" ? userSchemaDescription : userSchema, value);

    console.log(errs);
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      handleUpload();
    }
  }

  const db = useFirestore();
  const { data: signInCheckResult } = useSigninCheck();

  const handleUpload = async () => {
    const dbRef = collection(db, "offers");
    await addDoc(dbRef, {
      ...value,
      uid: signInCheckResult?.user?.uid
    });

    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Offer</DialogTitle>
        <DialogContent>
          <Grid container sx={{ my: 1 }} spacing={2}>
            <Grid item xs={12}>
              <FormField
                sx={commonStyles}
                error={errors}
                id="name"
                label="offerName"
                customLabel="Offer Name"
                type="text"
                fullWidth
                value={value}
                onChange={setValue}
              />
            </Grid>

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
                inputFormat="yyyy-MM-dd HH:mm"

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
                inputFormat="yyyy-MM-dd HH:mm"
                minDateTime={value.start}
              />
            </Grid>

            {value.type === "discount" && (<>
              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                  Discount
                </Typography>
                <FormField
                  valueLabelFormat={(val) => `${val} %`}
                  component={Slider}
                  defaultValue={30}
                  min={5}
                  max={90}
                  sx={{ ...commonStyles, mt: 4 }}
                  label="discount"
                  fullWidth
                  variant="standard"
                  value={value}
                  onChange={setValue}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                  helperText="Incorrect entry."
                  valueLabelDisplay="on"
                />
              </Grid>

              {/* <Grid item xs={12}>
              <FormField
                sx={commonStyles}
                error={errors}
                label="availability"
                type="number"
                fullWidth
                value={value}
                onChange={setValue}
              />
            </Grid> */}
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
