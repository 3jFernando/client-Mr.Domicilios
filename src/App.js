import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

// configuracion de rutas
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

// componentes para usuario con sesion iniciada
import Header from './components/Header';
import Footer from './components/Footer';
import Drawermenu from './components/Drawermenu';
import ListOrders from './components/orders/List';
import DetailsOrder from './components/orders/Details';
import ListProducts from './components/products/List';
import ListCategories from './components/categories/List';
import ListIncharges from './components/incharges/List';
import CreateIncharges from './components/incharges/Create';
import HomeAdvertising from './components/advertising/Home';
import NewAdvertising from './components/advertising/New';

// componentes para usuario sin sesion iniciada
import HeaderNotUser from './components/auth/Header';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';

// aciones
import { connect } from 'react-redux';
import { validateSessionShop } from './redux/actions/shops';
import { createOrder } from './redux/actions/orders';
import FORMAT_CASH from './utils/format_cash';
import Account from './components/shop/Account';
import ToastMessage from './utils/ToastMessage';
import {toast} from 'react-toastify';

let App = (props) => {
  const [shop, setShop] = useState(null);

  useEffect(() => {

    props.dispatch(validateSessionShop());

    const sessionShop = () => {
      if(props.shop !== null) {
        setShop(props.shop);
        const socket = socketIOClient(props.urls.api_server_realtime, {
          reconnection: true
        });

        // globales del la tienda activa
        //document.querySelector('#global-name-shop').innerHTML = props.shop.name;


        // pendiente de las notificaciones
        socket.emit('new-order-connected', props.shop._id);
        socket.on('new-order', (__connect, payload) => {
          toast.warning("Nueva orden \n\nCliente: "+payload.client.name+"\nValor orden: "+FORMAT_CASH(payload.total));
          // agregar al listado
          props.dispatch(createOrder(payload));
        });

      }
    }
    sessionShop();
    
  }, []);

  return (
    <BrowserRouter>
      <div className="main">
        <ToastMessage />
        {
          shop === null ?
            (
              <HeaderNotUser/>
            ) :
            (
              <Header onClick={() => closeDrawer()} />
            )
        }
        {
          shop === null ?
            null :
            <Drawermenu />
        }

        {
          shop === null ?
            (
              <div className="content m-2">
                <div className="row justify-content-md-center m-5">
                  <Switch>
                    <Route path='/' exact={true} component={Login} />
                    <Route path='/create-account' component={CreateAccount} />
                    <Route path='*' component={Page404NotFound} />
                  </Switch>
                </div>
              </div>

            ) :
            (
              <div className="content m-2" onClick={() => closeDrawer()}>
                <Switch>
                  <Route path='/' exact component={Account} />
                  <Route path='/orders' exact component={ListOrders} />
                  <Route path='/orders/:id' component={DetailsOrder} />
                  <Route path='/products' exact component={ListProducts} />
                  <Route path='/categories' exact component={ListCategories} />
                  <Route path='/incharges' exact component={ListIncharges} />
                  <Route path='/incharges/create' component={CreateIncharges} /> 
                  <Route path='/advertising' exact component={HomeAdvertising} />
                  <Route path='/advertising/new' component={NewAdvertising} />                 
                  <Route path='*' component={Page404NotFound} />
                </Switch>

              </div>
            )
        }
        <Footer className="footer" />
      </div>
    </BrowserRouter>
  );
}

// componente pagina 404
const Page404NotFound = () => {
  let location = useLocation();
  return (
    <div>
      <h3>Error 404!</h3>
      <p>
        Pagina <code>{location.pathname} no encontrada.</code>
      </p>
    </div>
  );
}

// abrir menu lateral
function closeDrawer() {
  const drawer = document.querySelector('.drawer');
  drawer.classList.remove('open');
  drawer.classList.add('close');
}

const mapStateToProps = state => ({
  shop: state.shop,
  urls: state.urls
});

App = connect(mapStateToProps)(App);
export default App;
