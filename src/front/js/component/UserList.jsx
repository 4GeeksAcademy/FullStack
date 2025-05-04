import React from 'react';
import { List, Datagrid, TextField, BooleanField, EditButton, DeleteButton } from 'react-admin';

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="correo" />
      <TextField source="telefono" />
      <TextField source="direccion 1" />
      <TextField source="direccion 2" />
      <TextField source="ciudad" />
      <TextField source="pais" />
      <TextField source="rol" />
      <BooleanField source="activo" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UserList;