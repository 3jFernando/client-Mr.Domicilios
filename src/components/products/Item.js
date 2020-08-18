import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

import ControlSelectFile from '../../utils/ControlSelectFile';

let Item = props => {
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  // atributos
  const { id } = useParams();
  const [_id, set_Id] = useState(id);
  const [image, setImage] = useState('../../../logo512.png');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cant, setCant] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const result = props.products.filter(p => p._id === _id);    
    if (result.length > 0) {
      showDetails(result[0]);
    }
  }, []);

  // ver detalles de un producto
  const showDetails = (product) => {

    // actualziando
    setUpdating(true);
    // cargando
    setLoading(true);
    // datos
    set_Id(product._id);
    setImage(product.image === undefined || product.image === null ? '../../../logo512.png' : `${props.urls.api_server_realtime}${product.image}`);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCant(product.cant);
    setCategory(product.category);
    setLoading(false);
  }

  // crear productos
  const createProduct = async () => {

    setLoading(true)

    let formData = new FormData();

    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('cant', cant);
    formData.append('category', category);
    formData.append('shop_id', props.shop._id);
    formData.append('action', updating); // false: crear, true: editar
    formData.append('_id', _id); // id del producto que se esta editando

    await Axios.post(`${props.urls.api}/products`, formData)
    .then(response => {

      //const product = response.data.product;
      const action = response.data.action;
      if(response.data.status === 200) {

        if(!action) { // si la accion es crear

          // actualizar el lsitado
          //setProducts([...products, product]);
          //showDetails(product);   
          toast.success("Producto creado con exito");

        } else { // si la accion es actualziar
          
          toast.success("Producto modificado con exito");
          // eliminar el item
          /*products.map((p, index) => {            
            if(p._id === product._id) products.splice(index, 1);
          })*/;
          // agregar el actualizado
          //setProducts([...products, product]);
          // mostrar el detalle
          //showDetails(product);   
        }
      } else if(response.data.status === 460) {
        toast.error("El producto que intentas editar, este presentao problemas, por favor recarga el sistema.");
      }

    })
    .catch(e => {
      console.log(e);
      toast.error("Upps, no es posible realizar la accion en este momento");
    })
    .finally(() => setLoading(false));

  }

  // cambo de imagen validar que se una imagen (jpg, jpeg, png)
  const onChangeFile = (e) => {    
    const response = ControlSelectFile(e);
    if(response.status) {
      setImage(response.file);
    }
  }

  return(
    <div className="products-section-2 w-100 flex-1 p-2">
          <div className="w-100">
          <form >
              <div className="flex-1 form-group">
                  <img className="products-details-image" src={image} alt={name} />                  
                  <input type="file" onChange={file => onChangeFile(file)} name="image" id="image" />   
                </div>
                <div className="flex-2 form-group" style={{ width: '100%' }}>
                  <label htmlFor="name">Nombre</label><br />
                  <textarea style={{ height: 100, width: '100%', }} className="form-control"
                  placeholder="Nombre del producto"
                  onChange={text => setName(text.target.value)}
                  defaultValue={name}
                  id="name" />
                </div>
              <div className="d-flex flex-wrap justify-content-between">
                <div className="flex-1 form-group" style={{ width: '48%' }}>
                  <label htmlFor="price">Precio COP</label><br />
                  <input type="text" className="form-control"
                    placeholder="Precio del producto"
                    id="price"
                    onChange={text => setPrice(text.target.value)}
                    value={price} />
                </div>
                <div className="flex-1 form-group" style={{ width: '48%' }}>
                  <label htmlFor="cant">Cantidad en invetario</label><br />
                  <input type="text" className="form-control"
                    placeholder="Cantidad en inventario del producto"
                    id="cant"
                    onChange={text => setCant(text.target.value)}
                    value={cant} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label><br />
                <select className="form-control"
                  id="category" 
                  value={category}
                  onChange={text => setCategory(text.target.value)}
                  >
                  <option></option>
                  {
                    props.categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label><br />
                <textarea style={{ height: 100, width: '100%', }} className="form-control"
                  placeholder="Descripcion del producto"
                  onChange={text => setDescription(text.target.value)}
                  defaultValue={description}
                  id="description" />
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" id="btn-action" className="btn btn-sm btn-dark bg-dark" 
                  onClick={() => createProduct()}
                  action={!updating ? '0' : '1'}>
                    <span className={updating ? 'fa text-white mr-2 fa-edit' : 'fa text-white mr-2 fa-plus'}></span>
                    <b className="text-white">{updating ? ('Guardar cambios') : ('Crear producto')}</b>
                </button>            
              </div>
            </form>
          </div>
        </div>
  );
}

const mapPropsToState = state => ({
  shop: state.shop,
  urls: state.urls,
  categories: state.categories,
  products: state.products
});

Item = connect(mapPropsToState)(Item);

export default Item;
