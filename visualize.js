const PImage = require('pureimage');
const fs = require('fs');

// WRITE WITH ASCII IN TERM
var writeData = function (data) {
  var rows = data;
  for(var i = 0; i < rows.length; i++){
    var row = rows[i];
    var line = '';
    for(var j = 0; j < row.length; j ++) {
      line = line + (row[j] > 0 ? '@' : '.');
    }
    console.log(line)
  }
}

// CREATE A PNG
var createImage = function (data, path) {
  var cols = data.length;
  var rows = data[0].length;
  var img = PImage.make(cols,rows);
  var ctx = img.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255, 1)';
  ctx.fillRect(0, 0, cols, rows);

  var rows = data;
  for(var i = 0; i < rows.length; i++){
    var row = rows[i];
    for(var j = 0; j < row.length; j ++) {
      var transparency = (row[j]/255)
      ctx.fillStyle = 'rgba(0,0,0,' + transparency + ')';
      ctx.fillRect(j,i,1,1);
    }
  }

  PImage.encodePNGToStream(img, fs.createWriteStream(path)).then(() => {
  }).catch((e)=>{
      console.log("there was an error writing");
  });
}

module.exports = {
  writeData: writeData,
  createImage: createImage
};
return module.exports;
