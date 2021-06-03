<<<<<<< HEAD
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Amplify from "aws-amplify";
import { AmplifySignOut } from '@aws-amplify/ui-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  customizeToolbar: {
    minHeight: theme.spacing(10)
  }
}));

const TopAppBar = () => {
  const classes = useStyles();

  const signOut = async () => {
    try {
      await Amplify.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.customizeToolbar}>
          <Grid container justify='space-between'>
            <Typography variant="h4" color="inherit">
              FAST Checkout Test
            </Typography>
            <Button color="inherit" onClick={() => signOut()}>
              <AmplifySignOut/>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    )
}

=======
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Amplify from "aws-amplify";
import { AmplifySignOut } from '@aws-amplify/ui-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  customizeToolbar: {
    minHeight: theme.spacing(10)
  }
}));

const TopAppBar = () => {
  const classes = useStyles();

  const signOut = async () => {
    try {
      await Amplify.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.customizeToolbar}>
          <Grid container justify='space-between'>
            <Typography variant="h4" color="inherit">
              FAST Checkout Test
            </Typography>
            <Button color="inherit" onClick={() => signOut()}>
              <AmplifySignOut/>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    )
}

>>>>>>> 4c55cb2d505ce4bdac504a5f7d13390f8512316f
export default TopAppBar