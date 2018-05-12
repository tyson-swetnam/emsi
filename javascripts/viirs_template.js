var viirs_collection = ee.ImageCollection("NOAA/VIIRS/001/VNP09GA"),
    studyArea = /* color: #ff00ff */ee.Geometry.Polygon(
        [[[-110.54958457890626, 32.21911024236725],
          [-110.56005395443685, 32.20549281987427],
          [-110.54880808211476, 32.207779550583304],
          [-110.53901219488557, 32.2138147218665],
          [-110.53403370493243, 32.222815736668466]]]);

// Store the VIIRS image collection in a variable (see Imports above)
// Create a studyArea polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)
// Filter to scenes that intersect your study region.

var viirs_studyArea = viirs_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var viirs_SA = viirs_studyArea.filterDate('2013-01-01',
 '2018-01-31');

Map.centerObject(studyArea, 10);

print(viirs_SA,'VIIRS Time Series')

// SR Cloud QA Bit Flags
// Mask out clouds, shadows, and snow
var tmp1_masked = viirs_SA.map(function(image){ 
  return image.updateMask(image.select(['QF1']).eq(2))
});

print(tmp1_masked)

// Compute the Normalized Difference Vegetation Index (NDVI).
// Use this function to add variables for NDVI, time and a constant
var calc_ndvi = function(tmp1_masked) {
  return tmp1_masked
    .addBands(tmp1_masked.normalizedDifference(['I2', 'I1']).rename('NDVI')).float()
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
 
// Day of Year (DOY) image series

// Define a chart with a a different series for each year in the forest region.
var series1 = ui.Chart.image.doySeriesByYear(
    filteredVIIRS, 'NDVI', studyArea, ee.Reducer.mean(), 500);

// Define a chart with different series for each region, averaged by DOY.
var series2 = ui.Chart.image.doySeriesByRegion(
    filteredVIIRS, 'NDVI', studyArea, ee.Reducer.mean(), 500, ee.Reducer.mean(), 'label');

// Display the two charts.
print(series1,series2);

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
