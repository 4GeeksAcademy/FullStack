import React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const ViajeList = (props) => {
    return (
      <List {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="nombre" />
          <TextField source="descripcion" />
          <TextField source="ciudad" />
          <TextField source="precio" />
          <TextField source="precio descuento" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
    )
}

export default ViajeList