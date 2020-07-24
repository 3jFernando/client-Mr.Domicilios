import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

let Account = props => {
  const [view, setView] = useState(0);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {

    if(props.shop !== null) {
      setName(props.shop.name);
      setPhone(props.shop.phone);
      setEmail(props.shop.email);
      setPassword(props.shop.password);
    }

  }, []);

  return (
    <div className="row justify-content-md-center m-2">
      <div className="col-sm-12 col-md-4 col-lg-4">
        <ul className="list-menu-account-shop">
          <li className={view === 0 && 'active'} onClick={() => setView(0)} ><span className="fa fa-user mr-2" />Datos basicos</li>
          <li className={view === 1 && 'active'} onClick={() => setView(1)} ><span className="fa fa-cogs mr-2" />Datos de la tienda</li>
        </ul>
      </div>
      <div className="col-sm-12 col-md-8 col-lg-8">
      {
        view === 0 ?
        (<div >
          <b>Datos basicos</b>
          <hr />
          <form>
            <div className="form-group">
              <img src='../../logo512.png' className="logotype-create-account" alt="logotipo" />
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
            <div className="form-group">
              <label htmlFor="password">Clave de usuario</label>
              <input type="password" className="form-control" id="password" onChange={text => setPassword(text.target.value)} value={password} aria-describedby="passwordHelp" />
              <small id="passwordHelp" className="form-text text-muted">Campo requirido.</small>
            </div>
            <br />
            <button type="button" className="btn btn-dark btn-block"><span className="fa fa-edit mr-2" /> Guardar cambios</button>
          </form>
        </div>)
        : (<div >
          <b>Datos de la tienda</b>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="value_delivery">Costo del envio</label>
              <input type="number" step="0.00" className="form-control" id="value_delivery" aria-describedby="value_delivery" />
              <small id="value_delivery" className="form-text text-muted">Campo opcional.</small>
            </div>
            <div className="form-group">
              <label htmlFor="time_type">Tiempo promedio de entrega</label>
              <select id="time_type" name="time_type" className="form-control" aria-describedby="time_type" >
                <option>Minutos</option>
                <option>Horas</option>
                <option>Dias</option>
                <option>Semanas</option>
              </select>
              <small id="time_type" className="form-text text-muted">Campo opcional.</small>
            </div>
            <div className="form-group">
              <label htmlFor="time_number">Tiempo promedio de entrega</label>
              <input type="number" className="form-control" id="time_number" aria-describedby="time_number" />
              <small id="time_number" className="form-text text-muted">Campo opcional.</small>
            </div>
            <br />
            <button type="button" className="btn btn-dark btn-block"><span className="fa fa-save mr-2" /> Guardar datos</button>
          </form>
          </div>)
      }
      </div>
    </div>
  );
}

const mapPropsToState = state => ({
  shop: state.shop,
  urls: state.urls,
});

Account = connect(mapPropsToState)(Account);
export default Account;