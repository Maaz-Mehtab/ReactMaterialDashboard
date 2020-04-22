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


export default function AddInventory(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        productName: '',
        productRetailPrice: '',
        productInternalPrice: '',
        quantity: '',
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
    return (
        <GridContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Add/Edit Inventory</h4>
                        <p className={classes.cardCategoryWhite}>
                            Add/Edit Inventory
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                  
                                    value={values.productName}
                                    onChange={handleChange}
                                    label="prodcut Name"
                                    name="productName"
                                    type="name"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    value={values.productRetailPrice}
                                    onChange={handleChange}
                                     label="product Retail Price"
                                    name="productRetailPrice"
                                    type="Number"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    value={values.productInternalPrice}
                                    onChange={handleChange}
                                    label="product Internal Price"
                                    name="productInternalPrice"
                                    type="Number"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} >
                                <CssTextField
                                    value={values.quantity}
                                    onChange={handleChange}
                                    label="Quantity"
                                    name="quantity"
                                    type="Number"

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