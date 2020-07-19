import React from 'react';

import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <div className="header navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">
        <Link to='/'><b className="ml-2 text-white">Mr.Domicilio</b></Link>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse-btn" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapse-btn">
        <ul className="navbar-nav mr-auto">
          <Link to='/'><li className="nav-item active nav-link text-white">
            Iniciar sesion
          </li></Link>
          <Link to='/create-account'><li className="nav-item nav-link text-white">
            Crear cuenta
          </li></Link>
        </ul>
      </div>
    </div>
  );
}

