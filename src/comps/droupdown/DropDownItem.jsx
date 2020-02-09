import React from 'react';
import { connect, useDispatch } from 'react-redux';
import './DropDownItem.scss';
import LazyLoad from 'react-lazyload';
import { ACTION } from '../../store';
const DropDownItem = ({
  map,
  item,
  item: {
    properties: { name, mask_adult, mask_child, phone, address },
    geometry: { coordinates }
  }
}) => {
  const dispatch = useDispatch();
  return (
    <LazyLoad overflow>
      <div
        className='DropDownItem'
        onClick={e => {
          if (e.target.className !== 'button') {
            map.flyTo([coordinates[1], coordinates[0]], 18);

            dispatch({
              type: ACTION.UPDATE,
              payload: { open: false, selected: item }
            });
          }
        }}
      >
        <div className='grid-left'>
          <div className='name'>{name}</div>
          <div className='left'>
            <div
              className={`block ${mask_adult > 100 ? 'green' : 'red'}`}
            ></div>
            <div className='text'>{`成人 ${mask_adult}`}</div>
            <div
              className={`block ${mask_child > 100 ? 'green' : 'red'}`}
            ></div>
            <div className='text'>{`兒童 ${mask_child}`}</div>
          </div>
          <div className='text'>{`住址 ${address}`}</div>
          <div className='text'>{`電話 ${phone}`}</div>
        </div>
        <div className='grid-right'> 
          <div
            className='button'
            onClick={e => {
              e.preventDefault();
              window.open(
                `https://www.google.com/search?q=${name}+${address}`,
                '_blank',
                'noopener'
              );
            }}
          >
            <svg 
              viewBox='0 0 56 66'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M23.792 55.5903H21.344V56.7663H22.568V57.5103H21.392V58.6623H22.568V59.4183H21.344V60.6063H23.792V55.5903ZM19.364 59.4063H18.224V58.6623H19.304V57.5103H18.224V56.5983C18.668 56.4543 19.172 56.2743 19.652 56.0823L18.788 55.0503C18.332 55.3503 17.528 55.7823 16.988 55.9743V60.5823H19.364V59.4063ZM16.808 61.0383L16.568 59.7783L15.776 60.0423V58.3263H16.616V57.0063H15.776V54.7623H14.468V57.0063H13.304V58.3263H14.468V60.4743C13.964 60.6303 13.52 60.7623 13.136 60.8703L13.472 62.2263L14.468 61.8783V64.3023C14.468 64.4583 14.42 64.4943 14.276 64.4943C14.132 64.5063 13.736 64.5063 13.304 64.4823C13.484 64.8783 13.64 65.4543 13.676 65.8143C14.42 65.8143 14.948 65.7663 15.296 65.5383C15.668 65.3223 15.776 64.9623 15.776 64.3023V61.4223L16.808 61.0383ZM21.704 62.3703C21.344 62.7903 20.912 63.1263 20.408 63.4263C19.892 63.1263 19.448 62.7783 19.124 62.3703H21.704ZM22.832 61.1343L22.592 61.1823H21.008V54.7623H19.664V61.1823H16.856V62.3703H18.212L17.696 62.5503C18.08 63.1143 18.548 63.6183 19.076 64.0503C18.212 64.3623 17.228 64.5783 16.172 64.6983C16.4 65.0223 16.688 65.5983 16.796 65.9583C18.116 65.7423 19.328 65.4183 20.384 64.9143C21.32 65.3943 22.4 65.7423 23.624 65.9463C23.816 65.5623 24.2 64.9863 24.5 64.6863C23.504 64.5663 22.592 64.3503 21.788 64.0623C22.628 63.4143 23.288 62.5863 23.732 61.5303L22.832 61.1343ZM35.744 57.8103H29.06V58.7463H37.148V57.3543H38.108V56.4903H37.148V55.1223H29.108V56.0583H35.744V56.4903H28.244V57.3543H35.744V57.8103ZM28.052 62.0823C29.348 61.9983 31.148 61.9023 32.876 61.7943L32.888 60.7863L31.052 60.8703V60.1263H32.72V59.1423H28.148V60.1263H29.708V60.9303C29.06 60.9663 28.46 60.9903 27.956 61.0023L28.052 62.0823ZM34.64 60.0543H36.656V60.8823H34.64V60.0543ZM38.672 62.3463H36.308V61.7943H38.072V59.1423H33.32V61.7943H34.892V62.3463H27.752V63.5223H30.2L29.768 63.8823C30.368 64.2903 31.088 64.9023 31.4 65.3343L32.432 64.4583C32.192 64.1703 31.796 63.8343 31.376 63.5223H34.892V64.5063C34.892 64.6623 34.832 64.6863 34.652 64.6983C34.46 64.7103 33.788 64.7103 33.188 64.6863C33.368 65.0343 33.584 65.5623 33.644 65.9463C34.556 65.9463 35.204 65.9343 35.672 65.7423C36.176 65.5503 36.308 65.2143 36.308 64.5423V63.5223H38.672V62.3463Z'
                fill='#636366'
              />
              <g filter='url(#filter0_d)'>
                <circle cx='26' cy='26.0977' r='18' fill='white' />
              </g>
              <path
                d='M34.1706 24.4649H33.4993V24.4303H25.9993V27.7637H30.7089C30.0219 29.7041 28.1756 31.097 25.9993 31.097C23.2381 31.097 20.9993 28.8583 20.9993 26.097C20.9993 23.3358 23.2381 21.097 25.9993 21.097C27.2739 21.097 28.4335 21.5778 29.3164 22.3633L31.6735 20.0062C30.1852 18.6191 28.1943 17.7637 25.9993 17.7637C21.3973 17.7637 17.666 21.4949 17.666 26.097C17.666 30.6991 21.3973 34.4303 25.9993 34.4303C30.6014 34.4303 34.3327 30.6991 34.3327 26.097C34.3327 25.5383 34.2752 24.9928 34.1706 24.4649Z'
                fill='#FFC107'
              />
              <path
                d='M18.627 22.2183L21.3649 24.2262C22.1057 22.392 23.8999 21.097 25.9995 21.097C27.274 21.097 28.4336 21.5778 29.3165 22.3633L31.6736 20.0062C30.1853 18.6191 28.1945 17.7637 25.9995 17.7637C22.7986 17.7637 20.0228 19.5708 18.627 22.2183Z'
                fill='#FF3D00'
              />
              <path
                d='M26.0008 34.4313C28.1533 34.4313 30.1091 33.6075 31.5879 32.2679L29.0087 30.0854C28.1439 30.7431 27.0872 31.0988 26.0008 31.0979C23.8333 31.0979 21.9929 29.7159 21.2995 27.7871L18.582 29.8809C19.9612 32.5796 22.762 34.4313 26.0008 34.4313Z'
                fill='#4CAF50'
              />
              <path
                d='M34.1713 24.4662H33.5V24.4316H26V27.765H30.7096C30.3809 28.6885 29.7889 29.4955 29.0067 30.0862L29.0079 30.0854L31.5871 32.2679C31.4046 32.4337 34.3333 30.265 34.3333 26.0983C34.3333 25.5396 34.2758 24.9941 34.1713 24.4662Z'
                fill='#1976D2'
              />
              <defs>
                <filter
                  id='filter0_d'
                  x='0'
                  y='0.0976562'
                  width='56'
                  height='56'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  />
                  <feOffset dx='2' dy='2' />
                  <feGaussianBlur stdDeviation='5' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow'
                    result='shape'
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
};

const mapToProps = ({ map }) => ({ map });
export default connect(mapToProps)(DropDownItem);
