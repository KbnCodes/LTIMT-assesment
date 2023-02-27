/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import ViewEvent from './ViewEvent';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  queryField: {
    width: 500
  },
  categoryField: {
    flexBasis: 200
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  }
}));

function Results({ className, ...rest }) {
  const classes = useStyles();
  const [viewModal, setViewModal] = useState(false);
  const [Event, setEvent] = useState({});
  const [Events, setEvents] = useState([]);
  const [page, setPage] = useState(0);

  const getEvents = () => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/events'
    }).then(response => {
      setEvents(response.data);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const EditView = Event => {
    console.log("🚀 ~ file: ViewEventTable.js:73 ~ EditView ~ Event:", Event)
    setEvent(Event);
    setViewModal(true);
  };
  const HandleDelete = Event => {
    axios({
      method: 'delete',
      url: `http://localhost:5000/events/${Event.createdAt}`
    }).then(res => {
      getEvents();
    });
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2}>
        {/* <Box mt={3} display="flex" alignItems="right">
          <TextField
            className={classes.categoryField}
            label="Booking Type"
            name="category"
            // onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            // value={filters.category || 'all'}
            variant="outlined"
          >
            <option key={'normal'} value={'normal'}>
              {'normal'}
            </option>
            <option key={'premium'} value={'premium'}>
              {'premium'}
            </option>
          </TextField>
        </Box> */}
      </Box>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Event Date</b>
                </TableCell>
                <TableCell>
                  <b>Event Name</b>
                </TableCell>
                <TableCell>
                  <b>Event Description</b>
                </TableCell>
                <TableCell>
                  <b>Price</b>
                </TableCell>
                <TableCell>
                  <b>Booking type</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Events?.map(Event => {
                return (
                  <TableRow hover key={Event.id}>
                    <TableCell>{Event.eventDate}</TableCell>
                    <TableCell>{Event.eventName}</TableCell>
                    <TableCell>{Event.eventDescription}</TableCell>
                    <TableCell>{Event.price}</TableCell>
                    <TableCell>{Event.bookingType}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => EditView(Event)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => HandleDelete(Event)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={Events.length}
            onChangePage={handlePageChange}
            page={page}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
      {viewModal ? (
        <ViewEvent
          open={viewModal}
          Event={Event}
          handleClose={() => setViewModal(false)}
          getEvents={getEvents}
        />
      ) : null}
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  Events: PropTypes.array
};

Results.defaultProps = {
  Events: []
};

export default Results;
