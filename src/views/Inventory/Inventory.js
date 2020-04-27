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
import * as InventoryService from "./InventoryService";
import * as util from "../../helper/Utilities";
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
            modalopen: false,
            limit: 10,
            page: 0,
            allInventory: [],
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
            { title: 'Name', field: 'productName' },
            { title: 'Retail Price', field: 'productRetailPrice' },
            { title: 'Internal Price', field: 'productInternalPrice' },
            { title: 'Quantity', field: 'productQty' },
            { title: 'Value', field: 'productValue', },
            {
                title: 'Actions', field: 'actions',
                render: row => {
                    return (
                        <GridItem
                            justify="center"
                        >
                            <Edit
                                color="action"
                                onClick={this.editInventory.bind(this, row.productId)}
                            />
                            <Delete
                                color="action"
                                // onClick={this.editUser.bind(this, row.productId)}
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
    editInventory = (productId) => {
        this.props.history.push(`/admin/updateInventory/${productId}`)
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
    fetchInventory= (query) => {
      let { limit } = this.state
        let params = {
            page: query.page,
            limit: limit
        }
        if (query.search) {
            params.search = query.search
        }
        return InventoryService.getAllInventroy(params)
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
                                data={query => new Promise(async (resolve, reject) => {
                                    let res = await this.fetchInventory(query)
                                    let { data, totalRecords } = res.data
                                    resolve({
                                        data: data,
                                        page: query.page,
                                        totalCount: totalRecords
                                    })
                                })}
                                // data={this.state.data}
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
                                        tooltip: 'Add Product',
                                        isFreeAction: true,
                                        onClick: (event) => this.props.history.push('/admin/Addinventory')
                                    }
                                ]}
                               

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