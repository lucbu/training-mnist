const dataReader = require("./dataReader.js");


var benchmark = function (guessSortedFunction, regroupedDataByLabel, offset, length, dataBuffer, labelBuffer) {
  var result = {guessMake: 0, okByTry: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}};
  for(var i = 0; i < length; i++) {
    var picToGuess = dataReader.getDataByRows(i, dataBuffer);
    var actualLabel = dataReader.getLabel(i, labelBuffer);
    var guessSortedLabel = guessSortedFunction(picToGuess, regroupedDataByLabel);
    result.guessMake++;
    for(var j = 1; j <= 10; j++) {
      result.okByTry[j] = result.okByTry[j] + (guessSortedLabel.sortedLabels.slice(0, j).includes(actualLabel.toString()) ? 1 : 0);
    }
  }
  return result;
}

module.exports = {
  benchmark: benchmark
};
return module.exports;
