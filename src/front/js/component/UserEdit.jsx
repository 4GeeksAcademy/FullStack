import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, required } from 'react-admin';

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
      <SelectInput
                      source="activo"
                      choices={[
                          { id: true, name: 'Si' },
                          { id: false, name: 'No' },
                      ]}
                      validate={[required()]}
                      emptyText={false}
                  />
    </SimpleForm>
  </Edit>
);

export default UserEdit;