Dockerfiles for automated builds are hosted on Docker Hub and CyVerse VICE

image            | description                               | size   | metrics | build status 
---------------- | ----------------------------------------- | ------ | ------- | --------------
[emsi-rstudio](https://hub.docker.com/r/tswetnam/emsi/docker) | RStudio w/ geospatial depends | [![](https://images.microbadger.com/badges/image/tswetnam/emsi-rstudio.svg)](https://microbadger.com/images/tswetnam/emsi-rstudio) | [![](https://img.shields.io/docker/pulls/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio)  |  [![](https://img.shields.io/docker/automated/tswetnam/emsi-rstudio.svg)](https://hub.docker.com/r/tswetnam/emsi-rstudio/builds)

`rstudio-geospatial` is hosted on Docker Hub.

```
docker run -it --rm -d -p 8787:8787 -e PASSWORD=password tswetnam/rstudio:geospatial-3.5.2
```

`vice-rstudio-geospatial` is intended for deployment on the CyVerse VICE
