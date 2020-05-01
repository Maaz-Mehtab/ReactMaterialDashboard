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
import * as userService from '../Users/UserService';



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

export default function UserProfile(props) {
  const classes = useStyles();
  var [isFormOrderValid, setisFormOrderValid] = React.useState(true)
  var [errorArray, seterrorArray] = React.useState([])
  const [values, setValues] = React.useState({
    userName: '',
    email: '',
    phone: '',
    country: '',
    uid: '',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    seterrorArray([])
    setisFormOrderValid(true)
  };

  useEffect(() => {
    getUserDetails()
  }, [])


  const getUserDetails = async () => {
    let userObj = await util.localStorage_GetKey('user')
    userObj = JSON.parse(userObj)
    setValues({
      ...values,
      userName: userObj.name,
      email: userObj.email,
      country: userObj.country,
      phone: userObj.phone,
      uid: userObj.uid,
      userType: userObj.userType
    });

  }
  const onFileChange = (event) => {
    let file = event.target.files[0]

    var arrayBufferView = new Uint8Array(file);
    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    // let payload = {
    //   profileImage: blob
    // }
    // userService.updateProfileImage(payload)
    let reader = new FileReader();
    let bu = reader.readAsArrayBuffer(blob)
    debugger
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   let result = reader.result
    //   debugger
    // }
  }

  const updateProfile = async () => {
    var errorArray = []
    var isFormOrderValid = true
    if (values.userName == "") {
      isFormOrderValid = false
      errorArray.push("Please Enter User Name")
    }
    if (values.country == "") {
      isFormOrderValid = false
      errorArray.push("Please Enter Country")
    }
    if (values.phone == "") {
      isFormOrderValid = false
      errorArray.push("Please Enter Phone No")
    }
    seterrorArray(errorArray)
    setisFormOrderValid(isFormOrderValid)
    if (isFormOrderValid) {
      let payload = {
        name: values.userName,
        phone: values.phone,
        email: values.email,
        userType: values.userType,
        country: values.country,
        uid: values.uid
      }
      userService.updateProfile(payload)
        .then((respone) => {
          let { data, code } = respone.data
          if (code == 200) {
            util.localStorage_SaveKey('user', JSON.stringify(payload))
            props.history.push('/admin')
          }
        }).catch(err => {
          console.log(err)
        })
    }

  }
  return (
    <div>
      <GridContainer>
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
              {/* <input type="file" onChange={onFileChange.bind(this)}></input> */}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              {
                !isFormOrderValid ?
                  <GridItem style={{
                    backgroundColor: util.colors.errorBackground,
                    color: util.colors.errorText,
                    padding: 20
                  }} >
                    {
                      errorArray.map((x, ind) => {
                        return (
                          <p key={ind} >
                            {x}
                          </p>
                        )
                      })
                    }
                  </GridItem>
                  :
                  null
              }
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
                    // onChange={handleChange}
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
                    type="number"
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
              <Button
                onClick={updateProfile}
                color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
