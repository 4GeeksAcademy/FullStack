import React from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput } from 'react-admin';

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="correo" />
      <TextInput source="telefono" />
      <TextInput source="direccion 1" />
      <TextInput source="direccion 2" />
      <TextInput source="ciudad" />
      <TextInput source="pais" />
      <TextInput source="rol" />
      <BooleanInput source="activo" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;