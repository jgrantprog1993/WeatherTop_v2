"use strict";

const stationComps = {

    getLatestReading(station)
    {
        let latestReading = null;
        if (station.readings.length > 0)
        {
            latestReading = station.readings[0];
            for (let i = 1; i < station.readings.length; i++)
            {
                latestReading = station.readings[i];
            }
        }
        return latestReading;
    },

};
module.exports = stationComps;
