FROM rocker/verse:3.5.3
# This container is built from a base image by the Rocker Group - who are awesome. 
MAINTAINER "Tyson Swetnam" tswetnam@cyverse.org

# Original Dockerfile from Rocker/Geospatial
# Install linux dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    lbzip2 \
    libfftw3-dev \
    libgdal-dev \
    libgeos-dev \
    libgsl0-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libhdf4-alt-dev \
    libhdf5-dev \
    libjq-dev \
    liblwgeom-dev \
    libproj-dev \
    libprotobuf-dev \
    libnetcdf-dev \
    libsqlite3-dev \
    libssl-dev \
    libudunits2-dev \
    netcdf-bin \
    protobuf-compiler \
    tk-dev \
    unixodbc-dev 
# Original Rocker Geospatial R libraries
RUN install2.r --error \
    RColorBrewer \
    RandomFields \
    RNetCDF \
    classInt \
    deldir \
    gstat \
    hdf5r \
    lidR \
    mapdata \
    maptools \
    mapview \
    ncdf4 \
    proj4 \
    raster \
    rgdal \
    rgeos \
    rlas \
    sf \
    sp \
    spacetime \
    spatstat \
    spdep \
    geoR \
    geosphere
# Added new R libraries 
RUN install2.r --error \    
    # Added Packages
    PerformanceAnalytics \
    boot \
    devtools \
    dlm \
    dplyr \
    foreign \
    lubridate \
    plotly \
    truncreg 
