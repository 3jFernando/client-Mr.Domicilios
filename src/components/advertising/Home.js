import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Loading';

let Home = props => {
  const [loading, setLoading] = useState(false);
  const [advertisings, setAdvertisings] = useState([]);

  useEffect(() => {    
    load();
  }, []);

  const load = async () => {
    setLoading(true)

    await Axios.get(`${props.urls.api}/advertising/shop/${props.shop._id}`)
      .then(response => {
        const status = response.data.status;
        if (status === 200) setAdvertisings(response.data.advertisings);
      })
      .catch(e => toast.error("No es posible realizar la accion en este momento."))
      .finally(() => setLoading(false));
  }

  // eliminar
  const remove = async _id => {

    await Axios.delete(`${props.urls.api}/advertising/${_id}`)
    .then(response => {
      const status = response.data.status;
      if (status === 200) {
        load();
        toast.success("Item eliminado con exito.");
      } else if (status === 460) {
        toast.warning(response.data.message);
      }
    })
    .catch(e => toast.error("No es posible realizar la accion en este momento."))
    .finally(() => setLoading(false));

  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className='color-two'>Publicidad</h1>
        {
          props.licence !== null && props.licence.type === 'Premium' ? (
            <Link to='/advertising/new'>
              <button className="btn btn-dark"><span className="fa fa-plus mr-2" />Nueva</button>
            </Link>
          ) : (
            <span className="menu-only-licence-info">Solo para licencias Premium</span>
          )
        }        
      </div>
      <hr />

      <h2>Historial</h2>
      { loading && (<Loading />) }
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Fotografia</th>
              <th>Fecha</th>
              <th>Fecha Fin</th>
              <th>Tipo</th>
              <th>Item</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              advertisings.map(advertising => (
                <tr>
                  <td>{advertising._id}</td>
                  <td>
                    <img onError={_image => _image.target.src = '../../../logo512.png'} 
                    style={{ width: 40, height: 40 }} 
                    src={`${props.urls.api_server_realtime}${advertising.image}`} alt="a" />
                  </td>
                  <td>{advertising.date_created}</td>
                  <td>{advertising.date_finish}</td>
                  <td>{advertising.type}</td>
                  <td>{advertising.name}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(advertising._id)}><span className="fa fa-remove mr-2" />Eliminar</button>
                  </td>
                </tr>
              ))
            }            
          </tbody>
        </table>
      </div>

    </div>
  );
}

const mapPropsToState = state => ({
  shop: state.shop,
  urls: state.urls,
  licence: state.licence
});
Home = connect(mapPropsToState)(Home);
export default Home;