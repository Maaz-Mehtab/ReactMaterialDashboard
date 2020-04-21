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
import Button from '@material-ui/core/Button';
const useStyles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    input1: {
        height: 10
    },

    modalButtondiv: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    submit: {
        margin: theme.spacing(1),
        borderColor: "purple",
        color: "purple",
        width: 80,
    },
    DropDownDiv: {
        borderRadius: 4, marginTop: 15, marginBottom: 15
    }
});

class Inventory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isVarified: 0,
            columns: [],
            data: [],
            modalopen: false
        }
        this.state.data = [
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
            {

                productName: 'CangoVirus',
                productRetailPrice: 'maaz@10000.com',
                productInternalPrice: "9500",
                productQty: "2",
                productValue: "20000",

            },
        ];
        this.state.columns = [
            { title: 'Name', field: 'productName' },
            { title: 'Retail Price', field: 'productRetailPrice' },
            { title: 'Internal Price', field: 'productInternalPrice' },
            { title: 'Quantity', field: 'productQty' },
            { title: 'Value', field: 'productValue', },
        ]
    }


    pageChange = (e) => {
        try {
            console.log('e pageChange', e);
        }
        catch (e) {
            console.log("pageChange Exception", e)
        }
    }
    rowperChange = (e) => {
        try {
            console.log('e rowperChange', e);
        }
        catch (e) {
            console.log("rowperChange Exception", e)
        }
    }
    DropDownChange = (event) => {
        console.log("event", event);
        this.setState({
            isVarified: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={styles.cardTitleWhite}>Inventory</h4>
                            <p className={styles.cardCategoryWhite}>
                                All Inventory's List
                             </p>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable
                                title=""
                                data={this.state.data}
                                columns={this.state.columns}
                                onChangePage={(e) => this.pageChange(e)}
                                onChangeRowsPerPage={(e) => this.rowperChange(e)}
                                localization={{
                                    pagination: {
                                        labelDisplayedRows: '{from}-{to} of {count}'
                                    },
                                    body: {
                                        emptyDataSourceMessage: 'No records to display',
                                        filterRow: {
                                            filterTooltip: 'Filter'
                                        }
                                    }
                                }}
                               actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add User',
                                        isFreeAction: true,
                                        onClick: (event) => this.props.history.push('/admin/AddInventory')
                                    }
                                ]}
                                editable={{
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    const data = this.state.data;
                                                    const index = data.indexOf(oldData);
                                                    data[index] = newData;
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve()
                                            }, 1000)
                                        }),
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                {
                                                    let data = this.state.data;
                                                    const index = data.indexOf(oldData);
                                                    data.splice(index, 1);
                                                    this.setState({ data }, () => resolve());
                                                }
                                                resolve()
                                            }, 1000)
                                        }),
                                }}

                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }


}
var styles = {
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
};
export default withStyles(useStyles)(Inventory)