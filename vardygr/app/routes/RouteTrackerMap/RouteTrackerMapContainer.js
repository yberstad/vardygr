import React, {Component} from 'react';
import {createContainer} from 'react-native-meteor';
import RouteTracker from './RouteTrackerMap';

class RouteTrackerMapContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <RouteTracker/>
        );
    }
}

export default createContainer((params) => {

}, RouteTrackerMapContainer);
