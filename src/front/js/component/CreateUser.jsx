import React from "react";
import { 
    Create, 
    SimpleForm, 
    TextInput, 
    BooleanInput, 
    SelectInput, 
    PasswordInput, 
    NumberInput
} from "react-admin";
import { required } from "react-admin";

const CreateUser = () => (
    <Create 
        title="Crear Usuario"
        record={{ activo: false }} // ✅ Initial values aquí
    >
        <SimpleForm> {/* 🚫 Quita initialValues de aquí */}
            <TextInput source="correo" label="Correo" />
            <PasswordInput source="password" label="Contraseña"/>
            <TextInput source="telefono" label="Teléfono" />
            <TextInput source="direccion1" label="Dirección 1" />
            <TextInput source="direccion2" label="Dirección 2" />
            <TextInput source="ciudad" label="Ciudad" />
            <TextInput source="pais" label="País" />
            <NumberInput source="codigoPostal" label="Código Postal"/>
            <SelectInput
                source="rol"
                label="Rol"
                choices={[
                    { id: 'Administrador', name: 'Administrador' },
                    { id: 'Cliente', name: 'Cliente' },
                ]}
            />
            <SelectInput
                source="activo"
                label="Activo"
                choices={[
                    { id: true, name: 'Si' },
                    { id: false, name: 'No' },
                ]}
                validate={[required()]}
                emptyText={false}
            />
        </SimpleForm>
    </Create>
);

export default CreateUser;