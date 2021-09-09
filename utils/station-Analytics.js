"use strict";

const stationAnalytics = {

    getTemp(station) {
        let latestTemp = null;
        if (station.readings.length > 0) {
            latestTemp = station.readings[0].temperature;
            for (let i = 1; i < station.readings.length; i++) {
                latestTemp = station.readings[i].temperature;
            }
        }
        return latestTemp;
    },

    getPressure(station) {
        let latestPressure = null;
        if (station.readings.length > 0) {
            latestPressure = station.readings[0].pressure;
            for (let i = 1; i < station.readings.length; i++) {
                latestPressure = station.readings[i].pressure;
            }
        }
        return latestPressure;
    },


    getMaxWind(station) {

        if (station.readings.length > 0) {
            let maxReading = Number(station.readings[0].windSpeed);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].windSpeed) > maxReading) {
                    maxReading = Number(station.readings[i].windSpeed);
                }
            }
            return maxReading;
        } else {
            return "";
        }
    },

    getMinWind(station) {

        if (station.readings.length > 0) {
            let minReading = Number(station.readings[0].windSpeed);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].windSpeed) < minReading) {
                    minReading = Number(station.readings[i].windSpeed);
                }
            }
            return minReading;
        } else {
            return "";
        }
    },

    getMaxPressure(station) {

        if (station.readings.length > 0) {
            let maxReading = Number(station.readings[0].pressure);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].pressure) > maxReading) {
                    maxReading = Number(station.readings[i].pressure);
                }
            }
            return maxReading;
        } else {
            return "";
        }
    },

    getMinPressure(station) {

        if (station.readings.length > 0) {
            let minReading = Number(station.readings[0].pressure);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].pressure) < minReading) {
                    minReading = Number(station.readings[i].pressure);
                }
            }
            return minReading;
        } else {
            return "";
        }
    },

    getMaxTemp(station) {

        if (station.readings.length > 0) {
            let maxReading = Number(station.readings[0].temperature);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].temperature) > maxReading) {
                    maxReading = Number(station.readings[i].temperature);
                }
            }
            return maxReading;
        } else {
            return "";
        }
    },

    getMinTemp(station) {

        if (station.readings.length > 0) {
            let minReading = Number(station.readings[0].temperature);
            for (let i = 1; i < station.readings.length; i++) {
                if (Number(station.readings[i].temperature) < minReading) {
                    minReading = Number(station.readings[i].temperature);
                }
            }
            return minReading;
        } else {
            return "";
        }
    },

    getWeatherIcon(code) {
        code = Number(code);
        //console.log("Code is : " + code);
        let weatherIcon = "";
        switch (code) {
            case 100:
                weatherIcon = "ui right floated fitted inverted yellow huge sun outline icon";
                break;
            case 200:
                weatherIcon = "ui right floated fitted inverted orange huge loud sun icon corner add cloud icon";
                break;
            case 300:
                weatherIcon = "ui right floated fitted inverted grey huge cloud icon";
                break;
            case 400:
                weatherIcon = "ui right floated fitted inverted inverted huge cloud rain icon";
                break;
            case 500:
                weatherIcon = "ui right floated fitted inverted huge cloud showers heavy icon";
                break;
            case 600:
                weatherIcon = "ui right floated fitted inverted huge secondary cloud rain icon";
                break;
            case 700:
                weatherIcon = "ui right floated fitted inverted huge inverted snowflake icon";
                break;
            case 800:
                weatherIcon = "ui right floated fitted inverted huge yellow bolt icon";
                break;
            case 900:
                weatherIcon = "Varied";
                break;
            default:
                weatherIcon = "Varied";
                break;
        }

        return weatherIcon;
    },

    getTempIcon(temperatureF) {
        let tempIcon = "";
        if (temperatureF >= 49 && temperatureF <= 59) {
            tempIcon = "ui right floated fitted inverted huge grey temperature low icon";
        } else if (temperatureF >= 41 && temperatureF <= 49) {
            tempIcon = "ui right floated fitted inverted huge teal temperature low icon";
        } else if (temperatureF >= 32 && temperatureF <= 41) {
            tempIcon = "ui right floated fitted inverted huge blue temperature low icon";
        } else if (temperatureF < 32) {
            tempIcon = "ui right floated fitted inverted huge blue snowflake outline icon";
        } else if (temperatureF >= 60 && temperatureF <= 68) {
            tempIcon = "ui right floated fitted inverted huge inverted yellow temperature high icon";
        } else if (temperatureF > 68) {
            tempIcon = "ui right floated fitted inverted huge inverted red temperature high icon";
        }
        return tempIcon;
    },

    getWindIcon(windBFT) {
        let windIcon = "";
        switch (windBFT) {
            case 1:
                windIcon = "ui right floated fitted inverted blue small wind icon";
                break;
            case 2:
                windIcon = "ui right floated fitted inverted green small wind icon";
                break;
            case 3:
                windIcon = "ui right floated fitted inverted green wind icon";
                break;
            case 4:
                windIcon = "ui right floated fitted inverted green large wind icon";
                break;
            case 5:
                windIcon = "ui right floated fitted inverted green big wind icon";
                break;
            case 6:
                windIcon = "ui right floated fitted inverted green huge wind icon";
                break;
            case 7:
                windIcon = "ui right floated fitted inverted green massive wind icon";
                break;
            case 8:
                windIcon = "ui right floated fitted inverted olive massive wind icon";
                break;
            case 9:
                windIcon = "ui right floated fitted inverted yellow massive wind icon";
                break;
            case 10:
                windIcon = "ui right floated fitted inverted orange massive wind icon";
                break;
            case 11:
                windIcon = "ui right floated fitted inverted red massive wind icon";
                break;

            default:
                windIcon = "Unknown";
                break;
        }
        return windIcon;
    },

    getPressureIcon(pressure) {
        let pressureIcon = "";
        if (pressure <= 980) {
            pressureIcon = "ui right floated fitted inverted primary blue dumbbell icon";
        } else if (pressure > 980 && pressure <= 990) {
            pressureIcon = "ui right floated fitted inverted primary large teal dumbbell icon";
        } else if (pressure > 990 && pressure <= 1000) {
            pressureIcon = "ui right floated fitted inverted primary big yellow dumbbell icon";
        } else if (pressure > 1000 && pressure <= 1010) {
            pressureIcon = "ui right floated fitted inverted primary huge orange dumbbell icon";
        } else if (pressure > 1010) {
            pressureIcon = "ui right floated fitted inverted primary huge red dumbbell icon";
        }

        return pressureIcon;
    },

    calcTrend(values) {
        let trend = 0;
        if (values.length > 2) {
            if ((values[2] > values[1]) && (values[1] > values[0])) {
                trend = 1;
            } else if ((values[2] < values[1]) && (values[1] < values[0])) {
                trend = -1;
            }
        }
        return trend;
    },


    getTempTrend(station) {
        let tempTrend = 0;
        let tempTrendHTML = "";
        if (station.readings.length > 2) {
            const values = [station.readings[station.readings.length - 3].temperature, station.readings[station.readings.length - 2].temperature, station.readings[station.readings.length - 1].temperature];
            tempTrend = this.calcTrend(values);
        }
        if (tempTrend == 1) {
            tempTrendHTML = "right floated big arrow up icon";
        } else if (tempTrend == -1) {
            tempTrendHTML = "right floated big arrow down icon";
        }
        return tempTrendHTML
    },

    getWindTrend(station) {
        let windTrend = 0;
        let windTrendHTML = "";
        if (station.readings.length > 2) {
            const values = [station.readings[station.readings.length - 3].windSpeed, station.readings[station.readings.length - 2].windSpeed, station.readings[station.readings.length - 1].windSpeed];
            windTrend = this.calcTrend(values);
        }
        if (windTrend == 1) {
            windTrendHTML = "right floated big arrow up icon";
        } else if (windTrend == -1) {
            windTrendHTML = "right floated big arrow down icon";
        }
        return windTrendHTML
    },
    getPressureTrend(station) {
        let pressureTrend = 0;
        let windPressureHTML = "";
        if (station.readings.length > 2) {
            const values = [station.readings[station.readings.length - 3].pressure, station.readings[station.readings.length - 2].pressure, station.readings[station.readings.length - 1].pressure];
            pressureTrend = this.calcTrend(values);
        }
        if (pressureTrend == 1) {
            windPressureHTML = "right floated big arrow up icon";
        } else if (pressureTrend == -1) {
            windPressureHTML = "right floated big arrow down icon";
        }
        return windPressureHTML
    },

};
module.exports = stationAnalytics;



  
  