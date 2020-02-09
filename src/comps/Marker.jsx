import React from 'react';
import { Marker } from 'react-leaflet';
import { connect, useDispatch } from 'react-redux';
import { divIcon } from 'leaflet';
import './Marker.scss';
import { ACTION } from '../store';
const MyMarker = ({
  map,
  item,
  center,
  properties: { mask_adult, mask_child, name }
}) => {
  const dispatch = useDispatch();
  return (
    <Marker
      onClick={() => {
        map.flyTo(
          [item.geometry.coordinates[1], item.geometry.coordinates[0]],
          18
        );
        dispatch({
          type: ACTION.UPDATE,
          payload: { open: false, selected: item }
        });
      }}
      position={center}
      icon={divIcon({
        html: `<div class="board">
        <div class="row head"> 
          <div class="text">${name}</div>      
        </div>
        <div class="row body"> 
          <div class="row">
          <div class="block ${mask_adult > 100 ? 'green' : 'red'}"></div>
            <div class="text">成人</div>
            <div class="count">${mask_adult}</div> 
          </div>
          <div class="row">
            <div class="block ${mask_adult > 100 ? 'green' : 'red'}"></div>
            <div class="text">兒童</div>
            <div class="count">${mask_child}</div> 
          </div>    
        </div>
        </div>`,
        className: 'marker',
        iconSize: [100, 80],
        mask_adult,
        mask_child
      })}
    ></Marker>
  );
};
const mapToProps = ({map}) => ({map});
export default connect(mapToProps)(MyMarker);
