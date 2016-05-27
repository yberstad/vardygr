import React from 'react';
import { Component } from 'react-native';
import { connect } from 'react-redux';
import LocationSelect from '../components/LocationSelect';

const actions = {
    eventSave
}

export default class LocationSelectContainer extends Component {
    render(){
        return <LocationSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        region: state.get('createEvent').region
    }
};

export default connect(mapStateToProps, actions)(LocationSelectContainer);