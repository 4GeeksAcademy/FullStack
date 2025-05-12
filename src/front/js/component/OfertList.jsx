import React from "react";
import { List, Datagrid, TextField, BooleanField, EditButton, DeleteButton } from 'react-admin';

const OfertList = (props) => {
    return (
      <List {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="nombre" />
          <TextField source="descripcion" />
          <TextField source="ciudad" />
          <TextField source="precio" />
          <TextField source="precio descuento" />
          <TextField source="categoria" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    )
}

export default OfertList