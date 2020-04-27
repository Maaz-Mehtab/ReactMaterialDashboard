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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import CssTextField from 'components/CssTextField/CssTextField.js';
import * as util from '../../helper/Utilities'
import * as authService from './AuthService'

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

function getUserType() {
  let options = util.userType.filter(x => x.id != 2)

  return options.map(x => {
    return (
      <MenuItem value={x.id} key={x.id} > {x.name}</MenuItem>
    )
  })
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
  },
  errorGrid: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: util.colors.errorBackground,
    color: util.colors.errorText
  },
  successGrid: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: util.colors.successBackground,
    color: util.colors.successText
  },
  errorColor: {
    color: "red"
  }
}));


const CustomDropDown = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'purple',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'purple',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#d2d2d2',
      },
      '&:hover fieldset': {
        borderColor: 'purple',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
})(TextField);

export default function Signup() {
  const classes = useStyles();
  const [role, setRole] = React.useState('');
  const [values, setValues] = React.useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    confirmPasswordError: '',
    phoneError: '',
    userTypeError: '',
    emptyError: '',
    unExpectedError: '',
    successMessage: '',
    isSignupClicked: false

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let { email, password, name, confirmPassword, phone, userType } = values

    if (!email || !password || !name || !confirmPassword || !phone || !userType) {
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

    if (confirmPassword != password) {
      setValues({
        ...values,
        confirmPasswordError: "Password does not match."
      });
      return true
    }

    setValues({
      ...values,
      emailError: "",
      passwordError: "",
      confirmPasswordError: '',
      emptyError: "",
      unExpectedError: ""
    });
    return false
  }

  function userSignup() {
    let { email, password, phone, userType, name } = values

    let userTypeObj = util.userType.find(x => x.id == userType)
    let payload = {
      email: email,
      password: password,
      userType: userTypeObj,
      phone,
      name
    }
    let formError = validateForm()
    if (formError == false) {
      setValues({
        ...values,
        isSignupClicked: true
      });
      authService.signup(payload)
        .then(res => {
          let { code, data, token } = res.data

          if (code == 200) {
            setValues({
              ...values,
              name: '',
              password: '',
              email: '',
              confirmPassword: '',
              phone: '',
              userType: '',
              successMessage: "Plesae wait for your login approval",
              unExpectedError: '',
              emptyError: ''
            });
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
          {
            values.successMessage !== "" ?
              <div className={classes.successGrid}>
                {values.successMessage}
              </div>
              :
              null
          }
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
              value={values.name}
              onChange={handleChange}
              id="name"
              label="Full Name"
              name="name"
            />
            <CssTextField
              value={values.password}
              onChange={handleChange}
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            {
              values.passwordError !== "" ?
                <div className={classes.errorColor}>
                  {values.passwordError}
                </div>
                :
                null
            }
            <CssTextField
              value={values.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            {
              values.confirmPasswordError !== "" ?
                <div className={classes.errorColor}>
                  {values.confirmPasswordError}
                </div>
                :
                null
            }
            <CssTextField
              value={values.phone}
              onChange={handleChange}
              id="phone"
              label="Phone"
              name="phone"
            />
            <CustomDropDown
              fullWidth
              select
              margin="normal"
              label="Select"
              name="userType"
              value={values.userType}
              InputProps={{ classes: { input: classes.input1 } }}
              onChange={handleChange}
              variant="outlined"
            >
              {
                getUserType()
              }
            </CustomDropDown>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={userSignup.bind(this)}
              disabled={values.isSignupClicked}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}