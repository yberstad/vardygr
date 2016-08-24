RouteMaps = new Mongo.Collection('routemaps');
RouteMaps.schema = new SimpleSchema({
    title: {
        type: String
    },
    routeNumber: {
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
    lineString:{
        type: Object
    },
    'lineString.type': {
        type: String,
        allowedValues: ["Feature"]
    },
    'lineString.properties': {
        type: Object
    },
    'lineString.properties.name': {
        type: String
    },
    'lineString.geometry': {
        type: Object
    },
    'lineString.geometry.type': {
        type: String,
        allowedValues: ["LineString"]
    },
    'lineString.geometry.coordinates': {
        type: Array,
    },
    'lineString.geometry.coordinates.$': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
});

Stops = new Mongo.Collection('stops');
Stops.schema = new SimpleSchema({
    routeMapId:{
        type: String,
        optional: true
    },
    stop:{
        type: Object
    },
    'stop.type': {
        type: String,
        allowedValues: ["Feature"]
    },
    'stop.properties': {
        type: Object
    },
    'stop.properties.name': {
        type: String
    },
    'stop.properties.drawOrder': {
        type: Number
    },
    'stop.properties.embarkingOnly': {
        type: Boolean
    },
    'stop.properties.disembarkingOnly': {
        type: Boolean
    },
    'stop.geometry': {
        type: Object
    },
    'stop.geometry.type': {
        type: String,
        allowedValues: ["Point"]
    },
    'stop.geometry.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        optional: false
    },
});

Routes = new Mongo.Collection('routes');
Routes.schema = new SimpleSchema({
    routeMapId: {
        type: String,
        optional: true
    },
    beaconId: {
        type: String,
        optional: true
    },
    weekDays:{
        type: [Number],
        min: 1,
        max: 7,
        maxCount: 7
    },
    stopsAreReoccurring: {
        type: Boolean
    },
    reoccurringDescription: {
        type: String,
        optional: true
    },
    firstDeparture: {
        type: Date, // Time only
        optional: true
    },
    lastDeparture: {
        type: Date, // Time only
        optional: true
    },
    stopTimetable:{
        type: [Object],
        optional: true
    },
    'stopTimetable.$.stopId': {
        type: String
    },
    'stopTimetable.$.stopName': {
        type: String // Duplicate for simplicity
    },
    'stopTimetable.$.time': {
        type: Date, // Time only
        optional: true
    },
    'stopTimetable.$.minutesOverHour': {
        type: Number, // Used for reoccurring schedules
        optional: true,
        min: 1,
        max: 59
    },
    validFrom:{
        type: Date //Date only
    },
    validTo:{
        type: Date, //Date only
        optional: true
    }
});


RoutesEmbedded = new Mongo.Collection('routesembedded');
RoutesEmbedded.schema = new SimpleSchema({
    title: {
        type: String
    },
    routeNumber: {
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
    validFrom:{
        type: Date //Date only
    },
    validTo:{
        type: Date, //Date only
        optional: true
    },
    beaconId: {
        type: String,
        optional: true
    },
    timetable: {
       type: Object
    },
    'timetable.stopsAreReoccurring': {
        type: Boolean
    },
    'timetable.reoccurringDescription': {
        type: String,
        optional: true
    },
    'timetable.firstDeparture': {
        type: Date, // Time only
        optional: true
    },
    'timetable.lastDeparture': {
        type: Date, // Time only
        optional: true
    },
    'timetable.weekday': {
        type: Number, // Time only
        min: 1,
        max: 7
    },
    'timetable.stopList':{
        type: [Object],
        optional: true
    },
    'timetable.stopList.$.timetableStopId': {
        type: Number
    },
    'timetable.stopList.$.stopId': {
        type: Number
    },
    'timetable.stopList.$.stopName': {
        type: String // Duplicate for simplicity
    },

    'timetable.stopList.$.time': {
        type: Date, // Time only
        optional: true
    },
    'timetable.stopList.$.minutesOverHour': {
        type: Number, // Used for reoccurring schedules
        optional: true,
        min: 1,
        max: 59
    },
    stops:{
        type: [Object]
    },
    'stops.$.type': {
        type: String,
        allowedValues: ["Feature"]
    },
    'stops.$.properties': {
        type: Object
    },
    'stops.$.properties.stopId': {
        type: Number
    },
    'stops.$.properties.name': {
        type: String
    },
    'stops.$.properties.drawOrder': {
        type: Number
    },
    'stops.$.properties.embarkingAllowed': {
        type: Boolean
    },
    'stops.$.properties.disembarkingAllowed': {
        type: Boolean
    },
    'stops.$.geometry': {
        type: Object
    },
    'stops.$.geometry.type': {
        type: String,
        allowedValues: ["Point"]
    },
    'stops.$.geometry.coordinates': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 3,
        optional: false
    },
    lineString:{
        type: Object
    },
    'lineString.type': {
        type: String,
        allowedValues: ["Feature"]
    },
    'lineString.properties': {
        type: Object
    },
    'lineString.properties.name': {
        type: String
    },
    'lineString.geometry': {
        type: Object
    },
    'lineString.geometry.type': {
        type: String,
        allowedValues: ["LineString"]
    },
    'lineString.geometry.coordinates': {
        type: Array,
    },
    'lineString.geometry.coordinates.$': {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 3,
        optional: false
    },
    createdBy: {
        type: String
    },
    timestamp: {
        type: Date
    }
});


Beacons = new Mongo.Collection('beacons');
Beacons.schema = new SimpleSchema({
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
    saveLocations: {
        type: Boolean
    },
    timestamp: {
        type: Date
    }
});

BeaconHistory = new Mongo.Collection('beaconhistory');
BeaconHistory.schema = new SimpleSchema({
    beaconId:{
        type: String
    },
    routeId:{
        type: String,
        optional: true
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

Bookings = new Mongo.Collection('bookings');
Bookings.schema = new SimpleSchema({
    userId: {
        type: String
    },
    routeId: {
        type: String
    },
    originTimetableStopId: {
        type: String
    },
    destinationTimetableStopId: {
        type: String
    },
    numberOfPax: {
        type: Number,
        optional: true
    },
    confirmationString: {
        type: String,
        optional: true
    }
});































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