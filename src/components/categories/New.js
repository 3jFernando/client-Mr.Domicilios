import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'; 
import Axios from 'axios';
import {toast} from 'react-toastify';
import { useParams, Link} from 'react-router-dom';

import Loading from '../Loading';
import {addCategory} from '../../redux/actions/categories';

let New = props => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const {id} = useParams();

  useEffect(() => {
    if(id !== undefined) {
      props.categories.filter(c => {
        if (c._id === id) setName(c.name);
      });
    }
  }, []);

  // crear categoria
  const save = async () => {

    if(name === '') {
      toast.warning("El campo Nombre es obliatorio.");
      return false;
    }

    setLoading(true);
    await Axios.post(`${props.urls.api}/categorys`, {
      name,
      shop_id: props.shop._id,
      action: id === undefined ? true : false,
      _id: id 
    })
    .then(response => {
      if(response.data.status === 200) {        
        if(id === undefined) {
          setName("");
          toast.success("Catagoria agregada con exito.");
        } else {
          toast.success("Catagoria actualizada con exito.");
          props.categories.map((c, index) => {
            if (c._id === id) props.categories.splice(index, 1);
          });
        }
        props.dispatch(addCategory(response.data.category))
      } else if(response.data.status === 460) {
        toast.warning("La categoria que intentas editar esta presentando problemas.");
      }
    })
    .catch(e => toast.error("No es posible realizar la accion"))
    .finally(() => setLoading(false));
  }

  return (
    <div>
      { loading && (<Loading />) }
      <Link to='/categories'>
        <button className="btn btn-dark btn-sm"><span className="fa fa-arrow-left mr-2" />Regresar</button>
      </Link>
      <hr />
      <div className="form-group">
        <label htmlFor="name">Nombre de la categoria</label><br />
        <input type="text" className="form-control" id="name" max='255' value={name} onChange={text => setName(text.target.value)} />
      </div>
      <button disabled={props.shop === null ? 'disabled' : ''} 
        className="btn btn-dark btn-sm" 
        onClick={() => save()}>
        <span className={id === undefined ? 'fa mr-2 fa-save' : 'fa mr-2 fa-edit'} />{id === undefined ? 'CREAR' : 'GUARDAR CAMBIOS'}</button>
    </div>
  );
}

const mapPropsToState = state => ({
  shop: state.shop,
  categories: state.categories,
  urls: state.urls,
});

New = connect(mapPropsToState)(New);
export default New;