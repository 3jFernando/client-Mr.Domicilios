import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

// utilerias
import FORMAT_CASH from '../../utils/format_cash';
import FORMAT_DATE from '../../utils/format_date';

import socketIOCCLIENT from 'socket.io-client';

// componente
import Loading from '../Loading';

let Details = props => {

  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (props.shop !== null) {

      const _order = props.orders.filter(x => x._id === id);
      if (_order.length > 0) {
        setOrder(_order[0]);

        // conexion al servidor
        setSocket(socketIOCCLIENT(props.urls.api_server_realtime));
      }
    }

  }, []);

  // actualizar el encargado y cambiar estado a en camino
  const updateIncharge = async () => {

    // id domiciliario
    const incharge_id = document.querySelector('#incharge').value;

    setLoading(true)
    await Axios.put( props.urls.api + '/orders/change-incharge', {
      "id": id,
      "incharge_id": incharge_id
    })
    .then(response => {
      if(response.data.status === 200) {
        alert("Proceso realizado con exito. \n\nOrden en camino...");

        // notificar al cliente sobre el estado de la orden
        if(socket !== null) {
          const __connect = order.client._id;
          const payload = order;
          socket.emit('order-on-the-way-connect', __connect);
          socket.emit('order-on-the-way', __connect, payload);
        }

      } else {
        alert("Orden no encontrada, por favor recarga el sistema");
      }
    })
    .catch(e => alert("Upps, ocurrio un error, intentalo mas tarde."))
    .finally(() => setLoading(false));
  } 

  return (
    <div>
      {
        loading && (<Loading />)
      }
      {
        order === null
          ?
          (<h2>La orden esta presentando problemas</h2>)
          :
          (
            <div>

              <div className="card bg-dark text-white">
                <div className="card-header">
                  DATOS GENERALES
                </div>
                <div className="card-body">
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <b>Cliente:</b>
                  <b>{order.client.name}</b>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <b>Estado:</b>
                  <span>{order.state ?? 'Activa'}</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <b>Total:</b>
                  <span>{ FORMAT_CASH(order.total) }</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <b>Costo del domicilio:</b>
                  <span>{ FORMAT_CASH(order.value_delivery) }</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <b>Fecha:</b>
                  <span>{ FORMAT_DATE(order.create_at) }</span>
                </div>
                </div>
              </div>
              <br />

              <div className="card">
                <div className="card-header bg-dark text-white">
                  DOMICILIARIO
                </div>
                <div className="card-body">
                  <label htmlFor="incharge">Selecciona el domicilio</label>
                  <select className="ml-2 form-control" id="incharge" value={order.incharge_id} onChange={() => updateIncharge()}>
                    <option></option>
                    {
                      props.incharges.map(incharge => (
                        <option key={incharge._id} value={incharge._id}>{incharge.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <br />

              <div className="card">
                <div className="card-header bg-dark text-white">
                  PRODUCTOS
                </div>
                <div className="card-body">
                <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    order.products.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>
                          <div className="d-flex justify-content-start align-items-center">
                            <img className="mr-2" 
                              style={{ width: 32, height: 32, borderRadius: 50 }} 
                              src={(product.product.image === '' || product.product.image === null || product.product.image === undefined) ? '../../../public/logo512.png' : props.urls.api_server_realtime+product.product.image} alt={product.product.name} />
                            {product.product.name}
                          </div>
                        </td>
                        <td>{ FORMAT_CASH(product.value_unit) }</td>
                        <td>{product.cant}</td>
                        <td>{ FORMAT_CASH(product.total) }</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

                </div>
              </div>

            </div>
          )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  shop: state.shop,
  orders: state.orders,
  incharges: state.incharges,
  urls: state.urls
});

Details = connect(mapStateToProps)(Details);
export default Details;