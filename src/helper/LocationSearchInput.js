import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Storage from './Storage';
import Map from './Maps';
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CssTextField from 'components/CssTextField/CssTextField.js';
export default class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            autocompleteLocation: {
                lat: null,
                lng: null
            }
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        Storage.seletedLocationName = address;
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                Storage.selectedLocation = latLng
                this.props.changeAddress(address, latLng)
                this.setState({
                    autocompleteLocation: {
                        lat: latLng.lat,
                        lng: latLng.lng,
                    }
                })
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
             <Grid md={12} sm={12} xs={12} style={{}}>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <Grid md={12} sm={12} xs={12}>
                               <CssTextField
                                    value={this.state.address}
                                    {...getInputProps({
                                    })
                                    }
                                    label="Google Address"
                                    name="googleAddress"
                                />
                                <div style={{position:'absolute',zIndex:2}} className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Grid>
                        )}
                    </PlacesAutocomplete>
                </Grid>

       
        );
    }
}