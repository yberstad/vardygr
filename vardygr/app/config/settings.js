// If you're running on a device or in the Android simulator be sure to change
//let METEOR_URL = 'ws://localhost:3000/websocket';
//let METEOR_URL = 'ws://192.168.1.35:3000/websocket';
// let METEOR_URL = 'ws://localhost:3000/websocket';
let METEOR_URL = 'ws://vardygr.meteorapp.com/websocket';

if (process.env.NODE_ENV === 'production') {
  METEOR_URL = 'ws://vardygr.meteorapp.com/websocket'; // your production server url
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
    stationaryRadius: 20,
    distanceFilter: 10,
    minimumActivityRecognitionConfidence: 70,   // 0-100%.  Minimum activity-confidence for a state-change
    fastestLocationUpdateInterval: 5000,
    activityRecognitionInterval: 10000,
    activityType: 'Fitness',
    stopDetectionDelay: 60,
    forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user)
    forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user)
    forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user)
    stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
    startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.
    stopTimeout: 30,
    autoSync: false,         // <-- [Default: true] Set true to sync each location to server as it arrives.
  };
}
