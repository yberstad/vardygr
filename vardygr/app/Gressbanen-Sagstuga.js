export function getRoute() {
    return {
        routeId: 'routeId_1',
        title: "Gressbanen - Sagstuga",
        routeNumber: "Rute nr 1",
        description: "Beskrivelse av bussruta",
        direction: "Sagstuga",
        url: "http://www.vardygr.com",
        validFrom: new Date("2016-10-15T00:00:00.000Z"),
        timetable:[
            {
                beaconId: 'beaconId_1',
                stopsAreReoccurring: false,
                weekday: 1,
                stopList: [
                    {
                        timetableStopId: 'timetableStopId_1',
                        stopId: 'stopId_1',
                        stopName: "Gressbanen",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T06:45:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_2',
                        stopId: 'stopId_2',
                        stopName: "Arnebråtveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:00:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_3',
                        stopId: 'stopId_3',
                        stopName: "Amagerveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:15:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_4',
                        stopId: 'stopId_4',
                        stopName: "Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:15:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_5',
                        stopId: 'stopId_5',
                        stopName: "Nordre Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:40:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_6',
                        stopId: 'stopId_6',
                        stopName: "Sagstuga",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:50:00.000Z")
                    }
                ]
            },
            {
                beaconId: 'beaconId_2',
                stopsAreReoccurring: false,
                weekday: 1,
                stopList: [
                    {
                        timetableStopId: 'timetableStopId_13',
                        stopId: 'stopId_1',
                        stopName: "Gressbanen",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T06:45:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_14',
                        stopId: 'stopId_2',
                        stopName: "Arnebråtveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:00:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_15',
                        stopId: 'stopId_3',
                        stopName: "Amagerveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:15:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_16',
                        stopId: 'stopId_4',
                        stopName: "Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:15:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_16',
                        stopId: 'stopId_5',
                        stopName: "Nordre Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:40:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_18',
                        stopId: 'stopId_6',
                        stopName: "Sagstuga",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T07:50:00.000Z")
                    }
                ]
            }
        ],
        lineString: {
            type: "Feature",
            properties: {
                name: ""
            },
            geometry: {
                type: "LineString",
                coordinates:[
                    [
                        10.64957,
                        59.96036
                    ],
                    [
                        10.64973,
                        59.96031
                    ],
                    [
                        10.65004,
                        59.96018
                    ],
                    [
                        10.6502,
                        59.9601
                    ],
                    [
                        10.6505,
                        59.95992
                    ],
                    [
                        10.65061,
                        59.95984
                    ],
                    [
                        10.65084,
                        59.95964
                    ],
                    [
                        10.65093,
                        59.95955
                    ],
                    [
                        10.65108,
                        59.95934
                    ],
                    [
                        10.65118,
                        59.95914
                    ],
                    [
                        10.65119,
                        59.95912
                    ],
                    [
                        10.65121,
                        59.95904
                    ],
                    [
                        10.65124,
                        59.95879
                    ],
                    [
                        10.65131,
                        59.95847
                    ],
                    [
                        10.65135,
                        59.95835
                    ],
                    [
                        10.65143,
                        59.95822
                    ],
                    [
                        10.65151,
                        59.95812
                    ],
                    [
                        10.65162,
                        59.95799
                    ],
                    [
                        10.65183,
                        59.95779
                    ],
                    [
                        10.65207,
                        59.95759
                    ],
                    [
                        10.65225,
                        59.95747
                    ],
                    [
                        10.65242,
                        59.95737
                    ],
                    [
                        10.65257,
                        59.95729
                    ],
                    [
                        10.65274,
                        59.95719
                    ],
                    [
                        10.65287,
                        59.95713
                    ],
                    [
                        10.65309,
                        59.95704
                    ],
                    [
                        10.65353,
                        59.95688
                    ],
                    [
                        10.65393,
                        59.95674
                    ],
                    [
                        10.65409,
                        59.95668
                    ],
                    [
                        10.65423,
                        59.95663
                    ],
                    [
                        10.65441,
                        59.95658
                    ],
                    [
                        10.65472,
                        59.95647
                    ],
                    [
                        10.65499,
                        59.95638
                    ],
                    [
                        10.65531,
                        59.95626
                    ],
                    [
                        10.65544,
                        59.95622
                    ],
                    [
                        10.65557,
                        59.95618
                    ],
                    [
                        10.6556,
                        59.95617
                    ],
                    [
                        10.65562,
                        59.95617
                    ],
                    [
                        10.65549,
                        59.95607
                    ],
                    [
                        10.65535,
                        59.95594
                    ],
                    [
                        10.65531,
                        59.95589
                    ],
                    [
                        10.65531,
                        59.95583
                    ],
                    [
                        10.65533,
                        59.95579
                    ],
                    [
                        10.65537,
                        59.95575
                    ],
                    [
                        10.6555,
                        59.95569
                    ],
                    [
                        10.65571,
                        59.95559
                    ],
                    [
                        10.6561,
                        59.95541
                    ],
                    [
                        10.65643,
                        59.95527
                    ],
                    [
                        10.65698,
                        59.95503
                    ],
                    [
                        10.65713,
                        59.95496
                    ],
                    [
                        10.65723,
                        59.95492
                    ],
                    [
                        10.65744,
                        59.95481
                    ],
                    [
                        10.6576,
                        59.9547
                    ],
                    [
                        10.65769,
                        59.95464
                    ],
                    [
                        10.65781,
                        59.95453
                    ],
                    [
                        10.65787,
                        59.95445
                    ],
                    [
                        10.65793,
                        59.95435
                    ],
                    [
                        10.65795,
                        59.9543
                    ],
                    [
                        10.65799,
                        59.95422
                    ],
                    [
                        10.65804,
                        59.95401
                    ],
                    [
                        10.6581,
                        59.95388
                    ],
                    [
                        10.65815,
                        59.95377
                    ],
                    [
                        10.65826,
                        59.95357
                    ],
                    [
                        10.65839,
                        59.9534
                    ],
                    [
                        10.65846,
                        59.95333
                    ],
                    [
                        10.65854,
                        59.95325
                    ],
                    [
                        10.65875,
                        59.9531
                    ],
                    [
                        10.65901,
                        59.95295
                    ],
                    [
                        10.65922,
                        59.95284
                    ],
                    [
                        10.65939,
                        59.95278
                    ],
                    [
                        10.65957,
                        59.95273
                    ],
                    [
                        10.65972,
                        59.95269
                    ],
                    [
                        10.66028,
                        59.95257
                    ],
                    [
                        10.66064,
                        59.9525
                    ],
                    [
                        10.66106,
                        59.9524
                    ],
                    [
                        10.66115,
                        59.95237
                    ],
                    [
                        10.66121,
                        59.95236
                    ],
                    [
                        10.66127,
                        59.95234
                    ],
                    [
                        10.66162,
                        59.95222
                    ],
                    [
                        10.66207,
                        59.95207
                    ],
                    [
                        10.66235,
                        59.95196
                    ],
                    [
                        10.66249,
                        59.95192
                    ],
                    [
                        10.66264,
                        59.95186
                    ],
                    [
                        10.66306,
                        59.95171
                    ],
                    [
                        10.66322,
                        59.95165
                    ],
                    [
                        10.66341,
                        59.95159
                    ],
                    [
                        10.66378,
                        59.95147
                    ],
                    [
                        10.66419,
                        59.95134
                    ],
                    [
                        10.66434,
                        59.95128
                    ],
                    [
                        10.66449,
                        59.95122
                    ],
                    [
                        10.66452,
                        59.95121
                    ],
                    [
                        10.66456,
                        59.9512
                    ],
                    [
                        10.66495,
                        59.95106
                    ],
                    [
                        10.66532,
                        59.95093
                    ],
                    [
                        10.66557,
                        59.95085
                    ],
                    [
                        10.6657,
                        59.9508
                    ],
                    [
                        10.66604,
                        59.95069
                    ],
                    [
                        10.66641,
                        59.95056
                    ],
                    [
                        10.66661,
                        59.95049
                    ],
                    [
                        10.66677,
                        59.95059
                    ],
                    [
                        10.66691,
                        59.95066
                    ],
                    [
                        10.66714,
                        59.95074
                    ],
                    [
                        10.66745,
                        59.95084
                    ],
                    [
                        10.66779,
                        59.95094
                    ],
                    [
                        10.66813,
                        59.95104
                    ],
                    [
                        10.6687,
                        59.95121
                    ],
                    [
                        10.66908,
                        59.95132
                    ],
                    [
                        10.66945,
                        59.95144
                    ],
                    [
                        10.6698,
                        59.95153
                    ],
                    [
                        10.67006,
                        59.95158
                    ],
                    [
                        10.67027,
                        59.95161
                    ],
                    [
                        10.67055,
                        59.95163
                    ],
                    [
                        10.67071,
                        59.95164
                    ],
                    [
                        10.67109,
                        59.95165
                    ],
                    [
                        10.6716,
                        59.95167
                    ],
                    [
                        10.67233,
                        59.9517
                    ],
                    [
                        10.67238,
                        59.9517
                    ],
                    [
                        10.67289,
                        59.95173
                    ],
                    [
                        10.67336,
                        59.95175
                    ],
                    [
                        10.67371,
                        59.95177
                    ],
                    [
                        10.6741,
                        59.95179
                    ],
                    [
                        10.67435,
                        59.9518
                    ],
                    [
                        10.67453,
                        59.95158
                    ],
                    [
                        10.67469,
                        59.95139
                    ],
                    [
                        10.67487,
                        59.95115
                    ],
                    [
                        10.67506,
                        59.95091
                    ],
                    [
                        10.67517,
                        59.95075
                    ]
                ]
            }
        }
    };
}

