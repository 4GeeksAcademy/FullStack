import React, { useEffect, useState, useContext} from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, useRecordContext } from 'react-admin';
import { Context } from "../store/appContext.js";


const OfertEdit = (props) => {

    const { store, actions } = useContext(Context);
    const [choice, setChoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const record = useRecordContext();

    useEffect(() => {
        actions.getCategorias();
    }, [actions]);

    // Actualizar estado local cuando comboCategorias esté listo
    useEffect(() => {
        if (store.comboCategorias && store.comboCategorias.length > 0) {
            setChoices(store.comboCategorias);
            setLoading(false);
        }
    }, [store.comboCategorias]);

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
                <SelectInput 
                    source="categoria"
                    choices={choice}
                    optionText="nombre"
                    optionValue="id"
                    isLoading={loading}
                    defaultValue={record?.categoria_id}
                    {...props}
                />
            </SimpleForm>
        </Edit>
    )
};

export default OfertEdit;