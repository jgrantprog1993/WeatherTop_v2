"use strict";

const logger = require("../utils/logger");
const stationComps = require('../utils/stationComps');

const conversions = {

    getWeatherCode(station)
    {
        let weatherCodeTxt = "";
        let weatherCodeNum = null;

        if (station.readings.length > 0)
        {
            weatherCodeNum = station.readings[0].code;
            for (let i = 0; i < station.readings.length; i++)
            {
                weatherCodeNum = station.readings[i].code;
            }
            let weatherHM = new Map();
            weatherHM.set(100, "Clear");
            weatherHM.set(200, "Partial Clouds");
            weatherHM.set(300, "Cloudy");
            weatherHM.set(400, "Light Showers");
            weatherHM.set(500, "Heavy Showers");
            weatherHM.set(600, "Rain");
            weatherHM.set(700, "Snow");
            weatherHM.set(700, "Thunder");
            // console.log("results of HM -" + weatherHM.get(Number(weatherCodeNum))); //https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript

            weatherCodeTxt = weatherHM.get(Number(weatherCodeNum));             //https://medium.com/@martin.crabtree/javascript-tracking-key-value-pairs-using-hashmaps-7de6df598257

        }
        return weatherCodeTxt;
    },


    getTempF(station) {
        let TempF = null;
        if (station.readings.length > 0) {
            TempF = station.readings[0].temperature;
            for (let i = 1; i < station.readings.length; i++) {
                TempF = station.readings[i].temperature * 9 / 5 + 32;
            }
        }
        return TempF ;
    },

    getWindReading(station) {
        let windReading = null;
        let bft = "";

        if (station.readings.length > 0) {
            windReading = station.readings[0];
            for (let i = 1; i < station.readings.length; i++) {
                windReading = station.readings[i].windSpeed;


                if(windReading <= 1 ) {
                    bft = "0 bft";
                } else if (windReading > 1 && windReading <= 5) {
                    bft = "1 bft";
                } else if (windReading >= 6 && windReading <= 11) {
                    bft = "2 bft";
                } else if (windReading >= 12 && windReading <= 19) {
                    bft = "3 bft";
                } else if (windReading >= 20 && windReading <= 28) {
                    bft = "4 bft";
                } else if (windReading >= 29 && windReading <= 38) {
                    bft = "5 bft";
                } else if (windReading >= 39 && windReading <= 49) {
                    bft = "6 bft";
                } else if (windReading >= 50 && windReading <= 11) {
                    bft = "7 bft";
                } else if (windReading >= 62 && windReading <= 74) {
                    bft = "8 bft";
                } else if (windReading >= 75 && windReading <= 88) {
                    bft = "9 bft";
                } else if (windReading >= 89 && windReading <= 102) {
                    bft = "10 bft";
                } else if (windReading >= 103 && windReading <= 117) {
                    bft = "11 bft";
                }
            }
            return bft;
        }
    },


    getWindDirectionTxt(windDirection)
    {
        var windDirectionTxt = "";

        if ((windDirection <= 11.25 && windDirection > 0) ||  (windDirection > 348.75 && windDirection <= 360))
        {
            windDirectionTxt = "N";
        } else if (windDirection > 11.25 && windDirection <= 33.75) {
            windDirectionTxt = "NNE";
        } else if (windDirection > 33.75 && windDirection <= 56.25) {
            windDirectionTxt = "NE";
        } else if (windDirection > 56.25 && windDirection <= 78.25) {
            windDirectionTxt = "ENE";
        } else if (windDirection > 78.25 && windDirection <= 101.25) {
            windDirectionTxt = "E";
        } else if (windDirection > 101.25 && windDirection <= 123.75) {
            windDirectionTxt = "ESE";
        } else if (windDirection > 123.75 && windDirection <= 146.25) {
            windDirectionTxt = "SE";
        } else if (windDirection > 146.25 && windDirection <= 168.75) {
            windDirectionTxt = "SSE";
        } else if (windDirection > 168.75 && windDirection <= 191.25) {
            windDirectionTxt = "S";
        } else if (windDirection > 191.25 && windDirection <= 213.75) {
            windDirectionTxt = "SSW";
        } else if (windDirection > 213.75 && windDirection <= 236.25) {
            windDirectionTxt = "SW";
        } else if (windDirection > 236.25 && windDirection <= 258.75) {
            windDirectionTxt = "WSW";
        } else if (windDirection > 258.75 && windDirection <= 281.25) {
            windDirectionTxt = "W";
        } else if (windDirection > 281.25 && windDirection <= 303.75) {
            windDirectionTxt = "WNW";
        } else if (windDirection > 303.75 && windDirection <= 326.25) {
            windDirectionTxt = "NW";
        } else if (windDirection > 326.25 && windDirection <= 348.75) {
            windDirectionTxt = "NNW";
        }
        else{
            windDirectionTxt = "Invalid Direction";
        }
        //console.log("windDirectionTxt = " + windDirectionTxt );
        return windDirectionTxt;
    },

    getWindChillCalc(tempC, windKmpHr)
    {
        var mid1 = Math.pow(windKmpHr, 0.16);
        //console.log(mid1);
        var windChillCalc = 13.12 + (0.6215*tempC) - (11.37*(mid1)) + ((0.3965*tempC)*(mid1));
        var windChill_5Ddps = windChillCalc.toFixed(5);                                            ///https://www.w3schools.com/jsref/jsref_tofixed.asp
        console.log("wINDcHILE = " + windChill_5Ddps);

        return windChill_5Ddps;

    }

};
module.exports = conversions;