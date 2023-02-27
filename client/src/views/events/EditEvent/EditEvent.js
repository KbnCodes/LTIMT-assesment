import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox
} from '@material-ui/core';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';

function EditEvent() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return (
    <Page title="Event Edit">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Formik
            initialValues={{
              date: null || moment(),
              name: '',
              desc: '',
              price: '',
              isAccept: false,
              bookingtype: 'normal'
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required('Name is required'),
              desc: Yup.string().max(255),
              date: Yup.date().required('date is required'),
              price: Yup.number().required('Price is required'),
              isAccept: Yup.bool()
            })}
            onSubmit={async (
              values,
              { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
              try {
                await axios({
                  method: 'put',
                  url: `http://localhost:5000/events/`,
                  data: {
                    ename: values.name,
                    edate: values.date,
                    edesc: values.desc,
                    ebookingtype: values.bookingtype,
                    eprice: values.price,
                    isAccept: values.isAccept
                  }
                }).then(response => {
                  if (response.status) {
                    resetForm();
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar('Edited Event', {
                      variant: 'success'
                      // action: <Button>See all</Button>
                    });
                    history.push('/app/event/viewEvent');
                  } else {
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
                      <Grid item md={6} xs={12}>
                        <Box alignItems="center" display="flex" mt={2} ml={-1}>
                          <Checkbox
                            checked={values.isAccept}
                            name="policy"
                            onChange={handleChange}
                          />
                          <Typography variant="body2" color="textSecondary">
                            I have read the Terms and Conditions
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create Event
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Page>
  );
}

export default EditEvent;
