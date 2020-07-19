import { CLEAR_CATEGORY, ADD_CATEGORY } from '../actions/categories';

const reducer = (state = [], {type, payload}) => {

    switch(type) {

      case CLEAR_CATEGORY: {
        state = [];
        return state;
      }
      case ADD_CATEGORY: {
        const data = [
          ...state,
          payload
        ];
        return data;
      }

      default: 
        return state;
    } 

}

export default reducer;