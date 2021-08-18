"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store');
const readingComp = require('../utils/reading-Comp');

const dashboard = {
   index(request, response) {

    logger.info('dashboard rendering');
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

};

module.exports = dashboard;