export function getReturnRoute() {
    return {
        routeId: 'routeId_2',
        title: "Sagstuga - Gressbanen",
        routeNumber: "Rute nr 2",
        description: "Beskrivelse av bussruta",
        direction: "Gressbanen",
        url: "http://www.vardygr.com",
        validFrom: new Date("2016-10-15T00:00:00.000Z"),
        timetable:[
            {
                beaconId: 'beaconId_3',
                stopsAreReoccurring: false,
                weekday: 1,
                stopList: [
                    {
                        timetableStopId: 'timetableStopId_7',
                        stopId: 'stopId_6',
                        stopName: "Sagstuga",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T16:50:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_8',
                        stopId: 'stopId_5',
                        stopName: "Nordre Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T17:00:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_9',
                        stopId: 'stopId_4',
                        stopName: "Jarbakken",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T17:10:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_10',
                        stopId: 'stopId_3',
                        stopName: "Amagerveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T17:20:00.000Z")
                    },
                    {
                        timetableStopId: 'timetableStopId_11',
                        stopId: 'stopId_2',
                        stopName: "Arnebråtveien",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T17:30:00.000Z")
                    },                    {
                        timetableStopId: 'timetableStopId_12',
                        stopId: 'stopId_1',
                        stopName: "Gressbanen",
                        embarkingAllowed: true,
                        disembarkingAllowed: true,
                        time: new Date("1970-01-01T17:40:00.000Z")
                    },
                ]
            }
        ],
        lineString: {
            type: "Feature",
            properties: {
                name: ""
            },
            geometry: {
                type: "LineString",
                coordinates:[
                    [
                        10.64957,
                        59.96036
                    ],
                    [
                        10.64973,
                        59.96031
                    ],
                    [
                        10.65004,
                        59.96018
                    ],
                    [
                        10.6502,
                        59.9601
                    ],
                    [
                        10.6505,
                        59.95992
                    ],
                    [
                        10.65061,
                        59.95984
                    ],
                    [
                        10.65084,
                        59.95964
                    ],
                    [
                        10.65093,
                        59.95955
                    ],
                    [
                        10.65108,
                        59.95934
                    ],
                    [
                        10.65118,
                        59.95914
                    ],
                    [
                        10.65119,
                        59.95912
                    ],
                    [
                        10.65121,
                        59.95904
                    ],
                    [
                        10.65124,
                        59.95879
                    ],
                    [
                        10.65131,
                        59.95847
                    ],
                    [
                        10.65135,
                        59.95835
                    ],
                    [
                        10.65143,
                        59.95822
                    ],
                    [
                        10.65151,
                        59.95812
                    ],
                    [
                        10.65162,
                        59.95799
                    ],
                    [
                        10.65183,
                        59.95779
                    ],
                    [
                        10.65207,
                        59.95759
                    ],
                    [
                        10.65225,
                        59.95747
                    ],
                    [
                        10.65242,
                        59.95737
                    ],
                    [
                        10.65257,
                        59.95729
                    ],
                    [
                        10.65274,
                        59.95719
                    ],
                    [
                        10.65287,
                        59.95713
                    ],
                    [
                        10.65309,
                        59.95704
                    ],
                    [
                        10.65353,
                        59.95688
                    ],
                    [
                        10.65393,
                        59.95674
                    ],
                    [
                        10.65409,
                        59.95668
                    ],
                    [
                        10.65423,
                        59.95663
                    ],
                    [
                        10.65441,
                        59.95658
                    ],
                    [
                        10.65472,
                        59.95647
                    ],
                    [
                        10.65499,
                        59.95638
                    ],
                    [
                        10.65531,
                        59.95626
                    ],
                    [
                        10.65544,
                        59.95622
                    ],
                    [
                        10.65557,
                        59.95618
                    ],
                    [
                        10.6556,
                        59.95617
                    ],
                    [
                        10.65562,
                        59.95617
                    ],
                    [
                        10.65549,
                        59.95607
                    ],
                    [
                        10.65535,
                        59.95594
                    ],
                    [
                        10.65531,
                        59.95589
                    ],
                    [
                        10.65531,
                        59.95583
                    ],
                    [
                        10.65533,
                        59.95579
                    ],
                    [
                        10.65537,
                        59.95575
                    ],
                    [
                        10.6555,
                        59.95569
                    ],
                    [
                        10.65571,
                        59.95559
                    ],
                    [
                        10.6561,
                        59.95541
                    ],
                    [
                        10.65643,
                        59.95527
                    ],
                    [
                        10.65698,
                        59.95503
                    ],
                    [
                        10.65713,
                        59.95496
                    ],
                    [
                        10.65723,
                        59.95492
                    ],
                    [
                        10.65744,
                        59.95481
                    ],
                    [
                        10.6576,
                        59.9547
                    ],
                    [
                        10.65769,
                        59.95464
                    ],
                    [
                        10.65781,
                        59.95453
                    ],
                    [
                        10.65787,
                        59.95445
                    ],
                    [
                        10.65793,
                        59.95435
                    ],
                    [
                        10.65795,
                        59.9543
                    ],
                    [
                        10.65799,
                        59.95422
                    ],
                    [
                        10.65804,
                        59.95401
                    ],
                    [
                        10.6581,
                        59.95388
                    ],
                    [
                        10.65815,
                        59.95377
                    ],
                    [
                        10.65826,
                        59.95357
                    ],
                    [
                        10.65839,
                        59.9534
                    ],
                    [
                        10.65846,
                        59.95333
                    ],
                    [
                        10.65854,
                        59.95325
                    ],
                    [
                        10.65875,
                        59.9531
                    ],
                    [
                        10.65901,
                        59.95295
                    ],
                    [
                        10.65922,
                        59.95284
                    ],
                    [
                        10.65939,
                        59.95278
                    ],
                    [
                        10.65957,
                        59.95273
                    ],
                    [
                        10.65972,
                        59.95269
                    ],
                    [
                        10.66028,
                        59.95257
                    ],
                    [
                        10.66064,
                        59.9525
                    ],
                    [
                        10.66106,
                        59.9524
                    ],
                    [
                        10.66115,
                        59.95237
                    ],
                    [
                        10.66121,
                        59.95236
                    ],
                    [
                        10.66127,
                        59.95234
                    ],
                    [
                        10.66162,
                        59.95222
                    ],
                    [
                        10.66207,
                        59.95207
                    ],
                    [
                        10.66235,
                        59.95196
                    ],
                    [
                        10.66249,
                        59.95192
                    ],
                    [
                        10.66264,
                        59.95186
                    ],
                    [
                        10.66306,
                        59.95171
                    ],
                    [
                        10.66322,
                        59.95165
                    ],
                    [
                        10.66341,
                        59.95159
                    ],
                    [
                        10.66378,
                        59.95147
                    ],
                    [
                        10.66419,
                        59.95134
                    ],
                    [
                        10.66434,
                        59.95128
                    ],
                    [
                        10.66449,
                        59.95122
                    ],
                    [
                        10.66452,
                        59.95121
                    ],
                    [
                        10.66456,
                        59.9512
                    ],
                    [
                        10.66495,
                        59.95106
                    ],
                    [
                        10.66532,
                        59.95093
                    ],
                    [
                        10.66557,
                        59.95085
                    ],
                    [
                        10.6657,
                        59.9508
                    ],
                    [
                        10.66604,
                        59.95069
                    ],
                    [
                        10.66641,
                        59.95056
                    ],
                    [
                        10.66661,
                        59.95049
                    ],
                    [
                        10.66677,
                        59.95059
                    ],
                    [
                        10.66691,
                        59.95066
                    ],
                    [
                        10.66714,
                        59.95074
                    ],
                    [
                        10.66745,
                        59.95084
                    ],
                    [
                        10.66779,
                        59.95094
                    ],
                    [
                        10.66813,
                        59.95104
                    ],
                    [
                        10.6687,
                        59.95121
                    ],
                    [
                        10.66908,
                        59.95132
                    ],
                    [
                        10.66945,
                        59.95144
                    ],
                    [
                        10.6698,
                        59.95153
                    ],
                    [
                        10.67006,
                        59.95158
                    ],
                    [
                        10.67027,
                        59.95161
                    ],
                    [
                        10.67055,
                        59.95163
                    ],
                    [
                        10.67071,
                        59.95164
                    ],
                    [
                        10.67109,
                        59.95165
                    ],
                    [
                        10.6716,
                        59.95167
                    ],
                    [
                        10.67233,
                        59.9517
                    ],
                    [
                        10.67238,
                        59.9517
                    ],
                    [
                        10.67289,
                        59.95173
                    ],
                    [
                        10.67336,
                        59.95175
                    ],
                    [
                        10.67371,
                        59.95177
                    ],
                    [
                        10.6741,
                        59.95179
                    ],
                    [
                        10.67435,
                        59.9518
                    ],
                    [
                        10.67453,
                        59.95158
                    ],
                    [
                        10.67469,
                        59.95139
                    ],
                    [
                        10.67487,
                        59.95115
                    ],
                    [
                        10.67506,
                        59.95091
                    ],
                    [
                        10.67517,
                        59.95075
                    ]
                ]
            }
        }
    };
}

