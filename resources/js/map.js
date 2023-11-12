$(document).ready(() => {
  // Initialize Map on ready
  initMap();
});

async function initMap() {
  // Variables
  let earthquakeFeed = [];
  let prevInfoWindow;

  // Initialize GET earthquake feeds
  earthquakeFeed = await API.getEarthquakesFeed();
  const features = earthquakeFeed?.features ?? [];

  //   Initial map viewport
  const myLatLng = { lat: 11, lng: 120 };

  // Restriction prevent panning to gray area
  const map = new google.maps.Map($("#map")[0], {
    zoom: 3,
    center: myLatLng,
    restriction: {
      latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
    },
  });

  // Limit zoom
  map.setOptions({ minZoom: 2 });

  //   Loop to features to create a map marker
  await $.each(features, (index) => {
    const {
      properties: { time, title, detail },
      geometry: { coordinates },
    } = features[index];

    const coorLatLang = {
      lng: coordinates[0],
      lat: coordinates[1],
    };

    //  Create new html content for information window
    const contentString =
      '<div class="info-content">' +
      `<h2>${title} </h2>` +
      "<div>" +
      `${Utils.epochToDate(time)}` +
      "</div>" +
      '<div class="info-footer">' +
      `Click to view full details` +
      "</div>" +
      "</div>";

    // Add info windows
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      enableEventPropagation: true,
    });

    // Add event listener for side panel interaction
    google.maps.event.addListener(infoWindow, "domready", () => {
      $(".gm-style-iw-d").on("click", async () => {
        // show panel on info window click
        $(".info-panel").fadeIn();

        // populate side panel table
        populateSidePanel(detail);
      });
      $(".gm-ui-hover-effect").on("click", () => {
        // show panel on info window click
        $(".info-panel").fadeOut();
      });
    });

    // Add Markers
    const marker = new google.maps.Marker({
      position: coorLatLang,
      map,
      title: title,
    });

    marker.addListener("click", () => {
      // center to marker position on click
      map.panTo(marker.getPosition());

      // populate side panel table
      populateSidePanel(detail);

      if (prevInfoWindow) {
        // Close previous info window when another one is opened
        prevInfoWindow.close();
      }

      prevInfoWindow = infoWindow;

      infoWindow.open({
        anchor: marker,
        map,
      });
    });
  });

  // Remove splash screen when map is done
  setTimeout(() => {
    $(".splash").fadeOut(700);
  }, 500);
}
