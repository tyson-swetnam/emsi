#!/usr/bin/env python

import time
import oauth2client
import ee

ee.Initialize()

## Landsat 5 Collection
l5=ee.Image('users/samapriya/emsi/multiband_okavango')

def exportCollectionToDrive (userCollection,folderName):
    userCollection2=userCollection
    imageList = ee.List(userCollection2.toList(userCollection2.size().add(1)))
    length = userCollection2.size().getInfo()
    print(length)

    def exportImage(img):
        fileName = ee.String(img.get('system:index')).getInfo()
        fileGeometry = geom.bounds().getInfo()['coordinates'][0]
        band=ee.Image(img).bandNames().get(0)
        sc=30  ##pixel size

    index = 0
    while index < length:
        print("Export #: " + str(index+1))
        img2export = ee.Image(imageList.get(index))
        exportImage(img2export)
        index = index + 1
        time.sleep(1) # sleep for 1 seconds

    print('Finished exporting data')
    print('')
exportImageToDrive(userCollection=l5, folderName="gee-collection-okavango-emsi")
