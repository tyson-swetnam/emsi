FROM rocker/verse:3.5.2
# This container is built from a base image by the Rocker Group - who are awesome. 
MAINTAINER "Tyson Swetnam" tswetnam@cyverse.org

# Original Dockerfile from Rocker/Geospatial
# Added several additional R packages and dependencies
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

## VICE Configurations
RUN apt-get update \
    && apt-get install -y lsb wget apt-transport-https python2.7 python-requests curl supervisor nginx gnupg2

RUN wget -qO - https://packages.irods.org/irods-signing-key.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.irods.org/apt/ xenial main" > /etc/apt/sources.list.d/renci-irods.list \
    && apt-get update \
	&& apt-get install -y irods-icommands

ADD https://github.com/hairyhenderson/gomplate/releases/download/v2.5.0/gomplate_linux-amd64 /usr/bin/gomplate
RUN chmod a+x /usr/bin/gomplate

# run.sh
RUN echo '#!/bin/sh\n\ 
gomplate -f /nginx.conf.tmpl -o /etc/nginx/nginx.conf\n\
supervisord -c /etc/supervisor/supervisord.conf -n\n'\
>> /usr/local/bin/run.sh

RUN chmod 755 /usr/local/bin/run.sh

#nginx.conf.tmpl
RUN echo 'daemon off;\n\
worker_processes  1;\n\
\n\
error_log  /var/log/nginx/error.log warn;\n\
pid        /var/run/nginx.pid;\n\
\n\
events {\n\
    worker_connections  1024;\n\
}\n\
\n\
http {\n\
\n\
  map $http_upgrade $connection_upgrade {\n\
      default upgrade;\n\
      ''      close;\n\
    }\n\
\n\
  server {\n\
    listen 80;\n\
\n\
    location / {\n\
      proxy_pass http://localhost:8787;\n\
      proxy_redirect http://localhost:8787 {{.Env.REDIRECT_URL}};\n\
      proxy_http_version 1.1;\n\
      proxy_set_header Upgrade $http_upgrade;\n\
      proxy_set_header Connection $connection_upgrade;\n\
      proxy_read_timeout 20d;\n\
    }\n\
  }\n\
}\n'\
>> nginx.conf.tmpl

RUN echo '# Server Configuration File\n\
www-address=127.0.0.1\n\
rsession-which-r=/usr/local/bin/R\n'\
>> /etc/rstudio/rserver.conf

RUN echo '[program:nginx]\n\
command=nginx\n'\
>> /etc/supervisor/conf.d/nginx.conf

RUN echo '[program:rstudio]\n\
command=/usr/lib/rstudio-server/bin/rserver --server-daemonize 0\n'\
>> /etc/supervisor/conf.d/rstudio.conf

ENV REDIRECT_URL "http://localhost"
ENV PASSWORD "password"

RUN bash /etc/cont-init.d/userconf

ENTRYPOINT ["/usr/local/bin/run.sh"]
