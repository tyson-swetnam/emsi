var gridmet_collection = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET"),
    daymet_collection = ee.ImageCollection("NASA/ORNL/DAYMET_V3"),
    region = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-111.060791015625, 33.03629817885956],
          [-111.983642578125, 32.46342595776104],
          [-111.456298828125, 31.409912194070973],
          [-110.56640625, 30.031055426540206],
          [-108.446044921875, 29.83111376473715],
          [-108.0615234375, 30.79847417956782],
          [-108.006591796875, 32.54681317351514]]]),
    studyArea2 = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-109.28602695465088, 31.853675409503747],
          [-109.28616642951965, 31.853584278868873],
          [-109.28605914115906, 31.85252715692271],
          [-109.28491115570068, 31.85168874124538],
          [-109.28231477737427, 31.85099613124103],
          [-109.28048014640808, 31.849948093054838],
          [-109.27950382232666, 31.850221495468983],
          [-109.27832365036011, 31.852363119672574],
          [-109.27821636199951, 31.853775653098094],
          [-109.27937507629395, 31.85465050165985],
          [-109.28177833557129, 31.854942116002672]]]),
    studyArea1 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-109.281907081604, 31.848726885710057],
          [-109.2845892906189, 31.84917344848011],
          [-109.28596258163452, 31.84956532831343],
          [-109.28731441497803, 31.848726885710057],
          [-109.28732514381409, 31.848216525611086],
          [-109.28688526153564, 31.847551230527788],
          [-109.28528666496277, 31.846721883362054],
          [-109.28335547447205, 31.846740110852423],
          [-109.28176760673523, 31.84695884045601],
          [-109.28087711334229, 31.847423639141486],
          [-109.28025484085083, 31.848016026228148],
          [-109.27955746650696, 31.848653977297406],
          [-109.28072690963745, 31.848672204405947]]]);
// Create a studyArea 1 and 2 polygons (see Imports above)
var gridmet_studyArea1 = gridmet_collection.filterBounds(studyArea1).filterDate('1995-01-01',
 '2005-12-31');
 
 var gridmet_studyArea2 = gridmet_collection.filterBounds(studyArea2).filterDate('1984-01-01',
 '1994-12-31');

var daymet_studyArea1 = daymet_collection.filterBounds(studyArea1).filterDate('1995-01-01',
 '2005-12-31');

var daymet_studyArea2 = daymet_collection.filterBounds(studyArea2).filterDate('1984-01-01',
 '1994-12-31');
 
Map.centerObject(studyArea1, 10);

// Plot 1000hr fuel moisture for Study Area 1
Map.addLayer(ee.Image(gridmet_studyArea1.select('fm1000').first()),
 {min:0.0, max:20, bands: 'fm1000'},
 'Study Area 1 1000hr fuels');

var mChart2 = ui.Chart.image.series(gridmet_studyArea1.select('fm1000'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet 1000-hr fuel moisture in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2);

// Plot Energy Release Component for Study Area 1
Map.addLayer(ee.Image(gridmet_studyArea1.select('erc').first()),
 {min:0.0, max:120, bands: 'erc'},
 'Study Area 1 erc');

var mChart2b = ui.Chart.image.series(gridmet_studyArea1.select('erc'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet Energy Release Component in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2b);

// Plot Burning Index for Study Area 1 
var mChart2c = ui.Chart.image.series(gridmet_studyArea1.select('bi'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Gridmet Burning Index in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart2c);

// Daymet temperature max for Study Area 1
Map.addLayer(ee.Image(daymet_studyArea1.select('tmax').first()),
 {min:-20, max:45, bands: 'tmax'},
 'Study Area 1 tmax');
 
var mChart3 = ui.Chart.image.series(daymet_studyArea1.select('tmax'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet temperature max in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart3);

// Daymet temperature min for Study Area 1
var mChart4 = ui.Chart.image.series(daymet_studyArea1.select('tmin'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet temperature min in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart4);

// Daymet precipitation for Study Area 1
var mChart4 = ui.Chart.image.series(daymet_studyArea1.select('prcp'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet Precipitation in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart4);

// Daymet Precipitation for Study Area 1
var mChart5 = ui.Chart.image.series(daymet_studyArea1.select('vp'), studyArea1)
    .setChartType('ScatterChart')
    .setOptions({
      title: 'Daymet Vapor Pressure in Study Area 1',
      trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 0.1,
      pointSize: 1,
    });
print(mChart5);
