import React from "react";
import MaterialTable from 'material-table';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Delete, Edit } from "@material-ui/icons";
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
import Link from '@material-ui/core/Link';
import * as CustomerService from "./CustomerService";
import * as util from "../../helper/Utilities";
import * as InventoryService from "../Inventory/InventoryService";

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

class Customer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            data: [],
            modalopen: false,
            limit: 10,
            page: 0,
            allCustomer: [],
            totalRecords: 0
        }
        let route = window.location.pathname
        util.usersExist(route, this.props)
        this.bindFunctions()
    }
    bindFunctions() {
        this.makeColumns = this.makeColumns.bind(this)
    }
    componentDidMount() {
        this.makeColumns()
   
    }

    

    makeColumns() {
        let columns = [
            { title: 'ReferenceId', field: 'CustomerId' },
            { title: 'Customer Name', field: 'CustomerName' },
            { title: 'Cotact Person Name', field: 'ContactPerson' },
            { title: 'Cantact Person Number', field: 'ContactNumber' },
            { title: 'Country', field: `${'customerLocation.country'}` },
            {
                title: 'Actions', field: 'actions',
                render: row => {
                    return (
                        <GridItem
                            justify="center"
                        >
                            <Edit
                                color="action"
                                onClick={this.editCustomer.bind(this, row.uid)}
                            />
                            <Delete
                                color="action"
                            // onClick={this.editUser.bind(this, row.uid)}
                            />
                        </GridItem>
                    )
                }
            },
        ]

        this.setState({
            columns
        })
    }
    editCustomer = (uid) => {
        this.props.history.push(`/admin/updateCustomer/${uid}`)
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


    fetchCustomer = (query) => {
        let { limit } = this.state
        let params = {
            page: query.page,
            limit: limit
        }
        if (query.search) {
            params.search = query.search
        }
        return CustomerService.getAllCustomers(params)
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={styles.cardTitleWhite}>Customer</h4>
                            <p className={styles.cardCategoryWhite}>
                                All Customer's List
            </p>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable
                                title=""
                                data={query => new Promise(async (resolve, reject) => {
                                    let res = await this.fetchCustomer(query)
                                    let { data, totalRecords } = res.data
                                    resolve({
                                        data: data,
                                        page: query.page,
                                        totalCount: totalRecords
                                    })
                                })}
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
                                        tooltip: 'Add Customer',
                                        isFreeAction: true,
                                        onClick: (event) => this.props.history.push('/admin/AddCustomer')
                                    }
                                ]}
                                detailPanel={
                                    [
                                        {
                                            tooltip: 'Show Name',
                                            render: rowData => {
                                                console.log("rowData", rowData);
                                                return (
                                                    <div
                                                        style={{
                                                            padding: 10,
                                                            backgroundColor: "lightGray"
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                                                            <span style={{ padding: 10 }}>
                                                                <span style={{}}>
                                                                    <b> Customer Name  </b>: {rowData.CustomerName}
                                                                </span>
                                                            </span>
                                                            <span style={{ padding: 10 }}>
                                                                <b> Location Area </b> : {rowData.customerLocation.area}
                                                            </span>
                                                            <span style={{ padding: 10 }}>
                                                                <b> Latitude / Logitude</b> : {rowData.customerLocation.latitude + " / " + rowData.customerLocation.longitude}
                                                            </span>
                                                            <span style={{ padding: 10 }}>
                                                                <b> Interest of Product</b> <br />
                                                                {rowData.productList.map((val, index) => {
                                                                    return (<p> {index + 1 + ")"} {val.productName}</p>)
                                                                })}

                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            },
                                        }]}

                            />
                        </CardBody>
                    </Card>
                </GridItem>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.modalopen}
                    className={classes.modal}
                    onClose={() => this.handleClose()}
                    closeAfterTransition
                >

                    <GridItem xs={8} sm={8} md={4}>
                        <div style={{ background: "purple", width: '100%', paddingTop: 15, paddingBottom: 15 }}>
                            <span style={{ color: "#fff", textAlign: 'left', paddingLeft: 10, }}>Add/Edit Customer's</span>
                        </div>
                        <div className={classes.paper}>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    size="small"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    size="small"
                                    autoFocus
                                />
                            </div>


                            <GridItem
                                container
                                spacing={0}
                                direction="row"
                                alignItems="end"
                                justify="center"

                            >
                                <Button variant="outlined" size="medium" className={classes.submit}>
                                    Edit
                             </Button>
                                <Button variant="outlined" size="medium" className={classes.submit}>
                                    Cancel
                             </Button>
                            </GridItem>
                        </div>
                    </GridItem>

                </Modal>
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
        overflow: "scroll"
        // overflow: auto !important
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
};
export default withStyles(useStyles)(Customer)