[![Project Supported by CyVerse](https://img.shields.io/badge/SupportedBy-CyVerse-blue.svg)](https://www.cyverse.org) [![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

image            | description                               | size   | metrics | build status 
---------------- | ----------------------------------------- | ------ | ------- | --------------
[emsi-rstudio](https://hub.docker.com/r/tswetnam/emsi/docker) | RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/emsi-rstudio.svg)](https://microbadger.com/images/tswetnam/emsi-rstudio) | [![](https://img.shields.io/docker/pulls/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio)  |  [![](https://img.shields.io/docker/automated/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio/builds)
[![VICE](https://img.shields.io/badge/CyVerse-VICE-blue.svg?style=popout&logo=Docker&color=#1488C6)]()| VICE RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/vice-rstudio-geospatial.svg)](https://microbadger.com/images/tswetnam/vice-rstudio-geospatial) | [![](https://img.shields.io/docker/pulls/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial)  |  [![](https://img.shields.io/docker/automated/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial/builds)

# Instructions

## Run Docker locally or on a Virtual Machine

To run the containers, you must first pull them from DockerHub, or activate a [CyVerse Account](https://user.cyverse.org/services/mine).

`rstudio-geospatial` container is hosted on DockerHub.

```
docker pull tswetnam/emsi-rstudio:3.5.3
```

```
docker run -it --rm -d -p 8787:8787 -e PASSWORD=password tswetnam/emsi-rstudio:3.5.3
```

The default username is `rstudio` and password is `rstudio1`

## Run in CyVerse VICE

`vice-rstudio-geospatial` is intended for deployment on the [CyVerse VICE](https://cyverse-visual-interactive-computing-environment.readthedocs-hosted.com/en/latest/index.html). 

To test this container locally:

```
docker run -it --rm -v /$HOME:/app --workdir /app -p 8787:80 -e REDIRECT_URL=http://localhost:8787 tswetnam/vice-rstudio-geospatial:3.5.3
```

The default username is `rstudio` and the default password is `rstudio1`
