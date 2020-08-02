import React from 'react';

// rutas configuracion
import { Link } from 'react-router-dom';

export default function Drawermenu(props) {
  return (
    <div className="drawer close">
      <div className="drawer-header">
        <b className="text-white brand">MENU</b>
        <span className="fa fa-close text-white drawer-close" onClick={() => closeMenu()}></span>
      </div>
      <div className="drawer-menu">
        <Draweritem name="Account" path="/" icon="fa fa-user" />
        <Draweritem name="Ordenes" path="/orders" icon="fa fa-list" />
        <Draweritem name="Productos" path="/products" icon="fa fa-shopping-bag" />
        <Draweritem name="Categorias" path="/categories" icon="fa fa-cube" />
        <Draweritem name="Domiciliarios" path="/incharges" icon="fa fa-group" />
        <Draweritem name="Publicidad" path="/advertising" icon="fa fa-bolt" />
      </div>
    </div>
  );
}

function Draweritem(props) {
  return (
    <Link to={props.path} onClick={() => closeMenu()}>
      <div className="drawer-item">        
          <span className={props.icon}></span>
          <b>{props.name}</b>
      </div>
    </Link>
  
  );
}

function closeMenu() {
  const drawer = document.querySelector('.drawer');
  drawer.classList.remove('open');
  drawer.classList.add('close');
}