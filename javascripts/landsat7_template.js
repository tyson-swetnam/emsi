var landsat7_lasrc1 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    landsat7_lasrc2 = ee.ImageCollection("LANDSAT/LE07/C01/T2_SR"),
    studyArea = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-110.5433177947998, 32.20561149080997],
          [-110.54647207260132, 32.205302834621804],
          [-110.54621458053589, 32.20110863791122],
          [-110.53941249847412, 32.20119942343726],
          [-110.53988456726074, 32.20532099089718]]]),
    aoi = /* color: #d63000 */ee.Geometry.Point([-110.54271697998047, 32.2026338227246]),
    region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-111.060791015625, 33.03629817885956],
          [-111.983642578125, 32.46342595776104],
          [-111.456298828125, 31.409912194070973],
          [-110.56640625, 30.031055426540206],
          [-108.446044921875, 29.83111376473715],
          [-108.0615234375, 30.79847417956782],
          [-108.006591796875, 32.54681317351514]]]);

// Load the Landsat 7 Surface Reflectance Tier 1 and 2 collections (see Imports above)
// Create a Study Area polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)

// Filter scenes that intersect the study region for the period of Landsat 7 
var landsat7_lasrc1_SA = landsat7_lasrc1.filterBounds(studyArea).filterDate('1999-01-01',
 '2018-04-11');

var landsat7_lasrc2_SA = landsat7_lasrc2.filterBounds(studyArea).filterDate('1999-01-01',
 '2018-04-11');
 
// Mosaic scene for viewer
var mosaic = landsat7_lasrc1.filterBounds(region).filterDate('2018-01-01', 
  '2018-04-01').mosaic();

var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};

// A function to mask out cloudy pixels.
var cloud_shadows = function(image) {
  // Select the QA band.
  var QA = image.select(['pixel_qa']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 3,3, 'Cloud_shadows').eq(0);
  // Return an image masking out cloudy areas.
};

// A function to mask out cloudy pixels.
var clouds = function(image) {
  // Select the QA band.
  var QA = image.select(['pixel_qa']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 5,5, 'Cloud').eq(0);
  // Return an image masking out cloudy areas.
};

// Mask both clouds and cloud shadows
var maskClouds = function(image) {
  var cs = cloud_shadows(image);
  var c = clouds(image);
  image = image.updateMask(cs);
  return image.updateMask(c);
};

var landsat7_lasrc1_free = landsat7_lasrc1_SA.map(maskClouds);

// View mosaiced scenes with and without clouds
var mosaic_free = maskClouds(mosaic);
var visParams = {bands: ['B3', 'B2', 'B1'],min: [0,0,0],max: [2000, 2000, 2000]};
Map.addLayer(mosaic, visParams, 'With clouds'); 
Map.addLayer(mosaic_free, visParams, 'Cloud free'); 
Map.addLayer(landsat7_lasrc1_free, visParams, 'Landsat 8 without clouds'); 

///////////////////////////////////////////////////////

// Compute the Normalized Difference Vegetation Index (NDVI) for the cloud free imagery

var calc_ndvi = function(landsat7_lasrc1_free) {
  return landsat7_lasrc1_free
    .addBands(landsat7_lasrc1_free.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

// Calculate NDVI for just the study area
var filteredlandsat7 = landsat7_lasrc1_free
  .filterBounds(studyArea)
  .map(calc_ndvi);

// Plot a time series of the NDVI within the Study Area AOI.
var l7Chart1 = ui.Chart.image.series(filteredlandsat7.select('NDVI'), studyArea)
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
print(filteredlandsat7.select('NDVI'), 'cloud-threholded Landsat 7 NDVI');

// Begin calculation of FMSI

// Reduce the collection with a mean reducer.
var mean = filteredlandsat7.select('NDVI').reduce(ee.Reducer.mean());
print(mean);
// Display the mean image.
Map.addLayer(mean,{min:0.0, max: 0.6},'mean NDVI');

// Reduce the collection with a median reducer.
var median = filteredlandsat7.select('NDVI').reduce(ee.Reducer.median());
print(median);
// Display the median image.
Map.addLayer(median,{min:0.0, max: 0.6},'median NDVI');

// Reduce the collection with a standard deviation (SD) reducer.
var sd = filteredlandsat7.select('NDVI').reduce(ee.Reducer.stdDev());
print(sd);
// Display the StandardDeviation image.
Map.addLayer(sd, {min: 0, max: 0.3}, 'SD of NDVI');

// Calculate FMSI using a moving average for each time step

var calc_fmsi = function(landsat7_lasrc1_free) {
  return landsat7_lasrc1_free
    .addBands(landsat7_lasrc1_free.normalizedDifference(['B4', 'B3']).subtract(mean).divide(sd).rename('FMSI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredlandsat7 = landsat7_lasrc1_free
  .filterBounds(studyArea)
  .map(calc_fmsi);

// Display the FMSI.
Map.addLayer(filteredlandsat7.select('FMSI'), {min: -0.6, max: 0.6, palette: ['00FFFF', '0000FF']}, 'FMSI');

// Plot a time series of FMSI within the Study Area AOI.
var l7Chart2 = ui.Chart.image.series(filteredlandsat7.select('FMSI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 FMSI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l7Chart2);

// Plot a time series of FMSI within the AOI.
var l7Chart3 = ui.Chart.image.series(filteredlandsat7.select('FMSI'), aoi)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 FMSI time series in AOI',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l7Chart3);
