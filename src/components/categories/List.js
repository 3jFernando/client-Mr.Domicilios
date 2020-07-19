import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'; 

// compoenntes
import Loading from '../Loading';

// reducers
import { clearCategories ,addCategory } from '../../redux/actions/categories';

let List = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    props.dispatch(clearCategories());
    if(props.shop !== null) {

      setLoading(true);
      const load = async () => {

        await Axios.get(props.urls.api + '/categorys/shop/'+props.shop._id)
        .then(response => {
          if(response.data.status === 200) {
            const categories_all = response.data.categorys;
            categories_all.map(category => props.dispatch(addCategory(category)));
          }
        })
        .catch(e => alert("No es posible cargar los datos"))
        .finally(() => setLoading(false));
  
      }
      load();
    }

  }, []);

  return (
    <div>
      {
        loading && (
          <Loading />
        )
      }
      <table className="table table-hover">
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
                  <button className="btn btn-sm btn-dark bg-dark mr-2"><span className="text-white fa fa-edit"></span></button>
                  <button className="btn btn-sm btn-danger bg-danger"><span className="text-white fa fa-trash-o"></span></button>
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