import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import EarthquakeMarker from './EarthquakeMarker';
const BOUNDS = [
  [-90, -200], 
  [90, 200]   
];

const DEFAULT_CENTER = [30, 0];
const DEFAULT_ZOOM = 2;
const MIN_ZOOM = 2; 

const EarthquakeMap = ({ earthquakes }) => {
  return (
    <div className="h-[500px] md:h-[600px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM} 
        worldCopyJump={false} 
        maxBounds={BOUNDS}    
        maxBoundsViscosity={1.0} 
        style={{ height: '100%', width: '100%' }}
        dragging={true} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes && earthquakes.length > 0 && (
          <MarkerClusterGroup showCoverageOnHover={false} spiderfyOnMaxZoom={true}>
            {earthquakes.map((eq) => (
              <EarthquakeMarker key={eq.id} earthquake={eq} />
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;