[![Project Supported by CyVerse](https://img.shields.io/badge/Supported%20by-CyVerse-blue.svg)](https://www.cyverse.org) [![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

VICE | version | size | metrics | build status 
-----| ------- | ---- | ------- | ------------
<a href="https://de.cyverse.org/de/?type=quick-launch&quick-launch-id=a7509bf3-a019-4814-b9fa-f1788d0f68a0&app-id=33939454-bbb3-11e9-9fb7-008cfa5ae621" target="_blank"><img src="https://de.cyverse.org/Powered-By-CyVerse-blue.svg"></a>| v3.6.0 | [![](https://images.microbadger.com/badges/image/cyversevice/rstudio-geospatial:3.6.0.svg)](https://microbadger.com/images/cyversevice/rstudio-geospatial:3.6.0 "Get your own image badge on microbadger.com")| [![](https://img.shields.io/docker/pulls/cyversevice/rstudio-geospatial.svg)](https://hub.docker.com/r/cyversevice/rstudio-geospatial)  |  [![](https://img.shields.io/docker/automated/cyversevice/rstudio-geospatial.svg)](https://hub.docker.com/r/cyversevice/rstudio-geospatial/builds)

# Instructions

## Run Docker locally or on a Virtual Machine

To run the RStudio container, you must first pull them from DockerHub, or activate a [CyVerse Account](https://user.cyverse.org/services/mine).

A Docker container for running RStudio is hosted on DockerHub.

```
docker pull tswetnam/emsi-rstudio:3.6.0
```

```
docker run -it --rm -d -p 8787:8787 -e PASSWORD=password tswetnam/emsi-rstudio:3.6.0
```

The default username is `rstudio` and password is `rstudio1`

## Run Docker container in CyVerse VICE

This container is run on the CyVerse data science workbench, called [VICE](https://cyverse-visual-interactive-computing-environment.readthedocs-hosted.com/en/latest/index.html). 

Unless you plan on making changes to this container, you should just use the existing launch button above. 

###### Developer notes

To test the container locally:

```
docker run -it --rm -v /$HOME:/app --workdir /app -p 8787:80 -e REDIRECT_URL=http://localhost:8787 tswetnam/vice-rstudio-geospatial:3.6.0
```

The default username is `rstudio` and the default password is `rstudio1`
