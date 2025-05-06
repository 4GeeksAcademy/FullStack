import React, { useEffect, useState } from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const OfertShow = (props) => {

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
        <TextField source="categoria" />
    </SimpleShowLayout>
  </Show>
  )
}

export default OfertShow;