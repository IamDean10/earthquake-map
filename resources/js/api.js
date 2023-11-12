//GET - earthquake feed
async function getEarthquakesFeed() {
  const response = await $.ajax({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
    type: "GET",
    error: function (xhr) {
      errorHandler(xhr.responseText, true);
    },
  });
  return response;
}
//GET - earthquake details
async function getEarthquakesDetail(url) {
  // https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson
  const response = await $.ajax({
    url: url,
    type: "GET",
    error: function (xhr) {
      errorHandler(xhr.responseText);
    },
  });
  return response;
}

// Handle api errors
function errorHandler(response, isInitial) {
  alert(
    "Please make sure you are connected to the internet. If the issue persists, please contact an administrator.\nAPI Response: " +
      response
  );
  // If api is in initial state reload page
  isInitial ? window.location.reload() : "";
}
