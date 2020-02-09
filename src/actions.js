import { ACTION } from './store';
import { List } from 'immutable';
const DataUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
// const csvurl =
//   'https://data.nhi.gov.tw/resource/mask/maskdata.csv';
export const Refetch = () => async dispatch => {
  var resp = await fetch(DataUrl);
  var payload = { data: List((await resp.json()).features) };
  dispatch({ type: ACTION.REFETCH, payload });
}; 