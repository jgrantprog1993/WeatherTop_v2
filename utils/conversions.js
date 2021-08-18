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
        windReading = station.readings[i];
      
      
       if(windReading.windSpeed <= 1 ) {
         bft = "0 bft";
       } else if (windReading.windSpeed > 1 && windReading.windSpeed <= 5) {
           bft = "1 bft";
       } else if (windReading.windSpeed >= 6 && windReading.windSpeed <= 11) {
           bft = "2 bft";
      } else if (windReading.windSpeed >= 12 && windReading.windSpeed <= 19) {
           bft = "3 bft";
       } else if (windReading.windSpeed >= 20 && windReading.windSpeed <= 28) {
           bft = "4 bft";
       } else if (windReading.windSpeed >= 29 && windReading.windSpeed <= 38) {
           bft = "5 bft";
       } else if (windReading.windSpeed >= 39 && windReading.windSpeed <= 49) {
           bft = "6 bft";
       } else if (windReading.windSpeed >= 50 && windReading.windSpeed <= 11) {
           bft = "7 bft";
       } else if (windReading.windSpeed >= 62 && windReading.windSpeed <= 74) {
           bft = "8 bft";
       } else if (windReading.windSpeed >= 75 && windReading.windSpeed <= 88) {
           bft = "9 bft";
       } else if (windReading.windSpeed >= 89 && windReading.windSpeed <= 102) {
           bft = "10 bft";
       } else if (windReading.windSpeed >= 103 && windReading.windSpeed <= 117) {
           bft = "11 bft";
       }
        }
      return bft;
    }
  },

};
module.exports = conversions;