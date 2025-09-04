import { CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
const getMarkerColor = (mag) => {
  if (mag >= 7) return '#ff0000'; 
  if (mag >= 6) return '#ff6600'; 
  if (mag >= 5) return '#ffff00'; 
  if (mag >= 4) return '#00ff00'; 
  return '#0000ff'; 
};
const getMarkerRadius = (mag) => {
  return Math.max(5, mag * 2); 
};

const EarthquakeMarker = ({ earthquake }) => {
  const { mag, place, time, url } = earthquake.properties;
  const [lng, lat] = earthquake.geometry.coordinates; 

  const formattedTime = new Date(time).toLocaleString();
  const color = getMarkerColor(mag);
  const radius = getMarkerRadius(mag);

  return (
    <CircleMarker
      center={[lat, lng]}
      radius={radius}
      fillColor={color}
      color="#000"
      weight={1}
      opacity={1}
      fillOpacity={0.8}
      className="animate-pulse" 
      eventHandlers={{
        mouseover: (e) => { e.target.openPopup(); },
        mouseout: (e) => { e.target.closePopup(); },
      }}
    >
      <Popup>
        <div className="text-gray-800 dark:text-gray-800">
          <h3 className="font-bold text-lg">M {mag}</h3>
          <p className="text-sm"><strong>Location:</strong> {place}</p>
          <p className="text-xs"><strong>Time:</strong> {formattedTime}</p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block"
            >
              Details on USGS
            </a>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
