import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, MapContainerProps, TileLayerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


interface CustomerGeographyChartProps {
  data: Array<{ _id: string; count: number }>;
}

const cityCoordinates: { [city: string]: [number, number] } = {
  // Add coordinates for your cities here
  'Austin': [30.2672, -97.7431],
  'Plano': [33.0198, -96.6988],
  'Stockton': [37.9577, -121.2903],
  'Kansas City': [39.0997, -94.5786],
  'Las Vegas': [36.1699, -115.1398],
  'Seattle': [47.6095, -122.3331],
  'Washington': [38.9072, -77.0369],
  'San Antonio': [29.4241, -98.4936],
  'St. Paul': [44.9537, -93.0902],
  'Oakland': [37.8044, -122.2712],
  'Hialeah': [25.9167, -80.2869],
  'Houston': [29.7604, -95.3698],
  'Wichita': [37.6922, -97.3360],
  'Dallas': [32.7767, -96.7970],
  'Cincinnati': [39.1031, -84.5120],
  'Laredo': [27.5012, -99.5071],
  'San Jose': [37.3394, -121.8950],
  'Boston': [42.3601, -71.0589],
  'Henderson': [36.0398, -115.0152],
  'El Paso': [31.7619, -106.4847]
  // Add more cities...
};

export function CustomerGeographyChart({ data }: CustomerGeographyChartProps) {
  return (
    <MapContainer 
      {...{center: [20, 0], zoom: 2} as MapContainerProps}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        {...{
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        } as TileLayerProps}
      />
      {data.map((cityData, index) => {
        const coordinates = cityCoordinates[cityData._id];
        if (!coordinates) return null;

        return (
          <CircleMarker
            key={index}
            center={coordinates}
            pathOptions={{
              radius: Math.log(cityData.count) * 5,
              fillColor: 'blue',
              fillOpacity: 0.6,
              color: 'blue',
              weight: 1
            }}
          >
            <Popup>
              {cityData._id}: {cityData.count} customers
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
