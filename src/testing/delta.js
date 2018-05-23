const dataReader = require("../dataReader.js");

var color = {min: 0, max: 255}

var potentiality = function (dataToTest, dataRegrouped){
  var delta = Math.abs(dataRegrouped - dataToTest);
  return color.max - delta;
}

var makeSortedGuess = function (data, dataRegroupedByLabel) {
  var dataNbRows = data.length;
  var dataNbCols = data[0].length;

  var pointsByLabel = {};
  var choosenLabel = {label : 0, points: 0}

  // init points by label
  for(var n = 0; n <= 9; n++){
    pointsByLabel[n] = 0;
  }

  // Check for each pixel the potentiality of corrects labels
  for(var i = 0; i < dataNbRows; i++){
    var row = [];
    for(var j = 0; j < dataNbCols; j++) {
      for(var n = 0; n <= 9; n++){
        pointsByLabel[n] += potentiality(data[i][j], dataRegroupedByLabel[n]['data'][i][j]);
      }
    }
  }

  var sortedLabels = Object.keys(pointsByLabel).sort(function(a,b){return pointsByLabel[b]-pointsByLabel[a]});

  return sortedLabels;
}

var makeGuess = function (data, dataRegroupedByLabel) {
  makeSortedGuess(data, dataRegroupedByLabel)[0];
}


module.exports = {
  makeSortedGuess: makeSortedGuess,
  makeGuess: makeGuess
};
return module.exports;
