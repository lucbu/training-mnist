const fs = require('fs');
const dataReader = require("./src/dataReader.js");
const training = require("./src/training/avgTreshold.js");
const testing = require("./src/testing/delta.js");
const benchmark = require("./src/benchmark.js");

const visualize = require("./src/visualize.js");

var __dirnameData = 'data';

var dataBuffer  = fs.readFileSync(__dirnameData + '/train-images-idx3-ubyte');
var labelBuffer = fs.readFileSync(__dirnameData + '/train-labels-idx1-ubyte');
var trainDataBuffer  = fs.readFileSync(__dirnameData + '/t10k-images-idx3-ubyte');
var trainLabelBuffer = fs.readFileSync(__dirnameData + '/t10k-labels-idx1-ubyte');

var dataLength = dataReader.getDataLength(dataBuffer);
var trainDataLength = dataReader.getDataLength(trainDataBuffer);

// LEARNING
console.log('LEARNING (' + dataLength + ')')
var trainingOpts = {downTreshold: 0.2, upTreshold: 0.8};
var trainingResult = training.train(trainingOpts, 0, dataLength, dataBuffer, labelBuffer);

// TESTING
console.log('TESTING  (' + trainDataLength + ')')
var testingOpts = {downTreshold: 0.2, upTreshold: 0.8};
var benchmarkResult = benchmark.benchmark(testing.makeSortedGuess, testingOpts, trainingResult, 0, trainDataLength, trainDataBuffer, trainLabelBuffer);

console.log()
console.log('Result by number of tries :')
for(var i = 1; i <= Object.keys(benchmarkResult.okByTry).length; i++) {
  console.log('    ' + i + ' : ' + ((benchmarkResult.okByTry[i]*100)/benchmarkResult.guessMake).toFixed(2))
}
