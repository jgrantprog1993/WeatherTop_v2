"use strict";

const conversions = require('../utils/conversions');
const stationAnalytics = require('../utils/station-Analytics');
const stationComps = require('../utils/stationComps');
//const stationStore = require('../models/station-store.js');


const readingComp = {


    getReadingComp(station) {
        if (station.readings.length > 0) {
            var latestReading = stationComps.getLatestReading(station);

            station.latestWeatherCode = conversions.getWeatherCode(station);

            station.latestTemp = stationAnalytics.getTemp(station);
            station.latestTempF = conversions.getTempF(station);

            station.latestWindReading = conversions.getWindReading(station);
            station.latestWindDirection = conversions.getWindDirectionTxt(latestReading.windDirection);
            station.latestWindChill = conversions.getWindChillCalc(latestReading.temperature, latestReading.windSpeed)

            station.latestPressure = stationAnalytics.getPressure(station);

            //Station Max & Mins

            station.maxTemp = stationAnalytics.getMaxTemp(station);
            station.minTemp = stationAnalytics.getMinTemp(station);

            station.maxWind = stationAnalytics.getMaxWind(station);
            station.minWind = stationAnalytics.getMinWind(station);

            station.maxPressure = stationAnalytics.getMaxPressure(station);
            station.minPressure = stationAnalytics.getMinPressure(station);

            //Station Icons

            station.weatherIcon = stationAnalytics.getWeatherIcon(latestReading.code);
            station.tempIcon = stationAnalytics.getTempIcon(conversions.getTempF(station));
            station.windIcon = stationAnalytics.getWindIcon(station.latestWindReading);
            station.pressureIcon = stationAnalytics.getPressureIcon(latestReading.pressure);

            //Trends
            station.tempTrend = stationAnalytics.getTempTrend(station);
            station.windTrend = stationAnalytics.getWindTrend(station);
            station.pressureTrend = stationAnalytics.getPressureTrend(station);

        }
    }
};
module.exports = readingComp;