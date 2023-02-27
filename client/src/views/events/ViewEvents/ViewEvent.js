import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  Grid,
  Box,
  Button,
  TextField,
  CardContent
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { DateTimePicker } from '@material-ui/pickers';

export default function UpdateEventModal({
  Event,
  handleClose,
  getEvents,
  open
}) {
  console.log("🚀 ~ file: ViewEvent.js:30 ~ Event:", Event)
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      fullWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ float: 'right', cursor: 'pointer' }}>
              <CloseIcon onClick={handleClose} />
            </div>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Grid
          container
          spacing={2}
          style={{
            marginBottom: '20px',
            borderBottom: '1px solid rgb(228 225 225)'
          }}
        >
          <Formik
            initialValues={{
              date: Event.eventDate,
              name: Event.eventName,
              desc: Event.eventDescription,
              price: Event.price,
              bookingtype: Event.bookingType || 'normal'
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required('Name is required'),
              desc: Yup.string().max(255),
              date: Yup.date().required('date is required'),
              price: Yup.number().required('Price is required')
            })}
            onSubmit={async (
              values,
              { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
              try {
                await axios({
                  method: 'put',
                  url: `http://localhost:5000/events/${Event.createdAt}`,
                  data: {
                    eventName: values.name,
                    eventDate: values.date,
                    eventDescription: values.desc,
                    bookingType: values.bookingtype,
                    price: values.price
                  }
                }).then(response => {
                  if (response.status) {
                    resetForm();
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar('Added Updated', {
                      variant: 'success'
                      // action: <Button>See all</Button>
                    });
                    getEvents();
                    handleClose();
                    // history.push('/app/event/viewEvent');
                  } else {
                    handleClose();
                    enqueueSnackbar(response.message, {
                      variant: 'failed'
                    });
                  }
                });
              } catch (error) {
                setStatus({ success: false });
                setErrors({ submit: error.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <DateTimePicker
                          fullWidth
                          inputVariant="outlined"
                          label="date"
                          name="date"
                          onChange={date => setFieldValue('date', date)}
                          value={values.date}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label="Event name"
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.desc && errors.desc)}
                          fullWidth
                          helperText={touched.desc && errors.desc}
                          label="Event description"
                          name="desc"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.desc}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={touched.price && errors.price}
                          label="Price"
                          name="price"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="bookingtype"
                          defaultValue={'normal'}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="normal"
                            control={<Radio color="primary" />}
                            label="Normal Booking"
                          />
                          <FormControlLabel
                            value="premium"
                            control={<Radio color="secondary" />}
                            label="Premium Booking"
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item md={6} xs={12}></Grid>
                    </Grid>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update Event
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </form>
            )}
          </Formik>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
