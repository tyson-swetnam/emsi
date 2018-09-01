var landsat7_lasrc1 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-111.060791015625, 33.03629817885956],
          [-111.983642578125, 32.46342595776104],
          [-111.456298828125, 31.409912194070973],
          [-110.56640625, 30.031055426540206],
          [-108.446044921875, 29.83111376473715],
          [-108.0615234375, 30.79847417956782],
          [-108.006591796875, 32.54681317351514]]]),
    studyArea = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-109.87066268920898, 32.69464928279878],
          [-109.86825942993164, 32.69457705098977],
          [-109.86499786376953, 32.69753850723016],
          [-109.86684322357178, 32.70219718463668],
          [-109.86873149871826, 32.70400280815795],
          [-109.87212181091309, 32.70436392847798],
          [-109.87469673156738, 32.704291704530874],
          [-109.8757266998291, 32.702269410279],
          [-109.87469673156738, 32.69974147801718],
          [-109.87212181091309, 32.696310598273755]]]);

// Load the Landsat 7 Surface Reflectance Tier 1 and 2 collections (see Imports above)
// Create a Study Area polygon (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)
          
// Filter scenes that intersect the study region for the period of Landsat 7 
var landsat7_lasrc1_SA = landsat7_lasrc1.filterBounds(studyArea).filterDate('1999-01-01',
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

