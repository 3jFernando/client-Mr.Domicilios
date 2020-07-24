import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { closeSectionShop } from '../redux/actions/shops';
import { saveState } from '../redux/store';

let Header = (props) => {

  const closeSection = () => {
    props.dispatch(closeSectionShop(null));
    saveState();
    window.location.assign('/');
  }

  return (
    <div className="header navbar navbar-expand-lg d-flex justify-content-between align-items-center">
      <div className="navbar-brand d-flex align-items-center">
        <i className="fa mr-4 fa-bars text-white drawer-open" onClick={() => openMenu()}></i>
        <Link to='/'>
          <div className="d-flex aling-items-center">
            <img style={{width: 60, heigth: 60, borderRadius: 2,}} src={ props.urls.api_server_realtime + '/uploads/shops/logo.jpeg' } alt="logo" />
            <div className="ml-2">
              <b className="text-white">Mr.Domicilios</b><br />
              <span className="text-white global-name" id="global-name-shop">{ props.shop !== null ? props.shop.name : 'Reinicia tu sesion.' }</span> 
            </div>
          </div>
        </Link>
      </div>
      <button className="btn bg-dark text-white" onClick={() => closeSection()}>
          Salir
        </button>
    </div >
  );
}

function openMenu() {
  const drawer = document.querySelector('.drawer');
  drawer.classList.remove('close');
  drawer.classList.add('open');
}

const mapStateToProps = state => ({
  shop: state.shop,
  urls: state.urls,
});

Header = connect(mapStateToProps)(Header);
export default Header;