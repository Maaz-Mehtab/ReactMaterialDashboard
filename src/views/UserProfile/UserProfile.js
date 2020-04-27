import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CssTextField from 'components/CssTextField/CssTextField.js';
import avatar from "assets/img/faces/marc.jpg";
import * as util from "../../helper/Utilities";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

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

export default function UserProfile() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    userName: '',
    email: '',
    phone: '',
    country: '',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    getUserDetails()
  }, [])
  const getUserDetails = async ()=> {
    let userObj = await util.localStorage_GetKey('user')
    userObj = JSON.parse(userObj)
    console.log("userObj",userObj);
    // setValues({
    //   ...values,
    //   userName: userObj.userName,
    //   email: userObj.email,
    //   country: userObj.country,
    //   phone: userObj.phone,
    // });

  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CssTextField
                    value={values.userName}
                    onChange={handleChange}
                    label="User Name"
                    name="userName"
                    type="name"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CssTextField
                    value={values.email}
                    onChange={handleChange}
                    label="Email"
                    name="email"
                    type="name"
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CssTextField
                    value={values.phone}
                    onChange={handleChange}
                    label="Phone"
                    name="phone"
                    type="name"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CssTextField
                    value={values.country}
                    onChange={handleChange}
                    label="Country"
                    name="country"
                    type="name"
                  />

                </GridItem>
              </GridContainer>


            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <Button color="primary" round>
                Change Profile
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
