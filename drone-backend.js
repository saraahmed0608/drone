var Cylon = require('cylon');

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"               //put second device on
    })
    .on("ready", fly);

var bot;
// Fly the bot
function fly(robot) {
    bot = robot;
    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
               if (altitude > 2.0) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    // Stop any emergency setting
    bot.drone.disableEmergency();
    // Tell the drone it is lying flat
    bot.drone.ftrim();

    // Take off
    bot.drone.takeoff();
    after(5*1000, function() {
        bot.drone.takeoff(0);
    });


    bot.drone.left(0.3);
    after(10*1000, function() {
        bot.drone.left(0);
    });

    bot.drone.right(0.3);
    after(15*1000, function() {
        bot.drone.right(0);
    });

    after(25*1000, function() {
        bot.drone.land();
    });
    after(37*1000, function() {
        bot.drone.stop();
    });
}

Cylon.start();



























