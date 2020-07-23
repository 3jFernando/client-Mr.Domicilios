import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';

// aciones
import { loginACTION } from '../../redux/actions/shops';

let Login = (props) => {
  const [loading, setLoading] = useState("INICIAR SESION");

  const login = async () => {

    setLoading("Verificando, por favor espera...");
    await Axios.post(props.urls.api + '/shops/login', {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
    .then(response => {
      const status = response.data.status;
      if(status === 200) {

        props.dispatch(loginACTION(response.data.shop));        
        window.location.assign('/');

      } else if(status === 460 || status === 470) {
        alert(response.data.message);
      } 
    })
    .catch(e => alert("Upps, ocurrio un error al tratar de realizar la accion, asegurate de tener una conexion estable"))
    .finally(() => setLoading("INICIAR SESION"));

  }

  return (
    <div className="col-sm-12 col-md-5 col-lg-6">
      <b>INICIAR SESION</b>
      <hr />
      <form>
        <div className="form-group">
          <label htmlFor="email">Correo electronico</label>
          <input type="email" required className="form-control" id="email" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">Por favor ingresa tu Correo electronico.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Clave de usuario</label>
          <input type="password" required className="form-control" id="password" aria-describedby="passwordHelp" />
          <small id="passwordHelp" className="form-text text-muted">Por favor ingresa tu Clave de usuario.</small>
        </div>
        <br />
        <button type="button" className="btn btn-dark btn-block" onClick={() => login()}>{loading}</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  shop: state.shop,
  urls: state.urls
});

Login = connect(mapStateToProps)(Login);
export default Login;