import React from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles } from '@material-ui/core/styles';
import CssTextField from 'components/CssTextField/CssTextField.js';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LocationSearchInput from '../../helper/LocationSearchInput';
import Map from '../../helper/Maps';
import CurrentLocation from '../../helper/CurrentLocation';
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
    input1: {
        height: 10,

    }
}));


export default function AddCustomer(props) {
    const classes = useStyles();

    var [seletedLocationAddress, setseletedLocationAddress] = React.useState('')
    var [seletedLocationName, setseletedLocationName] = React.useState('')
    var [autocompleteLocation, setautocompleteLocation] = React.useState({
        lat: '',
        lng: ''
    })
    const [values, setValues] = React.useState({
        customerId: '',
        customerName: '',
        contactPerson: '',
        contactNumber: '',
        googleAddress: '',

    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const AddUpdateUser = () => {
        console.log("AddUpdateUser");
    }
    const changeAddress = (name, cord) => {
        console.log("name", name);
        console.log("cord", cord);
        setseletedLocationName(name)
        setseletedLocationAddress(cord)
        setautocompleteLocation({
            lat: cord.lat,
            lng: cord.lng
        })
    }


    return (
        <GridContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Add/Edit Customer</h4>
                        <p className={classes.cardCategoryWhite}>
                            Add/Edit Customer
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6} md={4} >
                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={values.customerId}
                                        onChange={handleChange}
                                        label="Customer Id"
                                        name="customerId"

                                    />
                                </Grid>

                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={values.customerName}
                                        onChange={handleChange}
                                        label="Customer Name"
                                        name="customerName"
                                    />
                                </Grid>

                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={autocompleteLocation.lat}
                                        label="Latitude "
                                        name="googleAddress"
                                    />
                                </Grid>
                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={seletedLocationName}
                                        label="Location Area Name "
                                        name="seletedLocationName"
                                    />
                                </Grid>
                            </Grid>

                            <Grid xs={12} sm={6} md={4} >
                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={values.contactPerson}
                                        onChange={handleChange}
                                        label="Contact Person"
                                        name="contactPerson"
                                    />
                                </Grid>

                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={values.contactNumber}
                                        onChange={handleChange}
                                        label="Contact Number"
                                        name="contactNumber"
                                    />
                                </Grid>
                                <Grid xs={12} sm={11} md={11} >
                                    <CssTextField
                                        value={autocompleteLocation.lng}
                                        label="Longitude"
                                        name="googleAddress"
                                    />
                                </Grid>
                            </Grid>

                            <Grid xs={12} sm={6} md={4} >
                                <Grid xs={12} sm={11} md={11} >
                                    <LocationSearchInput
                                        latlng={(seletedLocationAddress != '') ?
                                            seletedLocationAddress.lat + "/" + seletedLocationAddress.lng
                                            :
                                            undefined}
                                        changeAddress={changeAddress} />
                                </Grid>

                                <Grid xs={12} sm={11} md={12}
                                    style={{ height: 250, justifyContent: 'center', }}
                                >

                                    <Map
                                        latlng={(seletedLocationAddress != '') ?
                                            seletedLocationAddress.lat + "/" + seletedLocationAddress.lng
                                            :
                                            undefined}
                                        autocompleteLocation={autocompleteLocation}
                                    />
                                </Grid>
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
                                    onClick={() => props.history.goBack()}
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