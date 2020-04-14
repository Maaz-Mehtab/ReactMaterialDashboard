import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit"
      //   href="https://material-ui.com/"
      >
        Health Mark
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://testproject-98a49.firebaseapp.com/assets/images/newlog.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    float: 'left',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input1: {
    height: 10
  },
  input2: {
    height: 200,
    fontSize: "3em"
  }
}));



export default function Signup() {
  const classes = useStyles();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={8} md={8} className={classes.image} />
      <Grid item xs={12} sm={4} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              InputProps={{ classes: { input: classes.input1 } }}
              label="Email Address"
              name="email"
              autoComplete="email"
              size="small"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{ classes: { input: classes.input1 } }}
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              InputProps={{ classes: { input: classes.input1 } }}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{ classes: { input: classes.input1 } }}
              name="conformpassword"
              label="Confrom Password"
              type="conformpassword"
              id="conformpassword"
              autoComplete="conformpassword"
              size="small"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{ classes: { input: classes.input1 } }}
              id="phone"
              label="Phone No"
              name="phone"
              autoComplete="phone"
              size="small"

            />
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Select"
              value={role}
              InputProps={{ classes: { input: classes.input1 } }}
              onChange={handleChange}
              helperText="Please select your currency"
              variant="outlined"
              size="small"
            >
              <MenuItem value={1}>Hospital</MenuItem>
              <MenuItem value={2}>Client</MenuItem>
              <MenuItem value={3}>Marketing</MenuItem>
            </TextField>




            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}