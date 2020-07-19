import { createStore } from 'redux';

// reducer
import reducer from './reducers/reducer';

// store inicial
const globalState = localStorage.getItem('GLOBAL_STATE');
const initialState = globalState ? JSON.parse(globalState) : undefined;
const store = createStore(reducer, initialState);

// cerar store global
export const saveState = () => {
  const state = store.getState();
  localStorage.setItem('GLOBAL_STATE', JSON.stringify(state));
}

export default store;