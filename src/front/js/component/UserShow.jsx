import React from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField } from 'react-admin';

const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="correo" />
        <TextField source="telefono" />
        <TextField source="direccion 1" />
        <TextField source="direccion 2" />
        <TextField source="ciudad" />
        <TextField source="pais" />
        <TextField source="rol" />
        <BooleanField source="activo" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;