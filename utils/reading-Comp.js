"use strict";

const conversions = require('../utils/conversions');
const stationAnalytics = require('../utils/station-Analytics');

const readingComp = {

    getReadingComp(station)
    {
        station.latestWeatherCode = conversions.getWeatherCode(station);
      
        station.latestTemp = stationAnalytics.getTemp(station);
        station.latestTempF = conversions.getTempF(station);

        station.latestWindReading = conversions.getWindReading(station);

        station.latestPressure = stationAnalytics.getPressure(station);

    }
};
 module.exports = readingComp;