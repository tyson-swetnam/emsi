#!/usr/bin/env python

import time
import oauth2client
import ee

ee.Initialize()

geom=ee.Geometry.Polygon(
        [[[-110.56030161232809, 31.356061922317178],
          [-110.55721170754293, 31.321460260775417],
          [-110.53146250099996, 31.326152757145508],
          [-110.52905924172262, 31.35078452529268]]])

l8=ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2018-05-01', '2018-08-30').filterBounds(geom)

def exportCollectionToDrive (userCollection,folderName):
    userCollection2=userCollection#.map(toals)
    imageList = ee.List(userCollection2.toList(userCollection2.size().add(1)))
    length = userCollection2.size().getInfo()
    print(length)

    def exportImage(img):
        fileName = ee.String(img.get('system:index')).getInfo()
        fileGeometry = geom.bounds().getInfo()['coordinates'][0]
        task = ee.batch.Export.image.toDrive(
            image = img.normalizedDifference(['B5', 'B4']).rename('NDVI').toFloat(),
            description = fileName,
            folder = 'NDVI-Test',
            maxPixels = 1e13,
            region = fileGeometry,
            scale = 30)
        task.start()

    index = 0
    while index < length:
        print("Export #: " + str(index+1))
        img2export = ee.Image(imageList.get(index))
        exportImage(img2export)
        index = index + 1
        time.sleep(5)

    print('Finished exporting data')
    print('')
exportCollectionToDrive(userCollection=l8, folderName="NDVI-Test")
