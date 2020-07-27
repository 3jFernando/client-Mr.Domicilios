import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import ControlSelectFile from '../../utils/ControlSelectFile';
import Loading from '../Loading';

let New = props => {
  const [loading, setLoading] = useState(false);

  const [date_finish, setDate_finish] = useState(new Date());
  const [image, setImage] = useState();
  const [type, setType] = useState('Producto');
  const [entity_id, setEntity_id] = useState();
  const [entities, setEntities] = useState(props.products);
  const [disscount, setDisscount] = useState(0);

  const store = async () => {

    setLoading(true)
    const formData = new FormData();

    formData.append('date_finish', date_finish);
    formData.append('shop_id', props.shop._id);
    formData.append('type', type);
    formData.append('image', image);
    formData.append('entity_id', entity_id);
    formData.append('disscount', disscount);

    await Axios.post(`${props.urls.api}/advertising`, formData)
      .then(response => {
        const status = response.data.status;
        if (status === 200) {
          toast.success("Publicidad creada con exito.");
        }
      })
      .catch(e => toast.error("No es posible realizar la accion en este momento."))
      .finally(() => setLoading(false));
  }

  const changeFile = (e) => {
    const response = ControlSelectFile(e);
    if (response.status) setImage(response.file)
  }

  const changeType = value => {
    setType(value);
    setEntities([]);
    if(value === 'Producto') {
      setEntities(props.products);
    } else {
      setEntities(props.categories);
    }
    setEntity_id();
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className='color-two'>Publicidad</h1>
        <Link to='/advertising'>
          <button className="btn btn-dark"><span className="fa fa-arrow-left mr-2" />Cancelar</button>
        </Link>
      </div>
      <hr />

      <h2>Datos de la publicidad</h2>
      {loading && (<Loading />)}
      <div>
        <div className="row">
          <div className="form-group col-4">
            <label htmlFor="image">Fotografia</label><br />
            <img
              onError={_image => _image.target.src = '../../../logo512.png'} 
              style={{ width: 150, height: 150 }}
              src='../../../logo512.png' alt="a" />
            <br />
            <input className="form-control" type="file" name="image" onChange={file => changeFile(file)} id="image" />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="form-group col-4">
                <label htmlFor="date-finish">Fecha de finalizacion</label><br />
                <input className="form-control" type="date" id="date-finish"
                  value={date_finish}
                  onChange={text => setDate_finish(text.target.value)}
                  name="date-finish" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-4">
                <label htmlFor="type">Tipo</label><br />
                <select className="form-control" id="type" value={type} onChange={text => changeType(text.target.value)}>
                  <option value="Producto">Producto</option>
                  <option value="Categoria">Categoria</option>
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="entity">Elemento</label><br />
                <select className="form-control" id="entity" value={entity_id} onChange={text => setEntity_id(text.target.value)}>
                  {
                    entities.map(en => (
                    <option value={en._id}>{en.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group col-2">
                <label htmlFor="disscount">Des %</label><br />
                <input className="form-control" type="number" id="disscount"
                  value={disscount}
                  onChange={text => setDisscount(text.target.value)}
                  name="disscount" />
              </div>
            </div>
            <button type="button" className="btn btn-success mt-3" onClick={() => store()}>
          <span className="fa fa-save mr-2" />CREAR</button>
          </div>
        </div>        
      </div>

    </div>
  );
}

const mapPropsToState = state => ({
  shop: state.shop,
  urls: state.urls,
  products: state.products,
  categories: state.categories
});
New = connect(mapPropsToState)(New);
export default New;