"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store');
const readingComp = require('../utils/reading-Comp');
const uuid = require('uuid');

const dashboard = {
    index(request, response) {

        // logger.info('dashboard rendering');
        const stations = stationStore.getAllStations();

        for (let i=0; i<stations.length; i++)
        {
            let station = stations[i];
            if (station.readings.length > 0)
            {
                readingComp.getReadingComp(station);
            }
        }

        const viewData =
            {
                title: 'Station Dashboard',
                stations: stationStore.getAllStations(),
            };

        // logger.info('about to render', stationStore.getAllStations());
        response.render('dashboard', viewData);
    },

    addStation(request, response)
    {
        const newStation = {

            id: uuid.v1(),
            name: request.body.name,
            readings: [],

        };
        logger.debug("Creating a new Station", newStation);
        stationStore.addStation(newStation);
        response.redirect('/dashboard');

    }
};
module.exports = dashboard;
