// Store the Landsat image collection in a variable (see Imports above)
// Create a Study Area polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)
var landsat8_collection = ee.ImageCollection("LANDSAT/LC8_L1T_TOA"),
    landsat7_collection = ee.ImageCollection("LANDSAT/LE7_L1T_TOA"),
    landsat5_collection = ee.ImageCollection("LANDSAT/LT5_L1T_TOA"),
    gridmet_collection = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET"),
    daymet_collection = ee.ImageCollection("NASA/ORNL/DAYMET_V3"),
    studyArea = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-110.54100036621094, 32.22136972061914],
          [-110.54726600646973, 32.21592363663122],
          [-110.54649353027344, 32.21011412082284],
          [-110.5415153503418, 32.21214749357227],
          [-110.53550720214844, 32.21519746745192],
          [-110.53533554077148, 32.21890086963416],
          [-110.53799629211426, 32.22078882053671]]]);
       
// Filter to scenes that intersect your study region and period of availability
var landsat5_studyArea = landsat5_collection.filterBounds(studyArea);
var landsat5_SA = landsat5_studyArea.filterDate('1984-01-01',
 '2014-12-31');
 
var landsat7_studyArea = landsat7_collection.filterBounds(studyArea);
var landsat7_SA = landsat7_studyArea.filterDate('1999-01-01',
 '2017-12-31');
 
var landsat8_studyArea = landsat8_collection.filterBounds(studyArea);
var landsat8_SA = landsat8_studyArea.filterDate('2013-01-01',
 '2017-12-31');
 
var gridmet_studyArea = gridmet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var gridmet_SA = gridmet_studyArea.filterDate('1984-01-01',
 '1994-01-31');

var daymet_studyArea = daymet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var daymet_SA = daymet_studyArea.filterDate('1984-01-01',
 '1994-01-31');
 
// Specify the cloud likelihood threshold.

var cloud_thresh = 20;

// Create the cloud masking function for Landsat 5.

var maskClouds5 = function(landsat5_SA){
  // Add the cloud likelihood band to the image.
  var cloudScore5 = ee.Algorithms.Landsat.simpleCloudScore(landsat5_SA);
  // Isolate the cloud likelihood band.
  var cloudLikelihood5 = cloudScore5.select('cloud');
  // Compute a mask in which pixels below the threshold are 1.
  var cloudPixels5 = cloudLikelihood5.lt(cloud_thresh);
  // Mask these pixels from the input image.
  // Return the masked input image.
  return landsat5_SA.updateMask(cloudPixels5);
};

// Create the cloud masking function for Landsat 7.

var maskClouds7 = function(landsat7_SA){
  // Add the cloud likelihood band to the image.
  var cloudScore7 = ee.Algorithms.Landsat.simpleCloudScore(landsat7_SA);
  // Isolate the cloud likelihood band.
  var cloudLikelihood7 = cloudScore7.select('cloud');
  // Compute a mask in which pixels below the threshold are 1.
  var cloudPixels7 = cloudLikelihood7.lt(cloud_thresh);
  // Mask these pixels from the input image.
  // Return the masked input image.
  return landsat7_SA.updateMask(cloudPixels7);
};

// Create the cloud masking function for Landsat 8.

var maskClouds8 = function(landsat8_SA){
  // Add the cloud likelihood band to the image.
  var cloudScore8 = ee.Algorithms.Landsat.simpleCloudScore(landsat8_SA);
  // Isolate the cloud likelihood band.
  var cloudLikelihood8 = cloudScore8.select('cloud');
  // Compute a mask in which pixels below the threshold are 1.
  var cloudPixels8 = cloudLikelihood8.lt(cloud_thresh);
  // Mask these pixels from the input image.
  // Return the masked input image.
  return landsat8_SA.updateMask(cloudPixels8);
};

// Mask the clouds from all images in the image collection
// with the map function.
var landsat5_SANoClouds = landsat5_SA.map(maskClouds5);
var landsat7_SANoClouds = landsat7_SA.map(maskClouds7);
var landsat8_SANoClouds = landsat8_SA.map(maskClouds8);

