import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import ToastMessage from '../../utils/ToastMessage';
import ControlSelectFile from '../../utils/ControlSelectFile';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { loginACTION } from '../../redux/actions/shops';

let Account = props => {
  const [loading, setLoagin] = useState(false);
  const [view, setView] = useState(0);
  // datos basicos
  const [_id, setId] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // datos de la tienda
  const [value_delivery, setValue_delivery] = useState();
  const [time_number, setTime_number] = useState();
  const [time_type, setTime_type] = useState();
  // categorias
  const [categories, setCategories] = useState([]);

  // actualizar datos tienda actual
  const loadDataShop = (shop) => {
    setId(shop._id);
    setPhoto(shop.photo === undefined || props.shop.photo == null ? '../../logo512.png' : `${props.urls.api_server_realtime}${shop.photo}`);
    setName(shop.name);
    setPhone(shop.phone);
    setEmail(shop.email);
    setPassword(shop.password);
    setValue_delivery(shop.value_delivery);
    setTime_number(shop.time_number);
    setTime_type(shop.time_type);
  }

  // cargar categorias
  const loadCategories = async () => {
    setLoagin(true)
    await Axios.get(`${props.urls.api}/categories/generals`)
      .then(response => {
        if (response.data.status === 200) setCategories(response.data.categories);
      })
      .catch(e => toast.error("No fue posible cargar las categorias, por favor intentalo mas tarde."))
      .finally(() => setLoagin(false));
  }

  useEffect(() => {

    if (props.shop !== null) {
      loadDataShop(props.shop);
      loadCategories();
    }

  }, []);

  // cambiar foto
  const onChangeFile = (e) => {

    const response = ControlSelectFile(e);
    if (response.status) {
      setPhoto(response.file);
    }
  }

  // guardar cambios
  const saveData = async (type) => {

    setLoagin(true);

    let data = new FormData();

    data.append('action', 'UPDATE');
    data.append('action_type', type);
    data.append('_id', _id);

    if (type === 'BASIC') {
      data.append('name', name);
      data.append('phone', phone);
      data.append('email', email);
      data.append('photo', photo);
    } else {
      data.append('value_delivery', value_delivery);
      data.append('time_number', time_number);
      data.append('time_type', time_type);

      // categorias
      let categories_shops = [];
      const itemsDOM = document.getElementsByClassName('item-category-general');
      for (let i = 0; i < itemsDOM.length; i++) {
        if (itemsDOM[i].classList.contains('active')) categories_shops.push({ id: i + 1 })
      }
      data.append('categories_shops', JSON.stringify(categories_shops));
    }

    await Axios.post(`${props.urls.api}/shops`, data)
      .then(response => {
        const status = response.data.status;
        if (status === 460) {
          toast.warning(response.data.message);
        } else if (status === 200) {
          toast.success("Datos actualizados con exito.");
          props.dispatch(loginACTION(response.data.shop));
          loadDataShop(response.data.shop);
        }
      })
      .catch(e => toast.error("No es posible realizar la accion en este momento"))
      .finally(() => setLoagin(false));
  }

  return (
    <div className="row justify-content-md-center m-2">
      <ToastMessage />
      <div className="col-sm-12 col-md-4 col-lg-4">
        <ul className="list-menu-account-shop">
          <li className={view === 0 ? 'active' : ''} onClick={() => setView(0)} ><span className="fa fa-user mr-2" />Datos basicos</li>
          <li className={view === 1 ? 'active' : ''} onClick={() => setView(1)} ><span className="fa fa-cogs mr-2" />Datos de la tienda</li>
          <li className={view === 2 ? 'active' : ''} onClick={() => setView(2)} ><span className="fa fa-cog mr-2" />Licencia MrDomicilios</li>
        </ul>
      </div>
      <div className="col-sm-12 col-md-8 col-lg-8">
        {loading && <Loading />}
        {
          view === 0 &&
          (<div >
            <b>Datos basicos</b>
            <hr />
            <form>
              <div className="form-group">
                <img src={photo}
                  className="logotype-create-account"
                  alt="logotipo" />
                <input type="file" onChange={file => onChangeFile(file)} id="photo" name="photo" />
                <small id="photoHelp" className="form-text text-muted">Campo opcional.</small>
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre de la tienda</label>
                <input type="text" className="form-control" id="name" onChange={text => setName(text.target.value)} value={name} aria-describedby="name" />
                <small id="name" className="form-text text-muted">Campo requirido.</small>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Número de Teléfono</label>
                <input type="number" className="form-control" id="phone" onChange={text => setPhone(text.target.value)} value={phone} aria-describedby="phoneHelp" />
                <small id="phoneHelp" className="form-text text-muted">Campo opcional.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electronico</label>
                <input type="email" className="form-control" id="email" onChange={text => setEmail(text.target.value)} value={email} aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">Campo requirido.</small>
              </div>
              <br />
              <button type="button" className="btn btn-dark btn-block" onClick={() => saveData('BASIC')}><span className="fa fa-edit mr-2" /> Guardar cambios</button>
            </form>
          </div>)
        }
        {
          view === 1 && (<div >
            <form>
              <b>Datos basicos</b>
              <hr />
              <div className="row">
                <div className="form-group col-5">
                  <label htmlFor="value_delivery">Costo del envio</label>
                  <input type="number" step="0.00" className="form-control" value={value_delivery} onChange={text => setValue_delivery(text.target.value)} id="value_delivery" aria-describedby="value_delivery" />
                  <small id="value_delivery" className="form-text text-muted">Campo opcional.</small>
                </div>
              </div>
              <b>Tiempos de entrega</b>
              <hr />
              <div className="row">
                <div className="form-group col-5">
                  <label htmlFor="time_number">Cantidad</label>
                  <input type="number" className="form-control" value={time_number} onChange={text => setTime_number(text.target.value)} id="time_number" aria-describedby="time_number" />
                  <small id="time_number" className="form-text text-muted">Campo opcional.</small>
                </div>
                <div className="form-group col-5">
                  <label htmlFor="time_type">Tipo</label>
                  <select id="time_type" name="time_type" value={time_type} onChange={text => setTime_type(text.target.value)} className="form-control" aria-describedby="time_type" >
                    <option>Minutos</option>
                    <option>Horas</option>
                    <option>Dias</option>
                    <option>Semanas</option>
                  </select>
                  <small id="time_type" className="form-text text-muted">Campo opcional.</small>
                </div>
              </div>
              <b>Categorias</b>
              <hr />
              <div className="row">
                {
                  categories.map(category => {
                    let classActive = '';
                    JSON.parse(props.shop.categories_shops).map(c => {
                      if (c.id === category.id) classActive = 'active';
                    });

                    return (<div key={category.id} className={`col-2 item-${category.id} item-category-general ${classActive}`} onClick={() => changeCategory(category.id, props.licence)}>
                      <img src={`${props.urls.api_server_realtime}${category.image}`} alt={category.name} /><br />
                      <b>{category.name}</b>
                    </div>);
                  })
                }
              </div>
              <br />
              <button type="button" className="btn btn-dark btn-block" onClick={() => saveData('OTHERS')}><span className="fa fa-edit mr-2" /> Guardar cambios</button>
            </form>
          </div>)
        }
        {
          view === 2 && (
            <div>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Licencia</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.licence._id}</td>
                    <td><span className={props.licence.type === 'Basica' ? 'licence-basic' : 'licence-premium'}>{props.licence.type}</span></td>
                    <td>{props.licence.state}</td>
                  </tr>
                </tbody>
              </table>
              <div className='card'>
                <div className='card-header'><b>Detalles de la licencia</b></div>
                <div className='card-body'>
                  {
                    props.licence.type === 'Basica' ? (
                      <ul>
                        <li>Puedes mostrar tu tienda en Dos categorias generales</li>
                        <li>Productos ilimitados</li>
                        <li>Domiciliarios ilimitados</li>
                        <li>Categorias ilimitadas</li>
                      </ul>
                    ) : (
                        <ul>
                          <li>Puedes mostrar tu tienda en todas las categorias generales</li>
                          <li>Puedes crear publicidad para promocionar y dar a conocer tanto tu tienda como tus productos </li>
                          <li>Productos ilimitados</li>
                          <li>Domiciliarios ilimitados</li>
                          <li>Categorias ilimitadas</li>
                        </ul>
                      )
                  }
                </div>{
                  props.licence.type === 'Basica' && (
                    <div className='card-footer'>
                  <p>Recuerda que la Licencia <span className='licence-premium'>Premium</span> es tu mejor opcion.</p>
                </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

// usar/no_usar una categoria
const changeCategory = (id, licence) => {

  // categorias
  let categories_shops = [];
  const itemsDOM = document.getElementsByClassName('item-category-general');
  for (let i = 0; i < itemsDOM.length; i++) {
    if (itemsDOM[i].classList.contains('active')) categories_shops.push({ id: i + 1 })
  }

  const itemDOM = document.querySelector(`.item-${id}`);
  if (itemDOM === null) return false;

  // validar su licencia
  if (licence === null) {
    toast.error("Es necesario que reinicies tu sesion para validar los datos de tu licencia.");
    return false;
  }

  if (licence.type === 'Basica' && categories_shops.length > 1) {

    // si ya esta seleccionada se puede deseleccionar
    if (itemDOM.classList.contains('active')) {
      itemDOM.classList.toggle('active');
    } else {
      toast.warning("Tu actual LICENCIA solo te permite usar 2 Categorias.");
    }

    return false;
  }

  itemDOM.classList.toggle('active');
}

const mapPropsToState = state => ({
  shop: state.shop,
  urls: state.urls,
  licence: state.licence
});

Account = connect(mapPropsToState)(Account);
export default Account;