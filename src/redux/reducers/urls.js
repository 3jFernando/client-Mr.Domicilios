const reducer = (state = {}, {type, payload}) => {
  
  state ={
    api: 'http://192.168.88.103:5000/api',
    api_server_realtime: 'http://192.168.88.103:5000' 
  }
  return state;
}

export default reducer;

// https://servermrdomicilios.herokuapp.com/api