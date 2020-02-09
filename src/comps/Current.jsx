import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { ACTION } from '../store';
import './Current.scss';
const Current = ({ map, local, coords }) => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      dispatch({
        type: ACTION.UPDATE,
        payload: { local: [latitude, longitude] }
      });
    }
  }, [coords, dispatch]);
  return (
    <div
      onClick={() => {
        if (map && local) {
          map.flyTo(local, 12);
        }
      }}
      className={`current ${coords?'':'disabled'}`}
    ><svg   viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
    <circle cx="23.4336" cy="23" r="20" fill="white"/>
    </g>
    <path d="M23.6434 7.99944C15.2078 7.8855 8.32105 14.7722 8.43499 23.2079C8.54748 31.2981 15.1349 37.8856 23.2252 37.9981C31.6623 38.1134 38.5475 31.2267 38.4322 22.7911C38.3211 14.6994 31.7337 8.11194 23.6434 7.99944ZM30.2849 17.175L24.3544 30.6253C24.009 31.3803 22.856 31.1301 22.856 30.2965V23.8641C22.856 23.7876 22.8256 23.7142 22.7715 23.6601C22.7174 23.606 22.644 23.5756 22.5675 23.5756H16.1366C15.3058 23.5756 15.0549 22.4312 15.807 22.0851L29.2581 16.1481C29.4018 16.0817 29.5624 16.061 29.7182 16.0888C29.8741 16.1166 30.0177 16.1915 30.1296 16.3034C30.2415 16.4154 30.3164 16.559 30.3442 16.7148C30.372 16.8706 30.3513 17.0313 30.2849 17.175V17.175Z" fill="#636366"/>
    <defs>
    <filter id="filter0_d" x="0.433594" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feOffset dx="2" dy="2"/>
    <feGaussianBlur stdDeviation="2.5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>
    </svg></div>
  );
};

const mapToProps = props => props;
export default connect(mapToProps)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  })(Current)
);
