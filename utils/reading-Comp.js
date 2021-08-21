"use strict";

const conversions = require('../utils/conversions');
const stationAnalytics = require('../utils/station-Analytics');
const stationComps = require('../utils/stationComps');

const readingComp = {

    getReadingComp(station)
    {
        var latestReading = stationComps.getLatestReading(station);

        station.latestWeatherCode = conversions.getWeatherCode(station);

        station.latestTemp = stationAnalytics.getTemp(station);
        station.latestTempF = conversions.getTempF(station);

        station.latestWindReading = conversions.getWindReading(station);
        station.latestWindDirection = conversions.getWindDirectionTxt(latestReading.windDirection);
        station.latestWindChill = conversions.getWindChillCalc(latestReading.temperature, latestReading.windSpeed )

        station.latestPressure = stationAnalytics.getPressure(station);

    }
};
module.exports = readingComp;