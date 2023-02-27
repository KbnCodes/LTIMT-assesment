import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import EditE from './EditEvent';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function EditEvent() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Edit Event">
      <Container maxWidth="lg">
        <Box mt={3}>
          <EditE />
        </Box>
      </Container>
    </Page>
  );
}

export default EditEvent;
