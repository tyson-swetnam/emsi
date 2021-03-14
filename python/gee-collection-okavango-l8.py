#!/usr/bin/env python

import time
import oauth2client
import ee

ee.Initialize()

## Polygon area for extraction
geom=ee.Geometry.Polygon(
       [[[21.870, -18.730],
          [21.870, -19.510],
          [22.840, -19.510],
          [22.840, -18.730]]])

## Landsat 8 Collection
l8=ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-01-01', '2021-03-01').filterBounds(geom)

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
            folder = 'gee-collection-okavango-landsat8-2021',
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
exportCollectionToDrive(userCollection=l8, folderName="gee-collection-okavango-landsat8-2021")
