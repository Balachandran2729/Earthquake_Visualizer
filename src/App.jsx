// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
// import Header from './components/Header';
import DateFilter from './components/DateFilter';
import EarthquakeMap from './components/EarthquakeMap';
import EarthquakeTable from './components/EarthquakeTable';
import { fetchDefaultEarthquakeData, fetchEarthquakeDataByDateRange } from './services/earthquakeService';
import './App.css';

function App() {
  const [earthquakeData, setEarthquakeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDefaultEarthquakeData();
        setEarthquakeData(data);
      } catch (err) {
        console.error("Failed to fetch default earthquake ", err);
        setError(`Failed to load initial  ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultData();
  }, []);

  const handleSearch = async ({ startDate, endDate }) => {
    if (!startDate) {
        setError("Please provide a start date for the search.");
        return;
    }

    try {
      setLoading(true);
      setError(null);
      const LIMIT = 5000;
      const data = await fetchEarthquakeDataByDateRange(startDate, endDate || null, LIMIT);
      setEarthquakeData(data);
    } catch (err) {
      console.error("Search failed:", err);
      setError(`Search failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  const earthquakeFeatures = useMemo(() => {
    return earthquakeData?.features || [];
  }, [earthquakeData]);

  const { highestMagEq, lowestMagEq } = useMemo(() => {
    if (!earthquakeFeatures.length) {
      return { highestMagEq: null, lowestMagEq: null };
    }

    let highest = earthquakeFeatures[0];
    let lowest = earthquakeFeatures[0];

    earthquakeFeatures.forEach(eq => {
      const mag = eq.properties.mag;
      if (mag !== null && mag !== undefined && !isNaN(mag)) {
        if (mag > highest.properties.mag) {
          highest = eq;
        }
        if (mag < lowest.properties.mag) {
          lowest = eq;
        }
      }
    });

    return { highestMagEq: highest, lowestMagEq: lowest };
  }, [earthquakeFeatures]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Earthquake Visualizer</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Visualize recent seismic activity worldwide.</p>

        <DateFilter onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading && <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3">Loading map data...</span>
        </div>}
        {!loading && !error && earthquakeData && earthquakeData.truncated && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-opacity-20" role="alert">
            <p>
              <strong>Warning:</strong> The results for this date range were too large and have been limited to {earthquakeData.requestedLimit} events.
              The map and table show only a subset of the total earthquakes during this period.
            </p>
          </div>
        )}
        {!loading && !error && earthquakeData && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-4xl w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Data Source</p>
                <p>{earthquakeData.metadata?.title || 'USGS Earthquake API'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Total Events</p>
                <p>{earthquakeData.metadata?.count ?? earthquakeData.features?.length ?? 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Start Time</p>
                <p>
                  {earthquakeData.metadata?.usedStarttime ||
                   (earthquakeData.metadata?.starttime ? new Date(earthquakeData.metadata.starttime).toISOString().split('T')[0] : 'N/A')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">End Time</p>
                <p>
                  {earthquakeData.metadata?.usedEndtime ||
                   (earthquakeData.metadata?.endtime ? new Date(earthquakeData.metadata.endtime).toISOString().split('T')[0] : 'N/A')}
                </p>
              </div>
            </div>

            {(highestMagEq || lowestMagEq) && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-semibold mb-2">Magnitude Extremes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {highestMagEq && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                      <p className="font-medium text-yellow-700 dark:text-yellow-300">Highest Magnitude</p>
                      <p>M <span className="font-bold">{highestMagEq.properties.mag}</span> - {highestMagEq.properties.place}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(highestMagEq.properties.time).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {lowestMagEq && (
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded">
                      <p className="font-medium text-teal-700 dark:text-teal-300">Lowest Magnitude</p>
                      <p>M <span className="font-bold">{lowestMagEq.properties.mag}</span> - {lowestMagEq.properties.place}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(lowestMagEq.properties.time).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {!loading && !error && earthquakeData && (
          <EarthquakeMap earthquakes={earthquakeFeatures} />
        )}
        {!loading && !error && earthquakeData && (
          <EarthquakeTable earthquakes={earthquakeFeatures} />
        )}
        {!loading && !error && earthquakeData && (!earthquakeData.features || earthquakeData.features.length === 0) && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">No earthquakes found for the selected period.</p>
        )}

      </main>
    </div>
  );
}

export default App;