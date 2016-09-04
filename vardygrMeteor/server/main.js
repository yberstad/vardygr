import { Meteor } from 'meteor/meteor';
import FacebookOAuthInit from './imports/oauth-facebook';

Meteor.startup(() => {
  // code to run on server at startup
  Stops._ensureIndex({ "geometry": "2dsphere"});
  Stops._ensureIndex({"name":1})
  FacebookOAuthInit();
});



Meteor.methods({
  'insertRoute': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("401:unauthorized");
    }
    
    const route = params.route;
    if (!route) {
      throw new Meteor.Error("400:bad request");
    }
    
    route.createdBy = Meteor.userId();
    route.timestamp = new Date();
    Routes.schema.validate(route);
    return Routes.insert(route);
  }
});

Meteor.methods({
  'insertStop': function(params) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("401:unauthorized");
    }
    
    const stop = params.stop;
    if (!stop) {
      throw new Meteor.Error("400:bad request");
    }
    
    stop.createdBy = Meteor.userId();
    stop.timestamp = new Date();
    Stops.schema.validate(stop);
    return Stops.insert(stop);
  }
});



Meteor.methods({
  'findNearStops': function(params) {
    const currentPosition = params.currentPosition;
    if (!currentPosition) {
      throw new Meteor.Error("400:bad request");
    }
    
    try {
      return Stops.find(
        {
          geometry: {
            $near: {
              $geometry: currentPosition.location,
              $maxDistance: 500
            }
          }
        }).fetch();
    }
    catch (ex){
      console.log(ex);
    }
  }
});

Meteor.methods({
  'findNearStop': function(params) {
    const location = params.location;
    if (!location) {
      throw new Meteor.Error("400:bad request");
    }
    
    try {
      return Stops.findOne(
        {
          geometry: {
            $near: {
              $geometry: location,
              $maxDistance: 500
            }
          }
        });
    }
    catch (ex){
      console.log(ex);
    }
  }
});

Meteor.methods({
  'searchStopsByRegex': function({stopIdList}) {
    new SimpleSchema({
      stopIdList: {
        type: [String]
      }
    }).validate({stopIdList});
    
    try {
      return Stops.find({name: {$regex: ".*" + searchString + ".*" , $options: 'i'}}, {limit: 20}).fetch();
    }
    catch (ex){
      console.log(ex);
    }
  }
});

Meteor.methods({
  'findStopByStopId': function({stopId}) {
    new SimpleSchema({
      stopId: {
        type: String
      }
    }).validate({stopId});
    try {
      return Stops.findOne({stopId: stopId});
    }
    catch (ex){
      console.log(ex);
    }
  }
});

Meteor.methods({
  'findStopsByStopId': function({stopIdList}) {
    new SimpleSchema({
      stopIdList: {
        type: [String]
      }
    }).validate({stopIdList});
    try {
      return Stops.find({stopId: {$in: stopIdList}}).fetch();
    }
    catch (ex){
      console.log(ex);
    }
  }
});

Meteor.methods({
  'getRoutListByStopId': function ({stopId}) {
    new SimpleSchema({
      stopId: {
        type: String
      }
    }).validate({stopId});
    
    return Routes.find({'timetable.stopList.stopId': stopId}).fetch();
  }
});

Meteor.methods({
  'insertBeacon': function(params) {
    var beacon = params.beacon;
    if (!Meteor.userId()) {
      throw new Meteor.Error("401:unauthorized");
    }
    beacon.createdBy = Meteor.userId();
    beacon.timestamp = new Date();
    Beacons.schema.validate(beacon);
    Beacons.insert(beacon);
  }
});

Meteor.methods({
  'updateBeacon': function({ beaconId, location }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("401:unauthorized");
    }
    
    new SimpleSchema({
      beaconId: { type: String },
      location: { type: Object },
      'location.type': {
        type: String,
        allowedValues: ["Point"]
      },
      'location.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
      }
    }).validate({ beaconId, location });
    
    Beacons.update(
      {beaconId: beaconId},
      {
        $set: {
          geometry: location,
          createdBy: Meteor.userId(),
          timestamp: new Date()
        }
      }
    );
  }
});

Meteor.publish('beacon-by-id', function({ beaconId }) {
  new SimpleSchema({
    beaconId: {
      type: String
    }
  }).validate({beaconId});
  
  return Beacons.find({ beaconId: beaconId });
});

Meteor.publish('beacons-by-idlist', function({ beaconIdList }) {
  new SimpleSchema({
    beaconIdList: {
      type: [String]
    }
  }).validate({beaconIdList});
  
  return Beacons.find({ beaconId: { $in: beaconIdList } });
});






















































Meteor.methods({
  'getEventList': function() {
    if (!Meteor.userId()) {
      return null;
    }
    var user = Meteor.users.findOne({"_id": Meteor.userId()});
    return Events.find({
        "participants": {
          $elemMatch:
          {
            facebookId:  user.services.facebook.id
          }
        }
      }
    ).fetch();
    // return Events.find({
    //         "participants": {
    //             $elemMatch:
    //             {
    //                 $or: [
    //                     { userId:  Meteor.userId() },
    //                     { userId:  user.services.facebook.id }
    //                 ]
    //             }
    //         }
    //     }
    // ).fetch();
    //return Events.find({ $elemMatch: { $or: [ {"participants.userId": Meteor.userId()}, {"participants.$userId": user.services.facebook.id}] }}).fetch();
  }
});

Meteor.methods({
  'getUserList': function() {
    if (!Meteor.userId()) {
      return null;
    }
    return Meteor.users.find({ });
  }
});

