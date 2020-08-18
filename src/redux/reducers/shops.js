import {LOGIN, VALIDATE_SESION_SHOP, CLOSE_SESCTION} from '../actions/shops';

const reducer = (state = [], {type, payload}) => {

  switch(type) {

    case LOGIN: {      
      state = payload;
      return state;
    }
    case VALIDATE_SESION_SHOP: {            
      return state;
    }
    case CLOSE_SESCTION: {   
      const shop = null; 
      state = shop;
      return state;
    }
    default: 
      return state;
  }
} 
export default reducer;