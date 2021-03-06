const dataReader = require("../dataReader.js");

var train = function (opts, offset, length, dataBuffer, labelBuffer) {
  opts = Object.assign({downTreshold: 0, upTreshold: 1}, opts);

  var dataNbRows = dataReader.getCountRows(dataBuffer);
  var dataNbCols = dataReader.getCountCols(dataBuffer);

  // Init regroupedData
  var regroupedDataByLabel = {}
  for(var n = 0; n <= 9; n++){
    var rows = [];
    for(var i = 0; i < dataNbRows; i++){
      var row = [];
      for(var j = 0; j < dataNbCols; j ++) {
        row.push(null);
      }
      rows.push(row);
    }
    regroupedDataByLabel[n] = {};
    regroupedDataByLabel[n]['data'] = rows;
    regroupedDataByLabel[n]['nb'] = 0;
  }

  for(var n = offset; n < length; n++) {
    var label = dataReader.getLabel(n, labelBuffer);
    var data = dataReader.getDataByRows(n, dataBuffer);
    var nb = regroupedDataByLabel[label]['nb'] + 1;
    regroupedDataByLabel[label]['nb'] = nb;

    for(var i = 0; i < dataNbRows; i++){
      var row = [];

      for(var j = 0; j < dataNbCols; j++) {

        var current = regroupedDataByLabel[label]['data'][i][j];
        var iterate = data[i][j];
        if(iterate < opts.downTreshold) {
          iterate = 0;
        } else if (iterate > opts.upTreshold) {
          iterate = 1
        }

        regroupedDataByLabel[label]['data'][i][j] = (current*(nb-1) + iterate)/nb;
      }
    }
  }

  return regroupedDataByLabel;
}

module.exports = {
  train: train
};
return module.exports;
