import {toast} from 'react-toastify';

export default function ControlSelectFile(e) {

  const filesValids = ['image/jpeg', 'image/jpg', 'image/png'];
  const file = e.target.files[0];

  // validar que sea una imagen 
  const valid = filesValids.includes(file.type);
  if(!valid) {
    toast.warning("El archivo seleccionado no es una imagen valida. \n\nFormatos de imagenes validos: .png, .jpej, y .jpg");
    return {status: false};
  }

  return {status: true, file: file};
}