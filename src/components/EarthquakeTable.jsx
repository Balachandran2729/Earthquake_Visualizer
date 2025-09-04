import { useState, useMemo } from 'react';

const EarthquakeTable = ({ earthquakes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEarthquakes = useMemo(() => {
    if (!searchTerm) {
      return earthquakes;
    }
    const term = searchTerm.toLowerCase();
    return earthquakes.filter(eq =>
      eq.properties.place && eq.properties.place.toLowerCase().includes(term)
    );
  }, [earthquakes, searchTerm]);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!earthquakes || earthquakes.length === 0) {
      return null;
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col max-w-4xl w-full mx-auto"> {/* Centered and limited max width */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <h2 className="text-xl font-bold mb-2 text-center">Earthquake List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2"> 
          Showing {filteredEarthquakes.length} of {earthquakes.length} earthquakes
        </p>
      </div>
  <div className="overflow-x-auto overflow-y-auto max-h-[500px] w-full"> 
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mag</th>
            <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
            <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
          </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEarthquakes.length > 0 ? (
            filteredEarthquakes.map((eq) => (
              <tr key={eq.id} className="hover:bg-gray-500 dark:hover:bg-gray-750">
                <td className="px-3 py-2 whitespace-nowrap text-center">
                  <span className="px-1.5 py-0.5 text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    M {eq.properties.mag !== null && eq.properties.mag !== undefined ? eq.properties.mag.toFixed(1) : 'N/A'}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-200 text-center">{eq.properties.place || 'Unknown Location'}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 text-center">{formatTime(eq.properties.time)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-center">
                  {eq.properties.url ? (
                    <a
                      href={eq.properties.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      USGS
                    </a> 
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">No link</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No earthquakes match your search criteria.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarthquakeTable;