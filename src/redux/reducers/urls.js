const reducer = (state = {}, {type, payload}) => {
  
  state ={
    api: 'https://servermrdomicilios.herokuapp.com/api',
    api_server_realtime: 'https://servermrdomicilios.herokuapp.com' 
  }
  return state;
}

export default reducer;

// https://servermrdomicilios.herokuapp.com/api