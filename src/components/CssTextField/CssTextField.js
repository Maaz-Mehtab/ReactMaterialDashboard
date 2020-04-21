
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'purple',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'purple',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#d2d2d2',
            },
            '&:hover fieldset': {
                borderColor: 'purple',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'purple',
            },
        },
     },
})(TextField);
const useStyles = makeStyles((theme) => ({
    input1: {
        height: 10,
        justifyContent:'center',
        alignItems:'center',
    },

})
)

export default function CssTextField(props) {
    const classes = useStyles();
    return (
        <CustomTextField
            required
            fullWidth
            margin="normal"
            value={props.value}
            label={props.label}
            InputProps={{ classes: { input: classes.input1 } }}
            variant="outlined"
            id={props.id}
            name={props.name}
            onChange={props.onChange}
        />
    )
}
CssTextField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange:PropTypes.func
  };



