import React, { useEffect } from "react";
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
import * as CustomerService from "./CustomerService";
import * as InventoryService from "../Inventory/InventoryService";
import * as commonService from "../../helper/commonService";
import Checkbox from '@material-ui/core/Checkbox';
import * as util from "../../helper/Utilities"
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
    errorAlert: {
        backgroundColor: util.colors.errorBackground,
        color: util.colors.errorText,
        padding: 20
    }
}));


export default function AddCustomer(props) {
    const classes = useStyles();

    var [isFormOrderValid, setisFormOrderValid] = React.useState(true)
    var [errorArray, seterrorArray] = React.useState([])
    var [seletedLocationAddress, setseletedLocationAddress] = React.useState('')
    var [seletedLocationName, setseletedLocationName] = React.useState('')
    var [productList, setproductList] = React.useState([])
    const [checked, setChecked] = React.useState([]);
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
        uid: ''

    });

    const getAllProductList = () => {

        commonService.getAllInventoryForSelect()
            .then(res => {
                var Dataset = res.data.data;
                setproductList(Dataset)
            })
    }
    useEffect(() => {
        if (Object.keys(props.match.params).length == 0) {
            getAllProductList();
        }
        let { id } = props.match.params
        let params = {
            uid: id
        }
        CustomerService.getSpecificCustomer(params)
            .then(res => {
                let { code, data } = res.data
                setValues({
                    ...values,
                    customerId: data.CustomerId,
                    customerName: data.CustomerName,
                    contactPerson: data.ContactPerson,
                    contactNumber: data.ContactNumber,
                    uid: id
                });
                setseletedLocationName(data.customerLocation.area);
                setautocompleteLocation({
                    lat: data.customerLocation.latitude,
                    lng: data.customerLocation.longitude
                })
                var selectedProductList = data.productList
                commonService.getAllInventoryForSelect()
                    .then(response => {
                        var Dataset = response.data.data;
                        setproductList(Dataset)
                        var arr = [];
                        for (var i = 0; i < Dataset.length; i++) {
                            for (var j = 0; j < selectedProductList.length; j++) {
                                if (Dataset[i].productId == selectedProductList[j].productId) {
                                    arr.push(i)
                                }
                            }
                        }
                        setChecked(arr);
                    })
            }).catch(err => console.log(err))
    }, [])


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        seterrorArray([])
        setisFormOrderValid(true)
    };

    const AddUpdateUser = () => {
        var errorArray = []
        var isFormOrderValid = true
        if (values.customerId == "") {
            isFormOrderValid = false
            errorArray.push("please Enter Customer Id.")

        }
        if (values.customerName == "") {
            isFormOrderValid = false
            errorArray.push("please Enter Customer Name.")
        }
        if (values.contactPerson == "") {
            isFormOrderValid = false
            errorArray.push("please Enter Contact Person.")
        }

        if (values.contactNumber == "") {
            isFormOrderValid = false
            errorArray.push("please Enter Customer Contact Number.")
        }

        if (seletedLocationName == "") {
            isFormOrderValid = false
            errorArray.push("set Location Marker with auto complete.")
        }
        seterrorArray(errorArray)
        setisFormOrderValid(isFormOrderValid)

        if (isFormOrderValid) {
            let country = seletedLocationName.split(',')
            country = country[country.length - 1]
            var seletecProductList = [];
            console.log("productList", productList);
            console.log("checked", checked);
            for (var i = 0; i < productList.length; i++) {
                for (var j = 0; j < checked.length; j++) {
                    if (i == j) {
                        console.log("matched", productList[i])
                        seletecProductList.push(productList[i])
                    }
                }
            }
            if (Object.keys(props.match.params).length > 0) {
                var payload = {
                    uid: values.uid,
                    CustomerId: values.customerId,
                    CustomerName: values.customerName,
                    ContactPerson: values.contactPerson,
                    ContactNumber: values.contactNumber,
                    isActive: true,
                    customerLocation: {
                        area: seletedLocationName,
                        latitude: autocompleteLocation.lat,
                        longitude: autocompleteLocation.lng,
                        country: country
                    },
                    productList: seletecProductList
                }
                console.log("payload", payload)
                CustomerService.update(payload)
                    .then(res => {
                        let { code } = res.data
                        if (code == 200) {
                            props.history.push('/admin/Customer')
                        }
                    }).catch(err => console.log(err))
            }
            else {
                var payload = {
                    CustomerId: values.customerId,
                    CustomerName: values.customerName,
                    ContactPerson: values.contactPerson,
                    ContactNumber: values.contactNumber,
                    isActive: true,
                    customerLocation: {
                        area: seletedLocationName,
                        latitude: autocompleteLocation.lat,
                        longitude: autocompleteLocation.lng,
                        country: country
                    },
                    productList: seletecProductList
                }
                CustomerService.addCustomer(payload)
                    .then(res => {
                        let { code } = res.data
                        if (code == 200) {
                            props.history.push('/admin/Customer')
                        }
                    }).catch(err => console.log(err))
            }
        }
    }
    const changeAddress = (name, cord) => {
        setseletedLocationName(name)
        setseletedLocationAddress(cord)
        setautocompleteLocation({
            lat: cord.lat,
            lng: cord.lng
        })
    }


    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };



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
                        {
                            !isFormOrderValid ?
                                <Grid className={classes.errorAlert} >
                                    {
                                        errorArray.map((x, ind) => {
                                            return (
                                                <p key={ind} >
                                                    {x}
                                                </p>
                                            )
                                        })
                                    }
                                </Grid>
                                :
                                null
                        }
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
                        <Grid>
                            <h4 >Interst of Product's</h4>
                            <Grid container spacing={1}>
                                {productList.map((val, ind) => (
                                    <Grid key={ind} xs={6} sm={4} md={3}>
                                        {ind + 1 + ") " + val.productName + "\t"}
                                        <Checkbox
                                            value={val.uid}
                                            color="default"
                                            onClick={() => handleToggle(ind)}
                                            checked={checked.indexOf(ind) !== -1}
                                            className={[classes.checkbox, classes.checked]} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
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