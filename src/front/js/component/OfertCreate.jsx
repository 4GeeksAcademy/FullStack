import React, { useEffect, useState, useContext} from 'react';
import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { Context } from "../store/appContext.js";


const OfertCreate = () => {

    const { store, actions } = useContext(Context);
    const [choice, setChoices] = useState([]);
    const [userChoice, setUserChoice] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await actions.getCategorias();
                const categorias = store.comboCategorias;
                setChoices(categorias);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setLoading(false);
            }
        };

        const fetchUsuarios = async () => {
            try {
                await actions.getUsersCombo();
                const usuarios = store.usersCombo;
                setUserChoice(usuarios)
                setLoading(false)
            }
            catch (error) {
                console.error('Error al obtener los usuarios', error);
                setLoading(false)
            }
        }

        fetchUsuarios();
        fetchCategories();
    }, [actions, store]);

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
                <SelectInput 
                    source="categoria"
                    choices={choice}
                    optionText="nombre"
                    optionValue="id"
                    isLoading={loading}
                />
            </SimpleForm>
        </Create>
    )
};

export default OfertCreate;