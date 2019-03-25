FROM rocker/geospatial:3.5.3
# This container is built from a base image by the Rocker Group - who are awesome. 
MAINTAINER "Tyson Lee Swetnam tswetnam@cyverse.org"

# Add additional R libraries beyond Rocker Geospatial which fit our specific project needs.
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
    truncreg \
    ggridges 

ENV PASSWORD "rstudio1"
