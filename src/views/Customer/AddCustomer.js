import React from "react";
import MaterialTable from 'material-table';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const CssTextField = withStyles({
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

    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
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
        height: 10,
       
    },
    input2: {
        height: 200,
        fontSize: "3em"
    },
    label: {
        color: '#000000'
    }
}));
export default function AddCustomer() {
    const classes = useStyles();
    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };
    return (
        <GridContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Add/EditCustomer</h4>
                        <p className={classes.cardCategoryWhite}>
                            Add/Edit Customers
    </p>
                    </CardHeader>
                    <CardBody>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    label="Custom CSS"
                                    variant="outlined"
                                    id="name"
                                    label="Email Address"
                                    name="name"
                                    autoComplete="Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    label="Custom CSS"
                                    variant="outlined"
                                    id="name"
                                    label="Email Address"
                                    name="name"
                                    autoComplete="Name"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} >
                            <CssTextField
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    label="Custom CSS"
                                    variant="outlined"
                                    id="name"
                                    label="Email Address"
                                    name="name"
                                    autoComplete="Name"
                                />
                            </Grid>
                          
                        </Grid>
                        <hr />

                        <Grid container justify="flex-end" spacing={3}>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add/Edit
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>



    );
}