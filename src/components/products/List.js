import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ToastMessage from '../../utils/ToastMessage';
import Loading from '../Loading';

import { clearProducts, createProducts } from '../../redux/actions/products';
import { Link } from 'react-router-dom';
import FORMAT_CASH from '../../utils/format_cash';

let List = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (props.shop !== null) {

      props.dispatch(clearProducts());
      setLoading(true);
      const load = async () => {
        await Axios.get(props.urls.api + '/products/shop/' + props.shop._id)
          .then(response => {
            const status = response.data.status;
            if (status === 200) {
              const items = response.data.products ?? [];
              setProducts(items);
              items.map(x => props.dispatch(createProducts(x)));
            } else {
              alert("Falla al tratar de cargar los datos intentalo de nuevo");
            }
          })
          .catch(e => alert("Upps, ocurrio un error al tratar de realizar la accion"))
          .finally(() => setLoading(false));
      }
      load();
    }

  }, [])



  // componente titulo
  const Title = props => {
    return (
      <div className="bg-dark alert alert-dark d-flex justify-content-between align-items-center">

        <b className="text-white">{props.name}</b>
        {
          props.more && (
            props.updating && (<button type="button" className="btn btn-sm btn-dark text-white" onClick={() => props.setUpdating(false)}><span className="fa fa-plus mr-2" />Agregar</button>)
          )
        }
      </div>
    );
  }

  return (
    <div className='table-responsive'>
      <ToastMessage />
      {loading && (<Loading />)}
      <Link to='/products/new/item'>
        <button className="btn btn-dark btn-sm"><span className="fa fa-plus mr-2" />Crear nuevo</button>
      </Link>
      <br />
      <table className="table table-hover mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>C.Inventario</th>
            <th>Precio</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {
            props.products.map(p => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>{p.cant}</td>
                <td>{FORMAT_CASH(p.price)}</td>
                <td>
                  <Link to={'/products/edit/' + p._id}>
                    <button className={'btn btn-sm btn-new'}><i className="fa fa-eye"></i> detalles</button>
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
  shop: state.shop,
  urls: state.urls,
  products: state.products
});
List = connect(mapStateToProps)(List);

export default List;