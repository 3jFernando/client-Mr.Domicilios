export const CLEAR_LICENCE = "CLEAR_LICENCE";
export const STORE_LICENCE = "STORE_LICENCE";

// reiniciar
export const clearLicence = () => {
  return {
    type: CLEAR_LICENCE
  }
}

// obetner la licencia de la tienda
export const storeLicence = payload => {
  return {
    type: STORE_LICENCE,
    payload
  }
}

