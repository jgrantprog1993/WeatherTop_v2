"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store');
const readingComp = require('../utils/reading-Comp');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const station = require("./station");
const axios = require("axios");

const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=d0e81b222b07ba19597172d040fb609e`

const dashboard = {
    index(request, response) {
        //  logger.info('dashboard rendering');
        const loggedInUser = accounts.getCurrentUser(request);
        let stations = stationStore.getUserStations(loggedInUser.id);


        let stationsAlpha = stations.sort((a, b) => {            //used https://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-in-javascript and
            // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            let aa = a.name;
            let bb = b.name;
            return aa.toLowerCase().localeCompare(bb.toLowerCase());
        })
        const mapsDetails = [];
        for (let i = 0; i < stations.length; i++) {
            let station = stations[i];
            if (station.readings.length > 0) {
                readingComp.getReadingComp(station);

            }
        }

        const viewData =
            {
                title: 'Station Dashboard',
                stations: stationsAlpha, //stationStore.getUserStations(loggedInUser.id),

                //lat: stations.lat,
                //lng: stations.lng,

            };

        response.render('dashboard', viewData);
    },

    addStation(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);

        const newStation = {

            id: uuid.v1(),
            userId: loggedInUser.id,
            name: request.body.name,
            lat: request.body.lat,
            lng: request.body.lng,
            readings: [],

        };
        logger.debug("Creating a new Station", newStation);
        stationStore.addStation(newStation);
        response.redirect('/dashboard');

    },

    deleteStation(request, response) {
        const stationId = request.params.id;
        console.log(`Deleting Station ${stationId}`);
        console.log("stationId: " + stationId);
        stationStore.removeStation(stationId);
        response.redirect('/dashboard');
    },

};
module.exports = dashboard;