export function getStops(){
    var stops = [];
    stops.push(
        {
            stopId: 'stopId_1',
            name: "Gressbanen",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6751743,
                    59.9507501
                ]
            }
        });
    stops.push(
        {
            stopId: 'stopId_2',
            name: "Arnebråtveien",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6655679,
                    59.9508495
                ]
            }
        });
    stops.push(
        {
            stopId: 'stopId_3',
            name: "Amagerveien",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6624912,
                    59.9519154
                ]
            }
        });
    stops.push(
        {
            stopId: 'stopId_4',
            name: "Jarbakken",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6571277,
                    59.9549596
                ]
            }
        });
    stops.push(
        {
            stopId: 'stopId_5',
            name: "Nordre Jarbakken",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6542328,
                    59.9566339
                ]
            }
        });
    stops.push(
        {
            stopId: 'stopId_6',
            name: "Sagstuga",
            geometry: {
                type: "Point",
                coordinates: [
                    10.6495671,
                    59.9603567
                ]
            }
        });
    return stops;
}

export function getBeacons(){
    var beacons = [];
    beacons.push(
        {
            beaconId: 'beaconId_1',
            saveLocations: false,
            geometry: {
                type: "Point",
                coordinates: [
                    0,
                    0
                ]
            }
        });
    beacons.push(
        {
            beaconId: 'beaconId_2',
            saveLocations: false,
            geometry: {
                type: "Point",
                coordinates: [
                    0,
                    0
                ]
            }
        });
    beacons.push(
        {
            beaconId: 'beaconId_3',
            saveLocations: false,
            geometry: {
                type: "Point",
                coordinates: [
                    0,
                    0
                ]
            }
        });
    return beacons;
}
