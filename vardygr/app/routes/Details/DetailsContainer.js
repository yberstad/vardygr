import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Details from './Details';
import {getCurrentPosition} from '../../lib/geoTracking';

class DetailsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            nearStop: '',
            searchStopsResult: null
        };
    }

    findNearStop() {
        getCurrentPosition().then((location) => {
            var stopId;
            var routeList;
            Meteor.call('findNearStop', { location }, (err, result) => {
                if(err) {//save user id and token
                    console.log(err);
                }
                if(result) {
                    stopId = result._id;
                    this.setState({nearStop: result.name});
                    Meteor.call('getRoutList', {stopId}, (err, result1) => {
                        if (err) {//save user id and token
                            console.log(err);
                        }
                        routeList = result1;
                    });
                }
                else {
                    this.setState({nearStop: 'Could not find any near stop...'});
                }
            });
        });
    }

    searchStops(searchString){
        Meteor.call('searchStops', {searchString}, (err, result) => {
            this.setState({searchStopsResult: result});
        });
    }

    render(){
        const {detailsReady, beacon} = this.props;
        return (
            <Details
                updateState={this.setState.bind(this)}
                detailsReady={detailsReady}
                onFindNearStop={this.findNearStop.bind(this)}
                nearStop={this.state.nearStop}
                searchStops={this.searchStops.bind(this)}
                searchStopsResult={this.state.searchStopsResult}
                beacon={beacon}
            />
        );
    }
};

DetailsContainer.propTypes = {
    detailsReady: React.PropTypes.bool,
    beacon: React.PropTypes.object
};

export default createContainer(() => {
    const handler = Meteor.subscribe('beacons-by-id', { beaconId: 'beaconId_1'});
    return {
        detailsReady: handler.ready(),
        beacon: Meteor.collection('beacons').findOne()
    };
}, DetailsContainer);
