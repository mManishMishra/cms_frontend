"use client";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const locations = [
  { id: 1, name: "Noida H101", position: { lat: 28.6214, lng: 77.3812 }, msg: "Visit our LGF office in Sector 63" },
  { id: 2, name: "Noida H56", position: { lat: 28.6205, lng: 77.3800 }, msg: "Our 1st Floor Headquarters" },
  { id: 3, name: "Gurugram JMD", position: { lat: 28.4239, lng: 77.0435 }, msg: "Luxury showroom in JMD Galleria Mall" },
  // ... Add coordinates for Gurugram 2, Faridabad, and Workshop
];

export default function MultiLocationMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY"
  });

  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px' }}
      center={{ lat: 28.5355, lng: 77.3910 }} // Center of Delhi NCR
      zoom={10}
    >
      {locations.map(loc => (
        <Marker 
          key={loc.id} 
          position={loc.position} 
          onClick={() => setSelected(loc)}
          label={loc.name[0]} // Optional: Show first letter on marker
        />
      ))}

      {selected && (
        <InfoWindow position={selected.position} onCloseClick={() => setSelected(null)}>
          <div>
            <h6>{selected.name}</h6>
            <p>{selected.msg}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}