// acciones
export const LOGIN = 'LOGIN';
export const VALIDATE_SESION_SHOP = 'VALIDATE_SESION_SHOP';
export const CLOSE_SESCTION = 'CLOSE_SESCTION';

// dispatch actions
// legin tiendas
export const loginACTION = payload => {
  return {
    type: LOGIN,
    payload: payload
  }
}

// obtener tienda
export const validateSessionShop = () => {
  return {
    type: VALIDATE_SESION_SHOP
  }
};

// cerrar sesion
export const closeSectionShop = payload => {
  return {
    type: CLOSE_SESCTION,
    payload: payload
  }
}