
const USGS_DEFAULT_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
const USGS_EVENT_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

export const fetchDefaultEarthquakeData = async () => {
  console.log("Fetching default data from:", USGS_DEFAULT_URL);
  try {
    const response = await fetch(USGS_DEFAULT_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching default earthquake ", err);
    throw err;
  }
};
export const fetchEarthquakeDataByDateRange = async (startDate, endDate = null, limit = 5000) => {
  if (!startDate) {
    throw new Error("A start date is required for the search.");
  }

  const startObj = new Date(startDate);
  let endObj = endDate ? new Date(endDate) : new Date();

  const formatDate = (dateObj) => dateObj.toISOString().split('T')[0];
  const formattedStartDate = formatDate(startObj);
  const formattedEndDate = formatDate(endObj);

  if (endObj < startObj) {
    throw new Error("End date must be on or after the start date.");
  }

  const params = new URLSearchParams();
  params.append('format', 'geojson');
  params.append('starttime', formattedStartDate);

  if (endDate !== null && endDate !== undefined) {
     params.append('endtime', formattedEndDate);
  }
  const safeLimit = Math.min(Math.max(1, limit), 20000);
  params.append('limit', safeLimit.toString());
  const url = `${USGS_EVENT_API_URL}?${params.toString()}`;
  console.log("Fetching data by date range from:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      let errorMsg = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text(); 
        try {
            const errorData = JSON.parse(errorText);
            errorMsg = errorData?.description || errorData?.message || errorMsg;
        } catch (parseErr) {
            if (errorText) {
                errorMsg = errorText;
            }
        }
      } catch (e) {
      }
      throw new Error(errorMsg);
    }
    const data = await response.json();
    if (data.metadata && data.metadata.limit !== undefined && data.metadata.count > data.metadata.limit) {
        data.truncated = true;
        data.requestedLimit = safeLimit;
    } else {
        data.truncated = false;
    }
    if (data.metadata) {
        data.metadata.usedStarttime = formattedStartDate;
        data.metadata.usedEndtime = endDate !== null && endDate !== undefined ? formattedEndDate : 'Present';
    }
    return data;
  } catch (err) {
    console.error("Error fetching earthquake data by date range:", err);
    throw err;
  }
};