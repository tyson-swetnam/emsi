FROM cyversevie/rstudio-geospatial:3.6.3
# This container's base image is by the Rocker Group
# CyVerse image installs iRODS iCommands and nginx for https proxy
MAINTAINER "Tyson Lee Swetnam tswetnam@cyverse.org"

# Add additional R libraries beyond base Rocker Geospatial 
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
