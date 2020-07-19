import React, { useState } from 'react';
import Axios from 'axios';

export default function CreateAccount(props) {
  const [loading, setLoading] = useState("CREAR CUENTA");

  const createAccount = async () => {
    
    setLoading("Creando cuenta, espera...");
    await Axios.post('http://192.168.88.110:5000/api/shops', {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    })
    .then(response => {
      const status = response.data.status;
      
      if(status === 200) {
        window.location.assign('/');
      } else if(status === 460) {
        alert(response.data.message)
      } else {
        alert("Algo salio mal al tratar de realizar el proceso, asegurate de tener una conexion estable.")
      }
    })
    .catch(e => {
      console.log("erro: ", e);
      
      alert("Upps, ocurrio un error al tratar de realizar la accion")
    })
    .finally(() => setLoading("CREAR CUENTA"));

  }

  return (
    <div className="col-sm-12 col-md-5 col-lg-6">
      <b>CREAR CUENTA</b>
      <hr />
      <form>
        <div className="form-group">
          <img src='../../logo512.png' className="logotype-create-account" alt="logotipo" />
          <small id="photoHelp" className="form-text text-muted">Campo opcional.</small>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre de la tienda</label>
          <input type="text" className="form-control" id="name" aria-describedby="name" />
          <small id="name" className="form-text text-muted">Campo requirido.</small>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Número de Teléfono</label>
          <input type="number" className="form-control" id="phone" aria-describedby="phoneHelp" />
          <small id="phoneHelp" className="form-text text-muted">Campo opcional.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Correo electronico</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">Campo requirido.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Clave de usuario</label>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" />
          <small id="passwordHelp" className="form-text text-muted">Campo requirido.</small>
        </div>
        <br />
        <button type="button" className="btn btn-dark btn-block" onClick={() => createAccount()}>{loading}</button>
      </form>
    </div>
  );
}