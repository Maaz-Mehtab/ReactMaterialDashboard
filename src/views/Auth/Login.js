import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssTextField from 'components/CssTextField/CssTextField.js';
import { login } from "./AuthService"
import * as util from '../../helper/Utilities';
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
    backgroundImage: 'url(https://testproject-98a49.firebaseapp.com/assets/images/newlog.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "purple"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkbox: {
    color: "purple"
  },
  checked: {
    color: "purple"
  },
  MuiChecked: {
    color: "purple"
  },

  errorGrid: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: util.colors.errorBackground,
    color: util.colors.errorText
  },
  errorColor: {
    color: "red"
  }

}));

export default function SignIn(props) {

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    emptyError: '',
    unExpectedError: '',
    isLoginClicked: false

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    let route = window.location.pathname
    util.usersExist(route, props)
  }, [])

  const Login = (e) => {
    let { email, password } = values
    let payload = {
      email: email,
      password: password
    }
    let formError = validateForm()

    if (formError == false) {
      setValues({
        ...values,
        isLoginClicked: true
      });
      login(payload)
        .then(res => {
          let { code, data, token } = res.data
          
          if (code == 200) {
            util.localStorage_SaveKey("token", token)
            util.localStorage_SaveKey("user", data)
            props.history.replace("/admin/dashboard")
          } else if (code == 422) {
            setValues({
              ...values,
              unExpectedError: data.message,
            });
          }
        }).catch(err => {
          setValues({
            ...values,
            unExpectedError: "Please Try Again or check your internet connection.",
            isLoginClicked: false
          });
        })
    }

  }

  const validateForm = () => {
    let { email, password } = values

    if (!email || !password) {
      setValues({
        ...values,
        emptyError: "Please Enter All Fields."
      });
      return true
    }

    if (util.emailRegex.test(email) == false) {
      setValues({
        ...values,
        emailError: "Enter a valid E-mail."
      });
      return true
    }

    if (password.length < 8) {
      setValues({
        ...values,
        passwordError: "Enter password greater than 8 characters."
      });
      return true
    }
    setValues({
      ...values,
      emailError: "",
      passwordError: "",
      emptyError: "",
      unExpectedError: ""
    });
    return false
  }
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          {
            values.unExpectedError !== "" ?
              <div className={classes.errorGrid}>
                {values.unExpectedError}
              </div>
              :
              null
          }
          {
            values.emptyError !== "" ?
              <div className={classes.errorGrid}>
                {values.emptyError}
              </div>
              :
              null
          }
          <div className={classes.form} noValidate>
            <CssTextField
              value={values.email}
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
            />
            {
              values.emailError !== "" ?
                <div className={classes.errorColor}>
                  {values.emailError}
                </div>
                :
                null
            }
            <CssTextField
              value={values.password}
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            {
              values.passwordError !== "" ?
                <div className={classes.errorColor}>
                  {values.passwordError}
                </div>
                :
                null
            }
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="default" className={[classes.checkbox, classes.checked]} />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={Login}
              disabled={values.isLoginClicked}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <span>Forgot password?</span>
                </Link>
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}