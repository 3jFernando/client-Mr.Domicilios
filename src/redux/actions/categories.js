export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';
export const ADD_CATEGORY = '0ADD_CATEGORY';

export function clearCategories() {
  return {
    type: CLEAR_CATEGORY
  }
}

export function addCategory(payload) {
  return {
    type: ADD_CATEGORY,
    payload: payload
  };
}