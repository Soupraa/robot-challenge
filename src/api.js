
/*left some console logging in for a display in the server side terminal*/

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

var instructions = "";
var uniqueLocations = 0;
var p2uniqueLocations = 0;
app.use(cors());
app.use(express.json({ limit: "1mb" }));

/*pushes coords object into array*/
function storeCoords(coordX, coordY, array) {
  array.push({ x: coordX, y: coordY });
}

/*PART 1 post method*/
app.post("/api/part1", (request, response) => {
  console.log("---------PART 1---------");
  console.log("NEW instructions received!");
  instructions = request.body.x;
  var newLocations = new Array(); // to store new locations found
  var coordX = 0;
  var coordY = 0;
  uniqueLocations = 0;
  /*iterate through instructions letter by letter*/
  for (var i = 0; i < instructions.length; i++) {
    switch (instructions.charAt(i)) {
      case "w":
        coordY++;
        break;
      case "a":
        coordX--;
        break;
      case "s":
        coordY--;
        break;
      case "d":
        coordX++;
        break;
      case "x":
        // console.log("took a photo!");
        var isNew = true;
        /*iterate through location array check for existing coords*/
        for (var j = 0; j < newLocations.length; j++) {
          if (newLocations[j].x == coordX && newLocations[j].y == coordY) {
            // console.log("existing location...");
            isNew = false;
            break;
          }
        }
        if (isNew == true) {
          // console.log("new location found!");
          uniqueLocations++;
          storeCoords(coordX, coordY, newLocations);
        }
        break;
    }
  }
  // console.log("Final coordinates for robot 1: ("+ coordX +", "+coordY+")");
  console.log("Total unique Locations: " + uniqueLocations);
});

/*returns unique locations of last sent instructions for PART 1*/
app.get("/api/part1Answer", (req, res) => {
  console.log("Returning response!");
  res.send(uniqueLocations.toString());
});

/*PART 2 */
app.post("/api/part2", (request, response) => {
  console.log("----------PART 2----------");
  console.log("NEW instructions received!");
  instructions = request.body.x;
  var isRobotOne = true;
  var p2newLocations = new Array(); // to store new locations found
  var r1coordX = 0;
  var r1coordY = 0;

  var r2coordX = 0;
  var r2coordY = 0;
  p2uniqueLocations = 0;
  /*iterate through instructions letter by letter*/
  for (var i = 0; i < instructions.length; i++) {
    if (isRobotOne) {
      switch (instructions.charAt(i)) {
        case "w":
          r1coordY++;
          break;
        case "a":
          r1coordX--;
          break;
        case "s":
          r1coordY--;
          break;
        case "d":
          r1coordX++;
          break;
        case "x":
          // console.log("robot 1 took a photo!");
          var isNew = true;
          /*iterate through location array check for existing coords*/
          for (var j = 0; j < p2newLocations.length; j++) {
            if (
              p2newLocations[j].x == r1coordX &&
              p2newLocations[j].y == r1coordY
            ) {
              // console.log("existing location...");
              isNew = false;
              break;
            }
          }
          if (isNew == true) {
            // console.log("new location found!");
            p2uniqueLocations++;
            storeCoords(r1coordX, r1coordY, p2newLocations);
          }
          break;
      }
      /*changes to robot 2*/
      isRobotOne = false;
    } else {
      switch (instructions.charAt(i)) {
        case "w":
          r2coordY++;
          break;
        case "a":
          r2coordX--;
          break;
        case "s":
          r2coordY--;
          break;
        case "d":
          r2coordX++;
          break;
        case "x":
          // console.log("robot 2 took a photo!");
          var isNew = true;
          /*iterate through location array check for existing coords*/
          for (var j = 0; j < p2newLocations.length; j++) {
            if (
              p2newLocations[j].x == r2coordX &&
              p2newLocations[j].y == r2coordY
            ) {
              // console.log("existing location...");
              isNew = false;
              break;
            }
          }
          if (isNew == true) {
            // console.log("new location found!");
            p2uniqueLocations++;
            storeCoords(r2coordX, r2coordY, p2newLocations);
          }
          break;
      }
      /*changes to robot 1*/
      isRobotOne = true;
    }
  }
  // console.log("Final coordinates for robot 1: ("+ r1coordX +", "+r1coordY+")");
  // console.log("Final coordinates for robot 2: ("+ r2coordX +", "+r2coordY+")");
  console.log("Total unique Locations: " + p2uniqueLocations);
});
/*returns unique locations of last sent instructions for PART 2*/
app.get("/api/part2Answer", (req, res) => {
  res.send(p2uniqueLocations.toString());
});
app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
