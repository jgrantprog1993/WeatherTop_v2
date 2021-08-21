'use strict';

const logger = require('../utils/logger');
const stationStore= require('../models/station-store.js');
const dashboard = require('../controllers/dashboard.js');
const readingComp = require('../utils/reading-Comp');
const uuid = require('uuid');

const station = {

    index(request, response) {

        const stationId = request.params.id;
        logger.info('Station id = ' + stationId);
        const viewData = {
            title: 'Station',
            station: stationStore.getStations(stationId),
        };
        response.render('station', viewData);
    },

    addReading(request, response) {
        const stationId = request.params.id;
        const station = stationStore.getStations(stationId);
        const newReading = {
            id: uuid.v1(),
            code: request.body.code,
            temperature: request.body.temperature,
            windSpeed: request.body.windSpeed,
            windDirection: request.body.windDirection,
            pressure: request.body.pressure,
        };

        stationStore.addReading(stationId, newReading);
        readingComp.getReadingComp(station);
        response.redirect('/station/' + stationId);
    },


};

module.exports = station;