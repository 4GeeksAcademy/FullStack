import React from "react";
import { Admin, Resource } from "react-admin";

// Asegurate que esta ruta es correcta respecto a donde esté AdminDashboard.jsx
import dataProvider from "../dp/dataProvider";

// Importación de componentes desde carpeta 'component'
import UserList from "../component/UserList.jsx";
import UserEdit from "../component/UserEdit.jsx";
import UserShow from "../component/UserShow.jsx";
import CreateUser from "../component/CreateUser.jsx";

import OfertEdit from "../component/OfertEdit.jsx";
import OfertShow from "../component/OfertShow.jsx";
import OfertList from "../component/OfertList.jsx";
import OfertCreate from "../component/OfertCreate.jsx";

const AdminDashboard = () => {
  return (
    <Admin basename="/admin" dataProvider={dataProvider}>
      <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={CreateUser} />
      <Resource name="oferta" list={OfertList} show={OfertShow} edit={OfertEdit} create={OfertCreate}/>
    </Admin>
  )
};

export default AdminDashboard;
