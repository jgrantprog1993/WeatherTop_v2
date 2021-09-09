'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const stationStore = {

    store: new JsonStore('./models/station-store.json', {stationCollection: []}),
    collection: 'stationCollection',

    getAllStations() {
        return this.store.findAll(this.collection);
    },

    getStations(id) {
        return this.store.findOneBy(this.collection, {id: id});
    },

    addStation(station) {
        this.store.add(this.collection, station);
        this.store.save();
    },

    removeStation(id) {
        const station = this.getStations(id);
        this.store.remove(this.collection, station);
        this.store.save();
        //_.remove(this.collection, {id: id});
    },

    removeAllStations() {
        this.store.removeAll(this.collection);
        this.store.save();
    },

    addReading(id, reading) {
        const station = this.getStations(id);
        station.readings.push(reading)
        this.store.save();
    },

    removeReading(id, readingId) {
        const station = this.getStations(id);
        //const readings = station.readings;
        _.remove(station.readings, {id: readingId});
        this.store.save();
    },

    getUserStations(userId) {
        return this.store.findBy(this.collection, {userId: userId});
    },
    /*
      orderAlpha(stations)
      {
       _.orderBy(stations, "desc"); >>>>Attempt at sorting alphabetically
       this.store.save();
       return this.store;
      }

     */
};

module.exports = stationStore;