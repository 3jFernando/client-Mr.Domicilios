import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearOrders, createOrder } from '../../redux/actions/orders';
import FORMAT_CASH from '../../utils/format_cash';
import FORMAT_DATE from '../../utils/format_date';

let List = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(props.shops !== null) {

      props.dispatch(clearOrders());

      setLoading(true);
      const load = async () => {

        await Axios.get(props.urls.api + '/orders/shop/' + props.shops._id)
        .then(response => {
          const status = response.data.status;
          if(status === 200) {
           
            const orders = response.data.orders ?? [];
            orders.map(order => props.dispatch(createOrder(order)));

          } else {
            alert("Falla al tratar de cargar los datos intentalo de nuevo");
          }
        })
        .catch(e => alert("Upps, ocurrio un error al tratar de realizar la accion"))
        .finally(() => setLoading(false));

      }
      load();
    }

  }, []);

  // al vistar una orden deja de ser nueva
  const orderVisited = async (order) => {
    if(!order.visited) await Axios.put(props.urls.api + '/orders/visited/'+order._id);
  }

  return (
    <div>
      {
        loading && (<div className="alert alert-dark bg-dark">
          <i className="fa fa-spinner mr-2 text-white"></i>
          <b className="text-white">Cargando, por favor espera...</b>
          </div>)
      }
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
        {            
            props.orders.map(order => (
              <tr key={order._id}>                
                <td>
                  <span className={order.visited ? 'yes-visited' : 'not-visited'}>Nueva</span>  
                  {order._id}
                </td>
                <td>{order.state ?? 'Activa'}</td>
                <td>{ FORMAT_DATE(order.create_at) }</td>
                <td>{order.client.name}</td>
                <td>{ FORMAT_CASH(order.total) }</td>
                <td>
                  <Link to={ '/orders/' + order._id} onClick={() => orderVisited(order)}>
                    <button className={ order.state === 'Activa' ? 'btn btn-sm btn-new' : 'btn btn-sm btn-dark text-white' }><i className="fa fa-eye"></i> detalles</button>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  shops: state.shop,
  orders: state.orders,
  urls: state.urls
});

List = connect(mapStateToProps)(List);
export default List;