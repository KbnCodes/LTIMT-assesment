import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Link, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box marginTop={8}>
        <Typography variant="h3" color="textPrimary">
          Add Event
        </Typography>
      </Box>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
