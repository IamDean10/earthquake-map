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
    },
  } = origin[0];

  console.log(earthquakeDetails?.properties);
  console.log(url);
  populateTable();

  function populateTable() {
    let result;
    const tbody = $("#info-table-body");

    // Clear table
    tbody.empty();

    const tableData = {
      place,
      time: epochToDate(time),
      magnitude: mag + " " + magType,
      depth: depth + " " + "km",
      "Number of Stations": numStationsUsed,
      "Number of Phases": numPhasesUsed,
      status: status?.toUpperCase(),
      catalog: eventsource?.toUpperCase() + " - " + code,
      contributor: source?.toUpperCase(),
    };

    //  Loop to create new table data
    for (const key in tableData) {
      result +=
        `<tr><td width='150px'>${kebabToTitle(key)} </td>` +
        `<td> ${tableData[key] ?? "-"} </td></tr>`;
    }

    // Insert html to table
    tbody.append(result);
  }
}
