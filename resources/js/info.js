async function populateSidePanel(detail) {
  // GET earthquake details
  let earthquakeDetails = await getEarthquakesDetail(detail);

  //  Destructure Object
  const {
    place,
    time,
    url,
    mag,
    magType,
    status,
    products: { origin },
  } = earthquakeDetails?.properties ?? [];

  const {
    code,
    source,
    properties: {
      depth,
      "num-stations-used": numStationsUsed,
      "num-phases-used": numPhasesUsed,
      eventsource,
      latitude,
      longitude,
    },
  } = origin[0];

  populateInfoTable();
  populateExternalTable();

  function populateInfoTable() {
    let result;
    const tbody = $("#info-table-body");

    // Clear table
    tbody.empty();

    const earthquakeData = {
      place,
      time: epochToDate(time),
      magnitude: mag + " " + magType,
      depth: depth + " " + "km",
      "Number of Stations": numStationsUsed,
      "Number of Phases": numPhasesUsed,
      status: status?.toUpperCase(),
      catalog: eventsource?.toUpperCase() + " - " + code,
      contributor: source?.toUpperCase(),
      latitude,
      longitude,
    };

    //  Loop to create new table data
    for (const key in earthquakeData) {
      result +=
        `<tr><td width='150px'>${kebabToTitle(key)} </td>` +
        `<td> ${earthquakeData[key] ?? "-"} </td></tr>`;
    }

    // Insert html to info table
    tbody.append(result);
  }

  function populateExternalTable() {
    let result;
    const tbody = $("#external-table-body");

    // Clear table
    tbody.empty();

    const externalLinks = {
      "USGS-data": `https://earthquake.usgs.gov/earthquakes/eventpage/${code}`,
      origin: `https://earthquake.usgs.gov/earthquakes/eventpage/${code}/origin/detail`,
      "phase-data": `https://earthquake.usgs.gov/earthquakes/eventpage/${code}/origin/phase`,
      "do-you-feel-it": `https://earthquake.usgs.gov/earthquakes/eventpage/${code}/dyfi/intensity`,
      "nearby-cities": `https://earthquake.usgs.gov/earthquakes/eventpage/${code}/region-info`,
    };

    for (const key in externalLinks) {
      result +=
        `<tr><td width='150px'>${kebabToTitle(key)} </td>` +
        `<td> <a  class="external-link" onclick="confirmRedirect('${externalLinks[key]}')" target="_blank"><i class="fa-solid fa-link"></i> Click Here</a> </td></tr>`;
    }

    // Insert html to external table
    tbody.append(result);

    // Close side panel on click
    $("#info-table-close").on("click", () => {
      $(".info-panel").fadeOut();
    });
  }
}
