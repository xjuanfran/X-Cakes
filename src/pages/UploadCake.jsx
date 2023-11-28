import React from 'react'
import CreateCake from '../components/CreateCake'

const UploadCake = () => {
  const fields = [
    { type: "text", name: "name", placeholder: "Nombre del pastel" },
    { type: "number", name: "price", placeholder: "Precio" },
    { type: "number", name: "stock", placeholder: "Stock" },
    { type: "text", name: "category", placeholder: "Categoria" },
  ];

  const buttonName = 'Subir pastel'

  return (
    <CreateCake
      fields={fields}
      fieldArea
      buttonName={buttonName}
    />
  )
}

export default UploadCake