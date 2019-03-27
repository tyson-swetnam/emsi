[![Project Supported by CyVerse](https://img.shields.io/badge/Supported%20by-CyVerse-blue.svg)](https://www.cyverse.org)
[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://opensource.org/licenses/GPL-3.0) [![DOI](https://zenodo.org/badge/116533015.svg)](https://zenodo.org/badge/latestdoi/116533015)
# EMSI (Ecosystem Moisture Stress Index)

Code, example data, and manuscript supplemental materials which accompany **Swetnam et al. The Ecosystem Moisture Stress Index XXXX**

Maintainer: [Tyson Lee Swetnam](http://tyson-swetnam.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0002-6639-7181)

## Contents

The repository is organized to enable reproducible research. 

Users can (re)run our analyses using their own computer or a cloud-based data science workbench, like [CyVerse](https://cyverse.org) Discovery Environment. 

See our [Wiki](https://github.com/tyson-swetnam/emsi/wiki) tab for free membership access and other requirements.

### /data

Example time series used in the manscript. 

Data are stored as `.csv` files for use in R. R Markdown notebooks are provided which render these data as tables and figures in the main text.

Additional derivative imagery layers from Google Earth Engine are hosted on [CyVerse DataCommons](http://datacommons.cyverse.org/). 

Original imagery are available from GEE or Planet.com.

### /docker

Dockerfiles for automated container builds on Docker Hub.

Containers can be run locally (emsi-rstudio) image, or on CyVerse VICE.

image            | description                               | size   | metrics | build status 
---------------- | ----------------------------------------- | ------ | ------- | --------------
[![DockerHub](https://img.shields.io/badge/DockerHub-brightgreen.svg?style=popout&logo=Docker)](https://hub.docker.com/r/tswetnam/emsi-rstudio) | RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/emsi-rstudio.svg)](https://microbadger.com/images/tswetnam/emsi-rstudio) | [![](https://img.shields.io/docker/pulls/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio)  |  [![](https://img.shields.io/docker/automated/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio/builds)
[![VICE](https://img.shields.io/badge/CyVerse-VICE-blue.svg?style=popout&logo=Docker&color=#1488C6)]()| VICE RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/vice-rstudio-geospatial.svg)](https://microbadger.com/images/tswetnam/vice-rstudio-geospatial) | [![](https://img.shields.io/docker/pulls/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial)  |  [![](https://img.shields.io/docker/automated/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial/builds)

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