// Add the first masked image in the collection to the map window.
Map.addLayer(ee.Image(landsat5_SANoClouds.first()),
  {min:0.05, max: 0.8, bands: 'B4, B3, B2'},
  'Landsat 5 first image with clouds masked');
 
Map.addLayer(ee.Image(landsat7_SANoClouds.first()),
  {min:0.05, max: 0.8, bands: 'B5, B4, B3'},
  'Landsat 7 first image with clouds masked');
 
Map.addLayer(ee.Image(landsat8_SANoClouds.first()),
  {min:0.05, max: 0.8, bands: 'B5, B4, B3'},
  'Landsat 8 first image with clouds masked');
 
// Center your map.
Map.centerObject(studyArea, 14);

// Reduce the collection to the median value per pixel.
var median_L5 = landsat5_SANoClouds.median();
var median_L7 = landsat7_SANoClouds.median();
var median_L8 = landsat8_SANoClouds.median();

// Display reduced image in the map window.
Map.addLayer(median_L5,
 {min: 0.05, max: 0.8, bands: 'B4, B3, B2'},
 'median composite of cloud free images');
Map.addLayer(median_L7,
 {min: 0.05, max: 0.8, bands: 'B4, B3, B2'},
 'median composite of cloud free images');
Map.addLayer(median_L7,
 {min: 0.05, max: 0.8, bands: 'B5, B4, B3'},
 'median composite of cloud free images');


// Compute the Normalized Difference Vegetation Index (NDVI).
// Use this function to add variables for NDVI, time and a constant
// to Landsat 5 imagery.
var calc_ndvi5 = function(landsat5_SANoClouds) {
  return landsat5_SANoClouds
    .addBands(landsat5_SANoClouds.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat5 = landsat5_SANoClouds
  .filterBounds(studyArea)
  .map(calc_ndvi5);

// to Landsat 7 imagery.
var calc_ndvi7 = function(landsat7_SANoClouds) {
  return landsat7_SANoClouds
    .addBands(landsat7_SANoClouds.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat7 = landsat7_SANoClouds
  .filterBounds(studyArea)
  .map(calc_ndvi7);

// to Landsat 8 imagery.
var calc_ndvi8 = function(landsat8_SANoClouds) {
  return landsat8_SANoClouds
    .addBands(landsat8_SANoClouds.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat8 = landsat8_SANoClouds
  .filterBounds(studyArea)
  .map(calc_ndvi8);

// Plot a time series of NDVI within the Study Area AOI.
var l5Chart1 = ui.Chart.image.series(filteredLandsat5.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 5 NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l5Chart1);
print(filteredLandsat5.select('NDVI'), 'cloud-thresholded Landsat 5 NDVI');


var l7Chart1 = ui.Chart.image.series(filteredLandsat7.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 7 NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l7Chart1);
print(filteredLandsat7.select('NDVI'), 'cloud-thresholded Landsat 7 NDVI');

var l8Chart1 = ui.Chart.image.series(filteredLandsat8.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l8Chart1);
print(filteredLandsat8.select('NDVI'), 'cloud-thresholded Landsat 8 NDVI');

// Plot 1000hr fuel moisture
var mChart2 = ui.Chart.image.series(gridmet_SA.select('fm1000'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet 1000-hr fuel moisture in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2);

// Plot Energy Release Component
var mChart2b = ui.Chart.image.series(gridmet_SA.select('erc'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet Energy Release Component in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2b);

// Plot Energy Release Component
var mChart2c = ui.Chart.image.series(gridmet_SA.select('bi'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet Burning Index in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2c);

// Daymet
var mChart3 = ui.Chart.image.series(daymet_SA.select('tmax'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet temperature max in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart3);

var mChart4 = ui.Chart.image.series(daymet_SA.select('tmin'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet temperature min in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart4);

var mChart4 = ui.Chart.image.series(daymet_SA.select('prcp'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet Precipitation in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart4);

var mChart5 = ui.Chart.image.series(daymet_SA.select('vp'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet Vapor Pressure in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart5);