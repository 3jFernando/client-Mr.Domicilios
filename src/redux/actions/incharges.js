export const CLEAR_INCHARGES = 'CLEAR_INCHARGES';
export const CREATE_INCHARGE = 'CREATE_INCHARGE';

export const clearIncharges = () => {
  return {
    type: CLEAR_INCHARGES
  };
}

export const createIncharge = (payload) => {
  return {
    type: CREATE_INCHARGE,
    payload: payload
  };
}