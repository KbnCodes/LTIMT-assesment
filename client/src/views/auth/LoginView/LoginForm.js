import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from 'src/actions/accountActions';
const useStyles = makeStyles(() => ({
  root: {}
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .matches(
            /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/,
            'Password must contain at least 1 uppercase letter and 1 special character (!@#$&*)'
          )
          .required()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(login(values.email, values.password));
          onSubmitSuccess();
        } catch (error) {
          const message =
            (error.response && error.response.data.message) ||
            'Something went wrong';

          setStatus({ success: false });
          setErrors({ submit: message });
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
        touched,
        values
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {'Enter valid email and password'}
                </FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
