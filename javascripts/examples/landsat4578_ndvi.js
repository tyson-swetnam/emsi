var landsat4_lasrc1 = ee.ImageCollection("LANDSAT/LT04/C01/T1_SR"),
    landsat5_lasrc1 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    landsat7_lasrc1 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    landsat8_lasrc1 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-111.060791015625, 33.03629817885956],
          [-111.983642578125, 32.46342595776104],
          [-111.456298828125, 31.409912194070973],
          [-110.56640625, 30.031055426540206],
          [-108.446044921875, 29.83111376473715],
          [-108.0615234375, 30.79847417956782],
          [-108.006591796875, 32.54681317351514]]]),
    studyArea1 = /* color: #98ff00 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -109.52486155028271,
                32.15745757205914
              ],
              [
                -109.52657823234,
                32.157439404956804
              ],
              [
                -109.52649239761251,
                32.156149574323116
              ],
              [
                -109.5248615534577,
                32.156167741016255
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -109.8891967549522,
                32.69935323403713
              ],
              [
                -109.89005505395733,
                32.699628603505474
              ],
              [
                -109.89014087323227,
                32.699123007075556
              ],
              [
                -109.8899397149799,
                32.69898758779545
              ],
              [
                -109.88936304027709,
                32.69899660919383
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "coordinates": []
    }),
    studyArea2 = /* color: #d63000 */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -109.53516125305418,
                32.154796217269
              ],
              [
                -109.53687787245207,
                32.15481438446186
              ],
              [
                -109.5368349576894,
                32.153415557735336
              ],
              [
                -109.5351183372569,
                32.15343372447914
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -109.87222911139878,
                32.699795647798815
              ],
              [
                -109.87300156223353,
                32.69827885026529
              ],
              [
                -109.87201453467799,
                32.69723154003922
              ],
              [
                -109.87023355688666,
                32.69658147025564
              ],
              [
                -109.86954693791279,
                32.6981343961546
              ],
              [
                -109.87038376083478,
                32.698856684067025
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "coordinates": []
    });
// Load the Landsat 4,5,7,8 Surface Reflectance Tier 1 (see Imports above)
// Create a Study Area polygons (see Imports above)
// Create an area of interest for each RAWS location (see Imports above)

/// Create Masks for removing clouds and snow from pixels
/// This Mask only works for Landsats 5,7,8

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

