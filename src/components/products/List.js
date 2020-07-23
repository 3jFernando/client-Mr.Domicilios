import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../Loading';

let List = (props) => {
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  // productos
  const [products, setProducts] = useState([]);
  
  // atributos
  const [_id, set_Id] = useState(null);
  const [image, setImage] = useState('../../../logo512.png');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cant, setCant] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {

    if (props.shop !== null) {

      setLoading(true);
      const load = async () => {
        await Axios.get(props.urls.api + '/products/shop/' + props.shop._id)
          .then(response => {
            const status = response.data.status;
            if (status === 200) {
              setProducts(response.data.products);
            } else {
              alert("Falla al tratar de cargar los datos intentalo de nuevo");
            }
          })
          .catch(e => alert("Upps, ocurrio un error al tratar de realizar la accion"))
          .finally(() => setLoading(false));
      }
      load();
    }

  }, [])

  // ver detalles de un producto
  const showDetails = (product) => {

    // actualziando
    setUpdating(true);
    // cargando
    setLoading(true);
    // datos
    set_Id(product._id);
    setImage(`${props.urls.api_server_realtime}${product.image}`);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCant(product.cant);
    setCategory(product.category);
    setLoading(false);
  }

  // componente titulo
  const Title = props => {
    return (
      <div className="bg-dark alert alert-dark d-flex justify-content-between align-items-center">
        
        <b className="text-white">{props.name}</b>
        {
          props.more && (
            props.updating && (<button type="button" className="btn btn-sm btn-dark text-white" onClick={() => props.setUpdating(false)}><span className="fa fa-plus mr-2" />Agregar</button>)
          )
        }
      </div>
    );
  }

  // componente item producto
  const Product = ({ product }) => {        
    return (
      <div className="product-list-item" onClick={() => showDetails(product)} >
        <b>{product.name}</b>
        <span className="fa fa-arrow-right"></span>
      </div>
    );    
  }

  // cambo de imagen validar que se una imagen (jpg, jpeg, png)
  const onChangeFile = (e) => {

    const filesValids = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = e.target.files[0];

    // validar que sea una imagen 
    const valid = filesValids.includes(file.type);
    if(!valid) {
      setImage(null);
      alert("El archivo seleccionado no es una imagen valida. \n\nFormatos de imagenes validos: .png, .jpej, y .jpg");
      return false;
    }

    setImage(file);
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

    await Axios.post(props.urls.api + '/products', formData)
    .then(response => {

      const product = response.data.product;
      const action = response.data.action;
      if(response.data.status === 200) {

        if(!action) { // si la accion es crear

          // actualizar el lsitado
          setProducts([...products, product]);
          showDetails(product);   
          toast.success("Producto creado con exito");

        } else { // si la accion es actualziar
          
          toast.success("Producto modificado con exito");
          // eliminar el item
          products.map((p, index) => {            
            if(p._id === product._id) products.splice(index, 1);
          });
          // agregar el actualizado
          setProducts([...products, product]);
          // mostrar el detalle
          showDetails(product);   
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

  // cancenarl crear, editar
  const cancel = () => {
     // actualziando
     setUpdating(false);
     // cargando
     setLoading(true);
     // datos
     set_Id(null);
     setImage(null);
     setName("");
     setPrice("");
     setDescription("");
     setCant("");
     setCategory("");
     setLoading(false);
  }

  return (
    <div>

      <div className="form-group">
        <ToastContainer />
      </div>

      {loading && (<Loading />)}
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        <div className="products-section-1 w-50 flex-1 p-2">
          <Title name="Productos" more={false} />
          {
            products.map(p => (
              <Product key={p._id} product={p} />
            ))
          }
        </div>
        <div className="products-section-2 w-50 flex-1 p-2">
          <Title name="Detalles" more={true} updating={updating} setUpdating={setUpdating} />
          <div className="w-100">
          <form >
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="flex-1 form-group" style={{ width: '30%' }}>
                  <img className="products-details-image" src={image ?? '../../../logo512.png'} alt={name} />                  
                  <input type="file" onChange={file => onChangeFile(file)} name="image" id="image" />   
                </div>
                <div className="flex-2 form-group" style={{ width: '70%' }}>
                  <label htmlFor="name">Nombre</label><br />
                  <textarea style={{ height: 100, width: '100%', }} className="form-control"
                  placeholder="Nombre del producto"
                  onChange={text => setName(text.target.value)}
                  defaultValue={name}
                  id="name" />
                </div>
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
                {
                  updating && (
                    <button type="button" className="btn btn-sm btn-light ml-2" 
                      onClick={() => cancel()}>
                      <span className='fa mr-2 fa-trash'></span>
                      <b>Cancelar</b>
                  </button>
                  )
                }
              </div>
            </form>
          </div>
        </div>
      </div>
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