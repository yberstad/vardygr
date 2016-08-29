// If you're running on a device or in the Android simulator be sure to change
//let METEOR_URL = 'ws://localhost:3000/websocket';
//let METEOR_URL = 'ws://192.168.1.35:3000/websocket';
let METEOR_URL = 'ws://localhost:3000/websocket';

if (process.env.NODE_ENV === 'production') {
  METEOR_URL = ''; // your production server url
}

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL,
};

export default settings;

export function geoLoationConfig() {
  return {
    license: 'dbfe704707b5bde746ca0cf0e5f4971b834b927d1572fbe2eee5f574b9893c0c',
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 1,
    disableElasticity: true, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
    locationUpdateInterval: 5000,
    minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change
    fastestLocationUpdateInterval: 5000,
    activityRecognitionInterval: 10000,
    activityType: 'Fitness',
    disableStopDetection: true,
    // Application config,
    stopDetectionDelay: 30,
    debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
    forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user)
    forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user)
    forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user)
    stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
    startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.
    pausesLocationUpdatesAutomatically: false,
    stopTimeout: 30,
    // HTTP / SQLite config
    // url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
    // batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
    autoSync: false,         // <-- [Default: true] Set true to sync each location to server as it arrives.
    // maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
    // headers: {
    //     "X-FOO": "bar"
    // },
    // params: {
    //     "auth_token": "maybe_your_server_authenticates_via_token_YES?"
    // }
  };
}
