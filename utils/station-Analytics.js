"use strict";

const stationAnalytics = {

  getTemp(station) {
    let latestTemp = null;
    if (station.readings.length > 0) {
      latestTemp = station.readings[0];
      for (let i = 1; i < station.readings.length; i++)
      {
        latestTemp = station.readings[i].temperature;
      }
    }
    return latestTemp;
  },

  getPressure(station) {
    let latestPressure = null;
    if (station.readings.length > 0) {
      latestPressure = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        latestPressure = station.readings[i].pressure;
      }
    }
    return latestPressure;
  },
};
module.exports = stationAnalytics;
 
    
      

  