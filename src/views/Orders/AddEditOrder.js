import React, { useEffect } from "react";
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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
export default function AddEditOrder(props) {
    const classes = useStyles();
    const products = [
        {
            "name": "abc"
        },
        {
            "name": "12"
        },
        {
            "name": "123123"
        },
        {
            "name": "53453"
        },
        {
            "name": "arqr"
        },
        {
            "name": "345345b345"
        },
        {
            "name": "werbwer"
        },
        {
            "name": "567m567"
        },
        {
            "name": "ab56m7567567c"
        },
        {
            "name": "446 546456456456"
        },
    ]
    const [values, setValues] = React.useState({
        email: '',
        name: '',
        uid: ''
    });

    useEffect(() => {
        let { id } = props.match.params
        let params = {
            uid: id
        }

    }, [])

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
                        <Grid  >
                            <h3>Products List</h3>
                        </Grid>
                        <hr />
                        <Grid container spacing={2}>
                            {
                                products.map(x => {
                                    return (
                                        <Grid key={x.name} item xs={6} sm={4} md={3} >
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={<Checkbox name="checkedA" />}
                                                    label={x.name}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                        <hr />

                        <Grid container justify="flex-end" spacing={3}>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    // onClick={AddUpdateUser}
                                    className={classes.submit}
                                >
                                    Edit
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