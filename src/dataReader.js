
var labelOffset = 8, dataOffset = 16;

// Return label of data corresponding to index
var getLabel = function (index, labelBuffer){
  return labelBuffer[labelOffset + index];
}

// Return data corresponding to index by rows array of row
var getDataByRows = function (index, dataBuffer){

    var cntRows = getCountRows(dataBuffer);
    var cntCols = getCountCols(dataBuffer);
    var cntPixels = cntRows * cntCols;

    var rows = [];
    for(var i = 0; i < cntRows; i++){
      var row = [];
      for(var j = 0; j < cntCols; j ++) {
        row.push(dataBuffer[dataOffset+(index*cntPixels)+(i*cntCols)+j]/255)
      }
      rows.push(row);
    }
    return rows;
}

var getCountRows = function (dataBuffer) {
  return dataBuffer.readUIntBE(8,4);
}

var getCountCols = function (dataBuffer) {
  return dataBuffer.readUIntBE(12,4);
}

var getDataLength = function (dataBuffer) {
  return dataBuffer.readUIntBE(4,4);
}

module.exports = {
  getLabel: getLabel,
  getDataByRows: getDataByRows,
  getCountRows: getCountRows,
  getCountCols: getCountCols,
  getDataLength: getDataLength
};
return module.exports;
