import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const GastronomiaShow = (props) => {

  return (
    <Show {...props}>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="nombre" />
        <TextField source="descripcion" />
        <TextField source="imagen" />
        <TextField source="ciudad" />
        <TextField source="precio" />
        <TextField source="precio descuento" />
    </SimpleShowLayout>
  </Show>
  )
}

export default GastronomiaShow