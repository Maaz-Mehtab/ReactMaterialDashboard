import React from "react";
import MaterialTable from 'material-table';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";



export default class DataTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      data: []
    }
    this.state.data = [
      {
        id: 1,
        name: 'Maaz',
        surname: 'Mehtab',
        birthYear: 1995,
        birthCity: 34,
        sex: 'Male',
        type: 'adult',
      },
      {
        id: 2,
        name: 'b',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'adult',

      },
      {
        id: 3,
        name: 'c',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',

      },
      {
        id: 4,
        name: 'd',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',

      },
      {
        id: 5,
        name: 'e',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',
      },
      {
        id: 6,
        name: 'f',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 34,
        sex: 'Female',
        type: 'child',

      },
    ];
    this.state.columns = [
      { title: 'Name', field: 'name' },
      { title: 'Sur Name', field: 'surname' },
      { title: 'Gender', field: 'sex' },
      { title: 'Type', field: 'type', removable: false },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth City',
        field: 'birthCity',
        lookup: { 34: 'Karachi', 63: 'Lahore' },
      },
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
  render() {
   
    return (
      <GridContainer>
         <GridItem xs={12} sm={12} md={12}>
         <Card>
          <CardHeader color="primary">
            <h4 className={styles.cardTitleWhite}>Data Table</h4>
            <p className={styles.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
      <MaterialTable
        title=""
        data={this.state.data}
        columns={this.state.columns}
        onChangePage={(e) => this.pageChange(e)}
        onChangeRowsPerPage ={(e) => this.rowperChange(e)}
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
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row")
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
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
                    <div style={{ flexDirection: 'row', }}>
                      <span style={{ paddingLeft: 20, paddingRight: 20, }}>
                        <span style={{}}>
                          <b> Name  </b>: {rowData.name}
                        </span>
                      </span>
                      <span style={{ padding: 15 }}>
                        <b> Sur Name </b> : {rowData.surname}
                      </span>
                      <span style={{ padding: 15 }}>
                        <b> City </b> : Karachi
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
  }
};