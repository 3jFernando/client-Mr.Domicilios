import {CLEAR_LICENCE, STORE_LICENCE} from '../actions/licence.js'

const reducer = (state = null, {type, payload}) => {
  switch(type) {    
    case CLEAR_LICENCE: {
      state = [];
      return state;
    }
    case STORE_LICENCE: {
      const licence = payload;
      return licence;
    }
    default: return state;
  }
} 

export default reducer;