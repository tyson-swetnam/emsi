#!/usr/bin/env python

import time
import oauth2client
import ee

ee.Initialize()

## Polygon area for extraction
## Polygon area for extraction
geom=ee.Geometry.Polygon(
       [[[-110.700, 31.245],
          [-110.367, 31.245],
          [-110.367, 31.429],
          [-110.700, 31.429]]])

## Landsat 8 Collection
l8=ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-04-11', '2018-09-11').filterBounds(geom)

def exportCollectionToDrive (userCollection,folderName):
    userCollection2=userCollection#.map(toals)
    imageList = ee.List(userCollection2.toList(userCollection2.size().add(1)))
    length = userCollection2.size().getInfo()
    print(length)


    def exportImage(img):
        fileName = ee.String(img.get('system:index')).getInfo()
        fileGeometry = geom.bounds().getInfo()['coordinates'][0]
        band=ee.Image(img).bandNames().get(0)
        sc=30  ##pixel size

        ## Masking
        cloud=img.select('pixel_qa').bitwiseAnd(32).neq(0)
        img=img.updateMask(cloud.Not())
        cloud_shadow = img.select('pixel_qa').bitwiseAnd(8).neq(0)
        img=img.updateMask(cloud_shadow.Not())

        ##Check overlap
        area=ee.Feature(geom).geometry().area()
        imgarea=ee.Image(img).multiply(0).add(1).clip(geom).reduceRegion(
            reducer= ee.Reducer.sum().unweighted(),
            geometry= geom,
            maxPixels= 1e12,
            tileScale= 1,
            scale=30)
        imgp=ee.Number(imgarea.get(band)).multiply(sc).multiply(sc).divide(area)

        ##Check for overlap
        if imgp.getInfo()>=0.8:
            task = ee.batch.Export.image.toDrive(
                image = img.normalizedDifference(['B5', 'B4']).rename('NDVI').toFloat(),
                description = fileName,
                folder = 'gee-collection-usmex-landsat8',
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
        time.sleep(1) # sleep for 1 seconds

    print('Finished exporting data')
    print('')
exportCollectionToDrive(userCollection=l8, folderName="gee-collection-usmex-landsat8")
