import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import Create from './Create';

import { clearIncharges, createIncharge } from '../../redux/actions/incharges';

let List = props => {
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // reiniciar el store
    props.dispatch(clearIncharges());
    if (props.shop !== null) {

      const load = async () => {

        setLoading(true);
        await Axios.get(props.urls.api + '/incharges/shop/' + props.shop._id)
          .then(response => {
            if (response.data.status === 200) {

              // argegar al store los encargados
              const data = response.data.incharges ?? [];
              data.map(incharge => props.dispatch(createIncharge(incharge)))

            }
          })
          .catch(e => alert("Upps, ocurrio un error al tartar de realizar la accion"))
          .finally(() => setLoading(false));

      }
      load();
    }

  }, []);

  return (
    <div>
      {
        loading && (<Loading />)
      }
      <div>
        <div className="d-flex justify-content-end">
          {
            creating ?
            (<button className="btn btn-sm btn-light mb-2" onClick={() => {setCreating(false);}}><span className="fa fa-arrow-left mr-2" />Cancelar</button>)
            : 
            (<button className="btn btn-sm btn-dark text-white" onClick={() => {setCreating(true)}}><span className="fa fa-plus text-white mr-2" />Nuevo</button>)
          }
        </div>
        {
          creating && <Create />
        }
      </div>
      <div className="mt-2">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {
              props.incharges.map(incharge => (
                <tr key={incharge._id}>
                  <td>{incharge._id}</td>
                  <td>{incharge.name}</td>
                  <td>{incharge.state}</td>
                  <td>
                    <button className="btn btn-sm btn-dark"><span className="text-white fa fa-eye" /></button>
                    <button className="btn btn-sm btn-danger ml-2"><span className="text-white fa fa-trash-o" /></button>
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

const mapStateToProps = state => ({
  shop: state.shop,
  incharges: state.incharges,
  urls: state.urls
});

List = connect(mapStateToProps)(List);
export default List;