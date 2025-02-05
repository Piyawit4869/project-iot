import React, { Component } from 'react';
import { longdo, map, LongdoMap } from '@/components/map/longdomap';

interface MapProps {
  // data: any;
  // lat: number;
  // lon: number;
}

interface MapState {
  // data: any;
  address: string;
  // lat: number;
  // lon: number;
}

class Map extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      address: '',
      // lat: props.lat, // Initialize state with prop values
      // lon: props.lon, // Initialize state with prop values
      // data: props.data,
    };
    // console.log(props.data);
    // console.log(props.lat)
    // console.log(props.lon)
  }

  // Initialize the map with a base layer
  initMap = (): void => {
    if (map) {
      map.Layers.setBase(longdo.Layers.GRAY);
      // console.log('Map initialized with GRAY layer');
    } else {
      console.error('Map object is not available.');
    }
  };

  // Fetch coordinates based on an address and move the map center
  // handleMoveCenter = async (): Promise<void> => {
  //   const address = {
  //     country: 'ประเทศไทย',
  //     province: 'นครปฐม',
  //     city: 'พุทธมณฑล',
  //     subdistrict: 'ศาลายา',
  //   };

  //   const query = `${address.subdistrict}+${address.city}+${address.province}+${address.country}`;
  //   const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`;

  //   console.log('Query URL:', url);

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.length === 0) {
  //       console.error('No results found for the given address.');
  //       return;
  //     }

  //     const lat = parseFloat(data[0].lat);
  //     const lon = parseFloat(data[0].lon);

  //     console.log(lat);
  //     console.log(lon);

  //     this.setState({ lat, lon }, () => {
  //       if (map) {
  //         map.location({ lat, lon }, true); // Move map center to the specified Lat/Lon
  //         console.log(`Map moved to: Latitude: ${lat}, Longitude: ${lon}`);
  //       } else {
  //         console.error('Map object is not initialized.');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching location data:', error);
  //   }
  // };

  render() {
    const mapKey = 'ab4012a2349af846d0698a8e9b7bca8f';

    return (
      <div>
        {/* Map Container */}
        <div id="map" style={{ height: '300px', width: '100%' }}>
          <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
        </div>

        {/* Button to trigger map center movement */}
        {/* <button onClick={this.handleMoveCenter} style={{ marginTop: '10px' }}>
          Move Map to Lat/Lon
        </button> */}
      </div>
    );
  }
}

export default Map;
