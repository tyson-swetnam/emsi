// Create a studyArea polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)
var modis_collection = ee.ImageCollection("MODIS/MOD13Q1"),
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


// Filter to scenes that intersect your study region.

var gridmet_studyArea = gridmet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var gridmet_SA = gridmet_studyArea.filterDate('1999-01-01',
 '2017-12-31');

var daymet_studyArea = daymet_collection.filterBounds(studyArea);
// Filter to scenes for your time period of interest.
var daymet_SA = daymet_studyArea.filterDate('1999-01-01',
 '2017-12-31');
 
var modis_studyArea = modis_collection.filterBounds(studyArea);
// Filter for a range of dates
var modis_SA = modis_studyArea.filterDate('1999-01-01',
 '2017-12-31')
// Sort the collection in chronological order.
.sort('system:time_start', true); 
print(modis_SA)

// Mask out clouds, shadows, and snow
var tmp1_masked = modis_SA.map(function(image){ 
  return image.updateMask(image.select(['SummaryQA']).eq(0))
});

// Add the first masked image in the collection to the map window.
Map.addLayer(ee.Image(tmp1_masked.first()),
 {min:1, max:10000, bands: 'NDVI'},
 'first image with clouds masked');
// Center your map.
Map.centerObject(studyArea, 14);

// Plot NDVI time series

// Plot a time series of NDVI within the Study Area AOI.
var mChart1 = ui.Chart.image.series(tmp1_masked.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'MODIS NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart1);

print(tmp1_masked.select('NDVI'), 'cloud-thresholded MODIS NDVI');

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
