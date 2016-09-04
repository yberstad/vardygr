
export function getBeaconList(route) {
  var beaconList = [];
  if(route){
    route.timetable.map(timetable => {
      if(timetable.beaconId){
        beaconList.push(timetable.beaconId);
      }
    })
  }
  return beaconList;
}


export function getTimetableListForStopId(route, stopId, weekday) {
  var timetableList = [];
  if(route){
    route.timetable.map(timetable => {
      // if weekday is sent in, check that it the correct day in week.
      if(!weekday || timetable.weekday === weekday){
        timetable.stopList.map(stop => {
          if(stop.stopId === stopId)
          {
            timetableList.push({
              timetableStopId: timetable.timetableStopId,
              beaconId: timetable.beaconId,
              stopId: stopId,
              time: stop.time,
              estimatedArrivalInMin: null,
              estimatedArrivalInMeters: null,
            });
          }
        });
      }
    })
  }
  return timetableList;
}