// A function to mask out snowy pixels.
var snow = function(image) {
  // Select the QA band.
  var QA = image.select(['pixel_qa']);
  // Get the internal_cloud_algorithm_flag bit.
  return getQABits(QA, 5,5, 'Snow').eq(0);
  // Return an image masking out cloudy areas.
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

// Mask both clouds and cloud shadows from the data series
var masked = function(image) {
  var s = snow(image);
  var cs = cloud_shadows(image);
  var c = clouds(image);
  image = image.updateMask(s);
  image = image.updateMask(cs);
  return image.updateMask(c);
};

/// Select Landsat Series data for period of each satellite and the nearest WRS Path and Row

// view data with Print
var landsat4_lasrc1_test = landsat4_lasrc1.filterBounds(studyArea1).filterDate('1982-08-22',
'1984-08-31');
print(landsat4_lasrc1_test);
var landsat5_lasrc1_test = landsat5_lasrc1.filterBounds(studyArea1).filterDate('1984-01-01',
 '1986-05-31');
print(landsat5_lasrc1_test);

// Landsat 4 
var landsat4_lasrc1_SA = landsat4_lasrc1.filterBounds(studyArea1).filterDate('1982-08-22',
 '1993-12-19')
 .filter(ee.Filter.or(
    ee.Filter.and(ee.Filter.eq('WRS_PATH', 36),         
                  ee.Filter.eq('WRS_ROW', 37)),
    ee.Filter.and(ee.Filter.eq('WRS_PATH', 35), 
                  ee.Filter.eq('WRS_ROW', 37))));

// Landsat 5 
var landsat5_lasrc1_SA = landsat5_lasrc1.filterBounds(studyArea1).filterDate('1984-01-01',
 '2012-05-05')
 .filter(ee.Filter.eq('WRS_PATH', 35))
 .filter(ee.Filter.eq('WRS_ROW', 37));
 
// Landsat 7 
var landsat7_lasrc1_SA = landsat7_lasrc1.filterBounds(studyArea1).filterDate('1999-01-01',
 '2018-05-31')
 .filter(ee.Filter.eq('WRS_PATH', 35))
 .filter(ee.Filter.eq('WRS_ROW', 37));
          
// Landsat 8 
var landsat8_lasrc1_SA = landsat8_lasrc1.filterBounds(studyArea1).filterDate('2013-04-11',
 '2018-05-31')
 .filter(ee.Filter.eq('WRS_PATH', 35))
 .filter(ee.Filter.eq('WRS_ROW', 37));

/// Create a Mosaic for the Viewer

// Landsat 4
var l4mosaic = landsat4_lasrc1.filterBounds(region).filterDate('1983-05-01', 
  '1983-09-01').mosaic();

// Landsat 5
var l5mosaic = landsat5_lasrc1.filterBounds(region).filterDate('1984-05-01', 
  '1984-09-01').mosaic();

// Landsat 7
var l7mosaic = landsat7_lasrc1.filterBounds(region).filterDate('1999-05-01', 
  '1999-09-01').mosaic();

// Landsat 8
var l8mosaic = landsat8_lasrc1.filterBounds(region).filterDate('2018-01-01', 
  '2018-04-01').mosaic();


/// Apply the snow, cloud, shadow masks to the Landsat Series
var landsat4_lasrc1_free = landsat4_lasrc1_SA.map(masked);
var landsat5_lasrc1_free = landsat5_lasrc1_SA.map(masked);
var landsat7_lasrc1_free = landsat7_lasrc1_SA.map(masked);
var landsat8_lasrc1_free = landsat8_lasrc1_SA.map(masked);


/// View mosaiced scenes with and without clouds with false color

// Landsat 4
var l4mosaic_free = masked(l4mosaic);
var visParams = {bands: ['B2', 'B3', 'B1'],min: [0,0,0],max: [2000, 2000, 2000]};
Map.addLayer(l4mosaic, visParams, 'Landsat 4 w/ clouds'); 
Map.addLayer(l4mosaic_free, visParams, 'Landsat 4 cloud free'); 


// Landsat 5
var l5mosaic_free = masked(l5mosaic);
var visParams = {bands: ['B2', 'B3', 'B1'],min: [0,0,0],max: [2000, 2000, 2000]};
Map.addLayer(l5mosaic, visParams, 'Landsat 5 w/ clouds'); 
Map.addLayer(l5mosaic_free, visParams, 'Landsat 5 cloud free'); 


// Landsat 7
var l7mosaic_free = masked(l7mosaic);
var visParams = {bands: ['B2', 'B3', 'B1'],min: [0,0,0],max: [2000, 2000, 2000]};
Map.addLayer(l7mosaic, visParams, 'Landsat 7 w/ clouds'); 
Map.addLayer(l7mosaic_free, visParams, 'Landsat 7 cloud free'); 


// Landsat 8
var l8mosaic_free = masked(l8mosaic);
var visParams = {bands: ['B3', 'B4', 'B2'],min: [0,0,0],max: [2000, 2000, 2000]};
Map.addLayer(l8mosaic, visParams, 'Landsat 8 w/ clouds'); 
Map.addLayer(l8mosaic_free, visParams, 'Landsat 8 cloud free'); 

///////////////////////////////////////////////////////

/// Compute the Normalized Difference Vegetation Index (NDVI) for the cloud free imagery

// Landsat 5
var calc_l5ndvi = function(landsat5_lasrc1_free) {
  return landsat5_lasrc1_free
    .addBands(landsat5_lasrc1_free.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat5 = landsat5_lasrc1_free
  .filterBounds(studyArea1)
  .map(calc_l5ndvi);

// Plot a time series of the NDVI within the Study Area 1 AOI.
var l5Chart1 = ui.Chart.image.series(filteredLandsat5.select('NDVI'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 5 NDVI time series in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l5Chart1);
print(filteredLandsat5.select('NDVI'), 'cloud-threholded Landsat 5 NDVI');

var filteredLandsat5 = landsat5_lasrc1_free
  .filterBounds(studyArea2)
  .map(calc_l5ndvi);

// Plot a time series of the NDVI within the Study Area 2 AOI.
var l5Chart2 = ui.Chart.image.series(filteredLandsat5.select('NDVI'), studyArea2)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 5 NDVI time series in Study Area 2',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l5Chart2);
print(filteredLandsat5.select('NDVI'), 'cloud-threholded Landsat 5 NDVI');

// Landsat 7
var calc_l7ndvi = function(landsat7_lasrc1_free) {
  return landsat7_lasrc1_free
    .addBands(landsat7_lasrc1_free.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat7 = landsat7_lasrc1_free
  .filterBounds(studyArea1)
  .map(calc_l7ndvi);

// Plot a time series of the NDVI within the Study Area 1 AOI.
var l7Chart1 = ui.Chart.image.series(filteredLandsat7.select('NDVI'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 7 NDVI time series in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l7Chart1);
print(filteredLandsat7.select('NDVI'), 'cloud-threholded Landsat 7 NDVI');

var filteredLandsat7 = landsat7_lasrc1_free
  .filterBounds(studyArea2)
  .map(calc_l7ndvi);

// Plot a time series of the NDVI within the Study Area 2 AOI.
var l7Chart2 = ui.Chart.image.series(filteredLandsat7.select('NDVI'), studyArea2)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 7 NDVI time series in Study Area 2',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l7Chart2);
print(filteredLandsat7.select('NDVI'), 'cloud-threholded Landsat 7 NDVI');

// Landsat 8
var calc_l8ndvi = function(landsat8_lasrc1_free) {
  return landsat8_lasrc1_free
    .addBands(landsat8_lasrc1_free.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};

var filteredLandsat8 = landsat8_lasrc1_free
  .filterBounds(studyArea1)
  .map(calc_l8ndvi);

// Plot a time series of the NDVI within the Study Area 1 AOI.
var l8Chart1 = ui.Chart.image.series(filteredLandsat8.select('NDVI'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 NDVI time series in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l8Chart1);
print(filteredLandsat8.select('NDVI'), 'cloud-threholded Landsat 8 NDVI');

var filteredLandsat8 = landsat8_lasrc1_free
  .filterBounds(studyArea2)
  .map(calc_l8ndvi);

// Plot a time series of the NDVI within the Study Area 2 AOI.
var l8Chart2 = ui.Chart.image.series(filteredLandsat8.select('NDVI'), studyArea2)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Landsat 8 NDVI time series in Study Area 2',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l8Chart2);
print(filteredLandsat8.select('NDVI'), 'cloud-threholded Landsat 8 NDVI');
