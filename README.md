[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://opensource.org/licenses/GPL-3.0) [![DOI](https://zenodo.org/badge/116533015.svg)](https://zenodo.org/badge/latestdoi/116533015)
# EMSI (Ecosystem Moisture Stress Index)

Code, example data, and manuscript supplemental materials which accompany **Swetnam et al. The Ecosystem Moisture Stress Index XXXX**

Lead Author: [Tyson Lee Swetnam](http://tyson-swetnam.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0002-6639-7181)

Co-Authors: [Donald A. Falk](https://snre.arizona.edu/people/donald-falk) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](http://orcid.org/0000-0003-3873-722X), [Samapriya Roy](https://samapriya.github.io/) [![](https://orcid.org/sites/default/files/images/orcid_16x16.png)](https://orcid.org/0000-0002-1527-2602), & Stephen Yool.

<p align="center"><img src="https://raw.githubusercontent.com/tyson-swetnam/emsi/master/images/fig1.svg" height=400></p>
<p><img src="https://raw.githubusercontent.com/tyson-swetnam/emsi/master/images/fig2.svg" height=750><img src="https://raw.githubusercontent.com/tyson-swetnam/emsi/master/images/fig3.svg" height=750></p>

## Contents

The repository is organized (in the attempt) to enable reproducible research as part of the [FAIR data principles](). 

You can (re)run the analyses using your own computer, or the cloud data science workbench [CyVerse](https://cyverse.org) Discovery Environment. 

See our [Wiki](https://github.com/tyson-swetnam/emsi/wiki) for additional details.

Clone the repo to your local or VM:

```
git clone https://github.com/tyson-swetnam/emsi
```

```
gh repo clone tyson-swetnam/emsi
```

### /data

Tabular time series data presented in the manuscript. 

Raster data are from [NASA data archive](https://earthdata.nasa.gov/earth-observation-data) services (e.g., [landsat](https://landsat.gsfc.nasa.gov/data/), [modis](https://modis.gsfc.nasa.gov/data/)) and ESA data services. Data are also hosted as [Google Earth Engine Collections](https://developers.google.com/earth-engine/datasets/). These raster data can be extracted to your local computer using our example `/python/*.py` scripting and `/rmd/*.Rmd` notebooks. 

Previously extracted data are stored as `.csv` and geotiff `.tif` files on [CyVerse Data Store](https://data.cyverse.org/dav-anon/tswetnam/emsi), and R Markdown notebooks are provided in this repo which wil extract and render these data as the tables and figures used in the main text.

Additional derivative imagery layers from Google Earth Engine (GEE) are hosted on [CyVerse DataCommons](http://datacommons.cyverse.org/). 

Original commercial imagery are available from [Planet.com](https://planet.com).

### /docker

We are hosting RStudio Server containers on CyVerse for reproducing the Rmd figures.

Dockerfiles w/ automated container builds hosted on [![DockerHub](https://img.shields.io/badge/DockerHub-blue.svg?style=popout&logo=Docker)](https://hub.docker.com/r/cyversevice/rstudio-geospatial) [![CircleCI](https://circleci.com/gh/cyverse-vice/rstudio-geospatial.svg?style=svg)](https://circleci.com/gh/cyverse-vice/rstudio-geospatial) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4527797.svg)](https://doi.org/10.5281/zenodo.4527797)

Container can be run on [CyVerse Discovery Environment](https://sonora.cyverse.org) <a href="https://sonora.cyverse.org/apps/de/6943b4f2-b663-11ea-92c5-008cfa5ae621/launch?quick-launch-id=31dcb760-f872-4c1a-850a-a4a6a25febc4" target="_blank" rel="noopener noreferrer"><img src="https://sonora.cyverse.org/Powered-By-CyVerse-blue.svg"></a> 

Other CyVerse VICE images: https://github.com/cyverse-vice 

### /ipynb

Notebooks (Python3) for data analyses and extraction with GEE & Planet Labs enabled Jupyter Notebooks.

### /javascripts

The JavaScript code used within [Earth Engine Code UI](https://code.earthengine.google.com/) for the intial time series point extractions, cloud-free NDVI calculations, and EMSI calculations within GEE.

You can also clone the repo scripts for Earth Engine directly by running:

```
git clone https://earthengine.googlesource.com/users/tswetnam/emsi
```

Calculate and export EMSI time series videos from GEE:

```
git clone https://earthengine.googlesource.com/users/samapriya/emsi-utils
```

### /rmd

R Markdown files with statistical data analyses for figures in manuscript. 

These Rmd are also hosted as HTML on the CyVerse Data Store

[Okavango Delta example](https://data.cyverse.org/dav-anon/iplant/home/tswetnam/emsi/rmd/okavango-rasters-analyses.html)

[US-Mexico Border grasslands example](https://data.cyverse.org/dav-anon/iplant/home/tswetnam/emsi/rmd/usmex-rasters-analyses.html)

[Acre Rainforest example](https://data.cyverse.org/dav-anon/iplant/home/tswetnam/emsi/rmd/acre-rasters-analyses.html)

[Yakutia Taiga Forest example](https://data.cyverse.org/dav-anon/iplant/home/tswetnam/emsi/rmd/yakutia-rasters-analyses.html)

### /python

Python `.py` files for extracting image collections to Google Drive.
