import React from "react";
import { Admin, Resource } from "react-admin";

// Asegurate que esta ruta es correcta respecto a donde esté AdminDashboard.jsx
import dataProvider from "../dp/dataProvider";

// Importación de componentes desde carpeta 'component'
import UserList from "../component/UserList.jsx";
import UserEdit from "../component/UserEdit.jsx";
import UserShow from "../component/UserShow.jsx";

const AdminDashboard = () => (
    <Admin basename="/admin" dataProvider={dataProvider}>
      <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} />
    </Admin>
  );

export default AdminDashboard;
