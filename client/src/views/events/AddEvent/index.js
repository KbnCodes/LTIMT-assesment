import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import CreateEvent from './CreateEvent';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AddEvent() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Add Event">
      <Container maxWidth="lg">
        <Box mt={3}>
          <CreateEvent />
        </Box>
      </Container>
    </Page>
  );
}

export default AddEvent;
