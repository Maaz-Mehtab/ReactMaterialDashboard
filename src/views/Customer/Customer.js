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
import Link from '@material-ui/core/Link';



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
            isVarified: 0,
            columns: [],
            data: [],
            modalopen: false
        }
        this.state.data = [
            {

                CustomerId: '7day hospital',
                CustomerName: 'maaz@10000.com',
                ContactPerson: "7 day hospital",
                ContactNumber: "12312313",
                country: "Pakistan",
                customerLocation: {
                    longitude: 67.01813849999999,
                    country: " Pakistan",
                    latitude: 24.8595543,
                    area: "Memon Hospital, M.A Jinnah Road, Karachi, Pakistan"
                },

            },
            {

                CustomerId: '7day hospital',
                CustomerName: 'maaz@10000.com',
                ContactPerson: "7 day hospital",
                ContactNumber: "12312313",
                country: "Pakistan",
                customerLocation: {
                    longitude: 67.01813849999999,
                    country: " Pakistan",
                    latitude: 24.8595543,
                    area: "Memon Hospital, M.A Jinnah Road, Karachi, Pakistan"
                },

            },
            {

                CustomerId: '7day hospital',
                CustomerName: 'maaz@10000.com',
                ContactPerson: "7 day hospital",
                ContactNumber: "12312313",
                country: "Pakistan",
                customerLocation: {
                    longitude: 67.01813849999999,
                    country: " Pakistan",
                    latitude: 24.8595543,
                    area: "Memon Hospital, M.A Jinnah Road, Karachi, Pakistan"
                },

            },
            {

                CustomerId: '7day hospital',
                CustomerName: 'maaz@10000.com',
                ContactPerson: "7 day hospital",
                ContactNumber: "12312313",
                country: "Pakistan",
                customerLocation: {
                    longitude: 67.01813849999999,
                    country: " Pakistan",
                    latitude: 24.8595543,
                    area: "Memon Hospital, M.A Jinnah Road, Karachi, Pakistan"
                },
            },
        ];
        this.state.columns = [
            { title: 'ReferenceId', field: 'CustomerId' },
            { title: 'Customer Name', field: 'CustomerName' },
            { title: 'Cotact Person Name', field: 'ContactPerson' },
            { title: 'Cantact Person Number', field: 'ContactNumber' },
            { title: 'Country', field: 'country', },
            { title: 'Location', field: `${'customerLocation.area'}` },
            { title: 'Latitude', field: `${'customerLocation.latitude'}` },
            { title: 'Longitude', field: `${'customerLocation.longitude'}` },
            // { title: 'Lat / Long', field: `${'customerLocation.latitude'} `},
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

    backdrop = () => {
        console.log("11111")
    }
    AddCustomer = () => {
        this.props.history.push('/admin/AddCustomer')
       
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
                            <h4 className={styles.cardTitleWhite}>Customer</h4>
                            <p className={styles.cardCategoryWhite}>
                                All Customer's List
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
                                        onClick: (event) => { this.AddCustomer() }
                                    }
                                ]}
                                editable={{
                                    // onRowAdd: newData =>
                                    //     new Promise((resolve, reject) => {
                                    //         setTimeout(() => {
                                    //             {
                                    //                 const data = this.state.data;
                                    //                 data.push(newData);
                                    //                 this.setState({ data }, () => resolve());
                                    //             }
                                    //             resolve()
                                    //         }, 1000)
                                    //     }),
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
                                                                    <b> Customer Name  </b>: {rowData.ContactPerson}
                                                                </span>
                                                            </span>
                                                            <span style={{ padding: 10 }}>
                                                                <b> Location Area </b> : {rowData.customerLocation.area}
                                                            </span>
                                                            <span style={{ padding: 10 }}>
                                                                <b> Latitude / Logitude</b> : {rowData.customerLocation.latitude + " / " + rowData.customerLocation.longitude}
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