import { useState, useEffect } from 'react';
const DateFilter = ({ onSearch, loading }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setEndDate('');
    }
  }, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate) {
        alert("Please select a start date.");
        return;
    }
    onSearch({ startDate, endDate });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto flex flex-col justify-center items-center mb-6 py-4 px-10 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end w-full">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={today} 
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date (Optional)
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} 
            max={today} 
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || !startDate} 
            className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${loading || !startDate ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">* Start date is required. End date is optional (defaults to present).</p>
  </form>
  );
};

export default DateFilter;