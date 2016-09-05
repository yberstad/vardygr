export function getRouteTrackerArrivalList() {
  
  return [
    {
      beaconId: "beaconId_1",
      stopId: "stopId_2",
      time: new Date("1970-01-01T07:00:00.000Z"),
      estimatedArrivalInMin: "5",
      estimatedArrivalInMeters: "2.4"
    },
    {
      beaconId: "beaconId_2",
      stopId: "stopId_2",
      time: new Date("1970-01-01T07:00:00.000Z"),
      estimatedArrivalInMin: null,
      estimatedArrivalInMeters: null
    }
  ];
}