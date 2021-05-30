const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

var instructions = "";
var uniqueLocations = 0;
app.use(cors());
app.use(express.json({ limit: "1mb" }));

/*pushes coords object into array*/
function storeCoords(coordX, coordY, array) {
  array.push({ x: coordX, y: coordY });
}

app.post("/api", (request, response) => {
  console.log("----------------------------");
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
        console.log("took a photo!");
        var isNew = true;
        /*iterate through location array check for existing coords*/
        for (var j = 0; j < newLocations.length; j++) {
          if (newLocations[j].x == coordX && newLocations[j].y == coordY) {
            console.log("existing location...");
            isNew = false;
            break;
          }
        }
        if (isNew == true) {
          console.log("new location found!");
          uniqueLocations++;
          storeCoords(coordX, coordY, newLocations);
          //   console.log("unique locations: " + uniqueLocations);
        }
        break;
    }
  }
  console.log("Total unique Locations: " + uniqueLocations);
  //   console.log(instructions);
  //   response.json({
  //       data: uniqueLocations
  //   })
});

/*returns unique locations of last sent instructions*/
app.get("/api/answer", (req, res) => {
  console.log("Getting response!");
  // console.log(instructions);
  res.send(uniqueLocations.toString());
});
app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