Meteor.methods({
  'getUser': function() {
    if (!Meteor.userId()) {
      return null;
    }
    return Meteor.users.findOne({"_id": Meteor.userId()});
  }
});

Meteor.methods({
  'saveEvent': function(event) {
    var user = Meteor.users.findOne({"_id": Meteor.userId()});
    if(user){
      event.createdByFacebookId = user.services.facebook.id;
    }
    event.createdBy = (Meteor.userId()) ? Meteor.userId() : '';
    event.timestamp = new Date();
    Events.schema.validate(event);
    return Events.insert(event);
  }
});

Meteor.methods({
  'addPosition': function(position) {
    var user = Meteor.users.findOne({"_id": Meteor.userId()});
    if(user){
      position.createdByFacebookId = user.services.facebook.id;
    }
    position.createdBy = (Meteor.userId()) ? Meteor.userId() : '';
    position.timestamp = new Date();
    Positions.schema.validate(position);
    return Positions.insert(position);
  }
});

Meteor.publish('positions', function(eventIdList) {
  if (!this.userId) {
    return this.ready();
  }
  const sub = this;
  let initializing = true;
  const pipeline = [
    {$match: {eventIds: eventIdList}},
    {$sort: {createdBy: 1, timestamp: 1}},
    {$group: {
      _id: "$createdBy",
      createdBy: {$last: "$createdBy"},
      timestamp: {$last: "$timestamp"},
      createdByFacebookId: {$last: "$createdByFacebookId"},
      coordinates: {$last: "$location.coordinates"}
    }
    }
  ];
  
  var query = Positions.find( {} );
  var handle = query.observeChanges({
    added: function (id) {
      // observeChanges only returns after the initial `added` callbacks
      // have run. Until then, we don't want to send a lot of
      // `self.changed()` messages - hence tracking the
      // `initializing` state.
      if (!initializing) {
        runAggregation();
      }
    },
    error: function(err){
      throw new Meteor.Error('Uh oh! something went wrong!', err.message);
    }
  });
  
  // Wrap the aggregation call inside of a function
  // since it will be called more than once
  function runAggregation() {
    sub._ids = sub._ids || {};
    sub._iteration = sub._iteration || 0;
    var matchedLocations =  Positions.aggregate(pipeline);
    _(matchedLocations).forEach(function(location){
      var _id = location.createdBy;
      if(typeof sub._ids[_id] !== 'undefined'){
        // Aggregate and update our collection with the new data changes
        sub.changed('positions', location.createdBy, location);
      }
      else {
        // Aggregate and then add a new record to our collection
        sub.added('positions', location.createdBy, location);
      }
      sub._ids[_id] = sub._iteration++;
    });
  }
  
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  // Run the aggregation initially to add some data to our aggregation collection
  runAggregation();
  sub.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  sub.onStop(function () {
    handle.stop();
  });
});

Meteor.publish('locations', function(geoRequestId) {
  const sub = this;
  let initializing = true;
  const pipeline = [
    {$match: {geoRequestId: geoRequestId}},
    {$sort: {insertedBy: 1, timestamp: 1}},
    {$group: {
      _id: "$insertedBy",
      insertedBy: {$last: "$insertedBy"},
      timestamp: {$last: "$timestamp"},
      latitude: {$last: "$latitude"},
      longitude: {$last: "$longitude"},
    }
    }
  ];
  
  var query = Locations.find( {} );
  var handle = query.observeChanges({
    added: function (id) {
      // observeChanges only returns after the initial `added` callbacks
      // have run. Until then, we don't want to send a lot of
      // `self.changed()` messages - hence tracking the
      // `initializing` state.
      if (!initializing) {
        runAggregation();
      }
    },
    error: function(err){
      throw new Meteor.Error('Uh oh! something went wrong!', err.message);
    }
  });
  
  // Wrap the aggregation call inside of a function
  // since it will be called more than once
  function runAggregation() {
    sub._ids = sub._ids || {};
    sub._iteration = sub._iteration || 0;
    var matchedLocations =  Locations.aggregate(pipeline);
    _(matchedLocations).forEach(function(location){
      var _id = location.insertedBy;
      if(typeof sub._ids[_id] !== 'undefined'){
        // Aggregate and update our collection with the new data changes
        sub.changed('locations', location.insertedBy, location);
      }
      else {
        // Aggregate and then add a new record to our collection
        sub.added('locations', location.insertedBy, location);
      }
      sub._ids[_id] = sub._iteration++;
    });
  }
  
  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  // Run the aggregation initially to add some data to our aggregation collection
  runAggregation();
  sub.ready();
  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  sub.onStop(function () {
    handle.stop();
  });
});

Meteor.publish('beacons-by-facebookid', function(facebookIdList) {
  if (!this.userId) {
    return this.ready();
  }
  return Beacons.find({ usedByFacebookId: { $in: this._params } })
});

Meteor.methods({
  'getBeaconsForLoggedInUser': function() {
    if (!Meteor.userId()) {
      return null;
    }
    var user = Meteor.users.findOne({"_id": Meteor.userId()});
    if(user){
      return Beacons.findOne({usedBy: user._id});
    }
    return null;
  }
});

Meteor.methods({
  'getBeaconsById': function(id) {
    if (!Meteor.userId()) {
      return null;
    }
    return Beacons.find({_id: id});
  }
});

Meteor.methods({
  'getBeaconsByFacebookIdList': function(facebookIdList) {
    if (!Meteor.userId()) {
      return null;
    }
    return Beacons.find({usedByFacebookId: {$in: facebookIdList}});
  }
});

Meteor.publish('get-current-user', function() {
  if (!this.userId) {
    return this.ready();
  }
  
  return Meteor.users.findOne({ _id: this.userId });
});
