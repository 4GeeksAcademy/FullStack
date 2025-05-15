import React, { useEffect, useState, useContext} from 'react';
import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { Context } from "../store/appContext.js";


const GastronomiaCreate = () => {

    const { store, actions } = useContext(Context);
    const [userChoice, setUserChoice] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1) Solo al montar: dispara la carga de usuarios
  useEffect(() => {
    actions.getUsersCombo()
      .catch(err => console.error('Error al obtener usuarios para combo', err));
  }, [actions]);

  // 2) Cuando cambie store.usersCombo, actualiza tu estado local
  useEffect(() => {
    if (store.usersCombo && store.usersCombo.length > 0) {
      setUserChoice(store.usersCombo);
      setLoading(false);
    }
  }, [store.usersCombo]);

    return (
        <Create title="Crear Oferta">
            <SimpleForm>
                <TextInput source="nombre" />
                <TextInput source="descripcion" />
                <TextInput source="ciudad" />
                <TextInput source="precio" />
                <TextInput source="precio descuento" />
                <TextInput source="url" label="imagen" />
                <SelectInput 
                    source="usuario"
                    choices={userChoice}
                    optionText="correo"
                    optionValue="id"
                    isLoading={loading}
                />
            </SimpleForm>
        </Create>
    )
};

export default GastronomiaCreate