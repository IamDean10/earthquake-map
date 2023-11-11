
# Fun Test - Earthquake Map

The "Earthquake Map" website is a dynamic and interactive platform built using HTML, CSS, JavaScript. It provides users with real-time information and visualizations of earthquake occurrences worldwide. Through the integration of various APIs and data sources, the website offers an intuitive map interface where users can explore earthquake data. With its responsive design and smooth user experience, the Earthquake Map website aims to educate and raise awareness about seismic activities while keeping users informed about recent earthquakes globally.


## API Reference

#### Get all the earthquakes in the past 24 hours

```http
  GET https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

#### Get earthquake details

```http
  GET  https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson
```
note: you can directly used the url given in the earthquakes feed v1 summary api.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## Features

- Responsive Design
- Google Map Integration
- Earthquake Details
- External Links
- Optimized for low end devices



## Tech Stack

**Client:** HTML, CSS, JavaScript

**Server:** Github Pages


## Demo

https://iamdean10.github.io/


## Run Locally

Clone the project

```bash
  git clone https://github.com/IamDean10/iamDean10.github.io.git
```

Go to the project directory

```bash
  cd iamDean10.github.io
```

Start the server

```bash
  Note: Your directly run it by opening index.html file or use VS Code live server plugin.
```


## Screenshots

![App Screenshot](https://drive.google.com/uc?id=1qqmjIUzoQ0anFd_4TQEe12UqCaLnsYTR)

![App Screenshot](https://drive.google.com/uc?id=1or039N_eMkRBwH_wXnzL4HdWTsORbwfK)

![App Screenshot](https://drive.google.com/uc?id=1k_hwPXBkdqD5r52ppsG_vEXxwRUJaUu-)

![App Screenshot](https://drive.google.com/uc?id=10WAAOcYUlvYn5su7EM0U5sOYFEnEIJ7S)

## Authors

- [@iamDean10](https://github.com/IamDean10)

