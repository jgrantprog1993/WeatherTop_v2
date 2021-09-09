'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const dashboard = require('../controllers/dashboard.js');
const readingComp = require('../utils/reading-Comp');
const stationAnalytics = require('../utils/station-Analytics');
const uuid = require('uuid');
const axios = require("axios");

const station = {


    index(request, response) {

        const stationId = request.params.id;
        //logger.info('Station id = ' + stationId);

        const station = stationStore.getStations(stationId);
        const maxTemp = stationAnalytics.getMaxTemp(station);
        const minTemp = stationAnalytics.getMinTemp(station);
      const lat = station.lat;
      const lng = station.lng;
        readingComp.getReadingComp(station);
        let report = {};
        const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=d0e81b222b07ba19597172d040fb609e`
        const result = axios.get(oneCallRequest);
          if (result.status == 200) {
            const reading = result.data.current;
            console.log(result.data);
              report.tempTrend = [];
              report.trendLabels = [];
              
             const trends = result.data.daily;
              for (let i = 0; i < trends.length; i++) {
                report.tempTrend.push(trends[i].temp.day);

                const date = new Date(trends[i].dt * 1000);
                report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);

              }
          }

        const viewData = {
            title: 'Station',
            station: station,
            report: report,
            lat: station.lat,
            lng: station.lng,

            latestWeatherCode: station.latestWeatherCode,
            weatherIcon: station.weatherIcon,
            weatherIconNum: station.weatherIconNum,


            maxTemp: maxTemp,
            minTemp: minTemp,
            latestTemp: station.latestTemp,
            latestTempF: station.latestTempF,
            tempIcon: station.tempIcon,

            latestWindDirection: station.latestWindDirection,
            latestWindReading: station.latestWindReading,
            latestWindChill: station.latestWindChill,
            windIcon: station.windIcon,
            maxWind: station.maxWind,
            minWind: station.minWind,

            latestPressure: station.latestPressure,
            maxPressure: station.maxPressure,
            minPressure: station.minPressure,
            pressureIcon: station.pressureIcon,

            tempTrend: station.tempTrend,
            windTrend: station.windTrend,
            pressureTrend: station.pressureTrend,

        };

        response.render('station', viewData);
    },

    addReading(request, response) {
        const stationId = request.params.id;
        const station = stationStore.getStations(stationId);
        let dateTime = new Date();

        const newReading = {
            id: uuid.v1(),
            code: request.body.code,
            temperature: request.body.temperature,
            windSpeed: request.body.windSpeed,
            windDirection: request.body.windDirection,
            pressure: request.body.pressure,
            date: dateTime,
        };

        stationStore.addReading(stationId, newReading);
        readingComp.getReadingComp(station);
        response.redirect('/station/' + stationId);
    },

    deleteReading(request, response) {
        const stationId = request.params.id;
        const readingId = request.params.readingid;
        console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
        stationStore.removeReading(stationId, readingId);
        response.redirect('/station/' + stationId);
    },

    async addreport(request, response) {
        logger.info("rendering new report");
        const stationId = request.params.id;
        const station = stationStore.getStations(stationId)
        const dateTime = new Date();
        let report = {};
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${station.lat}&lon=${station.lng}&units=metric&appid=d0e81b222b07ba19597172d040fb609e`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            console.log(result.data);
            const reading = result.data.current;
            report.id = uuid.v1();
            report.code = reading.weather[0].id;
            report.temperature = reading.temp;
            report.windSpeed = reading.wind_speed;
            report.pressure = reading.pressure;
            report.windDirection = reading.wind_deg;
            report.date = dateTime;
          

           
            console.log(report);
            stationStore.addReading(stationId, report);
            response.redirect("/station/" + stationId);
        }

    }
};

module.exports = station;