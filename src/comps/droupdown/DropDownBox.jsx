import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './DropDownBox.scss';
import DropDownItem from './DropDownItem';
import { forceCheck } from 'react-lazyload';
import { ACTION } from '../../store';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();
const DropDownBox = ({ data, map, now, open, selected, sort }) => {
  const [list, setlist] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (map && data) {
      const { _southWest, _northEast } = map.getBounds();
      const newlist = data.filter(
        ({ geometry: { coordinates } }) =>
          coordinates[1] > _southWest.lat &&
          coordinates[1] < _northEast.lat &&
          coordinates[0] > _southWest.lng &&
          coordinates[0] < _northEast.lng
      );
      setlist(
        newlist
          .sortBy(x =>
            sort === 0
              ? x.properties.mask_adult + x.properties.mask_child
              : sort === 1
              ? x.properties.mask_adult
              : x.properties.mask_child
          )
          .reverse()
          .slice(0, 20)
      );
    }
    return () => {};
  }, [now, sort, map, data]);

  useEffect(() => {
    setTimeout(() => forceCheck(), 500);
  }, [open, selected]);
  async function search(e) {
    e.preventDefault();
    const results = await provider.search({
      query: e.target.searchText.value
    });
    if (results.length > 0) map.fitBounds(results[0].bounds);
  }
  return (
    <div
      className={`DropDownBox ${selected ? 'selected' : ''} ${
        open ? 'open' : 'close'
      } `}
    >
      <div className='search'>
        <form onSubmit={search}>
          <svg
            className='face'
            width='16'
            height='15'
            viewBox='0 0 16 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0)'>
              <path
                d='M15.75 7.5C15.75 11.6421 12.3921 15 8.25 15C4.10833 15 0.75 11.6421 0.75 7.5C0.75 3.35833 4.10833 0 8.25 0C12.3921 0 15.75 3.35833 15.75 7.5Z'
                fill='#FFCC4D'
              />
              <path
                d='M3.66718 6.25065C3.57771 6.25076 3.49058 6.22207 3.41869 6.16882C3.34679 6.11558 3.29394 6.0406 3.26796 5.95499C3.24198 5.86938 3.24424 5.77768 3.27441 5.69345C3.30459 5.60923 3.36107 5.53695 3.43551 5.48732C3.49093 5.45065 4.81093 4.58398 6.58343 4.58398C6.69393 4.58398 6.79991 4.62788 6.87805 4.70602C6.95619 4.78416 7.00009 4.89014 7.00009 5.00065C7.00009 5.11116 6.95619 5.21714 6.87805 5.29528C6.79991 5.37342 6.69393 5.41732 6.58343 5.41732C5.06051 5.41732 3.90926 6.17315 3.89801 6.18065C3.82969 6.22632 3.74936 6.25069 3.66718 6.25065ZM12.833 6.25065C12.7512 6.25065 12.6711 6.22644 12.603 6.18107C12.5913 6.17357 11.4284 5.41732 9.91676 5.41732C9.80625 5.41732 9.70027 5.37342 9.62213 5.29528C9.54399 5.21714 9.50009 5.11116 9.50009 5.00065C9.50009 4.89014 9.54399 4.78416 9.62213 4.70602C9.70027 4.62788 9.80625 4.58398 9.91676 4.58398C11.6893 4.58398 13.0093 5.45065 13.0647 5.48732C13.1391 5.53695 13.1956 5.60923 13.2258 5.69345C13.2559 5.77768 13.2582 5.86938 13.2322 5.95499C13.2062 6.0406 13.1534 6.11558 13.0815 6.16882C13.0096 6.22207 12.9225 6.25076 12.833 6.25065Z'
                fill='#664500'
              />
              <path
                d='M12 9.20458L15.75 7.5C15.75 7.225 15.7329 6.95458 15.7046 6.6875L12 8.37125V7.91667C12 7.69565 11.9122 7.48369 11.7559 7.32741C11.5996 7.17113 11.3877 7.08333 11.1667 7.08333H5.33333C5.11232 7.08333 4.90036 7.17113 4.74408 7.32741C4.5878 7.48369 4.5 7.69565 4.5 7.91667V8.37125L0.795833 6.6875C0.767083 6.95458 0.75 7.225 0.75 7.5L4.5 9.20458V11.0987L1.39458 10.5342C1.53667 10.855 1.70333 11.1621 1.8875 11.4571L4.5 11.9321V12.5C4.5 12.721 4.5878 12.933 4.74408 13.0893C4.90036 13.2455 5.11232 13.3333 5.33333 13.3333H11.1667C11.3877 13.3333 11.5996 13.2455 11.7559 13.0893C11.9122 12.933 12 12.721 12 12.5V11.9321L14.6129 11.4567C14.7967 11.1617 14.9633 10.8546 15.1054 10.5338L12 11.0987V9.20458Z'
                fill='#F5F8FA'
              />
            </g>
            <defs>
              <clipPath id='clip0'>
                <rect x='0.75' width='15' height='15' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <input
            type='text'
            name='searchText'
            placeholder='請輸入地區名稱或地址'
          />
        </form>
        <div
          className={`toggle ${open ? 'open' : ''}`}
          onClick={() => {
            dispatch({
              type: ACTION.UPDATE,
              payload: { open: !open }
            });
          }}
        >
          <svg
            width='22'
            height='23'
            viewBox='0 0 22 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='4.40039'
              y='18.0996'
              width='13.2'
              height='2.2'
              fill='#636366'
            />
            <rect
              x='12.4668'
              y='7.83398'
              width='8.8'
              height='2.93333'
              rx='1'
              transform='rotate(90 12.4668 7.83398)'
              fill='#636366'
            />
            <path
              d='M10.1813 4.60392C10.5794 4.03521 11.4217 4.03521 11.8198 4.60393L15.0324 9.19347C15.4964 9.85624 15.0222 10.7669 14.2132 10.7669H7.78784C6.97882 10.7669 6.50467 9.85624 6.96861 9.19346L10.1813 4.60392Z'
              fill='#636366'
            />
          </svg>
        </div>
      </div>
      {selected && <DropDownItem key={`selectedItem`} item={selected} />}
      <div
        className='spacer'
        onClick={() => {
          dispatch({
            type: ACTION.UPDATE,
            payload: { sort: sort === 2 ? 0 : sort + 1 }
          });
        }}
      >
        <div>{`範圍內前20間銷售處 , 排序: ${
          sort === 0 ? '成人+兒童' : sort === 1 ? '成人' : '兒童'
        }`}</div>
      </div>
      <div className='list'>
        {list.map(x => (
          <DropDownItem key={`li${x.properties.id}`} item={x} />
        ))}
      </div>
    </div>
  );
};

const mapToProps = props => props;
export default connect(mapToProps)(DropDownBox);
