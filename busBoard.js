import fetch from 'node-fetch';
import readline from 'readline-sync';

console.log('\nPlease enter the postcode:');
const input = readline.prompt();

fetch(`https://api.postcodes.io/postcodes/${input}`,{
        method: 'GET',
        headers: {'Cache-Control': 'no-cache',}
})
.then(response => response.json())
    .then(body => {
        let lat = body['result']['latitude'];
        //console.log(lat)
        let lon = body['result']['longitude'];
        //console.log(lon);
        fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram`, {
                method: 'GET',
                // Request headers
                headers: {
                    'Cache-Control': 'no-cache',}
            })
            .then(response => response.json())
            .then(body => {
                let arrBusStops = [];
                for(let i=0; i<body['stopPoints'].length; i++){
                        arrBusStops.push({naptanId:body['stopPoints'][i]['naptanId'],indicator:body['stopPoints'][i]['indicator'],distance:body['stopPoints'][i]['distance']});
                }
                arrBusStops.sort(function(x, y){return x.distance - y.distance});
                //console.log(arrBusStops.length)
                for(let j=0;j<arrBusStops.length; j++){
                        console.log(arrBusStops)
                        console.log(arrBusStops[j]['naptanId']);
                        fetch(`https://api.tfl.gov.uk/StopPoint/${arrBusStops[j]['naptanId']}/Arrivals`, {
                                method: 'GET',
                        // Request headers
                        headers: {'Cache-Control': 'no-cache',}
                        })
                        .then(response => response.json())
                        .then(body => {
       
                        const lineTime = [];
                        for (let i=0; i<body.length; i++) {
                                
                                lineTime.push({lineId:body[i]['lineId'], expectedArrival:body[i]['expectedArrival']})
                        }
                        lineTime.sort(function(x, y){return new Date(x.expectedArrival) - new Date(y.expectedArrival)});
                        // prints out the next 5 buses at that stop.
                        console.log(lineTime);
                });}
                
            });
    });

    function sortObj(obj) {
        return Object.keys(obj).sort().reduce(function (result, key) {
          result[key] = obj[key];
          return result;
        }, {});
      }