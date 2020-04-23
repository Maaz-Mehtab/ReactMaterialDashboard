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
import * as util from "../../helper/Utilities";
import * as userService from "./UserService";
import { Grid } from "@material-ui/core";
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

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isVerified: 0,
            columns: [],
            data: [],
            modalopen: false,
            limit: 10,
            page: 0,
            allUsers: [],
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
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Country', field: 'country' },
            {
                title: 'Role', field: 'role',
                render: row => row.userType.name
            },
            {
                title: 'Status', field: 'status',
                render: row =>
                    <GridContainer
                        justify="center"
                    >
                        <span style={{ borderRadius: 10, paddingRight: 20, paddingTop: 1, paddingBottom: 1, paddingLeft: 20, color: (row.isVerified) ? "#155724" : "#721c24", backgroundColor: (row.isVerified) ? "#d4edda" : "#f8d7da" }}> {row.isVerified == true ? "Verified" : "Not Verified"}</span>
                    </GridContainer>

            },
            {
                title: 'Actions', field: 'actions',
                render: row => {
                    return (
                        <GridContainer
                            justify="center"
                        >
                            <Edit
                                color="action"
                                onClick={this.editUser.bind(this, row.uid)}
                            />
                        </GridContainer>
                    )
                }
            },
        ]

        this.setState({
            columns
        })
    }

    editUser = (uid) => {
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

    fetchUsers = (query) => {
        let { limit } = this.state
        let params = {
            page: query.page,
            limit: limit
        }
        if (query.search) {
            params.search = query.search
        }
        return userService.getAllUsers(params)
    }

    render() {
        const { classes } = this.props;
        const { allUsers, columns, totalRecords, page, limit } = this.state;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={styles.cardTitleWhite}>Users</h4>
                            <p className={styles.cardCategoryWhite}>
                                All User's List
                             </p>
                        </CardHeader>
                        <CardBody>
                            <MaterialTable
                                title=""
                                data={query => new Promise(async (resolve, reject) => {
                                    let res = await this.fetchUsers(query)
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
                            <span style={{ color: "#fff", textAlign: 'left', paddingLeft: 10, }}>Add/Edit Users</span>
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

                            <div className={styles.DropDownDiv}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={this.state.isVerified}
                                    InputProps={{ classes: { input: classes.input1 } }}
                                    onChange={(e) => this.DropDownChange(e)}
                                    variant="outlined"
                                    size="small"
                                >
                                    <MenuItem value={0}>Varified</MenuItem>
                                    <MenuItem value={1}>Not Varifeid</MenuItem>
                                </TextField>
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
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
};
export default withStyles(useStyles)(Users)