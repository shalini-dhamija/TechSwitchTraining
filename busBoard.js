import fetch from 'node-fetch';
import readline from 'readline-sync';
//https://api.tfl.gov.uk/StopPoint/?lat=51.365242&lon=-0.225926&stopTypes=NaptanPublicBusCoachTram

console.log('\nPlease enter the postcode:');
const input = readline.prompt();

fetch(`https://api.postcodes.io/postcodes/${input}`,{
        method: 'GET',
        headers: {'Cache-Control': 'no-cache',}
})
.then(response => response.json())
    .then(body => {
        //console.log(body);
        let lat = body['result']['latitude'];
        console.log(lat)
        let lon = body['result']['longitude'];
        console.log(lon);
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
                        arrBusStops.push(body['stopPoints'][i]['naptanId']);
                        console.log(arrBusStops);
                }
                for(let j=0;j<arrBusStops.length; j++){
                        fetch(`https://api.tfl.gov.uk/StopPoint/${arrBusStops[j]}/Arrivals`, {
                                method: 'GET',
                        // Request headers
                        headers: {'Cache-Control': 'no-cache',}
                        })
                        .then(response => response.json())
                        .then(body => {
       
                        const lineTime = [];
                        for (let i=0; i<body.length; i++) {
                                
                                lineTime.push([body[i]['lineId'], body[i]['expectedArrival']])
                        }
                        // prints out the next 5 buses at that stop.
                        console.log(lineTime.sort(each=>each[1]));
                });}
                
            });
    });

/*
fetch(`https://api.tfl.gov.uk/StopPoint/${input}/Arrivals`, {
        method: 'GET',
        // Request headers
        headers: {
            'Cache-Control': 'no-cache',}
    })
    .then(response => response.json())
    .then(body => {
        //console.log(body);
        //console.log(body[0]);
        const lineTime = [];
        for (let i=0; i<body.length; i++) {
                
                lineTime.push([body[i]['lineId'], body[i]['expectedArrival']])
        }
        // prints out the next 5 buses at that stop.
        console.log(lineTime.sort(each=>each[1]));
    }
    );
*/