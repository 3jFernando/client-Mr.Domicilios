import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

// componentes
import Loading from '../Loading';

// redux
import { createIncharge } from '../../redux/actions/incharges';

let Create = props => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  // crear domiciliarios
  const create = async () => {

    if (props.shop !== null) {

      if (name === "") {
        alert("El nombre es obligatorio");
        return false;
      }

      setLoading(true);

      await Axios.post(props.urls.api + '/incharges', {
        name: name,
        shop_id: props.shop._id
      })
        .then(response => {
          if (response.data.status === 200) {

            // agregarlo al estore de redux
            props.dispatch(createIncharge(response.data.incharge));

            alert("Domiciliario creado con exito");
            setName("");
          }
        })
        .catch(e => alert("Upps, ocurrio un error al tartar de realizar la accion"))
        .finally(() => setLoading(false));
    }

  }

  return (
    <div className="card">
      <div className="card-header bg-white">
        <h5 className="modal-title">CREAR DOMICILIARIOS</h5>
      </div>
      <div className="card-body">
        <form>
          {
            loading && (<Loading />)
          }
          <div className="form-group">
            <label htmlFor="name">Nombre del domiciliario</label>
            <input type="text" className="form-control"
              id="name" placeholder="Nombre del domiciliario"
              aria-describedby="nameHelp"
              value={name}
              onChange={text => setName(text.target.value)}
            />
            <small id="nameHelp" className="form-text text-muted">Campo obligatorio.</small>
          </div>

        </form>
      </div>
      <div className="card-footer bg-white">

        <button onClick={() => { setName("") }} type="button" className="btn btn-light" data-dismiss="modal">
          <span className="fa fa-trash-o mr-2" />
                Limpiar
              </button>

        <button type="button" className="btn btn-dark text-white ml-2" onClick={() => create()}>CREAR DOMICILIARIO</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  shop: state.shop,
  incharges: state.incharges,
  urls: state.urls
});

Create = connect(mapStateToProps)(Create);
export default Create;