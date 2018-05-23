const dataReader = require("../dataReader.js");

var potentiality = function (dataToTest, dataRegrouped){
  var delta = Math.abs(dataRegrouped - dataToTest);
  return 1-delta;
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
        var pot = potentiality((data[i][j]), dataRegroupedByLabel[n]['data'][i][j]);
        pointsByLabel[n] += pot;
      }
    }
  }

  for(var n = 0; n <= 9; n++){
    pointsByLabel[n] = pointsByLabel[n]/(dataNbRows*dataNbCols);
  }

  var sortedLabels = Object.keys(pointsByLabel).sort(function(a,b){return pointsByLabel[b]-pointsByLabel[a]});

  var sortedGuess = {sortedLabels: sortedLabels, ponderatedLabels: pointsByLabel}

  return sortedGuess;
}

var makeGuess = function (data, dataRegroupedByLabel) {
  makeSortedGuess(data, dataRegroupedByLabel)[0];
}


module.exports = {
  makeSortedGuess: makeSortedGuess,
  makeGuess: makeGuess
};
return module.exports;
