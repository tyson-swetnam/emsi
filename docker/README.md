Dockerfiles for automated builds are hosted on Docker Hub and CyVerse VICE

image            | description                               | size   | metrics | build status 
---------------- | ----------------------------------------- | ------ | ------- | --------------
[emsi-rstudio](https://hub.docker.com/r/tswetnam/emsi/docker) | RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/emsi-rstudio.svg)](https://microbadger.com/images/tswetnam/emsi-rstudio) | [![](https://img.shields.io/docker/pulls/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio)  |  [![](https://img.shields.io/docker/automated/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio/builds)
[vice-rstudio](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial/docker) | VICE RStudio R v3.5.3 w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/vice-rstudio-geospatial.svg)](https://microbadger.com/images/tswetnam/vice-rstudio-geospatial) | [![](https://img.shields.io/docker/pulls/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial)  |  [![](https://img.shields.io/docker/automated/tswetnam/vice-rstudio-geospatial.svg)](https://hub.docker.com/r/tswetnam/vice-rstudio-geospatial/builds)


`rstudio-geospatial` container is hosted on DockerHub.

```
docker run -it --rm -d -p 8787:8787 -e PASSWORD=password tswetnam/rstudio:geospatial-3.5.3
```

`vice-rstudio-geospatial` is intended for deployment on the CyVerse VICE. To test it locally with Docker:

```
docker run -it --rm -v /$HOME:/app --workdir /app -p 8787:80 -e REDIRECT_URL=http://calliope.cyverse.org:8787 tswetnam/vice-rstudio-geospatial:3.5.3
```

