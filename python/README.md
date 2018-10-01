# Python scripts

The scripts in this directory are used for extracting image collections from around our four example areas.

## Dependencies

```
sudo pip install earthengine-api
sudo pip install oauth2client
```

## Authenticate `username` to Earth Engine

You must have Python2 and Google Earth Engine Account to access.

```
python --version
earthengine authenticate --quiet
```

The result of `earthengine authenticate` should be something like this:

```
Paste the following address into a web browser:

    https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fearthengine+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdevstorage.full_control&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&client_id=517222506229-vsmmajv00ul0bs7p89v5m89qs8eb9359.apps.googleusercontent.com

On the web page, please authorize access to your Earth Engine account and copy the authentication code. Next authenticate with the following command:

    earthengine authenticate --authorization-code=PLACE_AUTH_CODE_HERE

```

Copy paste the token and code above:
```
earthengine authenticate --authorization-code=4/aABGWQkfckJYuI_XFgGoVpiGKU_vVF3F-eS3TFvuVEYjRBLV1xF72xg
```

## Run the python scripts

To extract the collection, you must establish an area of interest in the `.py` file

Run the `.py` file locally:

```
python gee-collection-usmex-l7.py
```

# CyberDuck

After transfering the file collections to a Google Drive Account, I used [CyberDuck CLI ](https://duck.sh/) to move the files from my Google Drive onto my workstation.

```
duck --verbose --parallel 2 --username <username>@<my-institution-email> --download googledrive://<my-institution-email>/My%20Drive/<collection-name>/ ~/emsi/data/collections/<collection-name>

```
