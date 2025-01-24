import React, { Component } from 'react';
import { longdo, map, LongdoMap } from '@/components/map/longdomap';
//replace a LongdoMap.js file

class Map extends Component {
  initMap() {
    map.Layers.setBase(longdo.Layers.GRAY);
    
  }

  render() {
    const mapKey = 'ab4012a2349af846d0698a8e9b7bca8f';
    return (
      <div id="map" style={{ height: '300px', width: '100%', }}>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
      </div>
    );
  }
}

export default Map;
