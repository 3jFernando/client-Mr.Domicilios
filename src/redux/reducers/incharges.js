import { CLEAR_INCHARGES, CREATE_INCHARGE } from '../actions/incharges'; 

const reducer = (state = [], {type, payload}) => {

  switch (type) {

    case CLEAR_INCHARGES: {
      state = [];
      return state;
    }
    case CREATE_INCHARGE: {
      const incharges = [
        ...state, payload
      ];
      return incharges;
    }
    default: return state;

  }

};
export default reducer;