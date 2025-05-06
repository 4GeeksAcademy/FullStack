import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, SelectInput, PasswordInput, NumberInput } from "react-admin";

const CreateUser = () => (
    <Create title="Crear Usuario">
        <SimpleForm>
            <TextInput source="correo" label="Correo" />
            <PasswordInput source="password" label="Contraseña"/>
            <TextInput source="telefono" label="Teléfono" />
            <TextInput source="direccion 1" label="Dirección 1" />
            <TextInput source="direccion 2" label="Dirección 2" />
            <TextInput source="ciudad" label="Ciudad" />
            <TextInput source="pais" label="País" />
            <NumberInput source="codigo postal" label="Codigo Postal"/>
            <SelectInput
                source="rol"
                label="Rol"
                choices={[
                    { id: 'Administrador', name: 'Administrador' },
                    { id: 'Cliente', name: 'Cliente' },
                ]}
            />
            <BooleanInput source="activo" label="Activo" />
        </SimpleForm>
    </Create>
);

export default CreateUser;
