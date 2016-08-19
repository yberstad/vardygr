import { Meteor } from 'meteor/meteor';
import FacebookOAuthInit from './imports/oauth-facebook';

Meteor.startup(() => {
    // code to run on server at startup
    Events._ensureIndex({ "location": "2dsphere"});
    FacebookOAuthInit();
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
    'updateBeacon': function(beaconId, location) {
        if (!Meteor.userId()) {
            return null;
        }
        var user = Meteor.users.findOne({"_id": Meteor.userId()});
        Beacons.update(
            {_id: beaconId},
            {
                $set: {
                    location: location,
                    usedBy: user._id,
                    usedByFacebookId: user.services.facebook.id
                }
            }
        );
    }
});

Meteor.methods({
    'insertBeacon': function(beacon) {
        if (!Meteor.userId()) {
            return null;
        }
        var user = Meteor.users.findOne({"_id": Meteor.userId()});
        if(user){
            beacon.createdByFacebookId = user.services.facebook.id;
        }
        beacon.createdBy = (Meteor.userId()) ? Meteor.userId() : '';
        beacon.timestamp = new Date();
        Beacons.schema.validate(beacon);
        Beacons.insert(beacon);
    }
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
