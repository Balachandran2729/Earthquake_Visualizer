# Earthquake Visualizer

## Description

This application visualizes recent global seismic activity using data from the USGS Earthquake API. Users can view earthquakes from the past hour by default, or search for earthquakes within a specific date range. The application features an interactive map with clustered markers, a searchable list of earthquakes, and displays key statistics like the highest and lowest magnitude events within the selected timeframe.

## Features

*   **Interactive Map Visualization:** Displays earthquake locations on a world map using `react-leaflet`.
*   **Marker Clustering:** Uses `leaflet.markercluster` to efficiently display large numbers of earthquakes without map lag.
*   **Animated Markers:** Earthquake markers are animated (using Tailwind CSS) and colored based on magnitude.
*   **Date Filtering:**
    *   Defaults to showing earthquakes from the last hour (`all_hour.geojson`).
    *   Allows searching for earthquakes between a custom start date and end date (using `fdsnws/event/1/query`).
    *   If only a start date is provided, it searches from that date to the present.
    *   Handles API limits by capping results and notifying the user.
*   **Earthquake List Table:**
    *   Displays detailed information (Magnitude, Location, Time, USGS Link) for the filtered earthquakes.
    *   Includes a live search filter to find earthquakes by location.
    *   Table is vertically scrollable for large datasets.
*   **Key Statistics Display:** Shows the highest and lowest magnitude earthquakes found in the current dataset.
*   **Responsive Design:** Adapts layout for both desktop and mobile viewing.
*   **Dark/Light Theme:** (If implemented) Allows toggling between dark and light color schemes (initially set to dark).
*   **Error Handling:** Displays user-friendly messages for API errors or invalid date ranges.

## Technologies Used

*   **Frontend Framework:** React (Vite)
*   **Styling:** Tailwind CSS
*   **Mapping:** Leaflet, React-Leaflet
*   **Marker Clustering:** Leaflet.MarkerCluster, React-Leaflet-Markercluster
*   **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
*   **API:** USGS Earthquake API
    *   Default (Past Hour): `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`
    *   Custom Search: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02`

## Getting Started

### Prerequisites

*   Node.js (version 14 or later recommended)
*   npm (usually comes with Node.js) or yarn

### Installation

1.  Clone the repository (or ensure you have the project files locally).
2.  Open your terminal or command prompt and navigate to the project directory.
3.  Install the project dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running the Application

1.  Start the development server:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
2.  Open your web browser and go to the URL provided by Vite (usually `http://localhost:5173`).

## Project Structure (Example)
