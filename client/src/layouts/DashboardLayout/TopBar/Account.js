import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

function Account() {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      history.push('/login');
    } catch (error) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Typography variant="h6" color="inherit">
          {'User'}
        </Typography>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default Account;
