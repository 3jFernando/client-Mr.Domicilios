import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// compoenntes
import Loading from '../Loading';

// reducers
import { clearCategories, addCategory } from '../../redux/actions/categories';
import { toast } from 'react-toastify';

let List = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    props.dispatch(clearCategories());
    if (props.shop !== null) load();

  }, []);

  // cargar 
  const load = async () => {
    setLoading(true);
    await Axios.get(`${props.urls.api}/categorys/shop/${props.shop._id}`)
      .then(response => {
        if (response.data.status === 200) {
          const categories_all = response.data.categorys;
          categories_all.map(category => props.dispatch(addCategory(category)));
        }
      })
      .catch(e => alert("No es posible cargar los datos"))
      .finally(() => setLoading(false));

  }

  // eliminar categoria
  const deleteCategory = async _id => {
    setLoading(true);
    await Axios.delete(`${props.urls.api}/categorys/${_id}`)
      .then(response => {
        if (response.data.status === 200) {
          toast.success("Catagoria eliminada con exito.");
          props.categories.map((c, index) => {
            if (c._id === _id) props.categories.splice(index, 1);
          });
        } else if(response.data.status === 460) {
          toast.warning("La categoria que intentas editar esta presentando problemas.");
        } else if(response.data.status === 490) {
          toast.warning("No es permitido eliminar la categoria porque se esta usando.");
        }
      })
      .catch(e => toast.error("No es posible eliminar el item"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="table-responsive">
      {
        loading && (
          <Loading />
        )
      }
      <Link to='/categories/new'>
        <button className="btn btn-dark btn-sm"><span className="fa fa-plus mr-2" />Crear nueva</button>
      </Link>
      <table className="table table-hover mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            props.categories.map(category => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.image}</td>
                <td>{category.name}</td>
                <td>
                  <Link to={`/categories/edit/${category._id}`}>
                    <button className="btn btn-sm btn-success mr-2"><span className="text-white fa fa-edit"></span></button>
                  </Link>
                  <button className="btn btn-sm btn-danger bg-danger" onClick={() => deleteCategory(category._id)}><span className="text-white fa fa-trash-o"></span></button>
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
  categories: state.categories
});

List = connect(mapStateToProps)(List);
export default List;