'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require("../models/station-store");

const accounts = {

    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
        };
        response.cookie("cookieUserEmail", "");
        response.render('index', viewData);
    },

    login(request, response) {

        const viewData = {
            title: "Login to the Service"
        };
        response.cookie("cookieUserEmail", "");
        response.render("login", viewData);
    },

    logout(request, response) {
        response.cookie("cookieUserEmail", "");
        response.redirect("/");
    },

    signup(request, response) {
        const viewData = {
            title: "Signup to the Service"
        };
        response.render("signup", viewData);
    },

    register(request, response) {
        const user = request.body;
        user.id = uuid.v1();
        userstore.addUser(user);
        logger.info(`registering ${user.email}`);
        response.redirect("/");
    },

    authenticate(request, response) {
        const user = userstore.getUserByEmail(request.body.email);
        const password = userstore.getUserByPassword(request.body.password);

        if (user && request.body.password === user.password) {
            response.cookie('cookieUserEmail', user.email);
            console.log(`logging in : ' + ${user.email}`);
            response.redirect("/dashboard");
        } else {
            response.redirect("/login");
        }
    },

    getCurrentUser(request) {
        //console.log("This is a test : " + request.cookies.cookieUserEmail);
        let user = request.cookies.cookieUserEmail;
        return userstore.getUserByEmail(user);
    },

    user(request, response) {
        let user = accounts.getCurrentUser(request);

        const viewData = {
            password: user.password,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            //stations: user.stations,
            // readings: user.stations.readings,
        };

        console.log("pW : " + user.password);
        console.log("email:" + user.email);
        console.log("firstname: " + user.firstname);
        console.log("lastname : " + user.lastname);
        response.render("editUser", viewData);


    },

    editLoggedInUser(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        //let stations = stationStore.getUserStations(user.id);
        loggedInUser.firstname = request.body.firstname;
        loggedInUser.lastname = request.body.lastname;
        loggedInUser.email = request.body.email;
        loggedInUser.password = request.body.password;

        userstore.saveStore();
        response.redirect("/login");


    },

};

module.exports = accounts;
