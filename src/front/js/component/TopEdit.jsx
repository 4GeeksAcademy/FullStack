import React, { useEffect, useState, useContext} from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';


const TopEdit = (props) => {

    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="nombre" />
                <TextInput source="descripcion" />
                <TextInput source="ciudad" />
                <TextInput source="precio" />
                <TextInput source="precio descuento" />
                <TextInput source="imagen" />
            </SimpleForm>
        </Edit>
    )
};

export default TopEdit;