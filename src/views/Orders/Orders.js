import React from "react";
import MaterialTable from 'material-table';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Delete, Edit } from "@material-ui/icons";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { withStyles } from '@material-ui/core/styles';
import * as util from "../../helper/Utilities";
import * as orderService from "./OrderService"
import Paper from '@material-ui/core/Paper';
import moment from "moment";

const useStyles = theme => ({
    table: {
        backgroundColor: "white"
    },
});

class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            limit: 10
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
            { title: 'Order Number', field: 'orderNumber' },
            {
                title: 'Date', field: 'date',
                render: row => moment(row.date).format('DD MMM YYYY')

            },
            {
                title: 'Customer', field: 'customerName',
            },
            {
                title: 'Total Quantity', field: 'totalQuantity',
                render: row => this.getTotalQuatity(row.selectedProducts)
            },
            {
                title: 'Total Amount', field: 'totalAmount',
                render: row => this.getTotalPrice(row.selectedProducts)
            },
            {
                title: 'Total Discount', field: 'totalDiscount',
                render: row => this.getTotalDiscountPrice(row.selectedProducts)
            },
        ]

        this.setState({
            columns
        })
    }

    editOrder = (uid) => {
        this.props.history.push(`/admin/user/${uid}`)
    }

    ToggleModal = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    };

    handleClose = () => {
        this.setState({
            modalopen: false
        })
    };


    DropDownChange = (event) => {
        console.log("event", event);
        this.setState({
            isVerified: event.target.value
        })
    }

    fetchOrders(query) {
        let { limit } = this.state
        let params = {
            page: query.page,
            limit: limit
        }
        if (query.search) {
            params.search = query.search
        }
        return orderService.getAllOrders(params)
    }

    getTotalQuatity(products) {
        return products.map(x => x.quantity).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    getTotalPrice(products) {
        return products.map(x => x.totalPrice).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    getTotalDiscountPrice(products) {
        return products.map(x => x.discountPrice).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    addOrder() {
        this.props.history.push('/admin/addOrder')
    }

    renderDetailRow(row) {

        return (
            <GridContainer style={styles.orderDetailRow}>
                <GridItem xs={12} sm={12} md={12}>
                    <h4>Products List</h4>
                </GridItem>

                <Table style={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Discount Given</TableCell>
                            <TableCell>Price</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.selectedProducts.map((row) => (
                            <TableRow key={row.productName}>
                                <TableCell>{row.productName}</TableCell>
                                <TableCell>{row.productRetailPrice} </TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.discount}</TableCell>
                                <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GridContainer>

        )
    }

    render() {
        const { columns } = this.state;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={styles.cardTitleWhite}>Orders</h4>
                            <p className={styles.cardCategoryWhite}>
                                All Orders List
                             </p>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable
                                title=""
                                data={query => new Promise(async (resolve, reject) => {
                                    let res = await this.fetchOrders(query)
                                    let { data, totalRecords } = res.data
                                    resolve({
                                        data: data,
                                        page: query.page,
                                        totalCount: totalRecords
                                    })
                                })}
                                columns={columns}
                                options={{
                                    pageSize: 10,
                                    actionsColumnIndex: -1
                                }}
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
                                        tooltip: 'Add Order',
                                        isFreeAction: true,
                                        onClick: (event) => { this.addOrder() }
                                    }
                                ]}
                                detailPanel={[
                                    {
                                        tooltip: "Expand",
                                        render: row => this.renderDetailRow(row)
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
    orderDetailRow: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#efefef"
    },
    table: {
        backgroundColor: "white"
    },

};
export default withStyles(useStyles)(Orders)