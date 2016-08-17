Events = new Mongo.Collection('events');
Events.schema = new SimpleSchema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: Object,
        index: "2dsphere"
    },
    "location.type": {
        type: String,
        allowedValues: ["Point"]
    },
    "location.coordinates": {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
    address: {
        type: String
    },
    participants: {
        type: [Object]
    },
    "participants.$.facebookId": {
        type: String
    },
    "participants.$.acknowledged": {
        type: Boolean
    },
    "participants.$.accepted": {
        type: Boolean
    },
    "participants.$.displayName": {
        type: String
    },
    "participants.$.beaconId": {
        type: String
    },
    coHosts: {
        type: [Object]
    },
    "coHosts.$.facebookId": {
        type: String
    },
    "coHosts.$.acknowledged": {
        type: Boolean
    },
    "coHosts.$.accepted": {
        type: Boolean
    },
    canInviteFriends: {
        type: Boolean
    },
    startDateTime: {
        type: Date
    },
    schedule: {
        type: String
    },
    displayPositionOfCreator: {
        type: Boolean
    },
    displayPositionForAllParticipants: {
        type: Boolean
    },
    region:{
        type: Object
    },
    'region.longitudeDelta': {
        type: Number,
        decimal: true
    },
    'region.latitudeDelta': {
        type: Number,
        decimal: true
    },
    createdBy: {
        type: String
    },
    createdByFacebookId: {
        type: String,
        optional: true
    },
    timestamp: {
        type: Date
    }
});

Positions = new Mongo.Collection('positions'); 
Positions.schema = new SimpleSchema({
    eventIds: {type: [String]},
    location: {
        type: Object,
        index: '2dsphere'
    },
    'location.type': {
        type: String,
        allowedValues: ['Point']
    },
    'location.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
    createdBy: {
        type: String
    },
    createdByFacebookId: {
        type: String,
        optional: true
    },
    timestamp: {
        type: Date
    }
});

Beacons = new Mongo.Collection('beacons');
Beacons.schema = new SimpleSchema({
    title: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    url: {
        type: String,
        optional: true
    },
    location: {
        type: Object,
        index: '2dsphere',
        optional: true,
    },
    'location.type': {
        type: String,
        allowedValues: ['Point']
    },
    'location.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
    transportMode:{
        type: String,
        optional: true
    },
    public: {
        type: Boolean
    },
    createWayPoints: {
        type: Boolean
    },
    cooperationOwner: {
        type: String,
        optional: true
    },
    usedBy: {
        type: String
    },
    usedByFacebookId: {
        type: String,
        optional: true
    },
    createdBy: {
        type: String
    },
    createdByFacebookId: {
        type: String,
        optional: true
    },
    timestamp: {
        type: Date
    }
});

WayPoint = new Mongo.Collection('waypoint');
WayPoint.schema = new SimpleSchema({
    beaconId:{
        type: String
    },
    location: {
        type: Object,
        index: '2dsphere'
    },
    'location.type': {
        type: String,
        allowedValues: ['Point']
    },
    'location.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
    timestamp: {
        type: Date
    }
});


Locations = new Mongo.Collection('locations');
Locations.schema = new SimpleSchema({
    longitude: {type: Number, decimal: true, min: -180, max: 180},
    latitude: {type: Number, decimal: true, min: -90, max: 90},
    insertedBy: {type: String},
    geoRequestId: {type: String},
    timestamp: {type: Date}
});

Meteor.methods({
    'addLocation': function(location) {
        location.insertedBy = (Meteor.userId()) ? Meteor.userId() : '';
        location.timestamp = new Date(location.timestamp);
        Locations.schema.validate(location);
        Locations.insert(location);
    }
});