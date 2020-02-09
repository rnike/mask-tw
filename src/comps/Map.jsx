import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import Mark from './Marker';
import { Refetch } from '../actions';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import './Map.scss';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { ACTION } from '../store';

const createClusterCustomIcon = function(cluster) {
  const mark = cluster.getAllChildMarkers();
  var child = 0;
  var adult = 0;
  mark.forEach(x => {
    child += x.options.icon.options.mask_child;
    adult += x.options.icon.options.mask_adult;
  });
  return L.divIcon({
    html: `<div class="bord">
    <div class="row head">
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="#636366" d="M4.571 7.625v-1.25C4.571 6.168 4.763 6 5 6h1.429c.236 0 .428.168.428.375v1.25c0 .207-.192.375-.428.375H5c-.237 0-.429-.168-.429-.375zm5 .375H11c.237 0 .429-.168.429-.375v-1.25c0-.207-.192-.375-.429-.375H9.571c-.236 0-.428.168-.428.375v1.25c0 .207.192.375.428.375zm-2.714 2.625v-1.25c0-.207-.192-.375-.428-.375H5c-.237 0-.429.168-.429.375v1.25c0 .207.192.375.429.375h1.429c.236 0 .428-.168.428-.375zM9.571 11H11c.237 0 .429-.168.429-.375v-1.25c0-.207-.192-.375-.429-.375H9.571c-.236 0-.428.168-.428.375v1.25c0 .207.192.375.428.375zM16 14.875V16H0v-1.125c0-.207.192-.375.429-.375h.696V2.657c0-.363.384-.657.857-.657h3.16V.75C5.143.336 5.528 0 6 0h4c.473 0 .857.336.857.75V2h3.16c.474 0 .858.294.858.657V14.5h.696c.237 0 .429.168.429.375zm-13.16-.406h4.017v-2.094c0-.207.192-.375.429-.375h1.428c.237 0 .429.168.429.375v2.094h4.018V3.5h-2.304v.75c0 .414-.384.75-.857.75H6c-.473 0-.857-.336-.857-.75V3.5H2.839v10.969zM9.5 2h-.929v-.813a.176.176 0 0 0-.062-.132A.23.23 0 0 0 8.357 1h-.714a.23.23 0 0 0-.152.055.176.176 0 0 0-.062.133V2H6.5a.23.23 0 0 0-.152.055.176.176 0 0 0-.062.132v.626c0 .05.022.097.062.132A.23.23 0 0 0 6.5 3h.929v.813c0 .05.022.097.062.132A.23.23 0 0 0 7.643 4h.714a.23.23 0 0 0 .152-.055.176.176 0 0 0 .062-.132V3H9.5a.23.23 0 0 0 .152-.055.176.176 0 0 0 .062-.132v-.626a.176.176 0 0 0-.062-.132A.23.23 0 0 0 9.5 2z"/>
    </svg>
    <div class="text">販售處</div>    
    <div class="count">${mark.length}</div>    
    </div>
    <div class="row ${adult > 100 ? 'green' : 'red'}">
    <div class="text2">成人</div>
    <div class="count2">${adult}</div> 
  </div>
    <div class="row bot ${child > 100 ? 'green' : 'red'}">
      <div class="text2">兒童</div>
      <div class="count2">${child}</div> 
    </div>
    </div>`,
    className: 'marker-group',
    iconSize: L.point(100, 80, true)
  });
};
const MyMap = ({ data }) => {
  const [markList, setMarkList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Refetch());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      const list = data.map(({ properties, geometry }) => (
        <Mark
          key={`k${properties.id}`}
          item={{ properties, geometry }}
          center={[geometry.coordinates[1], geometry.coordinates[0]]}
          properties={properties}
        />
      ));
      setMarkList(list);
    }
  }, [data]);
  return (
    <Map
      onclick={() => {
        dispatch({
          type: ACTION.UPDATE,
          payload: { selected: undefined }
        });
      }}
      whenReady={x => {
        dispatch({
          type: ACTION.UPDATE,
          payload: { map: x.target }
        });
      }}
      onViewportChanged={x => {
        dispatch({
          type: ACTION.UPDATE,
          payload: { now: { center: x.center, zoom: x.zoom } }
        });
      }}
      style={{ position: 'fixed', height: '100vh', width: '100vw' }}
      center={[23.4202069, 120.8489535]}
      zoomControl={false}
      maxZoom={18}
      zoom={8}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <ZoomControl position='topright' />
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {markList}
      </MarkerClusterGroup>
    </Map>
  );
};

const mapToProps = props => props;
export default connect(mapToProps)(MyMap);
