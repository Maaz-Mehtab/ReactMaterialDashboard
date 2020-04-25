import React, { useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CssTextField from 'components/CssTextField/CssTextField.js';
import * as util from "../../helper/Utilities"
import * as productService from "../Inventory/InventoryService"
import * as orderService from "./OrderService"
import moment from "moment";

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
    errorAlert: {
        backgroundColor: util.colors.errorBackground,
        color: util.colors.errorText,
        padding: 20
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
export default function AddEditOrder(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        name: '',
        uid: '',
        products: [],
        selectedProducts: [],
        errorArray: [],
        isFormOrderValid: true
    });

    useEffect(() => {
        let { id } = props.match.params
        let params = {
            uid: id
        }
        getProducts()
    }, [])


    const getProducts = () => {
        productService.getAllInventoryForSelect()
            .then(res => {
                let { code, data } = res.data
                if (code == 200) {
                    setValues({
                        ...values,
                        products: data
                    });
                }
            }).catch(err => console.log(err))
    }

    function onProductChange(event) {
        let { selectedProducts, products } = values
        let checked = event.target.checked
        let product = products.find(x => x.productId == event.target.value)
        if (checked) {
            let obj = {
                productId: product.productId,
                productName: product.productName,
                productRetailPrice: product.productRetailPrice,
                discountType: '',
                discount: 0,
                quantity: 0,
                discountPrice: 0,
                totalPrice: 0
            }
            selectedProducts.push(obj)
            setValues({
                ...values,
                selectedProducts: selectedProducts,
                errorArray: []
            });
        } else {
            let filtered = selectedProducts.filter(x => x.productId != product.productId)

            setValues({
                ...values,
                selectedProducts: filtered
            });
        }
    }

    function onChangePrice(index, event) {
        let { selectedProducts } = values
        let findProduct = selectedProducts[index]

        let quantity = event.target.value
        findProduct.quantity = quantity
        let totalPrice = findProduct.productRetailPrice * quantity
        findProduct.totalPrice = totalPrice
        selectedProducts[index] = findProduct

        setValues({
            ...values,
            selectedProducts
        });
    }

    function onchangeDiscountType(index, event) {
        debugger
        let { selectedProducts } = values
        let findProduct = selectedProducts[index]
        let discount = findProduct.discount
        let quantity = findProduct.quantity
        let price = findProduct.productRetailPrice
        let discountType = event.target.value
        price = price * quantity
        findProduct.discountType = discountType

        if (findProduct.discountType == 1) {
            findProduct.totalPrice = price - discount
            findProduct.discountPrice = discount
        } else if (findProduct.discountType == 2) {
            let disPercent = price * (discount / 100)
            findProduct.discountPrice = disPercent
            findProduct.totalPrice = price - disPercent
        }

        setValues({
            ...values,
            selectedProducts
        });
    }

    function renderDiscountTypeOptions() {
        let options = util.discountType.map(x => {
            return (
                <MenuItem value={x.id} key={x.id} > {x.name}</MenuItem>
            )
        })
        return options
    }

    function onChangeDiscount(index, event) {
        let { selectedProducts } = values
        debugger
        let findProduct = selectedProducts[index]
        let discount = event.target.value
        let quantity = findProduct.quantity
        let price = findProduct.productRetailPrice
        findProduct.discount = discount
        price = price * quantity
        if (findProduct.discountType == 1) {
            findProduct.totalPrice = price - discount
            findProduct.discountPrice = discount
        } else if (findProduct.discountType == 2) {
            let disPercent = price * (discount / 100)
            findProduct.discountPrice = disPercent
            findProduct.totalPrice = price - disPercent
        }
        setValues({
            ...values,
            selectedProducts
        });
    }

    function addOrder() {
        let { selectedProducts, isFormOrderValid, errorArray } = values
        errorArray = []

        if (selectedProducts.length == 0) {
            isFormOrderValid = false
            errorArray.push("Please select some products.")
        } else {
            isFormOrderValid = true
            errorArray = []
        }

        setValues({
            ...values,
            errorArray,
            isFormOrderValid
        });

        if (isFormOrderValid) {
            let date = moment().format("YYYY-MM-DD")
            let obj = {
                date: date,
                selectedProducts,

            }
            orderService.addOrder(obj)
                .then(res => {
                    let { code, message, data } = res.data

                    if (code == 200) {
                        props.history.push('/admin/orders')
                    }
                }).catch(err => console.log(err))
        }
    }

    return (
        <GridContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Orders</h4>
                        <p className={classes.cardCategoryWhite}>
                            Add Orders
                        </p>
                    </CardHeader>
                    <CardBody>
                        {
                            values.isFormOrderValid == false ?
                                <Grid className={classes.errorAlert} >
                                    {
                                        values.errorArray.map(x => x)
                                    }
                                </Grid>
                                :
                                null
                        }
                        <Grid  >
                            <h3>Products List</h3>
                        </Grid>
                        <hr />
                        <Grid container spacing={2}>
                            {
                                values.products.map(x => {
                                    return (
                                        <Grid key={x.productId} item xs={6} sm={4} md={3} >
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={<Checkbox name={x.productId} onChange={onProductChange} value={x.productId} />}
                                                    label={x.productName}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                        <hr />
                        <Grid container spacing={2}>
                            <Table aria-label="simple table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Price/Unit</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Discount Type</TableCell>
                                        <TableCell>Discount Amount</TableCell>
                                        <TableCell>Total</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values.selectedProducts.map((row, ind) => (
                                        <TableRow key={row.productId}>
                                            <TableCell>{row.productName}</TableCell>
                                            <TableCell>{row.productRetailPrice} </TableCell>
                                            <TableCell>
                                                <CssTextField
                                                    onChange={onChangePrice.bind(this, ind)}
                                                    name="quantity"
                                                    label="Quantity"
                                                    type="number"
                                                    id="quantity"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <CustomDropDown
                                                    fullWidth
                                                    select
                                                    margin="normal"
                                                    label="Type"
                                                    value={row.discountType}
                                                    InputProps={{ classes: { input: classes.input1 } }}
                                                    onChange={onchangeDiscountType.bind(this, ind)}
                                                    variant="outlined"
                                                >
                                                    {
                                                        renderDiscountTypeOptions()
                                                    }
                                                </CustomDropDown>
                                            </TableCell>
                                            <TableCell>
                                                <CssTextField
                                                    onChange={onChangeDiscount.bind(this, ind)}
                                                    name="discountAmount"
                                                    label="Amount"
                                                    type="number"
                                                    id="discountAmount"
                                                />
                                            </TableCell>
                                            <TableCell>{row.totalPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </Grid>
                        <hr />

                        <Grid container justify="flex-end" spacing={3}>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={addOrder.bind(this)}
                                    className={classes.submit}
                                >
                                    Create Order
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