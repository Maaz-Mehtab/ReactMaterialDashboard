import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssTextField from 'components/CssTextField/CssTextField.js';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';  
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
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
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
    input1:{
        height:10,
        
    }
}));
export default function AddUsers(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [status, setStatus] = React.useState(false);
    const handleChange = (event) => {
         let state = event.target.name;
        if (state == "email") {
            setEmail(event.target.value);
        }
        else if (state == "name") {
            setName(event.target.value);
        }

    };
    const  DropDownChange = (event) => {
        console.log("event", event);
        setStatus(event.target.value);
        
    }
    const AddUpdateUser= ()=>{
        console.log("AddUpdateUser");
    }
    return (
        <GridContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Add/Edit Users</h4>
                        <p className={classes.cardCategoryWhite}>
                            Add/Edit Users
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    value={email}
                                    onChange={handleChange}
                                    id="email"
                                    label="Email Address"
                                    name="email"

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    value={name}
                                    onChange={handleChange}
                                    id="name"
                                    label="Name"
                                    name="name"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} >
                            <CustomDropDown
                                    fullWidth
                                     select
                                    margin="normal"
                                    label="Select"
                                    value={status}
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    onChange={DropDownChange}
                                    variant="outlined"
                                    >
                                    <MenuItem value={true}>Varified</MenuItem>
                                    <MenuItem value={false}>Not Varifeid</MenuItem>

                                </CustomDropDown>
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
                                    onClick={AddUpdateUser}
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
                                    onClick={()=>props.history.goBack()}
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