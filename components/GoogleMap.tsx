'use client';

import googleMapStyling from '@/utils/googleMapStyling';
import styles from './GoogleMap.module.css';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const MapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
};
export type MapConfig = {
  id: string;
  label: string;
  mapId?: string;
  mapTypeId?: string;
  styles?: google.maps.MapTypeStyle[];
};

const mapConfig: MapConfig = {
  id: 'greyblack',
  label: 'Grey & Black Map style',
  mapTypeId: MapTypeId.ROADMAP,
  styles: googleMapStyling,
};

const API_KEY: string = process.env.GOOGLE_MAPS_API_KEY!;

const GoogleMap = () => {
  const position = { lat: 44.80692813236718, lng: 20.4649706200762 };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={15}
        mapId={mapConfig.mapId || null}
        mapTypeId={mapConfig.mapTypeId}
        styles={mapConfig.styles}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        className={styles.map}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
