//GET - earthquake feed
async function getEarthquakesFeed() {
  const response = await $.ajax({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
    type: "GET",
  });
  return response;
}
//GET - earthquake details
async function getEarthquakesDetail(url) {
  const response = await $.ajax({
    url: url,
    type: "GET",
  });
  return response;
}
