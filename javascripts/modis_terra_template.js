var region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-111.060791015625, 33.03629817885956],
          [-111.983642578125, 32.46342595776104],
          [-111.456298828125, 31.409912194070973],
          [-110.56640625, 30.031055426540206],
          [-108.446044921875, 29.83111376473715],
          [-108.0615234375, 30.79847417956782],
          [-108.006591796875, 32.54681317351514]]]),
    modis_terra = ee.ImageCollection("MODIS/006/MOD13Q1"),
    modis_aqua = ee.ImageCollection("MODIS/006/MYD13Q1"),
    studyArea = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-109.2876148223877, 31.85769418094142],
          [-109.28937435150146, 31.856855812242912],
          [-109.29040431976318, 31.854158400365126],
          [-109.2896318435669, 31.850440216816747],
          [-109.28915977478027, 31.850221495468983],
          [-109.28499698638916, 31.84960178216677],
          [-109.2826795578003, 31.85014858823779],
          [-109.28117752075195, 31.854267756435345],
          [-109.28383827209473, 31.85645485060546]]]);

// Filter to scenes that intersect your study region.
var modis_studyArea = modis_terra.filterBounds(studyArea);
// Filter for a range of dates
var modis_SA = modis_studyArea.filterDate('2000-02-18',
 '2018-04-07')
// Sort the collection in chronological order.
.sort('system:time_start', true); 
print(modis_SA)

// Mask out clouds, shadows, and snow
var tmp1_masked = modis_SA.map(function(image){ 
  return image.updateMask(image.select(['SummaryQA']).eq(0))
});

// Add the first masked image in the collection to the map window.
Map.addLayer(ee.Image(tmp1_masked.first()),
 {min:1000, max:6000, bands: 'NDVI'},
 'first image with clouds masked');
// Center your map.
Map.centerObject(studyArea, 14);

// Plot NDVI time series

// Plot a time series of NDVI within the Study Area AOI.
var l5Chart1 = ui.Chart.image.series(tmp1_masked.select('NDVI'), studyArea)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'MODIS NDVI time series in Study Area',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(l5Chart1);

print(tmp1_masked.select('NDVI'), 'cloud-thresholded MODIS NDVI');
