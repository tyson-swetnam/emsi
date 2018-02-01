// Store the VIIRS image collection in a variable (see Imports above)
// Create a studyArea polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)
var viirs_collection = ee.ImageCollection("NOAA/VIIRS/001/VNP09GA"),
    gridmet_collection = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET"),
    daymet_collection = ee.ImageCollection("NASA/ORNL/DAYMET_V3"),
    studyArea = /* color: #ff00ff */ee.Geometry.Polygon(
        [[[-110.54958457890626, 32.21911024236725],
          [-110.56005395443685, 32.20549281987427],
          [-110.54880808211476, 32.207779550583304],
          [-110.53901219488557, 32.2138147218665],
          [-110.53403370493243, 32.222815736668466]]]);

// Filter to scenes that intersect your study region.
var viirs_studyArea = viirs_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var viirs_SA = viirs_studyArea.filterDate('2012-01-01',
 '2017-12-31');
 
var gridmet_studyArea = gridmet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var gridmet_SA = gridmet_studyArea.filterDate('2012-01-01',
 '2017-12-31');

var daymet_studyArea = daymet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var daymet_SA = daymet_studyArea.filterDate('2012-01-01',
 '2017-12-31');
 
 
Map.centerObject(studyArea, 10);

print(viirs_SA,'VIIRS Time Series')

// SR Cloud QA Bit Flags
// Mask out clouds, shadows, and snow
var tmp1_masked = viirs_SA.map(function(image){ 
  return image.updateMask(image.select(['QF1']).neq(0))
});

print(tmp1_masked)

// Compute the Normalized Difference Vegetation Index (NDVI).
// Use this function to add variables for NDVI, time and a constant
var calc_ndvi = function(tmp1_masked) {
  return tmp1_masked
    .addBands(tmp1_masked.normalizedDifference(['M7', 'M5']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredVIIRS = tmp1_masked
  .filterBounds(studyArea)
  .map(calc_ndvi);
  
print(filteredVIIRS)  

// Add the first masked image in the collection to the map window.
Map.addLayer(ee.Image(filteredVIIRS.first()),
 {min:0.0, max:0.9, bands: 'NDVI'},
 'first image with clouds masked');

Map.addLayer(ee.Image(gridmet_SA.select('fm1000').first()),
 {min:0.0, max:20, bands: 'fm1000'},
 '1000hr fuels');
 
Map.addLayer(ee.Image(gridmet_SA.select('erc').first()),
 {min:0.0, max:120, bands: 'erc'},
 'erc');
 
 Map.addLayer(ee.Image(daymet_SA.select('tmax').first()),
 {min:-20, max:45, bands: 'tmax'},
 'tmax');

// Plot time series
var mChart1 = ui.Chart.image.series(filteredVIIRS.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'VIIRS NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart1);

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
