import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Create an Event
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
