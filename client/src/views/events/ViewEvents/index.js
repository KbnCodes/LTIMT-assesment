import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import ViewEventTable from './ViewEventTable';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function EventListView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="View Event">
      <Container maxWidth={false}>
        <ViewEventTable />
      </Container>
    </Page>
  );
}

export default EventListView;
