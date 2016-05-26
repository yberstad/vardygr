import React from 'react';
import { Component } from 'react-native';
import { connect } from 'react-redux';
import Home from '../components/Home';


export default class HomeContainer extends Component{
    render(){
        return (
            <Home {... this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.get('currentUser').signedIn
    }
}

export default connect(mapStateToProps)(HomeContainer);