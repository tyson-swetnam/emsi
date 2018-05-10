# Launching instance on CyVerse Atmosphere or XSEDE Jetstream

[Cyverse Atmosphere](http://www.cyverse.org/atmosphere) and [XSEDE Jetstream](https://www.jetstream-cloud.org/)

Once the instance is `active` you can install additional software.

# Install Anaconda (Jupyter Lab)

Type:

```
ezd
```

# Install Docker

Follow the `ezd` installation instructions and [install Docker](https://cyverse-ez-quickstart.readthedocs-hosted.com/en/latest/#ez-install-docker)  using the provided Ansible playbook.

Open the emulated `Web Shell` from the UI or a terminal and `ssh` into the instance.

Type:

```
ezd
```

To run Docker without `sudo` privileges ([full instructions](https://cyverse-ez-quickstart.readthedocs-hosted.com/en/latest/docker.html))

```
sudo usermod -aG docker $USER
```

exit the terminal and reconnect.

check installation

```
docker run hello-world
```

# Install and Run Google Earth Engine API Docker Container

[Google Earth Engine API](https://github.com/google/earthengine-api) can be run in a Docker container.

Follow instructions for local machine [installation with Docker](https://developers.google.com/earth-engine/python_install-datalab-local)

`ssh` into the instance using the provided instructions. 
