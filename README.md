[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://opensource.org/licenses/GPL-3.0) [![DOI](https://zenodo.org/badge/116533015.svg)](https://zenodo.org/badge/latestdoi/116533015)
# EMSI (Ecosystem Moisture Stress Index)

Code, example data, and manuscript supplemental materials which accompany **Swetnam et al. The Ecosystem Moisture Stress Index XXXX**

Author(s):
Maintainer: [Tyson Lee Swetnam](http://tyson-swetnam.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0002-6639-7181)

Co-Authors: [Donald A. Falk](https://snre.arizona.edu/people/donald-falk) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0003-3873-722X), [Samapriya Roy](https://samapriya.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](https://orcid.org/0000-0002-1527-2602), Stephen Yool,

## Contents

The repository is organized (in the attempt) to enable reproducible research. 

You can (re)run our analyses using your own computer or cloud-based data science workbench, e.g., [CyVerse](https://cyverse.org) Discovery Environment. 

See our [Wiki](https://github.com/tyson-swetnam/emsi/wiki) for additional details

### /data

Example time series presented in the manuscript. 

Data are from NASA data services, as well as Google Earth Engine Collections. These data can be extracted again using our example `/ipynb` and `/rmd` notebooks. 

Prevously extracted data are stored as `.csv` and geotiff `.tif` files on Cyverse Data Store R Markdown notebooks are provided which render these data as tables and figures in the main text.

Additional derivative imagery layers from Google Earth Engine are hosted on [CyVerse DataCommons](http://datacommons.cyverse.org/). 

Original imagery are available from GEE or Planet.com.

### /docker

Dockerfile and automated container builds hosted on [![DockerHub](https://img.shields.io/badge/DockerHub-blue.svg?style=popout&logo=Docker)](https://hub.docker.com/r/cyversevice/rstudio-geospatial) [![CircleCI](https://circleci.com/gh/cyverse-vice/rstudio-geospatial.svg?style=svg)](https://circleci.com/gh/cyverse-vice/rstudio-geospatial) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3246938.svg)](https://doi.org/10.5281/zenodo.3246938)


Container can be run on [CyVerse Discovery Environment](https://de.cyverse.org)

VICE | version | size | metrics | build status 
-----| ------- | ---- | ------- | ------------
<a href="https://de.cyverse.org/de/?type=quick-launch&quick-launch-id=a7509bf3-a019-4814-b9fa-f1788d0f68a0&app-id=33939454-bbb3-11e9-9fb7-008cfa5ae621" target="_blank"><img src="https://de.cyverse.org/Powered-By-CyVerse-blue.svg"></a>| v3.6.0 | [![](https://images.microbadger.com/badges/image/cyversevice/rstudio-geospatial:3.6.0.svg)](https://microbadger.com/images/cyversevice/rstudio-geospatial:3.6.0 "Get your own image badge on microbadger.com")| [![](https://img.shields.io/docker/pulls/cyversevice/rstudio-geospatial.svg)](https://hub.docker.com/r/cyversevice/rstudio-geospatial)  |  [![](https://img.shields.io/docker/automated/cyversevice/rstudio-geospatial.svg)](https://hub.docker.com/r/cyversevice/rstudio-geospatial/builds)

Other CyVerse VICE images: https://github.com/cyverse-vice 
### /ipynb

Jupyter Notebooks (Python3, R) for data analyses.

### /javascripts

JavaScript code used in [Earth Engine Code UI](https://code.earthengine.google.com/) for point and area data extraction.

### /rmd

R Markdown files with statistical data analyses for figures in manuscript. 

### /python

Python `.py` files for extracting image collections to Google Drive.

### Quickstart

Start a [CyVerse](https://cyverse.org) cloud instance on Atmosphere and provision it with [Earth Engine API](atmo.md)

